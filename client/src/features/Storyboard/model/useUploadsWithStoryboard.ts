import { useQuery } from "@apollo/client";
import { STORYBOARDS } from "@/features/Storyboard/api/storyboard.gql";
import { useTypedChannelYtId } from "@/features/Dashboard/lib/useDashboardParams";

export type StoryboardData = {
  id: number;
  uploadsVideoId: number;
  fragments: number;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type UploadWithStoryboard = {
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

export function useUploadsWithStoryboard() {
  const ytChannelId = useTypedChannelYtId();

  const { data, loading, error, refetch } = useQuery<{
    storyboards: UploadWithStoryboard[];
  }>(STORYBOARDS, {
    variables: { ytChannelId },
    skip: !ytChannelId,
  });

  return {
    data: data?.storyboards,
    isLoading: loading,
    error,
    refetch,
  };
}
