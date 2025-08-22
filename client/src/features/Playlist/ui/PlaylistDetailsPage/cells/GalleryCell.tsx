import { ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/routes";
import type { PlaylistChannelWithCountsResponse } from "@/shared/api/generated/graphql";
import TableCol from "@/widgets/PlaylistDetails/ui/TableCol";

type GalleryCellProps = {
  channel: PlaylistChannelWithCountsResponse;
};

export default function GalleryCell({ channel }: GalleryCellProps) {
  const navigate = useNavigate();

  return (
    <TableCol className="text-center">
      <button
        onClick={() => navigate(routes.gallery(channel.ytId))}
        className="flex items-center gap-2 mx-auto hover:text-primary transition-colors"
        title="View gallery"
      >
        <ImageIcon className="w-4 h-4 text-base-content/60" />
        <span className="text-sm">Gallery</span>
      </button>
    </TableCol>
  );
}
