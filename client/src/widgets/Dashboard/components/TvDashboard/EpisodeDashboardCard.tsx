import { type EpisodeResponse, useAddEpisodeToQueue } from "@features/Episode";
import { type To } from "@shared/types";
import {
  Button,
  Card,
  CustomLink,
  OpenDirectoryButton,
  Tooltip,
} from "@shared/ui";

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
  tvIdentifier,
  handleEdit,
  handleDelete,
}: Props) {
  const typedId = +id;
  const addEpisodeToQueue = useAddEpisodeToQueue();

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

  const TruncatedTvTitle = () => (
    <Tooltip content={tvTitle} position="top" color="primary">
      <CustomLink
        to={`/tv/${tvId}` as To}
        className="truncate block max-w-[180px]"
      >
        {tvTitle}
      </CustomLink>
    </Tooltip>
  );

  const handleDownload = () => {
    addEpisodeToQueue.mutateAsync({ episodeId: typedId }).then(() => {
      console.log("Episode added to queue");
    });
  };

  return (
    <Card
      id={typedId}
      title={title}
      cardMenuSlot={cardMenu}
      to={`/tv/${tvId}/episode/${id}` as To}
      titleRightSlot={
        <>
          {cardCreatedAt}
          <OpenDirectoryButton collection={tvIdentifier} media={identifier} />
        </>
      }
      secondRow={<TruncatedTvTitle />}
      actionButtonSlot={<Button onClick={handleDownload}>Download</Button>}
    />
  );
}
