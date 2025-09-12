import { OpenDirectoryButton, Card } from "@shared/ui";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  identifier: string;
  id: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
};

export function TvDashboardCard({
  title,
  identifier,
  id,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <Card
      id={id}
      title={title}
      secondRow={<p className="text-sm text-gray-600">{identifier}</p>}
      actionButtonSlot={<OpenDirectoryButton collection={identifier} />}
      cardMenuSlot={
        <>
          <Link to={`/tv/${id}`} className="btn btn-sm btn-outline">
            View Episodes
          </Link>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleEdit(id)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </>
      }
      src={""}
      ytId={""}
      to={"/playlists"}
    />
  );
}
