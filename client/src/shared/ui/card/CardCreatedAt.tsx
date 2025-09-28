import { timeAgo } from "@shared/utils";

type CardCreatedAtProps = {
  createdAt: string;
};

export default function CardCreatedAt({ createdAt }: CardCreatedAtProps) {
  return (
    <div
      data-testid="CardCreatedAt"
      className="flex items-center justify-between gap-1"
    >
      <span data-testid="CardCreatedAt-time" className="text-gray-400">
        {timeAgo(createdAt)}
      </span>
    </div>
  );
}
