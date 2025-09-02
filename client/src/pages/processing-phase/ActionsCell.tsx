import { OpenDirectoryButton } from "@shared/ui";

export function ActionsCell({
  ytChannelId,
  ytVideoId,
}: {
  ytChannelId: string;
  ytVideoId: string;
}) {
  return (
    <td>
      <OpenDirectoryButton ytChannelId={ytChannelId} ytVideoId={ytVideoId} />
    </td>
  );
}
