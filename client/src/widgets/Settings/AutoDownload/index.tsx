import {
  useSettingsState,
  toggleAutoDownload,
// eslint-disable-next-line import/no-internal-modules
} from "@shared/store/settingsSlice";

export default function AutoDownload() {
  const { autoDownload } = useSettingsState();

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
              onChange={toggleAutoDownload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
