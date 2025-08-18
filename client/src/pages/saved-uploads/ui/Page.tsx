import SavedUploads from "@/features/Upload/components/SavedUploads";
import { useTypedChannelYtId } from "@widgets/Dashboard/lib/useDashboardParams";

export default function SavedUploadsPage() {
  const ytChannelId = useTypedChannelYtId();

  return <SavedUploads ytChannelId={ytChannelId} />;
}
