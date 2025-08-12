import GridPageWrapper from "@/features/Screenshot/components/GridPageWrapper";
import { useParams } from "react-router-dom";
import { useScreenshotsByMonth } from "@/features/Screenshot/hooks/useScreenshotsByMonth";
import InfoCard from "@/shared/components/InfoCard";

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
