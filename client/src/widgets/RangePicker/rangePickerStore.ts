import { proxy, useSnapshot } from "valtio";

type State = {
  isOpen: boolean;
  draftMin: string;
  draftMax: string;
};

const state = proxy<State>({
  isOpen: false,
  draftMin: "",
  draftMax: "",
});

export const openRangePicker = () => {
  state.isOpen = true;
};

export const closeRangePicker = () => {
  state.isOpen = false;
};

export const setDraftMin = (value: string) => {
  state.draftMin = value;
};

export const setDraftMax = (value: string) => {
  state.draftMax = value;
};

export const useRangePickerState = () => useSnapshot(state);
