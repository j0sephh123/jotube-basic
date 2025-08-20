import VideoIdInput from "./VideoIdInput";
import SubmitButton from "./SubmitButton";
import Wrapper from "./Wrapper";
import useSubmitMutation from "../hooks/useSubmitMutation";
import FormWrapper from "./FormWrapper";
import ScreenshotItem from "./ScreenshotItem";
import ArrowButton from "./ArrowButton";
import Header from "./Header";
import { getPublicImgUrl } from "@/shared/utils/image";
import { useNavigatorState } from "../hooks/reducer/useNavigatorState";
import ScreenshotControlWrapper from "./ScreenshotControlWrapper";

export default function ImageNavigatorPage() {
  const {
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentSecondIndex,
    setYtVideoId,
    setResultAndPosition,
    incrementSecond,
    decrementSecond,
  } = useNavigatorState();
  const submitMutation = useSubmitMutation();

  const hasMorePreviousSeconds = currentSecondIndex > 0;
  const hasMoreNextSeconds =
    currentSecondIndex < (result?.screenshots.length ?? 0) - 1;

  const handleSubmit = () => {
    submitMutation
      .mutateAsync({
        type: "video",
        ytVideoId: ytVideoId,
      })
      .then((result) => {
        setResultAndPosition(
          result,
          result.metadata.ytChannelId,
          result.metadata.ytVideoId,
          0
        );
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };

  const handlePrevious = () => {
    if (!hasMorePreviousSeconds) {
      return;
    }
    decrementSecond();
  };

  const handleNext = () => {
    if (!hasMoreNextSeconds) {
      return;
    }
    incrementSecond();
  };

  console.log({
    ytVideoId,
    result,
    currentChannelId,
    currentVideoId,
    currentSecondIndex,
  });

  return (
    <Wrapper>
      <FormWrapper>
        <VideoIdInput value={ytVideoId} onChange={setYtVideoId} />
        <SubmitButton onClick={handleSubmit} />
      </FormWrapper>

      {result &&
        result.screenshots.length > 0 &&
        currentChannelId &&
        currentVideoId && (
          <ScreenshotControlWrapper>
            <Header
              channelTitle={result.metadata.channelTitle}
              videoTitle={result.metadata.videoTitle}
              second={result.screenshots[currentSecondIndex]!}
              index={currentSecondIndex}
              total={result.screenshots.length}
            />
            <div className="relative">
              <ScreenshotItem
                src={getPublicImgUrl(
                  currentChannelId,
                  currentVideoId,
                  result.screenshots[currentSecondIndex]!,
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
                disabled={currentSecondIndex === result.screenshots.length - 1}
              />
            </div>
          </ScreenshotControlWrapper>
        )}
    </Wrapper>
  );
}
