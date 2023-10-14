import AppConstants from "../constants/appConstants";

export function initializeTheme() {
  const themeData = localStorage.getItem(AppConstants.THEME_KEY_LS);
  document.documentElement.setAttribute("data-theme", themeData ?? "dark");
  return themeData;
}
