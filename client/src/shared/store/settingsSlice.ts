import { proxy, useSnapshot } from "valtio";

type SettingsState = {
  autoDownload: boolean;
};

export const settingsState = proxy<SettingsState>({
  autoDownload: false,
});

export const setAutoDownload = (value: boolean) => {
  settingsState.autoDownload = value;
};

export const toggleAutoDownload = () => {
  settingsState.autoDownload = !settingsState.autoDownload;
};

export const useSettingsState = () => useSnapshot(settingsState);
