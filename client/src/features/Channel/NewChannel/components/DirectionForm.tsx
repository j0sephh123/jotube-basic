import InputWrapper from "@/shared/components/InputWrapper";
import useFilters from "@/features/Channel/NewChannel/hooks/useChannelsWithoutUploadsFilters";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function DirectionForm() {
  const { direction, updateUrlParams } = useFilters();

  const toggleDirection = () => {
    const newDirection = direction === "asc" ? "desc" : "asc";
    updateUrlParams({ direction: newDirection });
  };

  return (
    <InputWrapper label="Direction">
      <button className="btn" onClick={toggleDirection}>
        {direction === "asc" ? (
          <ArrowDown className="w-4 h-4" />
        ) : (
          <ArrowUp className="w-4 h-4" />
        )}
      </button>
    </InputWrapper>
  );
}
