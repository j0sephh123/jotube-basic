import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

export default function ViewExistingChannel({
  ytChannelId,
  message,
}: {
  ytChannelId: string;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Link
        to={routes.channel(ytChannelId)}
        className="text-blue-700 hover:text-blue-900 hover:underline font-medium"
      >
        {message}
      </Link>
    </div>
  );
}
