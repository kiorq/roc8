import { useEffect, useRef, useState } from "react";
import { DrawableBackground, DrawableElement } from "../../elements";
import { drawElements } from "../../drawers/drawingEngine";

interface Props {
  width: number;
  height: number;
}

const Canvas = (props: Props) => {
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

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      className="bg-white"
    ></canvas>
  );
};

export default Canvas;
