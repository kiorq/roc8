import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DrawableBackground, DrawableElement } from "../elements";
import { drawElements } from "../drawers/engine";
import { makeDrawableText } from "../drawers/text";
import {
  ALLOWED_BACKGROUND_STYLES,
  makeDrawableBackground,
} from "../drawers/background";
import { findSelectedDrawableElement } from "./mouse";
import { Position } from "./position";

const useCanvas = (props: { width: number; height: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // background element, used as first thing drawn on canvas
  const [bgElement, setBgElement] = useState<DrawableBackground>(
    makeDrawableBackground({
      style: "style:peachy_sunset",
    })
  );
  // elements drawn on the canvas
  const [elements, setElements] = useState<DrawableElement[]>([]);
  // dragging tracking
  const [draggingElementIndex, setDraggingElementIndex] = useState<number>();
  const [draggingElementOffset, setDraggingElementOffset] = useState({
    x: 0,
    y: 0,
  });

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
   * if the browsers resizes stop dragging
   */
  useEffect(() => {
    setDraggingElementIndex(undefined);
    setDraggingElementOffset({ x: 0, y: 0 });
  }, [props.width, props.height]);

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
          event.clientX,
          event.clientY
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

  const onCanvasDragStart = useCallback(
    (pos: Position) => {
      if (canvasRef.current) {
        const { selectedIndex, selectedElement } = findSelectedDrawableElement(
          canvasRef.current,
          elements,
          pos.x,
          pos.y
        );
        if (typeof selectedIndex == "number" && selectedElement) {
          console.debug("Dragging started", { selectedIndex, selectedElement });
          setDraggingElementIndex(selectedIndex);
          setDraggingElementOffset({
            x: pos.x - selectedElement.pos.x,
            y: pos.y - selectedElement.pos.y,
          });
        }
      }
    },
    [canvasRef, elements]
  );

  const onCanvasDragMove = useCallback(
    (pos: Position) => {
      if (typeof draggingElementIndex == "number") {
        // update elements
        setElements((oldElements) => {
          const updatedElements = [...oldElements];
          updatedElements[draggingElementIndex].pos.x =
            pos.x - draggingElementOffset.x;
          updatedElements[draggingElementIndex].pos.y =
            pos.y - draggingElementOffset.y;
          return updatedElements;
        });
      }
    },
    [draggingElementIndex, draggingElementOffset]
  );

  const onCanvasDragEnd = useCallback(() => {
    if (typeof draggingElementIndex == "number") {
      console.debug("Dragging ended");
      setDraggingElementIndex(undefined);
      setDraggingElementOffset({ x: 0, y: 0 });
    }
  }, [draggingElementIndex]);

  return {
    canvasRef,
    onBackgroundChange,
    onAddText,
    onDownload,
    onCanvasClick,
    onCanvasDragStart,
    onCanvasDragMove,
    onCanvasDragEnd,
  };
};

export default useCanvas;
