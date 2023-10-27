import { parse } from "jsonc-parser";
import { NodeData } from "reaflow";

// let sizeCache = {};

export interface NodeType extends NodeData {
  id: string;
  height: number;
  width: number;
  text: unknown;
  isParent?: boolean;
}

export interface EdgeType {
  id: string;
  from: string;
  to: string;
}

const calculateLines = (text: unknown) => {
  if (typeof text === "string") {
    return text;
  } else {
    return Object.entries(text ?? {})
      .map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`)
      .join("\n");
  }
};

const calculateWidthAndHeight = (str: string, single = false) => {
  if (!str) return { width: 45, height: 45 };

  const dummyElement = document.createElement("div");

  dummyElement.style.whiteSpace = single ? "nowrap" : "pre-wrap";
  dummyElement.innerHTML = str;
  dummyElement.style.fontSize = "20px";
  dummyElement.style.width = "fit-content";
  dummyElement.style.height = "fit-content";
  dummyElement.style.maxWidth = "600px";
  dummyElement.style.padding = "10px";
  dummyElement.style.fontWeight = "500";
  dummyElement.style.overflowWrap = "break-word";
  //   dummyElement.style.fontFamily = firaMono.style.fontFamily;
  document.body.appendChild(dummyElement);

  const clientRect = dummyElement.getBoundingClientRect();
  const width = clientRect.width + 20;
  const height = clientRect.height;

  document.body.removeChild(dummyElement);

  return { width, height };
};

function getNodeId(nodeList: NodeType[]) {
  return nodeList.length
    ? (parseInt(nodeList[nodeList.length - 1]?.id) + 1).toString()
    : "1";
}

function createNode(nodeList: NodeType[], text: unknown, isParent?: boolean) {
  const id = getNodeId(nodeList);

  // TODO:  Implement SIZE CACHE
  const lines = calculateLines(text);
  const sizes = calculateWidthAndHeight(lines, typeof text === "string");
  const obj = { id, text, ...sizes } as NodeType;
  if (isParent) {
    obj.isParent = true;
  }
  nodeList.push(obj);
  return id;
}

function createEdge(from: string, to: string, edgeList: EdgeType[]) {
  const id = `e${from}-${to}`;

  edgeList.push({
    id,
    from,
    to,
  });
}

function constructFromArrayRoot(
  node: Array<unknown>,
  nodeList: NodeType[],
  edgeList: EdgeType[],
  nodeParentId: string | null = null
) {
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

function constructFromObjectRoot(
  node: object | null,
  nodeList: NodeType[],
  edgeList: EdgeType[],
  nodeParentId: string | null = null
) {
  let nodeContent: Record<string | number, unknown> | null = null;
  let branchingNodes: Record<string | number, unknown> | null = null;

  Object.entries(node ?? {}).forEach(([_key, _value]) => {
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
  let fullContentObjNodeId: string | null;
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
      const createdBranchingNodeId = createNode(nodeList, _key, true);
      if (fullContentObjNodeId) {
        createEdge(fullContentObjNodeId, createdBranchingNodeId, edgeList);
      }

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

function parser(json: string) {
  //   sizeCache = {}; // resetting the size cache, else id ovveride will be caused leading to size mismatch across re-renders
  const parsedJson = parse(json);

  const nodes: NodeType[] = [];
  const edges: EdgeType[] = [];

  if (parsedJson) {
    if (Array.isArray(parsedJson)) {
      constructFromArrayRoot(parsedJson, nodes, edges);
    } else if (typeof parsedJson === "object") {
      constructFromObjectRoot(parsedJson, nodes, edges);
    }
  }
  return { nodes, edges };
}

export default parser;
