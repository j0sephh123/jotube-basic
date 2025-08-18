import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

type VideoChannelInfoProps = {
  channelTitle: string;
  channelYtId: string;
};

export default function VideoChannelInfo({
  channelTitle,
  channelYtId,
}: VideoChannelInfoProps) {
  return (
    <div className="text-sm text-gray-400">
      <Link
        to={routes.savedChannel(channelYtId)}
        className="hover:text-blue-400 hover:underline transition-colors truncate block"
      >
        {channelTitle}
      </Link>
    </div>
  );
}
