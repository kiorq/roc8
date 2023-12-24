interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content: string | React.ReactNode;
}

const Button = (props: ButtonProps) => (
  <button
    onClick={props.onClick}
    className="rounded-full aspect-square w-10 pointer-events-auto flex items-center justify-center text-xl text-white drop-shadow-lg bg-black/30"
  >
    {props.content}
  </button>
);

export default Button;
