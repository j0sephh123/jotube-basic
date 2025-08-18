import nestFetcher from "@/shared/api/rest/nestFetcher";
import { useMutation } from "@tanstack/react-query";

export const useUpdateScreenshot = () => {
  return useMutation({
    mutationFn: ({ id, isFav }: { id: number; isFav: boolean }) =>
      nestFetcher({
        url: `/screenshots-api/screenshots/${id}`,
        method: "PUT",
        body: { isFav },
      }),
  });
};
