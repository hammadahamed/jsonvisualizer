export interface Languages {
  id: string | undefined;
  displayName: string;
}

export const languageList: Languages[] = [
  {
    id: undefined,
    displayName: "Plain Text",
  },
  {
    id: "json",
    displayName: "JSON",
  },
  {
    id: "javascript",
    displayName: "JavaScript",
  },
  {
    id: "typescript",
    displayName: "TypeScript",
  },
  {
    id: "html",
    displayName: "HTML",
  },
  {
    id: "css",
    displayName: "CSS",
  },
  {
    id: "scss",
    displayName: "SCSS",
  },
  {
    id: "yaml",
    displayName: "YAML",
  },
  {
    id: "xml",
    displayName: "XML",
  },
];

export const visulizeLanguageList: Languages[] = [
  {
    id: "json",
    displayName: "JSON",
  },
  {
    id: "yaml",
    displayName: "YAML",
  },
  {
    id: "xml",
    displayName: "XML",
  },
];
