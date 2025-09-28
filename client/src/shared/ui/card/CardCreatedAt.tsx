import { timeAgo } from "@shared/utils";

type CardCreatedAtProps = {
  createdAt: string;
};

export default function CardCreatedAt({ createdAt }: CardCreatedAtProps) {
  return (
    <div
      data-testid="card-created-at"
      className="flex items-center justify-between gap-1"
    >
      <span data-testid="card-created-at-time" className="text-gray-400">
        {timeAgo(createdAt)}
      </span>
    </div>
  );
}
