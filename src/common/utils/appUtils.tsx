import AppConstants from "../constants/appConstants";

export function initializeTheme() {
  const themeData = localStorage.getItem(AppConstants.THEME_KEY_LS);
  console.log("init theme", themeData);
  if (!themeData) {
    localStorage.setItem(AppConstants.THEME_KEY_LS, "dark");
  }
  document.documentElement.setAttribute(
    AppConstants.THEME_KEY_LS,
    themeData ? themeData : "dark"
  );
  return themeData;
}
