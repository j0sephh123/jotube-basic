import { useFetchUploads } from "@/features/Upload/hooks/useFetchUploads";
import { Download } from "lucide-react";

type Props = {
  ytChannelId: string;
  videoCount: number;
  onSuccess?: () => void;
};

export default function FetchUploadsButton({
  ytChannelId,
  videoCount,
  onSuccess,
}: Props) {
  const {
    mutateAsync: handleFetchUploads,
    isPending,
    variables,
  } = useFetchUploads({
    onError(error) {
      console.error("error", error);
    },
    onSuccess() {
      onSuccess?.();
    },
  });

  const isFetchingThisChannel =
    variables?.ytChannelId === ytChannelId && isPending;

  return (
    <button
      disabled={isFetchingThisChannel}
      onClick={() => handleFetchUploads({ ytChannelId })}
      className="btn btn-sm btn-ghost"
    >
      <Download className="h-4 w-4 mr-2" />
      {isFetchingThisChannel ? "Fetching..." : `Fetch ${videoCount}`}
    </button>
  );
}
