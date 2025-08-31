import { type PropsWithChildren } from "react";

export function LabelWrapper({
  children,
  label,
}: PropsWithChildren<{ label: string }>) {
  return (
    <label className="form-control">
      <span className="label-text mb-2 text-base">{label}</span>
      {children}
    </label>
  );
}
