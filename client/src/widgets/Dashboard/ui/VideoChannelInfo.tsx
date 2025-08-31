import { makeYtChannelId } from "@shared/types";
import { CustomLink } from "@shared/ui";

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
      <CustomLink
        to={`/channels/${makeYtChannelId(channelYtId)}/saved`}
        className="hover:text-blue-400 hover:underline transition-colors truncate block"
      >
        {channelTitle}
      </CustomLink>
    </div>
  );
}
