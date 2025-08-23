import { nestFetcher } from "@shared/api";
import { useMutation } from "@tanstack/react-query";
import type { ImageNavigatorRequest, ImageNavigatorResponse } from "../types";

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
