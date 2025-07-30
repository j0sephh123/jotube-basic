import SavedUploads from "@/features/Upload/components/SavedUploads";
import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";

export default function SavedUploadsPage() {
  const ytChannelId = useTypedChannelYtId();

  return <SavedUploads ytChannelId={ytChannelId} />;
}
