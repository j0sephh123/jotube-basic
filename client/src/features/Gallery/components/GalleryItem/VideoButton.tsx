import { Play } from "lucide-react";

type Props = {
  ytVideoId: string;
  second: number;
  onVideoClick: (ytVideoId: string, second: number) => void;
};

export default function VideoButton({
  ytVideoId,
  second,
  onVideoClick,
}: Props) {
  return (
    <div
      className="cursor-pointer absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/80 hover:bg-green-500 flex items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onVideoClick(ytVideoId, second);
      }}
    >
      <Play className="w-6 h-6 text-white" />
    </div>
  );
}
