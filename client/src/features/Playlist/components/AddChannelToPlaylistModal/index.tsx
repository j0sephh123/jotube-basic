import { useState, useEffect, useRef } from "react";
import { usePlaylist } from "@store/store";
import { useGetChannel } from "@entities/Channel/model/useGetChannel";
import Title from "@features/Playlist/components/AddChannelToPlaylistModal/Title";
import { SelectPlaylistForm } from "@features/Playlist/components/AddChannelToPlaylistModal/SelectPlaylistForm";
import { useChannelsDashboardQuery } from "@widgets/Dashboard/api/useChannelsDashboardQuery";
import { useClickOutside } from "@shared/lib/useClickOutside";
import { X } from "lucide-react";
import { useRefetchChannelMetadata } from "@entities/Channel/model/useChannelMetadata";

export const AddChannelToPlaylistModal = () => {
  const refetchChannelMetadata = useRefetchChannelMetadata();
  const { refetch } = useChannelsDashboardQuery();
  const { isModalOpen, ytChannelId, closePlaylistModal, resetFormState } =
    usePlaylist();
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
    refetchChannelMetadata(ytChannelId ?? undefined);
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
