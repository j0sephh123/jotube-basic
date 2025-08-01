import GridPageWrapper from "@/features/Screenshot/components/GridPageWrapper";
import MonthCountCard from "@/features/Screenshot/components/MonthCountCard";
import { useScreenshots } from "@/features/Screenshot/hooks/useScreenshots";

export default function ScreenshotsPage(): JSX.Element {
  const { data = {}, isLoading } = useScreenshots();

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  return (
    <GridPageWrapper>
      {Object.entries(data).map(([month, count]) => (
        <MonthCountCard key={month} month={month} count={count} />
      ))}
    </GridPageWrapper>
  );
}
