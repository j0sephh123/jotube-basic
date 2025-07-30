import { useMutation } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

export default function useDeleteChannel() {
  return useMutation({
    mutationFn: (id: number) =>
      nestFetcher({
        method: "DELETE",
        url: "/channel/" + id,
      }),
  });
}
