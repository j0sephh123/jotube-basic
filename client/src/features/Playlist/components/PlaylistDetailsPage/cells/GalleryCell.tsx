import { Channel } from "../../../types";
import TableCol from "../TableCol";
import { ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

type GalleryCellProps = {
  channel: Channel;
};

export default function GalleryCell({ channel }: GalleryCellProps) {
  const navigate = useNavigate();

  return (
    <TableCol className="text-center w-[80px]">
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
