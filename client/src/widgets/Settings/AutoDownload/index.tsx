import {
  useAutoDownloadQuery,
  useAutoDownloadMutation,
} from "@features/Settings";

export default function AutoDownload() {
  const { data: autoDownload = false, isLoading } = useAutoDownloadQuery();
  const mutation = useAutoDownloadMutation();

  const handleToggle = () => {
    mutation.mutate(!autoDownload);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-white">Enable Auto Download</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={autoDownload}
              onChange={handleToggle}
              disabled={isLoading || mutation.isPending}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
