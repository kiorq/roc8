interface Props {
  onBackgroundChange: () => void;
  onAddText: () => void;
  onDownload: () => void;
}

interface ToolbarBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ToolbarBtn = (props: ToolbarBtnProps) => (
  <button
    onClick={props.onClick}
    className="rounded-full aspect-square w-10 border-2 border-white shadow-lg bg-red-200 pointer-events-auto"
  ></button>
);

const Toolbar = (props: Props) => {
  return (
    <div className="w-full mb-4 absolute md:relative p-4 md:p-0 flex flex-row gap-3 bg-gradient-to-b from-black/40 md:from-transparent pointer-events-none">
      <div className="rounded-full aspect-square w-10 pointer-events-auto flex items-center justify-center text-4xl bg-black/15">
        🚀
      </div>
      <ToolbarBtn onClick={props.onBackgroundChange} />
      <ToolbarBtn onClick={props.onAddText} />
      <ToolbarBtn onClick={props.onDownload} />
    </div>
  );
};

export default Toolbar;
