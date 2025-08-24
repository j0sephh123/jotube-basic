import { DefaultUploads } from "@features/Upload";
import { useTypedChannelYtId } from "@features/Dashboard";

export default function SavedUploadsPage() {
  const ytChannelId = useTypedChannelYtId();

  return <DefaultUploads ytChannelId={ytChannelId} />;
}
