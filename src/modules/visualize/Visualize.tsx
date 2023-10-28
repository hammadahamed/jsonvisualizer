import { useEffect, useState } from "react";
import { configureMonaco } from "../../common/utils/configureMonaco";
import LoadingComponent from "../../common/components/loading/LoadingComponent";
import "./Visualize.scss";
import { Link } from "react-router-dom";
import LanguageSelectComponent from "../compare/components/languageSelect/LanguageSelectComponent";
import { BsChevronRight } from "react-icons/bs";
import JVLogo from "../../assets/jvlogo.png";
import ThemeSwitchComponent from "../../common/components/themeSwitch/ThemeSwitchComponent";
import MonacoComponent from "../compare/components/monacoComponent/MonacoComponent";
import { languageList } from "../../common/constants/constants";
import useEditorStore from "../../stores/useEditorStore";
import DataExplorerView from "./dataExplorerView/DataExplorerView";
import SiteAnouncement from "../../common/components/siteAnouncement/siteAnoucement";

const Visualize = () => {
  const [language, setLanguage] = useState(languageList[1]);
  const { monacoConfigured, setMonacoConfigStatus } = useEditorStore(
    (state) => state
  );

  useEffect(() => {
    if (!monacoConfigured)
      configureMonaco(setMonacoConfigStatus).then(() => {});
  }, []);

  return (
    <>
      <div className="v-layout-w">
        <SiteAnouncement />

        {/* Styles for this top bar lies in the compare.tsx file. 
        copy past the component alone if changed 
        
        TODO:
        - Extract this out as a separate component
        */}
        <div className="v-top-bar">
          <div className="top-bar">
            {/* LEFT */}
            <div className="top-left">
              <h1 className="logo">
                <img src={JVLogo} alt="" />
              </h1>
              <p className="title-text">
                <span>
                  {" "}
                  <Link className="home-link" to="/">
                    JSON Visualizer
                  </Link>{" "}
                </span>
                <span>
                  <BsChevronRight className="gt" />
                </span>{" "}
                Visualize
              </p>
            </div>

            {/* RIGHT */}
            <div className="top-right">
              <LanguageSelectComponent
                language={language}
                setLanguage={setLanguage}
              />
              <ThemeSwitchComponent />
            </div>
          </div>
        </div>
        {monacoConfigured ? (
          <>
            <LoadingComponent />
          </>
        ) : (
          <>
            <div className="v-main-content">
              <div className="v-editor-section">
                <MonacoComponent language={language} />
              </div>
              <div className="v-visualize-section">
                <DataExplorerView />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Visualize;
