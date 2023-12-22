import { DrawableText } from "../elements";

const TEXT_MAX_WIDTH_SAFETY_MARGIN = 150;
const LINE_SPACING = 15;

/**
 * makes a drawbable text based on attrs, text layout is automatically deterimed
 *
 * @param canvas - The HTML canvas element.
 * @param context - The canvas rendering context.
 * @param element - The drawable text element.
 * @returns An object containing information about the lines, line height, width, and height.
 */
export const makeDrawableText = (
  canvas: HTMLCanvasElement,
  elementAttrs: DrawableText["attrs"]
): DrawableText => {
  const context = canvas.getContext("2d")!;
  const maxWidth = canvas.width - TEXT_MAX_WIDTH_SAFETY_MARGIN;
  const lines: string[] = [];
  const words = elementAttrs.value.split(" ");

  // Setup context
  context.font = `${elementAttrs.fontSize}pt ${elementAttrs.fontFamily}`;
  context.textAlign = elementAttrs.align;

  let currentLine = "";
  let linesWidth = 0;
  let lineHeight = 0;

  for (let i = 0; i < words.length; i++) {
    // Add word to the line
    currentLine = `${currentLine} ${words[i]}`.trim();

    // Get metrics
    const metrics = context.measureText(currentLine);
    lineHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // Check if the line is longer than the max length
    if (context.measureText(currentLine).width > maxWidth) {
      // Keep track of the largest line
      if (metrics.width > linesWidth) {
        linesWidth = metrics.width;
      }

      // Add as a line and reset
      lines.push(currentLine);
      currentLine = "";
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  const lineHeightWithSpacing = lineHeight + LINE_SPACING;

  // Determine width and height
  const height = lines.length * lineHeightWithSpacing;

  return {
    type: "text",
    attrs: {
      ...elementAttrs,
    },
    pos: { x: 0, y: 0 },
    layout: {
      text: {
        lines,
        lineHeight: lineHeightWithSpacing,
      },
      dimensions: {
        width: linesWidth,
        height,
      },
    },
  };
};

export const drawText = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  element: DrawableText
) => {
  const { color, fontSize, fontFamily, align } = element.attrs;
  context.fillStyle = color;
  context.font = `${fontSize}pt ${fontFamily}`;
  context.textAlign = align;

  const currPosX = element.pos.x;
  let currPosY = element.pos.y + element.layout.text.lineHeight;

  for (const line of element.layout.text.lines) {
    // Draw the line
    context.fillText(line, currPosX, currPosY);
    currPosY += element.layout.text.lineHeight;
  }
};
