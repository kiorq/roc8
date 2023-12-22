interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
}

const Canvas = (props: Props) => {
  return (
    <canvas
      ref={props.canvasRef}
      width={props.width}
      height={props.height}
      className="bg-white"
    ></canvas>
  );
};

export default Canvas;
