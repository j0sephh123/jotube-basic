export default function Header({
  length,
}: {
  length: number;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Storyboards</h1>
      <p className="text-base-content/70">
        {length} storyboard
        {length !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
