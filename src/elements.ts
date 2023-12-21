export interface DrawableElementBase {
  type: string;
  attrs: Record<string, string | number>;
  pos: { x: number; y: number };
  size: { w: number; h: number };
}

export interface DrawableText extends DrawableElementBase {
  type: "text";
  attrs: {
    value: string;
    fontSize: number;
    fontFamily: string;
    [key: string]: string | number;
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

export interface DrawableBackground
  extends Omit<DrawableElementBase, "pos" | "size"> {
  type: "background";
  attrs: {
    style: `color:${SupportedColor}` | `style:${CustomStyle}`;
  };
}

export type DrawableElement = DrawableBackground | DrawableText | DrawableImage;
