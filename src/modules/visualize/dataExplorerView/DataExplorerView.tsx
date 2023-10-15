import { Canvas, CanvasRef, Edge, ElkRoot, MarkerArrow } from "reaflow";
import "./DataExplorerView.scss";
import CustomNode from "./customNode/CustomNode";
import { useCallback, useRef, useState } from "react";
import { Space, ViewPort } from "react-zoomable-ui";

import * as D_DATA from "../../compare/utils/defaultData.js";

import parser from "../../../jsonParser.js";

const DataExplorerView = () => {
  let viewPort: ViewPort | null = null;

  const { nodes, edges } = parser(D_DATA.JSON_original);
  const ref = useRef<CanvasRef | null>(null);

  const layoutOptions = {};
  const [paneWidth, setPaneWidth] = useState(0);
  const [paneHeight, setPaneHeight] = useState(0);
  const [canvasFit, setCanvasFit] = useState(false);

  const onLayoutChange = useCallback(
    (layout: ElkRoot) => {
      console.log("ran layout call back");
      if (layout.width && layout.height) {
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs(
          (areaSize * 100) / (paneWidth * paneHeight) - 100
        );

        setTimeout(() => {
          if (paneHeight === 0 || paneWidth === 0 || changeRatio > 70) {
            const canvas = document.querySelector(
              ".json-v-canvas"
            ) as HTMLElement | null;

            if (canvas) {
              viewPort?.camera?.centerFitElementIntoView(canvas);
            }
          }
        });

        setPaneWidth(layout.width + 50);
        setPaneHeight((layout.height as number) + 50);
        setCanvasFit(true);
      }
    },
    [paneHeight, paneWidth, viewPort]
  );

  return (
    <>
      <div className="explorer-w">
        <Space
          onContextMenu={(e) => e.preventDefault()}
          pollForElementResizing
          treatTwoFingerTrackPadGesturesLikeTouch={true}
          onCreate={(val) => {
            viewPort = val;
          }}
        >
          <Canvas
            className="json-v-canvas"
            ref={ref}
            height={paneHeight}
            width={paneWidth}
            direction="RIGHT"
            layoutOptions={layoutOptions}
            onLayoutChange={onLayoutChange}
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
            pannable={false}
            zoomable={false}
            animated={true}
            readonly={true}
            dragEdge={null}
            dragNode={null}
            fit={canvasFit}
          />
        </Space>
      </div>
    </>
  );
};

export default DataExplorerView;
