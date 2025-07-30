import { useTotalThumbnails } from "@/features/Thumbnail/hooks/useTotalThumbnails";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

export default function ThumbnailsMenu(): JSX.Element {
  const { data } = useTotalThumbnails();

  return (
    <Link to={routes.thumbnails()} className="btn btn-ghost">
      {`Thumbnails (${data || 0})`}
    </Link>
  );
}
