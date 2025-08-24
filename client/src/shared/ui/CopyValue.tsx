import { CopyIcon } from "lucide-react";
import { IconYoutube } from "@shared/ui";
import clsx from "clsx";

type Type = "youtube" | "id";

type Props = {
  type: Type;
  value: string;
};

type Val = {
  Icon: React.ElementType;
  label: string;
};

const map: Record<Type, Val> = {
  youtube: {
    Icon: IconYoutube,
    label: "YouTube",
  },
  id: {
    Icon: CopyIcon,
    label: "ID",
  },
};

export default function CopyValue({ type, value }: Props) {
  const { Icon } = map[type];

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="inline-block w-5 h-5">
      <button
        className="p-0 w-full h-full flex items-center justify-center"
        onClick={handleCopy}
      >
        <Icon
          className={clsx(
            `w-4 h-4`,
            type === "youtube" ? "text-red-500" : "text-green-500"
          )}
        />
      </button>
    </div>
  );
}
