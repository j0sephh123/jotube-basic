import React from "react";

type DaisyUIColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ControlledSelectProps<T> = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "onChange" | "size" | "multiple"
> & {
  options: readonly T[];
  value: T | null;
  onChange: (
    value: T | null,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  getOptionValue: (option: T) => number;
  getOptionLabel: (option: T) => React.ReactNode;
  isOptionDisabled?: (option: T) => boolean;
  placeholder?: string;
  allowClear?: boolean;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  uiSize?: "xs" | "sm" | "md" | "lg";
  color?: DaisyUIColor;
  bordered?: boolean;
  wrapperClassName?: string;
  selectClassName?: string;
};

export function Select<T>(props: ControlledSelectProps<T>) {
  const {
    options,
    value,
    onChange,
    getOptionValue,
    getOptionLabel,
    isOptionDisabled,
    placeholder,
    allowClear,
    label,
    hint,
    error,
    uiSize = "md",
    color,
    bordered = true,
    wrapperClassName,
    selectClassName,
    id,
    disabled,
    ...rest
  } = props;

  const selectedId = value == null ? "" : getOptionValue(value);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id === "") {
      onChange(null, e);
      return;
    }
    const next = options.find((o) => getOptionValue(o) === Number(id)) ?? null;
    onChange(next, e);
  };

  const sizeClass = uiSize ? `select-${uiSize}` : "";
  const colorClass = color ? `select-${color}` : "";
  const borderedClass = bordered ? "select-bordered" : "";
  const baseClass =
    `select ${borderedClass} ${sizeClass} ${colorClass} w-full ${
      selectClassName ?? ""
    }`.trim();

  return (
    <div className={`form-control w-full ${wrapperClassName ?? ""}`}>
      {(label || error) && (
        <label className="label">
          <span className="label-text">{label}</span>
          {error ? (
            <span className="label-text-alt text-error">{error}</span>
          ) : null}
        </label>
      )}
      <select
        id={id}
        className={baseClass}
        value={selectedId}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      >
        {placeholder !== undefined && (
          <option value="" disabled={allowClear ? false : true}>
            {placeholder}
          </option>
        )}
        {options.map((o) => {
          const ov = getOptionValue(o);
          const disabledOpt = isOptionDisabled ? isOptionDisabled(o) : false;
          return (
            <option key={ov} value={ov} disabled={disabledOpt}>
              {getOptionLabel(o)}
            </option>
          );
        })}
      </select>
      {hint && (
        <label className="label">
          <span className="label-text-alt">{hint}</span>
        </label>
      )}
    </div>
  );
}
