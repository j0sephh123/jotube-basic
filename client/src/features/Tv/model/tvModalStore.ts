import { proxy, useSnapshot } from "valtio";

export type TvModalState = {
  type: "update" | null;
  tvId: number | null;
};

const state = proxy<TvModalState>({
  type: null,
  tvId: null,
});

export const useTvModalState = () => useSnapshot(state);

export const setTvModal = (newState: TvModalState) => {
  state.type = newState.type;
  state.tvId = newState.tvId;
};

export const closeTvModal = () => {
  state.type = null;
  state.tvId = null;
};
