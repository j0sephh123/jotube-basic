import { proxy, useSnapshot } from "valtio";
import { match } from "ts-pattern";

export type PlaylistModalState = {
  type:
    | "create"
    | "update"
    | "modifyChannelForPlaylist"
    | "modifyPlaylistForChannel"
    | null;
  playlistId: number | null;
  channelId: number | null;
};

const state = proxy<PlaylistModalState>({
  type: null,
  playlistId: null,
  channelId: null,
});

type CreateProps = { type: "create" };
type UpdateProps = { type: "update"; playlistId: number };
type ModifyChannelForPlaylistProps = {
  type: "modifyChannelForPlaylist";
  playlistId: number;
};
type ModifyPlaylistForChannelProps = {
  type: "modifyPlaylistForChannel";
  channelId: number;
  playlistId: number;
};

type SetPlaylistModalProps =
  | CreateProps
  | UpdateProps
  | ModifyChannelForPlaylistProps
  | ModifyPlaylistForChannelProps;

export const setPlaylistModal = (props: SetPlaylistModalProps) => {
  match(props)
    .with({ type: "create" }, () => {
      state.type = "create";
      state.playlistId = null;
    })
    .with({ type: "update" }, ({ playlistId }) => {
      state.type = "update";
      state.playlistId = playlistId;
    })
    .with({ type: "modifyChannelForPlaylist" }, ({ playlistId }) => {
      state.type = "modifyChannelForPlaylist";
      state.playlistId = playlistId;
    })
    .with({ type: "modifyPlaylistForChannel" }, ({ channelId, playlistId }) => {
      state.type = "modifyPlaylistForChannel";
      state.playlistId = playlistId;
      state.channelId = channelId;
    })
    .exhaustive();
};

export const closePlaylistModal = () => {
  state.type = null;
  state.playlistId = null;
};

export const usePlaylistModalState = () => useSnapshot(state);
