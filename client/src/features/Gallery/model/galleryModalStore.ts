import { proxy, useSnapshot } from "valtio";

type State = {
  isVisible: boolean;
  collectionItemId: string;
  collectionIds: number[];
};

const state = proxy<State>({
  isVisible: false,
  collectionItemId: "",
  collectionIds: [],
});

export const setGalleryModal = (props: {
  collectionItemId: string;
  collectionIds: readonly number[];
}) => {
  state.isVisible = true;
  state.collectionItemId = props.collectionItemId;
  state.collectionIds = [...props.collectionIds];
};

export const closeGalleryModal = () => {
  state.isVisible = false;
  state.collectionItemId = "";
  state.collectionIds = [];
};

export const useGalleryModalState = () => useSnapshot(state);
