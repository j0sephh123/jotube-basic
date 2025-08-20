import { ImageNavigatorResponse } from "../../types";

export interface ImageNavigatorState {
  ytVideoId: string;
  result: ImageNavigatorResponse | null;
  currentChannelId: string | null;
  currentVideoId: string | null;
  currentChannelIndex: number;
  currentVideoIndex: number;
  currentSecondIndex: number;
  seenChannels: string[];
}

export type ImageNavigatorAction =
  | { type: "SET_VIDEO_ID"; payload: string }
  | { type: "SET_RESULT"; payload: ImageNavigatorResponse | null }
  | {
      type: "SET_CURRENT_POSITION";
      payload: { channelId: string; videoId: string; secondIndex: number };
    }
  | {
      type: "SET_RESULT_AND_POSITION";
      payload: {
        result: ImageNavigatorResponse;
        channelId: string;
        videoId: string;
        channelIndex: number;
        videoIndex: number;
        secondIndex: number;
      };
    }
  | { type: "RESET" }
  | { type: "INCREMENT_SECOND" }
  | { type: "DECREMENT_SECOND" }
  | { type: "INCREMENT_VIDEO" }
  | { type: "DECREMENT_VIDEO" }
  | { type: "ADD_SEEN_CHANNEL"; payload: string }
  | { type: "CLEAR_SEEN_CHANNELS" };

export const initialState: ImageNavigatorState = {
  ytVideoId: "",
  result: null,
  currentChannelId: null,
  currentVideoId: null,
  currentChannelIndex: 0,
  currentVideoIndex: 0,
  currentSecondIndex: 0,
  seenChannels: [],
};

export function imageNavigatorReducer(
  state: ImageNavigatorState,
  action: ImageNavigatorAction
): ImageNavigatorState {
  switch (action.type) {
    case "SET_VIDEO_ID":
      return { ...state, ytVideoId: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_CURRENT_POSITION":
      return {
        ...state,
        currentChannelId: action.payload.channelId,
        currentVideoId: action.payload.videoId,
        currentSecondIndex: action.payload.secondIndex,
      };
    case "SET_RESULT_AND_POSITION":
      return {
        ...state,
        result: action.payload.result,
        currentChannelId: action.payload.channelId,
        currentVideoId: action.payload.videoId,
        currentChannelIndex: action.payload.channelIndex,
        currentVideoIndex: action.payload.videoIndex,
        currentSecondIndex: action.payload.secondIndex,
      };
    case "RESET":
      return initialState;
    case "INCREMENT_SECOND":
      return { ...state, currentSecondIndex: state.currentSecondIndex + 1 };
    case "DECREMENT_SECOND":
      return { ...state, currentSecondIndex: state.currentSecondIndex - 1 };
    case "INCREMENT_VIDEO":
      return {
        ...state,
        currentVideoIndex: state.currentVideoIndex + 1,
        currentSecondIndex: 0,
      };
    case "DECREMENT_VIDEO":
      return {
        ...state,
        currentVideoIndex: Math.max(0, state.currentVideoIndex - 1),
        currentSecondIndex: 0,
      };
    case "ADD_SEEN_CHANNEL":
      return {
        ...state,
        seenChannels: [...state.seenChannels, action.payload],
      };
    case "CLEAR_SEEN_CHANNELS":
      return { ...state, seenChannels: [] };
    default:
      return state;
  }
}
