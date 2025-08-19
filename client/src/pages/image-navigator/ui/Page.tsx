import { useState } from "react";
import VideoIdInput from "./VideoIdInput";
import SubmitButton from "./SubmitButton";
import Wrapper from "./Wrapper";
import useSubmit from "../hooks/useSubmit";
import FormWrapper from "./FormWrapper";
import ScreenshotItem from "./ScreenshotItem";
import ArrowButton from "./ArrowButton";
import Header from "./Header";
import { getPublicImgUrl } from "@/shared/utils/image";
import { ImageNavigatorResponse } from "../types";
import ScreenshotControlWrapper from "./ScreenshotControlWrapper";

export default function ImageNavigatorPage() {
  const [ytVideoId, setYtVideoId] = useState("");
  const [result, setResult] = useState<ImageNavigatorResponse | null>(null);
  const submitMutation = useSubmit();

  const handleSubmit = () => {
    console.log("Submit");
    submitMutation
      .mutateAsync({
        type: "video",
        ytVideoId: ytVideoId,
      })
      .then((result) => {
        console.log(result);
        setResult(result);
      });
  };

  const handlePrevious = () => {
    console.log("Previous screenshot");
  };

  const handleNext = () => {
    console.log("Next screenshot");
  };

  return (
    <Wrapper>
      <FormWrapper>
        <VideoIdInput value={ytVideoId} onChange={setYtVideoId} />
        <SubmitButton onClick={handleSubmit} />
      </FormWrapper>

      {result && result.screenshots.length > 0 && (
        <ScreenshotControlWrapper>
          <Header
            channelTitle={result.metadata.channelTitle}
            videoTitle={result.metadata.videoTitle}
            second={result.screenshots[0]!}
            total={result.screenshots.length}
          />
          <div className="relative">
            <ScreenshotItem
              src={getPublicImgUrl(
                result.metadata.ytChannelId,
                result.metadata.ytVideoId,
                result.screenshots[0]!,
                "saved_screenshots"
              )}
            />
            <ArrowButton direction="left" onClick={handlePrevious} />
            <ArrowButton direction="right" onClick={handleNext} />
          </div>
        </ScreenshotControlWrapper>
      )}
    </Wrapper>
  );
}
