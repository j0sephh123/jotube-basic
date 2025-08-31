export function LabelWrapper({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="form-control">
      <span className="label-text mb-2 text-base">{label}</span>
      {children}
    </label>
  );
}
