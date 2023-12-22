interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  onClick: React.MouseEventHandler<HTMLCanvasElement>;
}

const Canvas = (props: Props) => {
  return (
    <canvas
      ref={props.canvasRef}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
      className="bg-white"
    ></canvas>
  );
};

export default Canvas;
