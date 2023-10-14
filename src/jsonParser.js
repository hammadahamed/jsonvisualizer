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
  let arrayTypeNodes;
  let objTypeNodes;

  Object.entries(node).forEach(([_key, _value]) => {
    // console.log("===> Object entries ===> ", _key, _value, typeof _value);
    // Construct Parent Node With key => if value is Object / Array
    let createdParentId;
    if (Array.isArray(_value) || typeof _value === "object") {
      createdParentId = createNode(nodeList, _key);

      if (nodeParentId != null) {
        createEdge(nodeParentId, createdParentId, edgeList);
      }
    }

    // this ARRAY or OBJECT divergence is from this node, So save it to process later
    // after creating a node out of it, after full iteration of object elements
    // Moving to recursion in advance i.e, before creating this node, will lead to
    // falsely passing this node's parent, instead od passing this node AS THE PARENT
    if (Array.isArray(_value)) {
      arrayTypeNodes
        ? arrayTypeNodes.push(_value)
        : (arrayTypeNodes = [_value]);
      //   constructFromArrayRoot(_value, nodeList, edgeList, createdParentId);
    } else if (typeof _value === "object") {
      objTypeNodes ? objTypeNodes.push(_value) : (objTypeNodes = [_value]);
      //   constructFromObjectRoot(_value, nodeList, edgeList, createdParentId);
    } else {
      // means a primitive, so append to CONTENT
      nodeContent != null
        ? (nodeContent[_key] = _value)
        : (nodeContent = { [_key]: _value });
    }
  });

  //   Node creation with FULL CONTENT
  let fullContentObjNodeId;
  if (nodeContent) {
    console.log("nodeContent =>>", nodeContent, node);
    fullContentObjNodeId = createNode(nodeList, nodeContent);
    if (nodeParentId) {
      createEdge(nodeParentId, fullContentObjNodeId, edgeList);
    }
  }

  //   Now, handling the branches
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
