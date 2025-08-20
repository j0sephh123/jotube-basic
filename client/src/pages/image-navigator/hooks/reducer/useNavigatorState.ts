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
    secondIndex: number
  ) =>
    dispatch({
      type: "SET_RESULT_AND_POSITION",
      payload: { result, channelId, videoId, secondIndex },
    });

  const reset = () => dispatch({ type: "RESET" });

  const incrementSecond = () => dispatch({ type: "INCREMENT_SECOND" });
  const decrementSecond = () => dispatch({ type: "DECREMENT_SECOND" });

  const {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentSecondIndex,
  } = state;

  return {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentSecondIndex,
    setYtVideoId,
    setResult,
    setCurrentPosition,
    setResultAndPosition,
    reset,
    incrementSecond,
    decrementSecond,
  };
}
