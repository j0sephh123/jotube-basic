import { useFetchUploads } from "@/features/Upload/hooks/useFetchUploads";
import { Download } from "lucide-react";
import clsx from "clsx";
import { useRefetchNoUploadsView } from "@/widgets/Dashboard/api/useChannelsDashboardQuery";

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
  const refetchNoUploadsView = useRefetchNoUploadsView();
  const {
    mutateAsync: handleFetchUploads,
    isPending,
    variables,
  } = useFetchUploads({
    onError(error) {
      console.error("error", error);
    },
    onSuccess() {
      refetchNoUploadsView();
      onSuccess?.();
    },
  });

  const isFetchingThisChannel =
    variables?.ytChannelId === ytChannelId && isPending;

  return (
    <button
      disabled={isFetchingThisChannel}
      onClick={() => handleFetchUploads({ ytChannelId })}
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
