import clsx from "clsx";

export function SmallCard({
  title,
  value,
  className,
  wrapperClassName,
  onClick,
  hasDistinctBorder = false,
}: {
  title: string;
  value: number;
  className: string;
  wrapperClassName: string;
  onClick: () => void;
  hasDistinctBorder?: boolean;
}) {
  return (
    <div
      className={clsx(
        "bg-primary/10 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-base-100 hover:shadow-lg",
        hasDistinctBorder && "border-2 border-primary",
        wrapperClassName
      )}
      onClick={onClick}
    >
      <div className={clsx("text-sm font-medium opacity-70", className)}>
        {title}
      </div>
      <div className={clsx("text-2xl font-bold", className)}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}
