import "./SwitchContentsButtonComponent.scss";
import { GoArrowSwitch } from "react-icons/go";

export interface SwitchContentsButtonComponentProps {
  switchFunction: () => void;
}
const SwitchContentsButtonComponent = (
  props: SwitchContentsButtonComponentProps
) => {
  const { switchFunction } = props;

  return (
    <>
      <div
        className="switch-content-w"
        onClick={() => {
          switchFunction();
        }}
      >
        <div className="switch-label">
          <p>Switch Contents</p> <GoArrowSwitch className="switch-icon" />
        </div>
      </div>
    </>
  );
};

export default SwitchContentsButtonComponent;
