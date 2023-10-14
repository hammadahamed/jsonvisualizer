import { StateCreator, create } from "zustand";

export interface CompareModuleActions {
  setAppTheme: (themeValue: boolean) => void;
}

const initialStates = {
  appTheme: null as boolean | null,
};

export type CompareModuleStates = typeof initialStates;

const useApp: StateCreator<CompareModuleStates & CompareModuleActions> = (
  set
) => ({
  ...initialStates,
  setAppTheme: (themeValue: boolean) => {
    set({ appTheme: themeValue });
  },
});

const useAppStore = create<CompareModuleStates & CompareModuleActions>(useApp);

export default useAppStore;
