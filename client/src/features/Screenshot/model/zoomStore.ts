import { proxy, useSnapshot } from "valtio";

type State = {
  url: string | null;
};

const state = proxy<State>({
  url: "",
});

export const setZoom = (url: string) => {
  state.url = url;
};

export const closeZoom = () => {
  state.url = null;
};

export const useZoomState = () => useSnapshot(state);
