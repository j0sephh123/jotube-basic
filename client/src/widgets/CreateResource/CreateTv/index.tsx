import { Actions, Label, Title, useCreateTv } from "@features/Tv";
import { useState } from "react";

export function CreateTv({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");

  const handleCloseModal = () => {
    onClose();
    setTitle("");
  };

  const { mutate: createTvMutation } = useCreateTv();

  const handleSubmit = async () => {
    if (!title.trim()) {
      return;
    }
    await createTvMutation({
      variables: { createTvInput: { title } },
    });
    handleCloseModal();
  };

  return (
    <div className="space-y-4">
      <Title />
      <div className="space-y-4">
        <div>
          <Label field="title" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter TV title"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <Actions
        onSubmit={handleSubmit}
        onCancel={handleCloseModal}
        disabled={!title.trim()}
      />
    </div>
  );
}
