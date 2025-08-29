import { proxy, useSnapshot } from "valtio";

type State = {
  type: "create" | "update" | null;
  playlistId: number | null;
};

const state = proxy<State>({
  type: null,
  playlistId: null,
});

export const setPlaylistModal = (
  type: State["type"],
  playlistId?: State["playlistId"]
) => {
  state.type = type;
  state.playlistId = playlistId || null;
};

export const closePlaylistModal = () => {
  state.type = null;
  state.playlistId = null;
};

export const usePlaylistModalState = () => useSnapshot(state);
