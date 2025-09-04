import { proxy, useSnapshot } from "valtio";

type State = {
  isGalleryModalVisible: boolean;
  ytVideoId: string;
  channelIds: number[];
};

const state = proxy<State>({
  isGalleryModalVisible: false,
  ytVideoId: "",
  channelIds: [],
});

export const setGalleryModal = (props: {
  ytVideoId: string;
  channelIds: readonly number[];
}) => {
  state.isGalleryModalVisible = true;
  state.ytVideoId = props.ytVideoId;
  state.channelIds = [...props.channelIds];
};

export const closeGalleryModal = () => {
  state.isGalleryModalVisible = false;
  state.ytVideoId = "";
  state.channelIds = [];
};

export const useGalleryModalState = () => useSnapshot(state);
