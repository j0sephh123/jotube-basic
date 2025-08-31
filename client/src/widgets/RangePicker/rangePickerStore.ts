import { proxy, useSnapshot } from "valtio";

type State = {
  isOpen: boolean;
};

const state = proxy<State>({
  isOpen: false,
});

export const openRangePicker = () => {
  state.isOpen = true;
};

export const closeRangePicker = () => {
  state.isOpen = false;
};

export const useRangePickerState = () => useSnapshot(state);
