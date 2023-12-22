export interface DrawableElementBase {
  type: string;
  attrs: Record<string, string | number>;
  pos: { x: number; y: number };
  layout: { dimensions: { width: number; height: number } };
}

export interface DrawableText extends DrawableElementBase {
  type: "text";
  attrs: {
    value: string;
    color: string;
    align: "center" | "left" | "right";
    fontSize: number;
    fontFamily: string;
  };
  layout: {
    dimensions: DrawableElementBase["layout"]["dimensions"];
    text: {
      lines: string[];
      lineHeight: number;
    };
  };
}

export interface DrawableImage extends DrawableElementBase {
  type: "image";
  attrs: {
    src: string;
    width: number;
    height: number;
    shape: "square" | "circle" | "square_curved_edges" | "heart";
  };
}

type SupportedColor = string;
type CustomStyle = string;

export interface DrawableBackground extends DrawableElementBase {
  type: "background";
  attrs: {
    style: `color:${SupportedColor}` | `style:${CustomStyle}`;
  };
}

export type DrawableElement = DrawableBackground | DrawableText | DrawableImage;
