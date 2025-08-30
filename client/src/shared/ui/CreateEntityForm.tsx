import { type ReactNode } from "react";

type Props = {
  actions: React.ReactNode;
  value: string;
  inputRef: React.RefObject<HTMLInputElement>;
  handleInputChange: (value: string) => void;
  description?: ReactNode;
  placeholder: string;
  title: ReactNode;
  label: ReactNode;
};

export default function CreateEntityForm({
  actions,
  value,
  inputRef,
  handleInputChange,
  description,
  placeholder,
  title,
  label,
}: Props) {
  return (
    <div className="bg-transparent p-4 w-[90%] mx-auto min-h-[400px] flex flex-col justify-center">
      {title}
      <div className="form-control w-full mb-4">
        {label}
        <div className="relative">
          <input
            type="text"
            ref={inputRef}
            className="input input-bordered w-full bg-base-100 focus:ring-2 h-12 text-lg focus:ring-primary"
            onChange={(e) => handleInputChange(e.target.value.trim())}
            value={value}
            placeholder={placeholder}
          />
        </div>
        {description}
      </div>
      {actions}
    </div>
  );
}
