import InfoCard from "@/shared/components/InfoCard";

export default function MonthCountCard({
  month,
  count,
}: {
  month: string;
  count: number;
}) {
  return (
    <InfoCard title={month} content={`Count: ${count}`} titleLink={month} />
  );
}
