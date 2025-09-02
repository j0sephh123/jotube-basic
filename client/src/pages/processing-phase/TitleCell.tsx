import { CopyValue, CustomLink } from "@shared/ui";
import { makeYtChannelId, makeYtVideoId } from "@shared/types";

export function TitleCell({
  title,
  channelTitle,
  channelYtId,
  ytId,
  videoId,
}: {
  title: string;
  channelTitle: string;
  channelYtId: string;
  ytId: string;
  videoId: string;
}) {
  return (
    <td>
      <div className="flex flex-col">
        <CustomLink
          to={`/channels/${makeYtChannelId(channelYtId)}/videos/${makeYtVideoId(
            ytId
          )}`}
        >
          <span
            className="font-medium truncate block hover:text-blue-400 hover:underline transition-colors"
            style={{ maxWidth: "160px", width: "160px" }}
            title={title}
          >
            {title}
          </span>
        </CustomLink>
        <div className="flex">
          <CopyValue value={videoId} type="id" />
          <CopyValue value={ytId} type="youtube" />
        </div>
        <CustomLink
          to={`/channels/${makeYtChannelId(channelYtId)}/saved`}
          className="text-xs opacity-70 hover:text-blue-400 hover:underline transition-colors truncate block"
        >
          {channelTitle}
        </CustomLink>
      </div>
    </td>
  );
}
