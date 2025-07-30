import DirectionForm from "@/features/Channel/NewChannel/components/DirectionForm";
import SelectForm from "@/features/Channel/NewChannel/components/SelectForm";

export default function Filters() {
  return (
    <div className="mb-4 join gap-4">
      <SelectForm />
      <DirectionForm />
    </div>
  );
}
