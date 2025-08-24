import { Button } from "@shared/ui";
import { useDownload } from "@features/Upload";

export function DownloadUpload({
  ytChannelId,
  handleSideEffect,
  ytVideoId,
}: {
  ytChannelId: string;
  handleSideEffect: () => void;
  ytVideoId: string;
}) {
  const handleDownloadMutation = useDownload();
  const handleDownload = (ytVideoId: string) => {
    handleDownloadMutation
      .mutateAsync([
        {
          ytChannelId,
          ytVideoIds: [ytVideoId],
        },
      ])
      .then(handleSideEffect);
  };

  return (
    <Button
      className="btn btn-primary btn-sm"
      onClick={() => handleDownload(ytVideoId)}
    >
      Download
    </Button>
  );
}
