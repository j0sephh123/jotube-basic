import { useState } from "react";
import { useToastContext } from "@app/providers/toast";
import CreateChannelModal from "@features/CreateChannel/ui/CreateChannelModal";
import { useChannelsDashboardQuery } from "@/features/Dashboard/api/useChannelsDashboardQuery";
import useCreateChannel from "@features/Channel/hooks/useCreateChannel";
import CreateChannelTrigger from "@features/CreateChannel/ui/CreateChannelTrigger";
import CreateChannelForm from "@features/CreateChannel/ui/CreateChannelForm";
import Actions from "@features/CreateChannel/ui/Actions";
import { useCreateChannelForm } from "@features/CreateChannel/hooks/useCreateChannelForm";
import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/routes";

export default function CreateChannel() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { successToast, errorToast } = useToastContext();
  const navigate = useNavigate();
  const { refetch } = useChannelsDashboardQuery();
  const channelCreateMutation = useCreateChannel({
    onCreated: (message: string) => {
      successToast(message);
      refetch();
      handleCloseModal();
    },
    onAlreadyExists: (ytChannelId: string) => {
      handleCloseModal();
      navigate(routes.channel(ytChannelId));
    },
    onInvalidVideoId: (message: string) => {
      errorToast(message);
      handleCloseModal();
    },
    onFailedToCreate: (message: string) => {
      errorToast(message);
      handleCloseModal();
    },
  });

  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearInput();
  };

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    await channelCreateMutation({
      variables: {
        createChannelInput: {
          ytVideoId,
        },
      },
    });
  };

  const { ytVideoId, inputRef, handleInputChange, clearInput } =
    useCreateChannelForm(isModalVisible);

  return (
    <>
      <CreateChannelTrigger setIsModalVisible={setIsModalVisible} />
      <CreateChannelModal isVisible={isModalVisible} onClose={handleCloseModal}>
        <CreateChannelForm
          ytVideoId={ytVideoId}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          actions={
            <Actions
              onClose={handleCloseModal}
              handleSubmit={() => {
                handleChannelCreate({ ytVideoId });
              }}
            />
          }
        />
      </CreateChannelModal>
    </>
  );
}
