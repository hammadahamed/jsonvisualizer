import { useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import ThemeSwitchComponent from "../themeSwitch/ThemeSwitchComponent";
import JVLogo from "../../../assets/jvlogo.png";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      {" "}
      <div className="nav-w">
        <div className="nav-c">
          <div className="nav-left half">
            <h1 className="nav-logo">
              <img className="logo-img" src={JVLogo} alt="" />
            </h1>

            <div className="screen-l logo-title">JSON Visualizer</div>
          </div>

          <div className="nav-right half">
            <div className="screen-l">
              <Link to="/visualize">
                <div className="li-i">Visualize</div>
              </Link>
              <Link to="/compare">
                <div className="li-i">Compare</div>
              </Link>
              <Link to="/about">
                <div className="li-i">About</div>
              </Link>
              <Link to="/contact">
                <div className="li-i">Contact</div>
              </Link>
              {/* <Link to="/login">
                <div className="li-i login-c">Login</div>
              </Link> */}
            </div>

            <div className="screen-s">
              <div
                className={`menu-icon ${showMenu ? "show" : ""} `}
                onClick={() => setShowMenu(!showMenu)}
              >
                {!showMenu ? (
                  <>
                    <p>Menu</p>
                  </>
                ) : (
                  <>
                    <p>Close</p>
                  </>
                )}
              </div>

              <div className={`menu-options ${showMenu ? "show" : ""} `}>
                <Link to="/visualize">
                  <div className="li-i">Visualize</div>
                </Link>
                <Link to="/compare">
                  <div className="li-i">Compare</div>
                </Link>
                <Link to="/about">
                  <div className="li-i">About</div>
                </Link>
                <Link to="/contact">
                  <div className="li-i">Contact</div>
                </Link>
              </div>
            </div>

            <ThemeSwitchComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
