import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { DrawableBackground, DrawableElement } from "../elements";
import { drawElements } from "../drawers/engine";
import { makeDrawableText } from "../drawers/text";
import {
  ALLOWED_BACKGROUND_STYLES,
  makeDrawableBackground,
} from "../drawers/background";
import { findSelectedDrawableElement } from "./mouse";

interface CanvasOptions {
  width: number;
  height: number;
}

const useCanvas = (props: CanvasOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bgElement, setBgElement] = useState<DrawableBackground>(
    makeDrawableBackground({
      style: "style:peachy_sunset",
    })
  );
  const [elements, setElements] = useState<DrawableElement[]>([]);

  /**
   * redraws elements on canvas any of the following states changes
   * bgElement: the background of the canvas
   * element: another element was added, removed or order has changed
   * width and height: browser resizes
   */
  useEffect(() => {
    if (canvasRef.current) {
      drawElements(canvasRef.current, [bgElement, ...elements], true);
    }
  }, [canvasRef, bgElement, elements, props.width, props.height]);

  /**
   * change background of canvas by iterating through ALLOWED_BACKGROUND_STYLES
   */
  const onBackgroundChange = useCallback(() => {
    const nextIndex =
      ALLOWED_BACKGROUND_STYLES.indexOf(bgElement.attrs.style) + 1;
    const nextStyle =
      ALLOWED_BACKGROUND_STYLES[nextIndex] || ALLOWED_BACKGROUND_STYLES[0];

    setBgElement(
      makeDrawableBackground({
        style: nextStyle,
      })
    );
  }, [bgElement.attrs.style]);

  /**
   * adds a text to canvas
   * TODO: it since now we have makeDrawableX functions, this can be more generic
   * like onAddElement instead, giving the toolbar and other ui component more
   * control on what it can add and simplifying the hook, but we are still developing here!
   */
  const onAddText = () => {
    setElements((elements) => [
      ...elements,
      makeDrawableText(canvasRef.current!, {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        fontFamily: "Arial",
        fontSize: 20,
        align: "left",
        color: "black",
      }),
    ]);
  };

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = "download.png";
    link.href = canvasRef.current?.toDataURL() || "";
    link.click();
  };

  const onCanvasClick = useCallback(
    (event: MouseEvent<HTMLCanvasElement>) => {
      if (canvasRef.current) {
        const { selectedIndex } = findSelectedDrawableElement(
          canvasRef.current,
          elements,
          event
        );
        // move element to the front, if it is not already
        if (selectedIndex && selectedIndex != elements.length - 1) {
          setElements((_elements) => {
            const item = _elements[selectedIndex];
            _elements.splice(selectedIndex, 1); // remove item from it's current pos
            _elements.splice(elements.length - 1, 0, item); // add it to end
            return _elements;
          });
        }
      }
    },
    [elements]
  );

  return {
    canvasRef,
    onBackgroundChange,
    onAddText,
    onDownload,
    onCanvasClick,
  };
};

export default useCanvas;
