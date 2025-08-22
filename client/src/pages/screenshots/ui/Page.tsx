import { GridPageWrapper, useScreenshots } from "@features/Screenshot";
import { MonthCountCard } from "@entities/Screenshot";

export default function Page(): JSX.Element {
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
