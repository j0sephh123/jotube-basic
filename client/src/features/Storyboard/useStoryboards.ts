import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";

export type StoryboardData = {
  id: number;
  fragments: number;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type StoryboardArtifact = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  channelId: number;
  nextPageToken: string | null;
  duration: number | null;
  artifact: string;
  storyboard: StoryboardData;
};

export default function useStoryboards() {
  const ytChannelId = useTypedChannelYtId();

  return useQuery({
    queryKey: ["storyboards", ytChannelId],
    queryFn: () =>
      nestFetcher<StoryboardArtifact[]>({
        url: `/uploads-video/storyboards/${ytChannelId}`,
        method: "GET",
      }),
  });
}
