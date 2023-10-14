import { useEffect, useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import {
  Languages,
  languageList,
  visulizeLanguageList,
} from "../../../../common/constants/constants";
import "./LanguageSelectComponent.scss";

export interface LanguageSelectComponentProps {
  isDiff?: boolean;
  language: Languages;
  setLanguage: (lang: Languages) => void;
}
const LanguageSelectComponent = (props: LanguageSelectComponentProps) => {
  const { isDiff = false, language, setLanguage } = props;
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const selectorElement = document.querySelector("#lang-selector");

    document?.addEventListener("mousedown", (event) => {
      if (!selectorElement?.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    });
  }, []);

  return (
    <>
      <div
        id="lang-selector"
        className="lang-select"
        onClick={() => setShowLangDropdown(!showLangDropdown)}
        onBlur={() => setShowLangDropdown(false)}
      >
        <div className="lang-label">
          {language.displayName} <HiOutlineSelector className="select-icon" />
        </div>
        <div
          className={`lang-options ${showLangDropdown ? "show-lang-dd" : ""}`}
        >
          {(isDiff ? languageList : visulizeLanguageList).map((lang) => (
            <div
              key={lang.displayName}
              className={`lang-opt-item ${
                language.id === lang.id ? "active-lang-opt" : ""
              }`}
              onClick={() => {
                setLanguage(lang);
              }}
            >
              {lang.displayName}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LanguageSelectComponent;
