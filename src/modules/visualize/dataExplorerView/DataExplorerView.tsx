import { Canvas, CanvasRef, Edge, MarkerArrow } from "reaflow";
import "./DataExplorerView.scss";
import CustomNode from "./customNode/CustomNode";
import { useRef } from "react";

import { refNodes, refEdges } from "../../../common/utils/fakeData";
import * as D_DATA from "../../compare/utils/defaultData.js";

import parser from "../../../jsonParser.js";

const DataExplorerView = () => {
  const { nodes, edges } = parser(D_DATA.JSON_original);
  const ref = useRef<CanvasRef | null>(null);

  const layoutOptions = {
    // "elk.algorithm": "elk.layered",
    // "elk.direction": "RIGHT",
    // "elk.spacing.portPort": "1",
  };

  return (
    <>
      <div className="explorer-w">
        <Canvas
          ref={ref}
          zoomable={true}
          direction="RIGHT"
          layoutOptions={layoutOptions}
          fit={true}
          nodes={nodes}
          edges={edges}
          arrow={<MarkerArrow className="edge-arrow" />}
          edge={(p) => {
            return (
              <Edge
                className="v-edge"
                {...p}
                interpolation="curved"
                label={null as never}
              />
            );
          }}
          node={(p) => <CustomNode {...p} />}
          animated={false}
          readonly={true}
          dragEdge={null}
          dragNode={null}
        />
      </div>
    </>
  );
};

export default DataExplorerView;
