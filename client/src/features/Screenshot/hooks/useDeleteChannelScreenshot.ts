import { useMutation } from "@tanstack/react-query";
import { nestFetcher } from "@shared/api";
import { useRefetchChannelScreenshots } from "./useFetchChannelScreenshots";

export const useDeleteChannelScreenshot = () => {
  const refetchChannelScreenshots = useRefetchChannelScreenshots();

  return useMutation({
    mutationFn: (id: number) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      refetchChannelScreenshots();
    },
  });
};
