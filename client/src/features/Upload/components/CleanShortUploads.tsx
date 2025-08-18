import { Scissors } from "lucide-react";
import clsx from "clsx";
import { useCleanShortUploads } from "@features/Upload/hooks/useCleanShortUploads";

type CleanShortUploadsProps = {
  ytChannelId: string;
};

export default function CleanShortUploads({
  ytChannelId,
}: CleanShortUploadsProps) {
  const cleanShortUploads = useCleanShortUploads(ytChannelId);

  const handleClean = async () => {
    if (!ytChannelId) return;

    try {
      await cleanShortUploads.mutateAsync({
        ytChannelId,
      });
    } catch (error) {
      console.error("Failed to clean short uploads:", error);
    }
  };

  return (
    <button
      onClick={handleClean}
      className="text-xs flex items-center gap-1 hover:bg-red-700/50 px-2 py-1 rounded transition-colors w-24 justify-center"
    >
      <Scissors
        className={clsx(
          "w-3 h-3 text-red-400",
          cleanShortUploads.isPending && "animate-spin"
        )}
      />
      <span className="text-red-400 font-medium">
        {cleanShortUploads.isPending ? "Cleaning..." : "Clean Short"}
      </span>
    </button>
  );
}
