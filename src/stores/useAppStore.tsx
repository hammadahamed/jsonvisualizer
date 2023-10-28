import { StateCreator, create } from "zustand";

export interface CompareModuleActions {
  setAppTheme: (themeValue: boolean) => void;
  setShowWIP: (themeValue: boolean) => void;
}

const initialStates = {
  appTheme: null as boolean | null,
  showWIP: true,
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
});

const useAppStore = create<CompareModuleStates & CompareModuleActions>(useApp);

export default useAppStore;
