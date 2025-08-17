import Button from "@/shared/components/button";
import { PlusIcon } from "lucide-react";

export default function CreateChannelTrigger({
  setIsModalVisible,
}: {
  setIsModalVisible: (isModalVisible: boolean) => void;
}) {
  return (
    <Button
      onClick={() => setIsModalVisible(true)}
      className="fixed z-50 bottom-3 right-3"
      color="accent"
      circle
      aria-label="Add"
    >
      <PlusIcon />
    </Button>
  );
}
