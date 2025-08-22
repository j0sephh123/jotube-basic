import {
  Wrapper,
  ScreenshotItem,
  ArrowButton,
  Header,
  ScreenshotControlWrapper,
} from "./index";
import { useSubmitMutation, useNavigatorState } from "../hooks";
import { getPublicImgUrl } from "@shared/utils";
import { ImageNavigatorProvider } from "../context";
import { useEffect } from "react";
import type { ImageNavigatorResponse } from "../types";

function ImageNavigatorPageContent() {
  const {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentChannelIndex,
    currentVideoIndex,
    currentSecondIndex,
    seenChannels,
    setResultAndPosition,
    incrementSecond,
    decrementSecond,
    addSeenChannel,
    clearSeenChannels,
  } = useNavigatorState();
  const submitMutation = useSubmitMutation();

  const hasMorePreviousSeconds = currentSecondIndex > 0;
  const currentChannel = result?.channels[currentChannelIndex];
  const currentVideo = currentChannel?.videos[currentVideoIndex];
  const hasMoreNextSeconds =
    currentSecondIndex < (currentVideo?.screenshots?.length ?? 0) - 1;

  const totalChannelScreenshots =
    currentChannel?.videos.reduce(
      (total, video) => total + (video.screenshots?.length || 0),
      0
    ) || 0;

  const viewedScreenshots = currentChannel
    ? currentChannel.videos
        .slice(0, currentVideoIndex)
        .reduce((total, video) => total + (video.screenshots?.length || 0), 0) +
      (currentSecondIndex + 1)
    : 0;

  useEffect(() => {
    if (!result) {
      clearSeenChannels();
      submitMutation
        .mutateAsync({
          type: "video",
        })
        .then((result: ImageNavigatorResponse) => {
          if (
            result &&
            result.channels.length > 0 &&
            result.channels[0] &&
            result.channels[0].videos.length > 0
          ) {
            const targetChannel = result.channels[0];
            const targetVideo = targetChannel.videos[0];

            if (targetVideo) {
              addSeenChannel(targetChannel.ytChannelId);
              setResultAndPosition(
                result,
                targetChannel.ytChannelId,
                targetVideo.ytVideoId,
                0,
                0,
                0
              );
            }
          }
        });
    }
  }, [addSeenChannel, clearSeenChannels, result, setResultAndPosition, submitMutation]);

  const handlePrevious = () => {
    if (
      result &&
      currentChannel &&
      currentVideoIndex > 0 &&
      currentSecondIndex === 0
    ) {
      const prevVideo = currentChannel.videos[currentVideoIndex - 1];
      if (prevVideo) {
        setResultAndPosition(
          result,
          currentChannel.ytChannelId,
          prevVideo.ytVideoId,
          currentChannelIndex,
          currentVideoIndex - 1,
          prevVideo.screenshots.length - 1
        );
      }
    } else if (hasMorePreviousSeconds) {
      decrementSecond();
    }
  };

  const handleNext = () => {
    if (hasMoreNextSeconds) {
      incrementSecond();
    } else if (
      result &&
      currentChannel &&
      currentVideoIndex < currentChannel.videos.length - 1
    ) {
      const nextVideo = currentChannel.videos[currentVideoIndex + 1];
      if (nextVideo) {
        setResultAndPosition(
          result,
          currentChannel.ytChannelId,
          nextVideo.ytVideoId,
          currentChannelIndex,
          currentVideoIndex + 1,
          0
        );
      }
    }
  };

  const handleNextChannel = () => {
    if (result && currentChannelId) {
      if (currentChannelIndex < result.channels.length - 1) {
        const nextChannel = result.channels[currentChannelIndex + 1];
        if (nextChannel && nextChannel.videos.length > 0) {
          const nextVideo = nextChannel.videos[0];
          if (nextVideo) {
            setResultAndPosition(
              result,
              nextChannel.ytChannelId,
              nextVideo.ytVideoId,
              currentChannelIndex + 1,
              0,
              0
            );
          }
        }
      } else {
        const currentChannel = result.channels[currentChannelIndex];
        if (currentChannel) {
          addSeenChannel(currentChannel.ytChannelId);
        }

        const skipChannels = [...seenChannels];

        submitMutation
          .mutateAsync({
            type: "video",
            ytVideoId: ytVideoId,
            skipChannels: skipChannels,
          })
          .then((newResult: ImageNavigatorResponse) => {
            if (newResult && newResult.channels.length > 0) {
              const newChannel = newResult.channels[0];
              if (newChannel && newChannel.videos.length > 0) {
                const newVideo = newChannel.videos[0];
                if (newVideo) {
                  const combinedResult = {
                    ...newResult,
                    channels: [...result.channels, newChannel],
                  };
                  const newChannelIndex = result.channels.length;
                  setResultAndPosition(
                    combinedResult,
                    newChannel.ytChannelId,
                    newVideo.ytVideoId,
                    newChannelIndex,
                    0,
                    0
                  );
                }
              }
            }
          });
      }
    }
  };

  const handlePreviousChannel = () => {
    if (result && currentChannelId && currentChannelIndex > 0) {
      const prevChannelIndex = currentChannelIndex - 1;
      const prevChannel = result.channels[prevChannelIndex];
      if (prevChannel && prevChannel.videos.length > 0) {
        const prevVideo = prevChannel.videos[0];
        if (prevVideo) {
          setResultAndPosition(
            result,
            prevChannel.ytChannelId,
            prevVideo.ytVideoId,
            prevChannelIndex,
            0,
            0
          );
        }
      }
    }
  };

  const handleNextVideo = () => {
    if (
      result &&
      currentChannel &&
      currentVideoIndex < currentChannel.videos.length - 1
    ) {
      const nextVideo = currentChannel.videos[currentVideoIndex + 1];
      if (nextVideo) {
        setResultAndPosition(
          result,
          currentChannel.ytChannelId,
          nextVideo.ytVideoId,
          currentChannelIndex,
          currentVideoIndex + 1,
          0
        );
      }
    }
  };

  const handlePreviousVideo = () => {
    if (result && currentChannel && currentVideoIndex > 0) {
      const prevVideo = currentChannel.videos[currentVideoIndex - 1];
      if (prevVideo) {
        setResultAndPosition(
          result,
          currentChannel.ytChannelId,
          prevVideo.ytVideoId,
          currentChannelIndex,
          currentVideoIndex - 1,
          0
        );
      }
    }
  };

  console.log({
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentVideoIndex,
    currentSecondIndex,
  });

  return (
    <Wrapper>
      {result &&
        result.channels.length > 0 &&
        currentChannel &&
        currentChannel.videos.length > 0 &&
        currentVideo &&
        currentVideo.screenshots.length > 0 &&
        currentChannelId &&
        currentVideoId && (
          <ScreenshotControlWrapper>
            <Header
              channelTitle={currentChannel.channelTitle}
              videoTitle={currentVideo.title}
              second={currentVideo.screenshots[currentSecondIndex]!}
              index={currentSecondIndex}
              total={currentVideo.screenshots.length}
              videoIndex={currentVideoIndex}
              totalVideos={currentChannel.videos.length}
              totalChannelScreenshots={totalChannelScreenshots}
              viewedScreenshots={viewedScreenshots}
              channelId={currentChannel.ytChannelId}
            />
            <div className="relative">
              <ScreenshotItem
                src={getPublicImgUrl(
                  currentChannelId,
                  currentVideoId,
                  currentVideo.screenshots[currentSecondIndex]!,
                  "saved_screenshots"
                )}
              />

              <ArrowButton
                direction="left"
                onClick={handlePrevious}
                disabled={currentSecondIndex === 0}
              />
              <ArrowButton
                direction="right"
                onClick={handleNext}
                disabled={
                  currentSecondIndex === currentVideo.screenshots.length - 1 &&
                  currentVideoIndex === currentChannel.videos.length - 1
                }
              />

              <button
                onClick={handlePreviousChannel}
                disabled={!currentChannelId || currentChannelIndex === 0}
                className={`absolute top-4 left-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 shadow-lg ${
                  !currentChannelId || currentChannelIndex === 0
                    ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                    : "bg-base-200/90 hover:bg-base-300 text-base-content"
                }`}
              >
                ← Previous Channel
              </button>
              <button
                onClick={handleNextChannel}
                disabled={!currentChannelId}
                className={`absolute top-4 right-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 shadow-lg ${
                  !currentChannelId
                    ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                    : "bg-base-200/90 hover:bg-base-300 text-base-content"
                }`}
              >
                Next Channel →
              </button>

              <button
                onClick={handlePreviousVideo}
                disabled={currentVideoIndex === 0}
                className={`absolute bottom-4 left-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 shadow-lg ${
                  currentVideoIndex === 0
                    ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                    : "bg-base-200/90 hover:bg-base-300 text-base-content"
                }`}
              >
                ← Previous Video
              </button>
              <button
                onClick={handleNextVideo}
                disabled={
                  currentVideoIndex === (currentChannel?.videos.length ?? 0) - 1
                }
                className={`absolute bottom-4 right-4 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 shadow-lg ${
                  currentVideoIndex === (currentChannel?.videos.length ?? 0) - 1
                    ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                    : "bg-base-200/90 hover:bg-base-300 text-base-content"
                }`}
              >
                Next Video →
              </button>
            </div>
          </ScreenshotControlWrapper>
        )}
    </Wrapper>
  );
}

export default function ImageNavigatorPage() {
  return (
    <ImageNavigatorProvider>
      <ImageNavigatorPageContent />
    </ImageNavigatorProvider>
  );
}
