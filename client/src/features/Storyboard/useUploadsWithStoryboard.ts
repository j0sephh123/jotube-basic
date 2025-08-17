import { useQuery } from "@apollo/client";
import { STORYBOARDS } from "@/api/graphql/queries/queries";
import { useTypedChannelYtId } from "@/shared/hooks/useDashboardParams";

export type StoryboardData = {
  id: number;
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

export default function useUploadsWithStoryboard() {
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
