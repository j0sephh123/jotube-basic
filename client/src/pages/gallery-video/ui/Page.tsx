import { GalleryVideo } from "@features/Gallery";
import { useTypedChannelYtId, useTypedVideoYtId } from "@features/Dashboard";

export default function GalleryVideoPage() {
  const ytVideoId = useTypedVideoYtId();
  const ytChannelId = useTypedChannelYtId();

  return <GalleryVideo ytVideoId={ytVideoId} ytChannelId={ytChannelId} />;
}
