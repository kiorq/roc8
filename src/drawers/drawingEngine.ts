import { drawBackground } from "./background";
import { DrawableElement, DrawableImage, DrawableText } from "../elements";

const drawText = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  element: DrawableText
) => {
  //
};

const drawImage = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  element: DrawableImage
) => {
  //
};

export const drawElements = (
  canvas: HTMLCanvasElement,
  elements: DrawableElement[],
  mustClear: boolean
) => {
  const context = canvas.getContext("2d");

  if (context) {
    // if (mustClear) {
    //   context?.clearRect(0, 0, canvas.width, canvas.height);
    // }

    for (const element of elements) {
      if (element.type == "text") {
        drawText(canvas, context, element);
      }
      if (element.type == "image") {
        drawImage(canvas, context, element);
      }
      if (element.type == "background") {
        drawBackground(canvas, context, element);
      }
    }
  }
};
