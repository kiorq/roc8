import { useCallback, useEffect, useRef, useState } from "react";
import { DrawableBackground, DrawableElement } from "../elements";
import { drawElements } from "../drawers/engine";

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
      {
        type: "text",
        attrs: {
          value: "Hello world",
          fontFamily: "Arial",
          fontSize: 50,
          align: "center",
          color: "black",
        },
        pos: { x: 200, y: Math.floor(Math.random() * (700 - 200 + 1) + 200) },
      },
    ]);
  };

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = "filename.png";
    link.href = canvasRef.current?.toDataURL() || "";
    link.click();
  };

  return { canvasRef, onBackgroundChange, onAddText, onDownload };
};

export default useCanvas;
