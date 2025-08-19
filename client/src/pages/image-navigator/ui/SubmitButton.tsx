export default function SubmitButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="btn btn-primary self-end"
    >
      Fetch Screenshots
    </button>
  );
}
