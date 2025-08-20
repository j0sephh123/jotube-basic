import nestFetcher from "@/shared/api/rest/nestFetcher";
import { useMutation } from "@tanstack/react-query";
import { ImageNavigatorRequest, ImageNavigatorResponse } from "../types";

export default function useSubmitMutation() {
  return useMutation<ImageNavigatorResponse, Error, ImageNavigatorRequest>({
    mutationFn: (body) =>
      nestFetcher({
        method: "POST",
        url: "/image-navigator",
        body,
      }),
  });
}
