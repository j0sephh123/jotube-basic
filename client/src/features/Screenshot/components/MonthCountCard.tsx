import { Link } from "react-router-dom";

export default function MonthCountCard({
  month,
  count,
}: {
  month: string;
  count: number;
}) {
  return (
    <div key={month} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <Link to={month} className="card-title">
          {month}
        </Link>
        <p>Count: {count}</p>
      </div>
    </div>
  );
}
