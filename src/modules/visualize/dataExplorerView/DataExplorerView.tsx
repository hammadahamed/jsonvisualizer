import {
  Canvas,
  CanvasRef,
  Edge,
  ElkRoot,
  MarkerArrow,
  NodeData,
} from "reaflow";
import "./DataExplorerView.scss";
import CustomNode from "./customNode/CustomNode";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Space } from "react-zoomable-ui";

import * as D_DATA from "../../compare/utils/defaultData.js";

import parser, { EdgeType } from "../../../jsonParser.js";
import useEditorStore from "../../../stores/useEditorStore.js";
import { NodeType } from "jsonc-parser";
import useAppStore from "../../../stores/useAppStore.js";

const DataExplorerView = () => {
  const viewPort = useAppStore((state) => state.viewPort);
  const setViewPort = useAppStore((state) => state.setViewPort);
  const [nodes, setNodes] = useState([] as NodeType[]);
  const [edges, setEdges] = useState([] as EdgeType[]);
  const ref = useRef<CanvasRef | null>(null);
  const [paneWidth, setPaneWidth] = useState(0);
  const [paneHeight, setPaneHeight] = useState(0);
  const layoutOptions = {};

  const contentJson = useEditorStore((state) => state.visulaizeContent);

  useEffect(() => {
    const { nodes, edges } = parser(contentJson ?? D_DATA.JSON_original);
    setNodes(nodes as unknown as SetStateAction<NodeType[]>);
    setEdges(edges);
  }, [contentJson]);

  const onLayoutChange = useCallback(
    (layout: ElkRoot) => {
      if (layout.width && layout.height) {
        const areaSize = layout.width * layout.height;
        const changeRatio = Math.abs(
          (areaSize * 100) / (paneWidth * paneHeight) - 100
        );

        setTimeout(
          () => {
            if (paneHeight === 0 || paneWidth === 0 || changeRatio > 70) {
              const canvas = document.querySelector(
                ".json-v-canvas"
              ) as HTMLElement | null;

              if (canvas) {
                viewPort?.camera?.centerFitElementIntoView(canvas);
              }
            }
          },
          paneWidth < 400 ? 1000 : 0
        );

        setPaneWidth(layout.width + 50);
        setPaneHeight((layout.height as number) + 50);
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
          treatTwoFingerTrackPadGesturesLikeTouch={false}
          onCreate={(val) => {
            setViewPort(val);
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
            nodes={nodes as unknown as NodeData[]}
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
            fit={true}
          />
        </Space>
      </div>
    </>
  );
};

export default DataExplorerView;
