interface Props {
  onBackgroundChange: () => void;
  onAddText: () => void;
  onDownload: () => void;
}

interface ToolbarBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content: string | React.ReactNode;
}

const ToolbarBtn = (props: ToolbarBtnProps) => (
  <button
    onClick={props.onClick}
    className="rounded-full aspect-square w-10 pointer-events-auto flex items-center justify-center text-xl text-white drop-shadow-lg bg-black/30"
  >
    {props.content}
  </button>
);

const Toolbar = (props: Props) => {
  return (
    <div className="w-full absolute md:relative p-4 flex flex-row gap-3 bg-gradient-to-b from-black/40 md:from-transparent pointer-events-none">
      <div className="rounded-full aspect-square w-10 pointer-events-auto flex items-center justify-center text-4xl bg-black/30">
        🚀
      </div>
      <ToolbarBtn
        onClick={props.onBackgroundChange}
        content={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 0 640 512"
          >
            <path
              opacity="1"
              fill="white"
              d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z"
            />
          </svg>
        }
      />
      <ToolbarBtn onClick={props.onAddText} content="Aa" />
      <ToolbarBtn
        onClick={() => {}}
        content={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 512 512"
          >
            <path
              opacity="1"
              fill="white"
              d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
            />
          </svg>
        }
      />
      <ToolbarBtn
        onClick={props.onDownload}
        content={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="21"
            viewBox="0 0 384 512"
          >
            <path
              opacity="1"
              fill="white"
              d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"
            />
          </svg>
        }
      />
    </div>
  );
};

export default Toolbar;
