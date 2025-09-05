/* eslint-disable import/no-internal-modules */
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  useCreateChannelMutation,
  ChannelMessage,
} from "@shared/api/generated/graphql";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";
import { Modal } from "@shared/ui";
import { useCustomNavigate } from "@shared/hooks";
import { Actions, Label, Title } from "./ui";
import { useCreateEntityForm } from "@shared/ui";
import { setMessage } from "@widgets/Notification/notificationStore";
import CreateEntityForm from "@shared/ui/CreateEntityForm";
import { makeYtChannelId } from "@shared/types";

export default function CreateChannel() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useCustomNavigate();
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
          if (ytChannelId) {
            navigate(`/channels/${makeYtChannelId(ytChannelId)}`);
          }
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

  const { value, inputRef, handleInputChange, clearInput } =
    useCreateEntityForm();

  const handleCloseModal = () => {
    setIsModalVisible(false);
    clearInput();
  };

  const handleChannelCreate = async ({ value }: { value: string }) => {
    await createChannelMutation({
      variables: {
        createChannelInput: {
          ytVideoId: value,
        },
      },
    });
  };

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
        <CreateEntityForm
          value={value}
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          placeholder="Enter YouTube video ID"
          actions={
            <Actions
              onClose={handleCloseModal}
              handleSubmit={() => {
                handleChannelCreate({ value });
              }}
            />
          }
          description={
            <label className="label py-1">
              <span className="label-text-alt text-xs">
                Example: dQw4w9WgXcQ ({value.length} characters)
              </span>
            </label>
          }
          title={<Title />}
          label={<Label />}
        />
      </Modal>
    </>
  );
}
