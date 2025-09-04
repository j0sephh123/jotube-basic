import { useTvModalState } from "@features/Tv";

export function Title() {
  const { type } = useTvModalState();

  return (
    <h2 className="text-xl font-bold text-center flex items-center justify-center gap-2">
      <span>{type === "create" ? "Create TV" : "Update TV"}</span>
    </h2>
  );
}
