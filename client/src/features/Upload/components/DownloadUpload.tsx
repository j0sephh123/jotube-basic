import { Button } from "@shared/ui";
import { useDownload } from "@features/Upload";

export function DownloadUpload({
  channelId,
  handleSideEffect,
  ytVideoId,
}: {
  channelId: number;
  handleSideEffect: () => void;
  ytVideoId: string;
}) {
  const handleDownloadMutation = useDownload();
  const handleDownload = (ytVideoId: string) => {
    handleDownloadMutation
      .mutateAsync([
        {
          channelId,
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
