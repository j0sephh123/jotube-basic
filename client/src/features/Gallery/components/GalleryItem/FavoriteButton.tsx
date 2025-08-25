import { type ChannelScreenshot } from "@features/Screenshot";
import { Heart } from "lucide-react";

type Props = {
  screenshot: ChannelScreenshot;
  onFavorite: (screenshot: ChannelScreenshot) => void;
};

export default function FavoriteButton({ screenshot, onFavorite }: Props) {
  return (
    <div
      className="cursor-pointer absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/80 hover:bg-red-500 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onFavorite(screenshot);
      }}
    >
      <Heart className="w-6 h-6 text-white" />
    </div>
  );
}
