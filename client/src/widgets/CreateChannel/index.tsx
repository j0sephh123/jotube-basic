/* eslint-disable import/no-internal-modules */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import {
  useCreateChannelMutation,
  ChannelMessage,
} from "@shared/api/generated/graphql";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";
import { Modal } from "@shared/ui";
import { routes } from "@shared/routes";
import { Actions, CreateChannelForm } from "./ui";
import { useCreateChannelForm } from "./hooks";
import { setMessage } from "@widgets/Notification/notificationStore";

export default function CreateChannel() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const refetchChannelsDashboardQuery = useRefetchChannelsDashboardQuery();

  const [createChannelMutation] = useCreateChannelMutation({
    onCompleted({ createChannel: { ytChannelId, message } }) {
      switch (message) {
        case ChannelMessage.CreatedSuccessfully:
          setMessage("Channel created successfully!");
          refetchChannelsDashboardQuery();
          handleCloseModal();
          return;
        case ChannelMessage.AlreadyExists:
          handleCloseModal();
          navigate(routes.channel(ytChannelId as string));
          return;
        case ChannelMessage.InvalidVideoId:
          setMessage("Invalid YouTube video ID");
          handleCloseModal();
          return;
        case ChannelMessage.FailedToCreate:
          setMessage("Failed to create channel");
          handleCloseModal();
          return;
        default:
          break;
      }
    },
    onError: (error) => {
      console.error("Create channel error:", error);
    },
  });

  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearInput();
  };

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    await createChannelMutation({
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
      <button
        onClick={() => setIsModalVisible(true)}
        className="btn btn-accent btn-circle fixed z-50 bottom-3 right-3"
      >
        <PlusIcon />
      </button>
      <Modal
        isModalVisible={isModalVisible}
        onClose={handleCloseModal}
        maxWidth="600px"
        maxHeight="500px"
      >
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
      </Modal>
    </>
  );
}
