import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useToastContext } from "@/shared/components/Toast/useToastContext";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import CreateChannelModal from "./CreateChannelModal";
import { useChannelsDashboardQuery } from "@/features/Dashboard/useChannelsDashboardQuery";
import Button from "@/shared/button";
import useCreateChannel from "@/features/Channel/hooks/useCreateChannel";
import ViewExistingChannel from "@/shared/components/Toast/components/ViewExistingChannel";

export default function CreateChannel() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { show } = useToastContext();
  const { refetch } = useChannelsDashboardQuery();
  const channelCreateMutation = useCreateChannel({
    onCreated: () => {
      show("Channel created successfully!", {
        type: "success",
      });
      refetch();
    },
    onAlreadyExists: (ytChannelId: string) => {
      show(<ViewExistingChannel ytChannelId={ytChannelId} />, {
        type: "error",
      });
    },
  });

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    try {
      const response = await channelCreateMutation({
        variables: {
          createChannelInput: {
            ytVideoId,
          },
        },
      });
      if (response.data?.createChannel.success) {
        setIsModalVisible(false);
        show("Channel created successfully!", { type: "success" });
        refetch();
      } else {
        setIsModalVisible(false);
        const ytChannelId = response.data?.createChannel.ytChannelId;
        if (ytChannelId) {
          show(
            <div className="flex flex-col gap-1">
              <span>Channel already exists</span>
              <Link
                to={routes.channel(ytChannelId)}
                className="text-blue-700 hover:text-blue-900 hover:underline font-medium"
              >
                View existing channel
              </Link>
            </div>,
            { type: "warning", duration: 5000 }
          );
        }
      }
    } catch {
      show("An error occurred while creating the channel", {
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        className="fixed z-50 bottom-3 right-3"
        color="accent"
        circle
        aria-label="Add"
      >
        <PlusIcon />
      </Button>
      <CreateChannelModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleChannelCreate}
      />
    </>
  );
}
