import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

type SearchRequest = {
  search: string;
};

type SearchVideoResult = {
  title: string;
  ytId: string;
  src: string;
  channel: {
    ytId: string;
  };
  type: "ytVideoId";
};

type SearchChannelResult = {
  title: string;
  ytId: string;
  src: string;
  type: "ytChannelId" | "channelTitle";
};

export type SearchResult = SearchVideoResult | SearchChannelResult;

export function useQuickSearch() {
  return useMutation<SearchResult[], unknown, SearchRequest>({
    mutationFn: (body: SearchRequest) =>
      nestFetcher({
        url: "/search",
        method: "POST",
        body,
      }),
  });
}
