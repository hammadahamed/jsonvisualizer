import { parse } from "jsonc-parser";

let sizeCache = {};

const calculateLines = (text) => {
  if (typeof text === "string") {
    return text;
  } else {
    return Object.entries(text)
      .map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`)
      .join("\n");
  }
};

const calculateWidthAndHeight = (str, single = false) => {
  if (!str) return { width: 45, height: 45 };

  const dummyElement = document.createElement("div");

  dummyElement.style.whiteSpace = single ? "nowrap" : "pre-wrap";
  dummyElement.innerHTML = str;
  dummyElement.style.fontSize = "22px";
  dummyElement.style.width = "fit-content";
  dummyElement.style.height = "fit-content";
  dummyElement.style.maxWidth = "500px";
  dummyElement.style.padding = "10px";
  dummyElement.style.fontWeight = "500";
  dummyElement.style.overflowWrap = "break-word";
  //   dummyElement.style.fontFamily = firaMono.style.fontFamily;
  document.body.appendChild(dummyElement);

  const clientRect = dummyElement.getBoundingClientRect();
  const width = clientRect.width + 12;
  const height = clientRect.height;

  document.body.removeChild(dummyElement);

  return { width, height };
};

function getNodeId(nodeList) {
  return nodeList.length ? nodeList[nodeList.length - 1]?.id + 1 : 1;
}

function createNode(nodeList, text) {
  const id = getNodeId(nodeList);

  // TODO:  Implement SIZE CACHE
  const lines = calculateLines(text);
  const sizes = calculateWidthAndHeight(lines, typeof text === "string");

  nodeList.push({ id, text, ...sizes });
  return id;
}

function createEdge(from, to, edgeList) {
  const id = `e${from}-${to}`;

  edgeList.push({
    id,
    from,
    to,
  });
}

function constructFromArrayRoot(node, nodeList, edgeList, nodeParentId) {
  node.forEach((element) => {
    if (Array.isArray(element)) {
      // means a nested ARRAY
      constructFromArrayRoot(element, nodeList, edgeList, nodeParentId);
    } else if (typeof element === "object") {
      // means a nested OBJECT
      constructFromObjectRoot(element, nodeList, edgeList, nodeParentId);
    } else {
      // means a primitive type that can be added the text PAYLOAD / node CONTENT
      const createdPrimitiveNodeId = createNode(nodeList, element);
      if (nodeParentId) {
        createEdge(nodeParentId, createdPrimitiveNodeId, edgeList);
      }
    }
  });
}

function constructFromObjectRoot(node, nodeList, edgeList, nodeParentId) {
  let nodeContent;
  let branchingNodes;

  Object.entries(node).forEach(([_key, _value]) => {
    // this ARRAY or OBJECT divergence is from this node, So save it to process later
    // after creating a node out of it, after full iteration of object elements
    // Moving to recursion in advance i.e, before creating this node, will lead to
    // falsely passing this node's parent, instead od passing this node AS THE PARENT
    if (Array.isArray(_value) || typeof _value === "object") {
      branchingNodes
        ? (branchingNodes[_key] = _value)
        : (branchingNodes = { [_key]: _value });
    } else {
      // means a primitive, so append to CONTENT
      nodeContent != null
        ? (nodeContent[_key] = _value)
        : (nodeContent = { [_key]: _value });
    }
  });

  // Node creation with FULL CONTENT
  let fullContentObjNodeId;
  if (nodeContent) {
    fullContentObjNodeId = createNode(nodeList, nodeContent);
    if (nodeParentId) {
      createEdge(nodeParentId, fullContentObjNodeId, edgeList);
    }
  } else if (branchingNodes) {
    fullContentObjNodeId = nodeParentId;
  }

  //   Now, handling the branches
  if (branchingNodes)
    Object.entries(branchingNodes).forEach(([_key, _node]) => {
      console.log("k v  => ", _key, _node, fullContentObjNodeId);

      let createdBranchingNodeId = createNode(nodeList, _key);
      if (fullContentObjNodeId) {
        createEdge(fullContentObjNodeId, createdBranchingNodeId, edgeList);
      }
      console.log(
        "createdBranchingNodeId  => ",
        _key,
        createdBranchingNodeId,
        typeof _node,
        Array.isArray(_node)
      );

      if (Array.isArray(_node)) {
        constructFromArrayRoot(
          _node,
          nodeList,
          edgeList,
          createdBranchingNodeId
        );
      } else if (typeof _node === "object") {
        constructFromObjectRoot(
          _node,
          nodeList,
          edgeList,
          createdBranchingNodeId
        );
      }
    });
}

function parser(json) {
  console.log("parsing started\n");
  sizeCache = {}; // resetting the size cache, else id ovveride will be caused leading to size mismatch across re-renders
  const parsedJson = parse(json);

  if (!parsedJson) throw "Invlid JSON";

  const nodes = [];
  const edges = [];

  if (Array.isArray(parsedJson)) {
    constructFromArrayRoot(parsedJson, nodes, edges);
  } else if (typeof parsedJson === "object") {
    constructFromObjectRoot(parsedJson, nodes, edges);
  }
  console.log(nodes);
  console.log(edges);
  return { nodes, edges };
}

export default parser;
