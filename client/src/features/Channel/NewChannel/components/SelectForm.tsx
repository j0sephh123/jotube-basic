import InputWrapper from "@/shared/components/InputWrapper";
import useFilters from "@/features/Channel/NewChannel/hooks/useChannelsWithoutUploadsFilters";

type SortField = "createdAt" | "videoCount";

export default function SelectForm() {
  const { sortField, updateUrlParams } = useFilters();

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortField = e.target.value as SortField;
    updateUrlParams({ sortField: newSortField });
  };

  return (
    <InputWrapper label="Sort by">
      <select
        className="select"
        value={sortField}
        onChange={handleSortFieldChange}
      >
        <option value="createdAt">Created At</option>
        <option value="videoCount">Video Count</option>
      </select>
    </InputWrapper>
  );
}
