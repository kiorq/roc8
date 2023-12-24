import { useCallback, useState } from "react";
import Button from "../components/Button";
import { DrawableElement } from "../elements";
import { makeDrawableText } from "../drawers/text";
import SizeSlider from "./SizeSlider";

const AVAILABLE_FONTS = [
  "Arial",
  "'Shadows Into Light', cursive",
  "'Alfa Slab One', serif",
  "'DM Serif Display'",
];
const MAX_FONT_SIZE = 100;
const MIN_FONT_SIZE = 20;

const AVAILABLE_COLORS = [
  "#FFFFFF",
  "#00FE1D",
  "#000000",
  "#E86AFF",
  "#FF9F00",
  "#FF4B47",
  "#FFE000",
  "#009AFF",
];

interface TextEditorProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onAddElement: (element: DrawableElement) => void;
  onClose: () => void;
}

const TextEditor = ({ canvasRef, onAddElement, onClose }: TextEditorProps) => {
  const [fontSize, setFontSize] = useState(MIN_FONT_SIZE);
  const [fontFamily, setFontFamily] = useState(AVAILABLE_FONTS[0]);
  const [color, setColor] = useState(AVAILABLE_COLORS[0]);
  const [content, setContent] = useState("");
  const closeOnly = content.trim() == "";

  const onClick = useCallback(() => {
    if (content.trim() != "") {
      if (canvasRef.current) {
        onAddElement(
          makeDrawableText(
            canvasRef.current,
            {
              value: content,
              fontFamily: fontFamily,
              fontSize: fontSize,
              align: "left",
              color,
            },
            true
          )
        );
      }
    }
    onClose();
  }, [canvasRef, onAddElement, onClose, fontFamily, fontSize, content, color]);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    if ("textContent" in e.target) {
      const textContent = e.target.textContent as string;
      setContent(textContent);
    }
  };

  return (
    <div className="absolute left-0 top-0 z-50 w-[100dvw] h-[100dvh] max-h-full bg-black/70 select-none">
      <div
        contentEditable={true}
        className={`w-full h-full flex items-center justify-center drop-shadow-xl outline-none px-5 empty:caret-transparent empty:!text-white/40 empty:before:content-['WriteSomething']`}
        autoFocus={true}
        style={{ fontSize: `${fontSize}pt`, fontFamily, color }}
        onInput={onInput}
      ></div>
      <div className="absolute bottom-0 left-0 w-full flex flex-col gap-3 py-4 px-5">
        <SizeSlider
          size={fontSize}
          max={MAX_FONT_SIZE}
          onChange={setFontSize}
        />

        <div className="w-full flex flex-row gap-3">
          {AVAILABLE_FONTS.map((fontFamily, i) => (
            <Button
              key={`font-selection-${i}`}
              content={<span style={{ fontFamily }}>Aa</span>}
              onClick={() => setFontFamily(fontFamily)}
            />
          ))}
        </div>
        <div className="w-full flex flex-row gap-3">
          {AVAILABLE_COLORS.map((color, i) => (
            <button
              key={`color-selection-${i}`}
              className=" aspect-square w-6 rounded-full shadow-lg border-2 border-black/60"
              style={{ backgroundColor: color }}
              onClick={() => setColor(color)}
            ></button>
          ))}
        </div>
        <div className="w-full flex flex-row gap-3">
          <button
            className="w-full rounded-full py-2 shadow-lg border border-black/60 text-black/65 bg-[#00FE1D] font-medium text-lg"
            onClick={onClick}
          >
            {closeOnly ? "Close" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
