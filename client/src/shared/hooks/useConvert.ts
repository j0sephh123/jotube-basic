/* eslint-disable boundaries/element-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

type ConverterRequest = {
  type: "youtube" | "id";
  value: string;
  resource: "video" | "channel";
};

type ConverterResponse = {
  id: number;
  title: string;
  ytId: string;
  channelTitle?: string;
};

export function useConvert() {
  return useMutation<ConverterResponse, Error, ConverterRequest>({
    mutationFn: async (body: ConverterRequest) =>
      nestFetcher<ConverterResponse>({
        method: "POST",
        url: "/converter",
        body,
      }),
    onSuccess: (data) => {
      console.log("Converter response:", data);
    },
    onError: (error) => {
      console.error("Converter error:", error);
    },
  });
}

export function useConvertQuery(
  request: ConverterRequest,
  enabled: boolean = true
) {
  return useQuery<ConverterResponse, Error>({
    queryKey: ["convert", request],
    queryFn: async () =>
      nestFetcher<ConverterResponse>({
        method: "POST",
        url: "/converter",
        body: request,
      }),
    enabled,
  });
}
