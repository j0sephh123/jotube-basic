import { type ChannelScreenshot } from "@features/Screenshot";
import { Eye } from "lucide-react";

type Props = {
  screenshot: ChannelScreenshot;
  onImageClick: (screenshot: ChannelScreenshot) => void;
};

export default function ZoomButton({ screenshot, onImageClick }: Props) {
  return (
    <div
      className="cursor-pointer absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-500/80 hover:bg-blue-500 flex items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onImageClick(screenshot);
      }}
    >
      <Eye className="w-8 h-8 text-white" />
    </div>
  );
}
