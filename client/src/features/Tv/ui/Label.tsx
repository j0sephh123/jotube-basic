import { useTvModalState } from "@features/Tv";

export function Label({ field }: { field: "identifier" | "title" }) {
  const { type } = useTvModalState();

  const getLabelText = () => {
    if (field === "identifier") {
      return type === "create" ? "TV identifier" : "Update TV identifier";
    }
    return type === "create" ? "TV title" : "Update TV title";
  };

  return (
    <label className="label py-1">
      <span className="label-text text-base font-semibold">
        {getLabelText()}
      </span>
      <span className="label-text-alt text-xs opacity-70">
        {field === "identifier" ? "Must be unique" : "TV show title"}
      </span>
    </label>
  );
}
