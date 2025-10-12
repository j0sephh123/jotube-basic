import clsx from "clsx";

type YearMonthCount = {
  year: number;
  month: number;
  count: number;
};

type YearMonthFilterProps = {
  yearMonthCounts: YearMonthCount[];
  selectedYearMonth: { year: number; month: number } | null;
  onYearMonthChange: (
    yearMonth: { year: number; month: number } | null
  ) => void;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function YearMonthFilter({
  yearMonthCounts,
  selectedYearMonth,
  onYearMonthChange,
}: YearMonthFilterProps) {
  if (yearMonthCounts.length === 0) {
    return null;
  }

  return (
    <div className="tabs tabs-bordered mb-4">
      <button
        className={clsx(
          "tab tab-bordered flex items-center gap-2",
          selectedYearMonth === null && "tab-active underline"
        )}
        onClick={() => onYearMonthChange(null)}
      >
        All
        <div className="badge badge-sm badge-outline">
          {yearMonthCounts.reduce((sum, yearMonth) => sum + yearMonth.count, 0)}
        </div>
      </button>

      {yearMonthCounts.map(({ year, month, count }) => (
        <button
          key={`${year}-${month}`}
          className={clsx(
            "tab tab-bordered flex items-center gap-2",
            selectedYearMonth?.year === year &&
              selectedYearMonth?.month === month &&
              "tab-active underline"
          )}
          onClick={() => onYearMonthChange({ year, month })}
        >
          {monthNames[month - 1]} {year}
          <div className="badge badge-sm badge-outline">{count}</div>
        </button>
      ))}
    </div>
  );
}
