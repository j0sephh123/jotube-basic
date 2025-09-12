import { type EpisodeResponse } from "@features/Episode";
import { type To } from "@shared/types";
import { Card, CustomLink } from "@shared/ui";

// use EpisodeResponse here

type Props = EpisodeResponse & {
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
};

export function EpisodeDashboardCard({
  id,
  identifier,
  title,
  createdAt,
  tvId,
  tvTitle,
  handleEdit,
  handleDelete,
}: Props) {
  const typedId = +id;

  const cardMenu = (
    <Card.Menu
      id={typedId}
      ytId={identifier}
      moreItems={
        <>
          {handleEdit && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleEdit(typedId)}
            >
              Edit
            </button>
          )}
          {handleDelete && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleDelete(typedId)}
            >
              Delete
            </button>
          )}
        </>
      }
    />
  );

  const cardCreatedAt = <Card.CreatedAt createdAt={createdAt} />;

  return (
    <Card
      id={typedId}
      title={title}
      cardMenuSlot={cardMenu}
      to={`/tv/${tvId}/episode/${id}` as To}
      titleRightSlot={cardCreatedAt}
      secondRow={
        <CustomLink to={`/tv/${tvId}` as To}>
          {tvTitle}
        </CustomLink>
      }
    />
  );
}
