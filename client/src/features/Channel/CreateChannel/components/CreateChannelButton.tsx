import { PlusIcon } from "lucide-react";
import { useState } from "react";
import useChannelCreate from "@/features/Channel/hooks/useCreateChannel";
import { useToast } from "@/shared/components/Toast";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import CreateChannelModal from "./CreateChannelModal";

export default function CreateChannelButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutateAsync: channelCreateMutation } = useChannelCreate();
  const { show, ToastContainer } = useToast();

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    try {
      const response = await channelCreateMutation({
        ytVideoId,
      });
      if (response.success) {
        setIsModalVisible(false);
        show("Channel created successfully!", { type: "success" });
      } else {
        setIsModalVisible(false);
        show(
          <div className="flex flex-col gap-1">
            <span>Channel already exists</span>
            <Link
              to={routes.channel(response.ytChannelId!)}
              className="text-blue-700 hover:text-blue-900 hover:underline font-medium"
            >
              View existing channel
            </Link>
          </div>,
          { type: "warning", duration: 5000 }
        );
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
      <ToastContainer />
      <button
        onClick={() => setIsModalVisible(true)}
        className="fixed z-50 bottom-3 right-3 btn btn-accent btn-circle"
      >
        <PlusIcon />
      </button>
      <CreateChannelModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleChannelCreate}
      />
    </>
  );
}
