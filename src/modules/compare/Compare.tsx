import "./Compare.scss";
import MonacoComponent from "./components/monacoComponent/MonacoComponent";
import { useEffect, useState } from "react";
import LoadingComponent from "../../common/components/loading/LoadingComponent";
import LanguageSelectComponent from "./components/languageSelect/LanguageSelectComponent";
import { languageList } from "../../common/constants/constants";
import SwitchContentsButtonComponent from "./switchContentsButtonComponent/SwitchContentsButtonComponent";
import useEditorStore from "../../stores/useEditorStore";
import ThemeSwitchComponent from "../../common/components/themeSwitch/ThemeSwitchComponent";
import JVLogo from "../../assets/jvlogo.png";
import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { configureMonaco } from "../../common/utils/configureMonaco";
import parser from "../../jsonParser.js";
import SiteAnouncement from "../../common/components/siteAnouncement/siteAnoucement.js";

function Compare() {
  const [language, setLanguage] = useState(languageList[1]);
  const { diffEdtrRef, monacoConfigured, setMonacoConfigStatus } =
    useEditorStore((state) => state);

  useEffect(() => {
    if (!monacoConfigured)
      configureMonaco(setMonacoConfigStatus).then(() => {});
  }, []);

  function switchFunction() {
    const originalVal = diffEdtrRef?.getOriginalEditor()?.getValue();
    parser(originalVal as string);
    const modifiedVal = diffEdtrRef?.getModifiedEditor()?.getValue();
    diffEdtrRef?.getOriginalEditor()?.setValue(modifiedVal as string);
    diffEdtrRef?.getModifiedEditor()?.setValue(originalVal as string);
  }

  return (
    <>
      {/* TOP BAR */}
      <div className="compare-w">
        <SiteAnouncement />

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
              Compare
            </p>
          </div>

          {/* RIGHT */}
          <div className="top-right">
            <SwitchContentsButtonComponent switchFunction={switchFunction} />
            <LanguageSelectComponent
              isDiff={true}
              language={language}
              setLanguage={setLanguage}
            />
            <ThemeSwitchComponent />
          </div>
        </div>

        {/* EDITOR */}
        <div className="editors-w">
          {monacoConfigured ? (
            <LoadingComponent />
          ) : (
            <>
              <MonacoComponent language={language} isDiff={true} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Compare;
