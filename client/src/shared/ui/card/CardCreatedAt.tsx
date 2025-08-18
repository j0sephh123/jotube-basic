import { timeAgo } from "@shared/utils/date";

type CardCreatedAtProps = {
  createdAt: string;
};

export default function CardCreatedAt({ createdAt }: CardCreatedAtProps) {
  return (
    <div className="flex items-center justify-between gap-1">
      <span className="text-gray-400">{timeAgo(createdAt)}</span>
    </div>
  );
}
