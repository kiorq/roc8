/***
 * handles drawing the background,
 * this supports any color or a fixed list of supported gradients
 */
import { DrawableBackground } from "../elements";

export const ALLOWED_BACKGROUND_STYLES: DrawableBackground["attrs"]["style"][] =
  [
    "style:peachy_sunset",
    "style:cayman_blue",
    "style:lemon_burst",
    "style:red_set",
    "color:#393E40",
    "color:#0F0A0A",
    "color:#F5F7EC",
    "color:#0BBDFB",
    "color:#03C56B",
  ];

export const makeDrawableBackground = (
  elementAttrs: DrawableBackground["attrs"]
): DrawableBackground => ({
  type: "background",
  attrs: {
    ...elementAttrs,
  },
  pos: { x: 0, y: 0 },
  layout: { dimensions: { width: 0, height: 0 } },
});

const getStyle = (
  style: DrawableBackground["attrs"]["style"]
): [string, string] => {
  const parts = style.split(":");
  if (parts.length == 2) {
    return [parts[0], parts[1]];
  }
  return ["color", "white"]; // TODO: handle better
};

const setStyleColor = (
  context: CanvasRenderingContext2D,
  styleName: string
) => {
  context.fillStyle = styleName;
};

const setStyleCustom = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  styleName: string
) => {
  let gradient;

  switch (styleName) {
    case "cayman_blue":
      gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0093E9");
      gradient.addColorStop(1, "#80D0C7");
      break;
    case "lemon_burst":
      gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#85FFBD");
      gradient.addColorStop(1, "#FFFB7D");
      break;
    case "peachy_sunset":
      gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#FBAB7E");
      gradient.addColorStop(1, "#F7CE68");
      break;
    case "red_set":
      gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "#FFE53B");
      gradient.addColorStop(0.74, "#FF2525"); // Adjust the position based on your preference

      break;
    default:
      // Handle the default case or provide a default gradient
      gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "white");
      gradient.addColorStop(1, "gray");
      break;
  }

  context.fillStyle = gradient;
};

export const drawBackground = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  element: DrawableBackground
) => {
  const [styleType, styleName] = getStyle(element.attrs.style);
  // set color
  if (styleType == "color") {
    setStyleColor(context, styleName);
  } else if (styleType == "style") {
    setStyleCustom(canvas, context, styleName);
  } else {
    console.warn("Invalid style type in element", {
      element: element,
    });
  }

  // draw background now
  context.fillRect(0, 0, canvas.width, canvas.height);
};
