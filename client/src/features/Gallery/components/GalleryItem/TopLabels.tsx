import { formatSecondsToTime } from "@shared/utils";

type Props = {
  second: number;
};

export default function TopLabels({ second }: Props) {
  return (
    <div className="absolute top-2 left-2 z-10 flex gap-1">
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
