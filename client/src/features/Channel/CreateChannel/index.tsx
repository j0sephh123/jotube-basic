import { useState } from "react";
import { useToastContext } from "@/shared/components/Toast/useToastContext";
import CreateChannelModal from "./components/CreateChannelModal";
import { useChannelsDashboardQuery } from "@/features/Dashboard/useChannelsDashboardQuery";
import useCreateChannel from "@/features/Channel/hooks/useCreateChannel";
import ViewExistingChannel from "@/shared/components/Toast/components/ViewExistingChannel";
import CreateChannelTrigger from "./components/CreateChannelTrigger";
import CreateChannelForm from "./components/CreateChannelForm";
import Actions from "./components/Actions";
import { useCreateChannelForm } from "./hooks/useCreateChannelForm";

export default function CreateChannel() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { successToast, errorToast } = useToastContext();
  const { refetch } = useChannelsDashboardQuery();
  const channelCreateMutation = useCreateChannel({
    onCreated: (message: string) => {
      successToast(message);
      refetch();
    },
    onAlreadyExists: (message: string, ytChannelId: string) => {
      errorToast(
        <ViewExistingChannel message={message} ytChannelId={ytChannelId} />
      );
    },
    onInvalidVideoId: (message: string) => {
      errorToast(message);
    },
    onFailedToCreate: (message: string) => {
      errorToast(message);
    },
  });

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    await channelCreateMutation({
      variables: {
        createChannelInput: {
          ytVideoId,
        },
      },
    });
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const { ytVideoId, inputRef, handleInputChange } = useCreateChannelForm();

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
