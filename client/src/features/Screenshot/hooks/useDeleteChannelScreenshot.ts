import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";

export const useDeleteChannelScreenshot = () =>
  useMutation({
    mutationFn: (id: number) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "DELETE",
      }),
    onSuccess: () => {},
  });
