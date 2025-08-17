type CardTitleProps = {
  title: string;
  onClick: (e: React.MouseEvent) => void;
};

export default function CardTitle({ title, onClick }: CardTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="text-base font-medium text-gray-200 hover:text-blue-400 hover:underline transition-colors truncate cursor-pointer"
        onClick={onClick}
      >
        {title}
      </div>
    </div>
  );
}
