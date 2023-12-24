import { useCallback, useEffect, useRef, useState } from "react";
import Canvas from "./canvas/components/Canvas";
import "./index.css";
import Toolbar from "./canvas/components/Toolbar";
import useCanvas from "./canvas/hooks";
import TextEditor from "./textEditor/TextEditor";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [showTextEditor, setShowTextEditor] = useState(false);

  const handleResize = useCallback(() => {
    setContainerWidth(containerRef?.current?.clientWidth || 0);
    setContainerHeight(containerRef?.current?.clientHeight || 0);
  }, [containerRef]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const {
    canvasRef,
    onBackgroundChange,
    onAddElement,
    onDownload,
    onCanvasClick,
    onCanvasDragStart,
    onCanvasDragMove,
    onCanvasDragEnd,
  } = useCanvas({
    width: containerWidth,
    height: containerHeight,
  });

  return (
    <div className="w-screen h-[100dvh] max-w-[700px] mx-auto flex flex-col overflow-hidden">
      {showTextEditor && (
        <TextEditor
          canvasRef={canvasRef}
          onAddElement={onAddElement}
          onClose={() => setShowTextEditor(false)}
        />
      )}
      <Toolbar
        onBackgroundChange={onBackgroundChange}
        onAddText={() => setShowTextEditor(true)}
        onDownload={onDownload}
      />
      <div
        ref={containerRef}
        className="shadow-2xl w-full flex-grow overflow-hidden md:rounded-3xl md:mb-5"
      >
        <Canvas
          canvasRef={canvasRef}
          width={containerWidth}
          height={containerHeight}
          onClick={onCanvasClick}
          onDragStart={onCanvasDragStart}
          onDragMove={onCanvasDragMove}
          onDragEnd={onCanvasDragEnd}
        />
      </div>
    </div>
  );
}

export default App;
