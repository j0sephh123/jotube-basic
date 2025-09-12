import { useUpdateTv, useTvModalState } from "@features/Tv";

export function useSubmit({ title }: { title: string }) {
  const { type, tvId } = useTvModalState();
  const { mutate: updateTvMutation } = useUpdateTv();

  return async () => {
    if (type === "update" && tvId) {
      await updateTvMutation({
        variables: {
          id: Number(tvId),
          updateTvInput: { title },
        },
      });
    }
  };
}
