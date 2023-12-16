import "./HomeComponent.scss";
import ContainersComponent from "./components/containers/ContainersComponent";
import NavBar from "../../common/components/navBar/NavBar";
import SiteAnouncement from "../../common/components/siteAnouncement/SiteAnouncement";
export default function HomeComponent() {
  return (
    <>
      <div className="home-w">
        <SiteAnouncement />
        <NavBar />
        <div className="nav-bar"></div>
        <div className="main-content">
          <div className="animate-gradient-text">
            Explore your data like a Pro
          </div>
          <div className="h-subtitle">Blazing fast, Easy visualisation</div>
          <ContainersComponent></ContainersComponent>
        </div>
      </div>
    </>
  );
}
