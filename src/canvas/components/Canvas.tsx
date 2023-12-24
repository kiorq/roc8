import { Position } from "../position";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  onClick: React.MouseEventHandler<HTMLCanvasElement>;
  onDragStart: (pos: Position) => void;
  onDragMove: (pos: Position) => void;
  onDragEnd: () => void;
}

const Canvas = (props: Props) => {
  const onTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    props.onDragStart({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };
  const onTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    props.onDragMove({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };
  const onTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.stopPropagation();

    props.onDragEnd();
  };

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    props.onDragStart({
      x: event.clientX,
      y: event.clientY,
    });
  };
  const onMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    props.onDragMove({
      x: event.clientX,
      y: event.clientY,
    });
  };
  const onMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.stopPropagation();
    props.onDragEnd();
  };

  return (
    <canvas
      ref={props.canvasRef}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
      // mobile devices
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // desktop
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    ></canvas>
  );
};

export default Canvas;
