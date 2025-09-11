import { useSettingsQuery, useSettingsMutation } from "@features/Settings";

export default function AutoDownload({
  availableVideos,
}: {
  availableVideos: number;
}) {
  const { data: { autoDownload = false } = {}, isLoading } = useSettingsQuery();
  const mutation = useSettingsMutation();

  const handleToggle = () => {
    mutation.mutate({ autoDownload: !autoDownload });
  };

  return (
    <div className="border-t border-zinc-700 pt-4 mb-4">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-white">
                Enable Auto Download
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={autoDownload ?? false}
                onChange={handleToggle}
                disabled={
                  isLoading ||
                  mutation.isPending ||
                  (availableVideos === 0 && !autoDownload)
                }
              />
            </label>
            Availlable videos: {availableVideos}
          </div>
        </div>
      </div>
    </div>
  );
}
