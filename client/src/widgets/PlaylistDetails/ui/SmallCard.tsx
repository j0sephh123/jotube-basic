import clsx from "clsx";

export function SmallCard({
  title,
  value,
  className,
  wrapperClassName,
  onClick,
}: {
  title: string;
  value: number;
  className: string;
  wrapperClassName: string;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        "stat bg-primary/10 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-base-100 hover:shadow-lg",
        wrapperClassName
      )}
      onClick={onClick}
    >
      <div className={clsx("stat-title", className)}>{title}</div>
      <div className={clsx("stat-value text-2xl", className)}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}
