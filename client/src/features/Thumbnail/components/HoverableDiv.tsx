type Props = {
  color: string;
  onClick: () => void;
};

export function HoverableDiv({ color, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="w-1/2 h-full bg-transparent transition-colors duration-200 ease-in-out hover:bg-opacity-100"
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = color)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    ></div>
  );
}
