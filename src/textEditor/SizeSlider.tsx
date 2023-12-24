import { useCallback, useRef, useState } from "react";

interface SizeSliderProps {
  size: number;
  max: number;
  onChange: (amount: number) => void;
}

const SizeSlider = ({ size, max, onChange }: SizeSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setIsDragging(true);
  };
  const onDragMove = useCallback(
    (
      event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
    ) => {
      event.stopPropagation();
      if (isDragging) {
        const startingPosition =
          sliderRef.current?.getBoundingClientRect().x || 0;
        const totalDistance = sliderRef.current?.clientWidth || 0;
        // difference between touch and mouse
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        const distanceTraveled = clientX - startingPosition;
        const percentageCompleted = (distanceTraveled / totalDistance) * 100;
        const position = Math.max(0, Math.min(100, percentageCompleted)) / 100; // 100% == 1.0
        console.log("position", position);
        onChange(position * max);
      }
    },
    [isDragging, max, onChange]
  );
  const onDragEnd = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setIsDragging(false);
  };

  const getCurrentPosition = useCallback(() => {
    const percentageCompleted = (size / max) * 100;
    return Math.max(0, Math.min(95, percentageCompleted)); // 100% == 1.0
  }, [size, max]);

  const currentPosition = getCurrentPosition();

  return (
    <div
      className="w-full md:max-w-[400px] relative h-8 flex items-center justify-center"
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onTouchStart={onDragStart}
      onTouchEnd={onDragEnd}
      onTouchCancel={onDragEnd}
      onTouchMove={onDragMove}
      onMouseMove={onDragMove}
    >
      <div
        style={{ left: `${currentPosition}%` }}
        className="w-8 aspect-square rounded-full bg-white shadow-xl absolute top-0"
      ></div>
      <div
        ref={sliderRef}
        className="w-full h-5 bg-white clip-triangle-left opacity-80 rounded-full"
      ></div>
    </div>
  );
};

export default SizeSlider;
