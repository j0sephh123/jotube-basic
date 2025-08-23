import { useState, useEffect, useRef } from "react";
import { usePlaylistModal } from "@features/Playlist";
import { useGetChannel, useRefetchChannelMetadata } from "@entities/Channel";
import { useChannelsDashboardQuery } from "@features/Dashboard";
import { useClickOutside } from "@shared/lib";
import { X } from "lucide-react";
import { SelectPlaylistForm } from "./SelectPlaylistForm";
import Title from "./Title";

export const AddChannelToPlaylistModal = () => {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch } = useChannelsDashboardQuery();
  const { isModalOpen, ytChannelId, closePlaylistModal, resetFormState } =
    usePlaylistModal();
  const { data: channel } = useGetChannel(ytChannelId);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null
  );

  useEffect(() => {
    setSelectedPlaylistId(null);
  }, [channel]);

  useClickOutside(modalRef, closePlaylistModal, isModalOpen);

  const handleSuccess = () => {
    resetFormState();
    closePlaylistModal();
    refetch();
    refetchChannelMetadata();
  };

  if (!isModalOpen || !ytChannelId || !channel) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative" ref={modalRef}>
        <div className="flex justify-end items-start mb-4 absolute top-4 right-4">
          <button
            onClick={closePlaylistModal}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <Title title={channel.title} />
        <SelectPlaylistForm
          channel={channel}
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};
