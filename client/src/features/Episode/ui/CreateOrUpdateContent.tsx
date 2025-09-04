import { useState, useEffect } from "react";
import { useCreateEpisode, useUpdateEpisode } from "@features/Episode";
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

  const [identifier, setIdentifier] = useState("");
  const [title, setTitle] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  useEffect(() => {
    if (type === "update" && episodeId) {
      // TODO: Load episode data for editing
      console.log("Load episode data for editing:", episodeId);
    }
  }, [type, episodeId]);

  const handleCloseModal = () => {
    closeEpisodeModal();
    setIdentifier("");
    setTitle("");
    setPublishedAt("");
  };

  const handleSubmit = async () => {
    if (!identifier.trim() || !title.trim()) {
      return;
    }

    const episodeData = {
      identifier: identifier.trim(),
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
            identifier: episodeData.identifier,
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
            <span className="label-text">Identifier</span>
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter episode identifier"
            className="input input-bordered w-full"
          />
        </div>
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
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={!identifier.trim() || !title.trim()}
        >
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </div>
  );
}
