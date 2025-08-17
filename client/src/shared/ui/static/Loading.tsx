type LoadingProps = {
  message?: string;
  className?: string;
};

export default function Loading({
  message = "Loading...",
  className = "",
}: LoadingProps) {
  return (
    <div className={`flex items-center justify-center h-screen ${className}`}>
      {message}
    </div>
  );
}
