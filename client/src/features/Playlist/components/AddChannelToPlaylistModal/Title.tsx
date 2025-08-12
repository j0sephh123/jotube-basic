export default function Title({ title }: { title: string }) {
  return (
    <>
      <h3 className="font-bold text-lg mb-4">Add Channel to Playlist</h3>
      <p className="text-sm text-base-content/70 mb-4">
        Channel: <span className="font-medium text-base-content">{title}</span>
      </p>
    </>
  );
}
