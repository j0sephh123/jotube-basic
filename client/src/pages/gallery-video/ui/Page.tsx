import { GalleryVideo } from "@features/Gallery";
import { useTypedChannelYtId } from "@features/Dashboard";

export default function GalleryVideoPage() {
  const ytChannelId = useTypedChannelYtId();

  return <GalleryVideo ytChannelId={ytChannelId} />;
}
