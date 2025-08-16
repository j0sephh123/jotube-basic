import { useGetScreenshotsByVideoQuery } from "../../../generated/graphql";

export type VideoScreenshot = {
  __typename?: "VideoScreenshotResponse";
  id: number;
  second: number;
  ytChannelId: string;
  ytVideoId: string;
  isFav?: boolean | null;
  src: string;
};

export function useScreenshotsByVideo(ytVideoId: string | undefined) {
  const { data, loading, error } = useGetScreenshotsByVideoQuery({
    variables: { ytVideoId: ytVideoId || "" },
    skip: !ytVideoId,
  });

  return {
    data: data?.screenshotsByVideo,
    isLoading: loading,
    error,
  };
}
