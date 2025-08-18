import SavedUploads from "@/features/Upload/components/SavedUploads";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";

export default function SavedUploadsPage() {
  const ytChannelId = useTypedChannelYtId();

  return <SavedUploads ytChannelId={ytChannelId} />;
}
