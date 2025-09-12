import { Title } from "@radix-ui/react-toast";
import { CreateEntityForm, useCreateEntityForm } from "@shared/ui";
import { Actions, Label } from "./ui";
import { useRefetchChannelsDashboardQuery } from "@features/Dashboard";
import { useCreateChannelMutation, ChannelMessage } from "@shared/api";
import { useCustomNavigate } from "@shared/hooks";
import { makeYtChannelId } from "@shared/types";
// eslint-disable-next-line import/no-internal-modules
import { setMessage } from "@widgets/Notification/notificationStore";

export function CreateChannel({ onClose }: { onClose: () => void }) {
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
    onClose();
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
  );
}
