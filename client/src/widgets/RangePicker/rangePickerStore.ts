import { proxy, useSnapshot } from "valtio";

export type Identifier = string;

type State = Record<
  Identifier,
  {
    isOpen: boolean;
    draftMin: string;
    draftMax: string;
  }
>;

const state = proxy<State>({});

export const openRangePicker = (identifier: Identifier) => {
  if (!state[identifier]) {
    state[identifier] = {
      isOpen: false,
      draftMin: "",
      draftMax: "",
    };
  }
  state[identifier].isOpen = true;
};

export const closeRangePicker = (identifier: Identifier) => {
  if (!state[identifier]) {
    state[identifier] = {
      isOpen: false,
      draftMin: "",
      draftMax: "",
    };
  }
  state[identifier].isOpen = false;
};

export const setDraftMin = (identifier: Identifier, value: string) => {
  if (!state[identifier]) {
    state[identifier] = {
      isOpen: false,
      draftMin: "",
      draftMax: "",
    };
  }
  state[identifier].draftMin = value;
};

export const setDraftMax = (identifier: Identifier, value: string) => {
  if (!state[identifier]) {
    state[identifier] = {
      isOpen: false,
      draftMin: "",
      draftMax: "",
    };
  }
  state[identifier].draftMax = value;
};

export const useRangePickerState = (identifier: Identifier) => {
  if (!state[identifier]) {
    state[identifier] = {
      isOpen: false,
      draftMin: "",
      draftMax: "",
    };
  }
  return useSnapshot(state[identifier]);
};
