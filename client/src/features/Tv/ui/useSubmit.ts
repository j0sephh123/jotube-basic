import { useCreateTv, useUpdateTv, useTvModalState } from "@features/Tv";

export function useSubmit({
  identifier,
  title,
}: {
  identifier: string;
  title: string;
}) {
  const { type, tvId } = useTvModalState();
  const { mutate: createTvMutation } = useCreateTv();
  const { mutate: updateTvMutation } = useUpdateTv();

  return async () => {
    if (type === "create") {
      await createTvMutation({
        variables: { createTvInput: { identifier, title } },
      });
    } else if (type === "update" && tvId) {
      console.log("Updating TV:", { id: tvId, identifier, title });
      await updateTvMutation({
        variables: {
          id: Number(tvId),
          updateTvInput: { identifier, title },
        },
      });
    }
  };
}
