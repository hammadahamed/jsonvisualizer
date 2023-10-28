import useAppStore from "../../../stores/useAppStore";
import "./SiteAnouncement.scss";

const SiteAnouncement = () => {
  const { showWIP, setShowWIP } = useAppStore((state) => ({
    showWIP: state.showWIP,
    setShowWIP: state.setShowWIP,
  }));

  setTimeout(() => {
    setShowWIP(false);
  }, 5000);

  return (
    <>
      <div className={`anouncement-w ${!showWIP ? "sa-hidden" : ""}`}>
        <div className="content">
          <span className="rt"> &lt; </span> Dev in Progress{" "}
          <span className="rt"> /&gt; </span>
          <span className="close-an" onClick={() => setShowWIP(false)}>
            close
          </span>{" "}
        </div>
      </div>
    </>
  );
};

export default SiteAnouncement;
