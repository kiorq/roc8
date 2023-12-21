import { useCallback, useEffect, useRef, useState } from "react";
import Canvas from "./canvas/components/Canvas";
import "./index.css";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = useCallback(() => {
    setContainerWidth(containerRef?.current?.clientWidth || 0);
    setContainerHeight(containerRef?.current?.clientHeight || 0);
  }, [containerRef]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="w-screen h-screen max-w-[700px] mx-auto md:p-12">
      <div
        ref={containerRef}
        className="shadow-2xl w-full h-full overflow-hidden md:rounded-3xl"
      >
        <Canvas width={containerWidth} height={containerHeight} />
      </div>
    </div>
  );
}

export default App;
