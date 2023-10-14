import "./LoadingComponent.scss";

const LoadingComponent = () => {
  return (
    <div
      className="sp sp-circle"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="col-sm-2">
        <div className="sp sp-clock"></div>
        <p className="subtitle">Loading</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
