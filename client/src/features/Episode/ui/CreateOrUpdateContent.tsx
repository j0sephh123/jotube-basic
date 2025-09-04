import { useState, useEffect } from "react";
import {
  useCreateEpisode,
  useUpdateEpisode,
  useGetEpisode,
} from "@features/Episode";
import {
  closeEpisodeModal,
  useEpisodeModalState,
} from "../model/episodeModalStore";
import { Button } from "@shared/ui";

interface CreateOrUpdateContentProps {
  tvId: number;
}

export function CreateOrUpdateContent({ tvId }: CreateOrUpdateContentProps) {
  const { type, episodeId } = useEpisodeModalState();
  const { mutate: createEpisode } = useCreateEpisode();
  const { mutate: updateEpisode } = useUpdateEpisode();

  const { data: episodeData } = useGetEpisode(
    episodeId
      ? { getEpisodeInput: { id: episodeId } }
      : { getEpisodeInput: { id: 0 } }
  );

  const [title, setTitle] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  useEffect(() => {
    if (type === "update" && episodeId && episodeData?.getEpisode) {
      const episode = episodeData.getEpisode;
      setTitle(episode.title);
      setPublishedAt(
        episode.publishedAt
          ? new Date(episode.publishedAt).toISOString().slice(0, 16)
          : ""
      );
    } else if (type === "create") {
      setTitle("");
      setPublishedAt("");
    }
  }, [type, episodeId, episodeData]);

  const handleCloseModal = () => {
    closeEpisodeModal();
    setTitle("");
    setPublishedAt("");
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      return;
    }

    const episodeData = {
      title: title.trim(),
      publishedAt: publishedAt || undefined,
      tvId,
    };

    if (type === "create") {
      await createEpisode({
        variables: { createEpisodeInput: episodeData },
      });
    } else if (type === "update" && episodeId) {
      await updateEpisode({
        variables: {
          id: episodeId,
          updateEpisodeInput: {
            title: episodeData.title,
            publishedAt: episodeData.publishedAt,
          },
        },
      });
    }

    handleCloseModal();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {type === "create" ? "Create Episode" : "Update Episode"}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter episode title"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Published At (optional)</span>
          </label>
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={!title.trim()}>
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </div>
  );
}
