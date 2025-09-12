import { type To } from "@shared/types";
import { Card } from "@shared/ui";

type Props = {
  title: string;
  identifier: string;
  id: number;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  createdAt: string;
};

export function TvDashboardCard({
  title,
  identifier,
  id,
  handleEdit,
  handleDelete,
  createdAt,
}: Props) {
  const cardMenu = (
    <Card.Menu
      id={id}
      ytId={identifier}
      moreItems={
        <>
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
    />
  );

  const cardCreatedAt = <Card.CreatedAt createdAt={createdAt} />;

  return (
    <Card
      id={id}
      title={title}
      cardMenuSlot={cardMenu}
      to={`/tv/${id}` as To}
      titleRightSlot={cardCreatedAt}
    />
  );
}
