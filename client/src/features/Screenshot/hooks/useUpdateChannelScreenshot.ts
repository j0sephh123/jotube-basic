import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

export const useUpdateChannelScreenshot = () =>
  useMutation({
    mutationFn: ({ id, isFav }: { id: number; isFav: boolean }) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "PUT",
        body: { isFav },
      }),
  });
