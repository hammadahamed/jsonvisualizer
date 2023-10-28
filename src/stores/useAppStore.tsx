import { ViewPort } from "react-zoomable-ui";
import { StateCreator, create } from "zustand";

export interface CompareModuleActions {
  setAppTheme: (themeValue: boolean) => void;
  setShowWIP: (value: boolean) => void;
  setViewPort: (value: ViewPort) => void;
}

const initialStates = {
  appTheme: null as boolean | null,
  showWIP: true,
  viewPort: null as ViewPort | null,
};

export type CompareModuleStates = typeof initialStates;

const useApp: StateCreator<CompareModuleStates & CompareModuleActions> = (
  set
) => ({
  ...initialStates,
  setAppTheme: (themeValue: boolean) => {
    set({ appTheme: themeValue });
  },
  setShowWIP: (value: boolean) => {
    set({ showWIP: value });
  },
  setViewPort: (value: ViewPort) => {
    set({ viewPort: value });
  },
});

const useAppStore = create<CompareModuleStates & CompareModuleActions>(useApp);

export default useAppStore;
