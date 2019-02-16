export type originalOptions = {
  sourceTemplates: string;
  sourceImages: string;
};

export type directoryOptions = {
  dataPath: string;
  imagePath: string;
  rawFolder: string;
  sourceTemplates: string;
  sourceImages: string;
  outputFolder: string;
};

export type srcImg = {
  src: string;
  size: number;
  dest?: string;
};

export type rawSrcImg = srcImg | string;

export type rawSrcEntry = {
  files: Array<rawSrcImg>;
  alternates?: Array<srcAlter>;
};

export type srcAlter = {
  dest: string;
  size: number;
};

export type imageTemplate = {
  img?: {
    sizes?: string;
    srcset: Array<srcAlter>;
  };
  sources?: Array<{
    media?: string;
    sizes?: string;
    srcset: Array<srcImg>;
  }>;
};

export type srcEntry = {
  path: string;
  alt?: string;
  files: Array<srcImg>;
  set?: Array<srcSet>;
  imageTemplate?: imageTemplate;
};

export type srcSet = {
  alt?: string;
  files: Array<srcImg>;
  imageTemplate?: imageTemplate;
};

export type sourceBase = {
  index?: number;
  alt?: string;
  name: string;
  extension: string;
  src: string;
  size: number;
};
