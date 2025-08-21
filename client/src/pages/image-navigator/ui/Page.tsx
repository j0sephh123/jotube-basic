import VideoIdInput from "./primitive/VideoIdInput";
import Wrapper from "./primitive/Wrapper";
import useSubmitMutation from "../hooks/useSubmitMutation";
import FormWrapper from "./primitive/FormWrapper";
import ScreenshotItem from "./primitive/ScreenshotItem";
import ArrowButton from "./primitive/ArrowButton";
import Header from "./primitive/Header";
import { getPublicImgUrl } from "@/shared/utils/image";
import { useNavigatorState } from "../hooks/reducer/useNavigatorState";
import ScreenshotControlWrapper from "./primitive/ScreenshotControlWrapper";
import Button from "@/shared/ui/button";

export default function ImageNavigatorPage() {
  const {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentChannelIndex,
    currentVideoIndex,
    currentSecondIndex,
    seenChannels,
    setYtVideoId,
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

  const handleSubmit = () => {
    clearSeenChannels();
    submitMutation
      .mutateAsync({
        type: "video",
        ytVideoId: ytVideoId,
      })
      .then((result) => {
        if (
          result &&
          result.channels.length > 0 &&
          result.channels[0] &&
          result.channels[0].videos.length > 0
        ) {
          let targetChannelIndex = 0;
          let targetVideoIndex = 0;
          let targetChannel = result.channels[0];
          let targetVideo = targetChannel.videos[0];

          for (let i = 0; i < result.channels.length; i++) {
            const channel = result.channels[i];
            if (channel) {
              const videoIndex = channel.videos.findIndex(
                (v) => v.ytVideoId === ytVideoId
              );
              if (videoIndex !== -1) {
                targetChannelIndex = i;
                targetVideoIndex = videoIndex;
                targetChannel = channel;
                targetVideo = channel.videos[videoIndex];
                break;
              }
            }
          }

          if (targetChannel && targetVideo) {
            addSeenChannel(targetChannel.ytChannelId);
            setResultAndPosition(
              result,
              targetChannel.ytChannelId,
              targetVideo.ytVideoId,
              targetChannelIndex,
              targetVideoIndex,
              0
            );
          }
        }
      });
  };

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
          .then((newResult) => {
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
      <FormWrapper>
        <VideoIdInput value={ytVideoId} onChange={setYtVideoId} />
        <Button onClick={handleSubmit}>Fetch Screenshots</Button>
      </FormWrapper>

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
