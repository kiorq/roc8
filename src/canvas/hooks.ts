import { useCallback, useEffect, useRef, useState } from "react";
import { DrawableBackground, DrawableElement } from "../elements";
import { drawElements } from "../drawers/engine";
import { makeDrawableText } from "../drawers/text";
import {
  ALLOWED_BACKGROUND_STYLES,
  makeDrawableBackground,
} from "../drawers/background";

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

  useEffect(() => {
    if (canvasRef.current) {
      drawElements(canvasRef.current, [bgElement, ...elements], true);
    }
  }, [canvasRef, bgElement, elements, props.width, props.height]);

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

  return { canvasRef, onBackgroundChange, onAddText, onDownload };
};

export default useCanvas;
