import { useImageNavigator } from "../context";

export function useNavigatorState() {
  const {
    state,
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
  } = useImageNavigator();

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
