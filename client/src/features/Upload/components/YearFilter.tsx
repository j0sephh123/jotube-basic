import clsx from "clsx";

type YearCount = {
  year: number;
  count: number;
};

type YearFilterProps = {
  years: YearCount[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
};

export function YearFilter({
  years,
  selectedYear,
  onYearChange,
}: YearFilterProps) {
  if (years.length === 0) {
    return null;
  }

  return (
    <div className="tabs tabs-bordered mb-4">
      <button
        className={clsx(
          "tab tab-bordered flex items-center gap-2",
          selectedYear === null && "tab-active underline"
        )}
        onClick={() => onYearChange(null)}
      >
        All
        <div className="badge badge-sm badge-outline">
          {years.reduce((sum, year) => sum + year.count, 0)}
        </div>
      </button>

      {years.map(({ year, count }) => (
        <button
          key={year}
          className={clsx(
            "tab tab-bordered flex items-center gap-2",
            selectedYear === year && "tab-active underline"
          )}
          onClick={() => onYearChange(year)}
        >
          {year}
          <div className="badge badge-sm badge-outline">{count}</div>
        </button>
      ))}
    </div>
  );
}
