import { editor } from "monaco-editor";
import { StateCreator, create } from "zustand";

export interface CompareModuleActions {
  setDiffEdtrRef: (diffEdtrRef: editor.IStandaloneDiffEditor | null) => void;
  setEdtrRef: (edtrRef: editor.IStandaloneCodeEditor | null) => void;
  setMonacoConfigStatus: (value: boolean) => void;
}

const initialStates = {
  diffEdtrRef: null as editor.IStandaloneDiffEditor | null,
  edtrRef: null as editor.IStandaloneCodeEditor | null,
  monacoConfigured: false,
};

export type CompareModuleStates = typeof initialStates;

const useCompare: StateCreator<CompareModuleStates & CompareModuleActions> = (
  set
) => ({
  ...initialStates,
  setDiffEdtrRef: (diffEdtrRef: editor.IStandaloneDiffEditor | null) => {
    set({ diffEdtrRef });
  },
  setEdtrRef: (edtrRef: editor.IStandaloneCodeEditor | null) => {
    set({ edtrRef });
  },
  setMonacoConfigStatus: (value: boolean) => {
    set({ monacoConfigured: value });
  },
});

const useEditorStore = create<CompareModuleStates & CompareModuleActions>(
  useCompare
);

export default useEditorStore;
