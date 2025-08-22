/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import React, { createContext, useContext, useReducer } from "react";
import type { ImageNavigatorState } from "../hooks";
import { imageNavigatorReducer, initialState } from "../hooks";
import type { ImageNavigatorResponse } from "../types";

interface ImageNavigatorContextType {
  state: ImageNavigatorState;
  setYtVideoId: (videoId: string) => void;
  setResult: (result: ImageNavigatorResponse | null) => void;
  setCurrentPosition: (
    channelId: string,
    videoId: string,
    secondIndex: number
  ) => void;
  setResultAndPosition: (
    result: ImageNavigatorResponse,
    channelId: string,
    videoId: string,
    channelIndex: number,
    videoIndex: number,
    secondIndex: number
  ) => void;
  reset: () => void;
  incrementSecond: () => void;
  decrementSecond: () => void;
  incrementVideo: () => void;
  decrementVideo: () => void;
  addSeenChannel: (channelId: string) => void;
  clearSeenChannels: () => void;
}

const ImageNavigatorContext = createContext<
  ImageNavigatorContextType | undefined
>(undefined);

interface ImageNavigatorProviderProps {
  children: ReactNode;
}

export function ImageNavigatorProvider({
  children,
}: ImageNavigatorProviderProps) {
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

  const value: ImageNavigatorContextType = {
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
  };

  return (
    <ImageNavigatorContext.Provider value={value}>
      {children}
    </ImageNavigatorContext.Provider>
  );
}

export function useImageNavigator() {
  const context = useContext(ImageNavigatorContext);
  if (context === undefined) {
    throw new Error(
      "useImageNavigator must be used within an ImageNavigatorProvider"
    );
  }
  return context;
}
