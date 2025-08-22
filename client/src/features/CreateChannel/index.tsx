import { useState } from "react";
import { useToast } from "@shared/hooks";
import CreateChannelModal from "./ui/CreateChannelModal";
import { useChannelsDashboardQuery } from "@features/Dashboard/api/useChannelsDashboardQuery";
import useCreateChannel from "@features/Channel/hooks/useCreateChannel";
import CreateChannelTrigger from "./ui/CreateChannelTrigger";
import CreateChannelForm from "./ui/CreateChannelForm";
import Actions from "./ui/Actions";
import { useCreateChannelForm } from "./hooks/useCreateChannelForm";
import { useNavigate } from "react-router-dom";

const routes = {
  channel: (ytChannelId: string) => `/channels/${ytChannelId}`,
};

export default function CreateChannel() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { successToast, errorToast } = useToast();
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
