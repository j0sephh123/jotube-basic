type GenericSelectOption<T = string> = {
  value: T;
  label: string;
};

type GenericSelectProps<T = string> = {
  value: T;
  onChange: (value: T) => void;
  options: GenericSelectOption<T>[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function GenericSelect<T = string>({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  disabled = false,
}: GenericSelectProps<T>) {
  const baseClasses =
    "text-xs bg-gray-800 text-gray-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-gray-500";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <select
      value={String(value)}
      onChange={(e) => {
        const selectedOption = options.find(
          (option) => String(option.value) === e.target.value
        );
        if (selectedOption) {
          onChange(selectedOption.value);
        }
      }}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={String(option.value)} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
