type NoDataAvailableProps = {
  message?: string;
};

export default function NoDataAvailable({
  message = "No data available",
}: NoDataAvailableProps) {
  return <div className="flex items-center justify-center">{message}</div>;
}
