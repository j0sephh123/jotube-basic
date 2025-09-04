import { useFetchUploads } from "@features/Upload";
import { Download } from "lucide-react";
import clsx from "clsx";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";

type Props = {
  channelId: number;
  videoCount: number;
  onSuccess?: () => void;
};

export default function FetchUploadsButton({
  channelId,
  videoCount,
  onSuccess,
}: Props) {
  const refetchChannelsDashboardQuery = useRefetchChannelsDashboardQuery();

  const {
    mutateAsync,
    isPending,
    variables,
  } = useFetchUploads({
    onError(error) {
      console.error("error", error);
    },
    onSuccess() {
      refetchChannelsDashboardQuery();
      onSuccess?.();
    },
  });

  const isFetchingThisChannel =
    variables?.channelId === channelId && isPending;

  return (
    <button
      disabled={isFetchingThisChannel}
      onClick={() => mutateAsync({ channelId })}
      className={clsx(
        "btn btn-sm",
        isFetchingThisChannel ? "btn-disabled" : "btn-primary"
      )}
    >
      <Download className="h-4 w-4 mr-2" />
      {isFetchingThisChannel ? "Fetching..." : `Fetch ${videoCount}`}
    </button>
  );
}
