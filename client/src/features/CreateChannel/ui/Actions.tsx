import Button from "@/shared/ui/button";

export default function Actions({
  onClose,
  handleSubmit,
}: {
  onClose: () => void;
  handleSubmit: () => void;
}) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit" onClick={handleSubmit}>
        Create Channel
      </Button>
    </div>
  );
}
