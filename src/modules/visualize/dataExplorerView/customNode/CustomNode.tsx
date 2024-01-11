import { NodeProps, Node, NodeChildProps } from "reaflow";
import "./CustomNode.scss";
import { NodeType } from "../../../../jsonParser";

type PrimitiveOrNullType = boolean | string | number | null;

const getClassNameByDataType = (data: unknown): string => {
  let className = "";
  if (["boolean", "string", "number"].includes(typeof data)) {
    className = typeof data;
  }

  if (data == null) {
    className = "null";
  }

  return `v-n-${className} v-n-value`;
};

const NodeContent = (props: NodeChildProps) => {
  const isObj = typeof props.node.text === "object";
  const content = props.node.text;

  return (
    <foreignObject x={0} y={0} height={props.height} width={props.width}>
      <div
        onClick={() => {
          console.log(props.node);
        }}
        className={`node-contents-w ${
          (props.node as unknown as NodeType).isParent ? "parent-node" : ""
        }`}
        style={{ height: props.height, width: props.width }}
      >
        <div className={`node-contents ${isObj ? "v-n-obj" : ""}`}>
          {!isObj ? (
            <>
              <p className={getClassNameByDataType(content)}> {content}</p>
            </>
          ) : (
            <>
              {Object.entries(content).map(([k, v]) => {
                return (
                  <p className="obj-p" key={k}>
                    <span className="v-n-key">{k}</span>
                    <span className="v-n-separator"> : </span>
                    <span className={getClassNameByDataType(v)}>
                      {typeof v === "string" ? '"' : null}
                      <span className="actual-content">
                        {((v as PrimitiveOrNullType) ?? "null").toString()}
                      </span>
                      {typeof v === "string" ? '"' : null}
                    </span>
                  </p>
                );
              })}
            </>
          )}
        </div>
      </div>
    </foreignObject>
  );
};

interface CustomNodeProps extends Partial<NodeProps> {}

const CustomNode = (props: CustomNodeProps) => {
  return (
    <Node rx={6} ry={6} className="v-node" {...props} labels={null as never}>
      {(event) => {
        return <NodeContent {...event}></NodeContent>;
      }}
    </Node>
  );
};

export default CustomNode;
