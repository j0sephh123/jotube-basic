import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/shared/components/Toast";
import { Link } from "react-router-dom";
import nestFetcher from "@/shared/api/nestFetcher";
import { routes } from "@/shared/utils/routes";

export default function useChannelCreate() {
  const [isCreating, setIsCreating] = useState(false);
  const { show } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<
    { success: boolean; ytChannelId?: string },
    unknown,
    { ytVideoId: string }
  >({
    mutationFn: (body) =>
      nestFetcher({
        url: "/channel",
        method: "POST",
        body,
      }),
    onSuccess(data) {
      if (data.success) {
        setIsCreating(false);
        show("Channel created successfully!", {
          type: "success",
          duration: 3000,
        });
        queryClient.invalidateQueries({ queryKey: ["newChannels"] });
      } else {
        show(
          <div className="flex flex-col gap-1">
            <Link
              to={routes.channel(data.ytChannelId!)}
              className="text-blue-700 hover:text-blue-900 hover:underline font-medium"
            >
              View existing channel
            </Link>
          </div>,
          { type: "error", duration: 5000 }
        );
      }
    },
  });

  return {
    mutateAsync,
    isCreating,
    setIsCreating,
  };
}
