import { Star } from "lucide-react";
import { formatSecondsToTime } from "@shared/utils";

type Props = {
  isFav?: boolean;
  second: number;
};

export default function TopLabels({ isFav, second }: Props) {
  return (
    <div className="absolute top-2 left-2 z-10 flex gap-1">
      {isFav && (
        <div className="bg-yellow-500 text-white p-1 rounded flex items-center justify-center">
          <Star className="w-4 h-4 fill-current" />
        </div>
      )}
      <button
        className="px-2 py-1 rounded text-xs font-mono cursor-pointer bg-black/70 hover:bg-black/90 text-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {formatSecondsToTime(second)}
      </button>
    </div>
  );
}
