import { DrawableElement } from "../elements";

/**
 * Finds the DrawableElement that is selected based on mouse coordinates within a canvas.
 * The canvas draws elements in the order of the element state,
 * where the last element is at the forefront and the first element is at the back.
 * This function checks if the mouse is within the boundaries of these elements
 * in reverse order, ensuring the selection of the topmost element.
 *
 * @param canvas - The HTML canvas element.
 * @param elements - An array of DrawableElements to search through.
 * @param e - The mouse event containing coordinates.
 * @returns An object with information about the selected element and its index.
 */
interface SelectionResult {
  /**
   * The DrawableElement that is selected.
   */
  selectedElement?: DrawableElement;

  /**
   * The index of the selected element.
   */
  selectedIndex?: number;
}

/**
 * Finds the DrawableElement that is selected based on mouse coordinates within a canvas.
 *
 * @param canvas - The HTML canvas element.
 * @param elements - The state array of DrawableElements to search through.
 * @param e - The mouse event containing coordinates.
 * @returns A SelectionResult object with information about the selected element and its index.
 */
export const findSelectedDrawableElement = (
  canvas: HTMLCanvasElement,
  elements: DrawableElement[],
  clientX: number,
  clientY: number
): SelectionResult => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = clientX - rect.left;
  const mouseY = clientY - rect.top;

  for (let i = elements.length - 1; i >= 0; i--) {
    const currentElement = elements[i];

    const isMouseWithinBounds =
      mouseX >= currentElement.pos.x &&
      mouseX <= currentElement.pos.x + currentElement.layout.dimensions.width &&
      mouseY >= currentElement.pos.y &&
      mouseY <= currentElement.pos.y + currentElement.layout.dimensions.height;

    if (isMouseWithinBounds) {
      const selectedElement = currentElement;
      const selectedIndex = i;

      return { selectedElement, selectedIndex };
    }
  }

  return {};
};
