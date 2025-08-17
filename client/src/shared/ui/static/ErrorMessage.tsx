export default function ErrorMessage({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
