import { useReducer } from "react";
import { imageNavigatorReducer, initialState } from "./reducer";
import { ImageNavigatorResponse } from "../../types";

export function useNavigatorState() {
  const [state, dispatch] = useReducer(imageNavigatorReducer, initialState);

  const setYtVideoId = (videoId: string) =>
    dispatch({ type: "SET_VIDEO_ID", payload: videoId });

  const setResult = (result: ImageNavigatorResponse | null) =>
    dispatch({ type: "SET_RESULT", payload: result });

  const setCurrentPosition = (
    channelId: string,
    videoId: string,
    secondIndex: number
  ) =>
    dispatch({
      type: "SET_CURRENT_POSITION",
      payload: { channelId, videoId, secondIndex },
    });

  const setResultAndPosition = (
    result: ImageNavigatorResponse,
    channelId: string,
    videoId: string,
    channelIndex: number,
    videoIndex: number,
    secondIndex: number
  ) =>
    dispatch({
      type: "SET_RESULT_AND_POSITION",
      payload: {
        result,
        channelId,
        videoId,
        channelIndex,
        videoIndex,
        secondIndex,
      },
    });

  const reset = () => dispatch({ type: "RESET" });

  const incrementSecond = () => dispatch({ type: "INCREMENT_SECOND" });
  const decrementSecond = () => dispatch({ type: "DECREMENT_SECOND" });
  const incrementVideo = () => dispatch({ type: "INCREMENT_VIDEO" });
  const decrementVideo = () => dispatch({ type: "DECREMENT_VIDEO" });
  const addSeenChannel = (channelId: string) =>
    dispatch({ type: "ADD_SEEN_CHANNEL", payload: channelId });
  const clearSeenChannels = () => dispatch({ type: "CLEAR_SEEN_CHANNELS" });

  const {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentChannelIndex,
    currentVideoIndex,
    currentSecondIndex,
    seenChannels,
  } = state;

  return {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentChannelIndex,
    currentVideoIndex,
    currentSecondIndex,
    seenChannels,
    setYtVideoId,
    setResult,
    setCurrentPosition,
    setResultAndPosition,
    reset,
    incrementSecond,
    decrementSecond,
    incrementVideo,
    decrementVideo,
    addSeenChannel,
    clearSeenChannels,
  };
}
