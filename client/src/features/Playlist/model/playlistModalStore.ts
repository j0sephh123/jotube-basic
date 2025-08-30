import { proxy, useSnapshot } from "valtio";

export type PlaylistModalState = {
  type: "create" | "update" | null;
  playlistId: number | null;
};

const state = proxy<PlaylistModalState>({
  type: null,
  playlistId: null,
});

export const setPlaylistModal = (
  type: PlaylistModalState["type"],
  playlistId?: PlaylistModalState["playlistId"]
) => {
  state.type = type;
  state.playlistId = playlistId || null;
};

export const closePlaylistModal = () => {
  state.type = null;
  state.playlistId = null;
};

export const usePlaylistModalState = () => useSnapshot(state);
