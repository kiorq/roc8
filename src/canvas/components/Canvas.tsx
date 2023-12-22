import { useEffect, useRef, useState } from "react";
import { DrawableBackground, DrawableElement } from "../../elements";
import { drawElements } from "../../drawers/engine";

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
  const [elements, setElements] = useState<DrawableElement[]>([
    {
      type: "text",
      attrs: {
        value: "Hello world",
        fontFamily: "Arial",
        fontSize: 50,
        align: "center",
        color: "black",
      },
      pos: { x: 200, y: 200 },
    },
  ]);

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
