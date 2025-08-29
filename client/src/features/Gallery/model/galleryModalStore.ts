import { proxy, useSnapshot } from "valtio";

type State = {
  isGalleryModalVisible: boolean;
  ytVideoId: string;
  ytChannelIds: string[];
};

const state = proxy<State>({
  isGalleryModalVisible: false,
  ytVideoId: "",
  ytChannelIds: [],
});

export const setGalleryModal = (props: {
  ytVideoId: string;
  ytChannelIds: readonly string[];
}) => {
  state.isGalleryModalVisible = true;
  state.ytVideoId = props.ytVideoId;
  state.ytChannelIds = [...props.ytChannelIds];
};

export const closeGalleryModal = () => {
  state.isGalleryModalVisible = false;
  state.ytVideoId = "";
  state.ytChannelIds = [];
};

export const useGalleryModalState = () => useSnapshot(state);
