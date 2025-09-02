import { useGetVideoByYtIdQuery } from "@shared/api";
import { useTypedParams } from "@shared/hooks";
import { OpenDirectoryButton } from "@shared/ui";

export function VideoDetailsPage() {
  const ytChannelId = useTypedParams("ytChannelId");
  const ytId = useTypedParams("ytVideoId");
  const query = useGetVideoByYtIdQuery({
    variables: {
      getVideoByYtIdInput: {
        ytChannelId,
        ytId,
      },
    },
  });

  console.log(query.data, {
    ytChannelId,
    ytId,
  });

  return (
    <div className="container mx-auto p-6 mt-12">
      VideoDetailsPage
      <OpenDirectoryButton ytChannelId={ytChannelId} ytVideoId={ytId} />
    </div>
  );
}
