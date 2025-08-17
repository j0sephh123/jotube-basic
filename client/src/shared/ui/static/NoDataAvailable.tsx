type NoDataAvailableProps = {
  message?: string;
  className?: string;
};

export default function NoDataAvailable({
  message = "No data available",
  className = "",
}: NoDataAvailableProps) {
  return (
    <div className={`flex items-center justify-center h-screen ${className}`}>
      {message}
    </div>
  );
}
