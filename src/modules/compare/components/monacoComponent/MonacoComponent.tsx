import { DiffEditor, Editor, useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import "./MonacoComponent.scss";
import LoadingComponent from "../../../../common/components/loading/LoadingComponent";
import themeData from "../../utils/myTheme";
import ColorSelectorComponent, {
  Palette,
} from "../colorSelector/ColorSelectorComponent";
import * as D_DATA from "../../utils/defaultData";
import { LiaUndoAltSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { Languages } from "../../../../common/constants/constants";
import useEditorStore from "../../../../stores/useEditorStore";
import useAppStore from "../../../../stores/useAppStore";

export interface MonacoComponentInterface {
  language: Languages;
  isDiff?: boolean;
}
const MonacoComponent = (props: MonacoComponentInterface) => {
  const { language, isDiff = false } = props;
  const appTheme = useAppStore((state) => state.appTheme);

  const [monacoTheme, setMonacoTheme] = useState(
    appTheme ? "light" : "vs-dark"
  );

  useEffect(() => {
    const unsubAppThemeListener = useAppStore.subscribe((state, prevState) => {
      if (state.appTheme != prevState.appTheme) {
        setMonacoTheme(state.appTheme ? "light" : "vs-dark");
      }
      return state.appTheme;
    });
    return () => {
      unsubAppThemeListener();
    };
  }, []);
  const monaco = useMonaco();

  const { diffEdtrRef, setDiffEdtrRef, edtrRef, setEdtrRef } = useEditorStore(
    (state) => state
  );

  const [original, setOriginal] = useState(D_DATA.JSON_original);
  const [modified, setModified] = useState(D_DATA.JSON_modified);

  (monaco?.editor as typeof editor)?.defineTheme(
    "vs-dark",
    themeData as editor.IStandaloneThemeData
  );

  const diffEditorOptions: editor.IDiffEditorConstructionOptions = {
    enableSplitViewResizing: true,
    originalEditable: true,
  };

  function diffColorSetter(color: Palette, insertionColors: boolean) {
    if (color == null || insertionColors == null) return;

    let bgColorVariableName = "--delete-line-color";
    let fgColorVariableName = "--delete-char-color";

    if (insertionColors) {
      bgColorVariableName = "--insert-line-color";
      fgColorVariableName = "--insert-char-color";
    }

    document.documentElement.style.setProperty(
      bgColorVariableName,
      color.colorCodePrimary
    );
    document.documentElement.style.setProperty(
      fgColorVariableName,
      color.colorCodePrimary
    );
  }

  function clearContent(insertionTab: boolean) {
    if (!insertionTab) setOriginal("");
    else setModified("");
  }

  function setDiffEdtrRefInStore(_edtr: typeof diffEdtrRef) {
    setDiffEdtrRef(_edtr);
  }

  function setEdtrRefInStore(_edtr: typeof edtrRef) {
    setEdtrRef(_edtr);
  }

  return (
    <>
      <div className="cmp-editor">
        {isDiff ? (
          <>
            <div className="editor-top">
              <div className="right">
                <LiaUndoAltSolid
                  className="revert-button"
                  onClick={() => clearContent(false)}
                />
                <ColorSelectorComponent
                  insertionTab={false}
                  setDiffColor={diffColorSetter}
                />
              </div>
              <div className="left">
                <LiaUndoAltSolid
                  className="revert-button"
                  onClick={() => clearContent(true)}
                />
                <ColorSelectorComponent
                  insertionTab={true}
                  setDiffColor={diffColorSetter}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {isDiff ? (
          <>
            <DiffEditor
              options={diffEditorOptions}
              theme={monacoTheme}
              language={language.id}
              loading={<LoadingComponent />}
              original={original}
              modified={modified}
              onMount={(_editor) => {
                console.log("DiffEditor Mounted");
                setDiffEdtrRefInStore(_editor);
              }}
            />
          </>
        ) : (
          <>
            <Editor
              theme={monacoTheme}
              language={language.id}
              loading={<LoadingComponent />}
              options={{ minimap: { enabled: false } }}
              value={D_DATA.JSON_original}
              onMount={(_editor) => {
                console.log("Editor Mounted");
                setEdtrRefInStore(_editor);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MonacoComponent;
