import { proxy, useSnapshot } from "valtio";

type State = {
  message: string | null;
};

const state = proxy<State>({
  message: "",
});

export const setMessage = (message: string) => {
  state.message = message;
};

export const closeMessage = () => {
  state.message = null;
};

export const useMessageState = () => useSnapshot(state);
