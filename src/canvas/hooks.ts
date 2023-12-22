import { useCallback, useEffect, useRef, useState } from "react";
import { DrawableBackground, DrawableElement } from "../elements";
import { drawElements } from "../drawers/engine";
import { makeDrawableText } from "../drawers/text";

interface CanvasOptions {
  width: number;
  height: number;
}

const BACKGROUND_STYLES: DrawableBackground["attrs"]["style"][] = [
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

const useCanvas = (props: CanvasOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bgElement, setBgElement] = useState<DrawableBackground>({
    type: "background",
    attrs: {
      style: "style:peachy_sunset",
    },
  });
  const [elements, setElements] = useState<DrawableElement[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      drawElements(canvasRef.current, [bgElement, ...elements], true);
    }
  }, [canvasRef, bgElement, elements, props.width, props.height]);

  const onBackgroundChange = useCallback(() => {
    const nextIndex = BACKGROUND_STYLES.indexOf(bgElement.attrs.style) + 1;
    const nextStyle = BACKGROUND_STYLES[nextIndex] || BACKGROUND_STYLES[0];

    setBgElement({
      type: "background",
      attrs: {
        style: nextStyle,
      },
    });
  }, [bgElement.attrs.style]);

  const onAddText = () => {
    setElements((elements) => [
      ...elements,
      makeDrawableText(canvasRef.current!, {
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
