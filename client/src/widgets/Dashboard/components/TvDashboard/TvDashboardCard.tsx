import { OpenDirectoryButton } from "@shared/ui";
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
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-600">{identifier}</p>
        <OpenDirectoryButton collection={identifier} />
        <div className="card-actions justify-end">
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
        </div>
      </div>
    </div>
  );
}
