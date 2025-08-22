// Local InfoCard component to avoid shared dependency
const InfoCard = ({
  title,
  content,
  titleLink,
}: {
  title: string;
  content: string;
  titleLink: string;
}) => (
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">
        <a href={titleLink} className="hover:underline">
          {title}
        </a>
      </h2>
      <p>{content}</p>
    </div>
  </div>
);

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
