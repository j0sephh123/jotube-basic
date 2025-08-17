import { useMutation } from "@tanstack/react-query";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_VIDEOS, SEARCH_CHANNELS } from "@/shared/api/graphql/searchQueries";

type SearchRequest = {
  search: string;
};

type SearchVideoResult = {
  title: string;
  ytId: string;
  src: string;
  channelYtId: string;
  type: string;
};

type SearchChannelResult = {
  title: string;
  ytId: string;
  src: string;
  type: string;
};

export type SearchResult = SearchVideoResult | SearchChannelResult;

export function useQuickSearch() {
  const [searchVideos] = useLazyQuery(SEARCH_VIDEOS);
  const [searchChannels] = useLazyQuery(SEARCH_CHANNELS);

  return useMutation<SearchResult[], unknown, SearchRequest>({
    mutationFn: async (body: SearchRequest) => {
      const [videosResult, channelsResult] = await Promise.all([
        searchVideos({ variables: { searchInput: body } }),
        searchChannels({ variables: { searchInput: body } }),
      ]);

      const videos = videosResult.data?.searchVideos || [];
      const channels = channelsResult.data?.searchChannels || [];

      return [...videos, ...channels];
    },
  });
}
