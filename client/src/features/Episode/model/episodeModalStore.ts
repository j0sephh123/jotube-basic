import { proxy, useSnapshot } from "valtio";

export type EpisodeModalState = {
  type: "create" | "update" | null;
  episodeId: number | null;
  tvId: number | null;
};

const state = proxy<EpisodeModalState>({
  type: null,
  episodeId: null,
  tvId: null,
});

export const useEpisodeModalState = () => useSnapshot(state);

export const setEpisodeModal = (params: {
  type: "create" | "update" | null;
  episodeId?: number;
  tvId: number;
}) => {
  state.type = params.type;
  state.episodeId = params.episodeId || null;
  state.tvId = params.tvId;
};

export const closeEpisodeModal = () => {
  state.type = null;
  state.episodeId = null;
  state.tvId = null;
};
