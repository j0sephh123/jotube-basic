import { ImageNavigatorResponse } from "../../types";

export interface ImageNavigatorState {
  ytVideoId: string;
  result: ImageNavigatorResponse | null;
  currentChannelId: string | null;
  currentVideoId: string | null;
  currentSecondIndex: number;
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
        secondIndex: number;
      };
    }
  | { type: "RESET" }
  | { type: "INCREMENT_SECOND" }
  | { type: "DECREMENT_SECOND" };

export const initialState: ImageNavigatorState = {
  ytVideoId: "",
  result: null,
  currentChannelId: null,
  currentVideoId: null,
  currentSecondIndex: 0,
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
        currentSecondIndex: action.payload.secondIndex,
      };
    case "RESET":
      return initialState;
    case "INCREMENT_SECOND":
      return { ...state, currentSecondIndex: state.currentSecondIndex + 1 };
    case "DECREMENT_SECOND":
      return { ...state, currentSecondIndex: state.currentSecondIndex - 1 };
    default:
      return state;
  }
}
