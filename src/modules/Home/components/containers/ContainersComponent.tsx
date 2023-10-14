import { Link } from "react-router-dom";
import "./ContainersComponent.scss";
import { HiArrowRight } from "react-icons/hi";

import CompareThumbnail from "../../../../assets/compare_thumbnail.png";
import VisualizeThumbnail from "../../../../assets/visualize_thumbnail.png";
import useAppStore from "../../../../stores/useAppStore";

export default function ContainersComponent() {
  const appTheme = useAppStore((state) => state.appTheme);

  return (
    <>
      <div className="containers-wrapper">
        <div className="hp-c-w">
          <div className="border-div">
            <div className="visualize-c-hp hp-c">
              <img src={VisualizeThumbnail} alt="" />
            </div>
          </div>

          <Link to={"/visualize"} style={{ textDecoration: "none" }}>
            <div className="module-button visualize">
              Visualize <HiArrowRight className="arrow-right"></HiArrowRight>
            </div>
          </Link>
        </div>
        <div className="hp-c-w">
          <div className="border-div">
            <div className="compare-c-hp hp-c">
              <img src={CompareThumbnail} alt="" />
            </div>
          </div>
          <Link to={"/compare"} style={{ textDecoration: "none" }}>
            <div className="module-button compare">
              Compare <HiArrowRight className="arrow-right"></HiArrowRight>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
