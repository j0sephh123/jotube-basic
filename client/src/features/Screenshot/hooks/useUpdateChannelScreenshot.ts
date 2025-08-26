import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

export const useUpdateChannelScreenshot = () =>
  useMutation({
    mutationFn: ({ id }: { id: number }) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "PUT",
      }),
  });
