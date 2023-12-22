import { DrawableText } from "../elements";

export const drawText = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  element: DrawableText
) => {
  const { value, color, fontSize, fontFamily, align } = element.attrs;
  context.fillStyle = color;
  context.font = `${fontSize}pt ${fontFamily}`;
  context.textAlign = align;

  // Draw the text
  context.fillText(value, element.pos.x, element.pos.y);
};
