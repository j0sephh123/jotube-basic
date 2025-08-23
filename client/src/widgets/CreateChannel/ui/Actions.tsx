type Props = {
  onClose: () => void;
  handleSubmit: () => void;
};

export default function Actions({ onClose, handleSubmit }: Props) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <button className="btn btn-outline" onClick={onClose}>
        Cancel
      </button>
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Create Channel
      </button>
    </div>
  );
}
