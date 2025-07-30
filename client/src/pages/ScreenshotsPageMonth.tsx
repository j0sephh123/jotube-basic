import GridPageWrapper from "@/features/Screenshot/components/GridPageWrapper";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useScreenshotsByMonth } from "@/features/Screenshot/hooks/useScreenshotsByMonth";

export default function ScreenshotsByMonth(): JSX.Element {
  const { month } = useParams();
  const { data = {}, isLoading } = useScreenshotsByMonth(month);

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <GridPageWrapper>
      {Object.entries(data).map(([date, count]) => (
        <div key={date} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <Link to={date} className="card-title">
              {date.split("-")[2]}
            </Link>
            <p>Count: {count}</p>
          </div>
        </div>
      ))}
    </GridPageWrapper>
  );
}
