import { type ChannelScreenshot } from "@features/Screenshot";
import { Trash2 } from "lucide-react";

type Props = {
  screenshot: ChannelScreenshot;
  onDelete: (screenshot: ChannelScreenshot) => void;
};

export default function DeleteButton({ screenshot, onDelete }: Props) {
  return (
    <div
      className="cursor-pointer absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-600/80 hover:bg-red-600 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(screenshot);
      }}
    >
      <Trash2 className="w-6 h-6 text-white" />
    </div>
  );
}
