import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateChannel from "@/features/Channel/CreateChannel";
import Modal from "@/shared/components/Modal";
import useChannelCreate from "@/features/Channel/hooks/useCreateChannel";
import { useToast } from "@/shared/components/Toast";
import { Link } from "react-router-dom";
import { routes } from "@/shared/utils/routes";

// TODO this component is ugly and needs refinement
export default function CreateChannelButton(): JSX.Element {
  const [isCreating, setIsCreating] = useState(false);
  const { mutateAsync: channelCreateMutation } = useChannelCreate();
  const { show, ToastContainer } = useToast();

  const handleChannelCreate = async ({ ytVideoId }: { ytVideoId: string }) => {
    try {
      const response = await channelCreateMutation({
        ytVideoId,
      });
      if (response.success) {
        setIsCreating(false);
        show("Channel created successfully!", { type: "success" });
      } else {
        setIsCreating(false);
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

  return (
    <>
      <ToastContainer />
      <button
        onClick={() => setIsCreating(true)}
        className="fixed z-50 bottom-3 right-3 btn btn-accent btn-circle"
      >
        <PlusIcon />
      </button>
      {isCreating && (
        <Modal
          onClose={() => setIsCreating(false)}
          isModalVisible
          maxHeight="50vh"
          maxWidth="50vw"
          style={{
            display: "flex",
          }}
        >
          <CreateChannel
            onCreate={handleChannelCreate}
            onClose={() => setIsCreating(false)}
          />
        </Modal>
      )}
    </>
  );
}
