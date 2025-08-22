import { useParams } from "react-router-dom";
import { GridPageWrapper, useScreenshotsByMonth } from "@features/Screenshot";
import { InfoCard } from "@shared/ui";

export default function ScreenshotsByMonth(): JSX.Element {
  const { month } = useParams();
  const { data = {}, isLoading } = useScreenshotsByMonth(month);

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <GridPageWrapper>
      {Object.entries(data).map(([date, count]) => (
        <InfoCard
          key={date}
          title={date.split("-")[2]}
          content={`Count: ${count}`}
          titleLink={date}
        />
      ))}
    </GridPageWrapper>
  );
}
