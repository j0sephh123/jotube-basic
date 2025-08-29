import { proxy, useSnapshot } from "valtio";

type State = {
  isVisible: boolean;
  url: string;
  onClose: () => void;
};

const state = proxy<State>({
  isVisible: false,
  url: "",
  onClose: () => {},
});

export const setZoom = (
  isVisible: boolean,
  url: string,
  onClose: () => void
) => {
  state.isVisible = isVisible;
  state.url = url;
  state.onClose = onClose;
};

export const closeZoom = () => {
  state.isVisible = false;
  state.url = "";
  state.onClose = () => {};
};

export const useZoomState = () => useSnapshot(state);
