import { useState, useEffect } from "react";
import "./ThemeSwitchComponent.scss";
import { RxSun } from "react-icons/rx";
import { BiSolidMoon } from "react-icons/bi";
import useAppStore from "../../../stores/useAppStore";
import AppConstants from "../../constants/appConstants";

function getThemeBool(themeData: string) {
  return themeData == "light";
}

function getThemeString(themeBool: boolean) {
  return themeBool ? "light" : "dark";
}

const ThemeSwitchComponent = () => {
  const $themeKey = AppConstants.THEME_KEY_LS;
  const { setAppTheme } = useAppStore((state) => ({
    setAppTheme: state.setAppTheme,
  }));

  const [theme, setTheme] = useState(() => {
    const savedThemeMode = localStorage.getItem($themeKey);
    return getThemeBool(savedThemeMode ?? "light");
  });

  useEffect(() => {
    themeSetter(theme);
    if (theme != null) setAppTheme(theme);
  }, []);

  function themeSetter(value: boolean) {
    setTheme(value);
    const themeString = getThemeString(value);
    document.documentElement.setAttribute("data-theme", themeString);
    localStorage.setItem($themeKey, themeString);
    setAppTheme(getThemeBool(themeString));
  }

  return (
    <>
      <div className={`t-switch-w ${theme ? "" : "dark"}`}>
        <div className="t-switch-container" onClick={() => themeSetter(!theme)}>
          <div className="t-switch-thumb">
            {theme ? (
              <>
                <RxSun className="t-icon light-ts" />
              </>
            ) : (
              <>
                <BiSolidMoon className="t-icon dark-ts" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSwitchComponent;
