import { SavedUploads } from "@features/Upload";
import { useTypedChannelYtId } from "@features/Dashboard";

export default function SavedUploadsPage() {
  const ytChannelId = useTypedChannelYtId();

  return <SavedUploads ytChannelId={ytChannelId} />;
}
