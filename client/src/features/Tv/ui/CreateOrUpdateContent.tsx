import { Actions } from "./Actions";
import { Title } from "./Title";
import { Label } from "./Label";
import { useSubmit } from "./useSubmit";
import { closeTvModal, useTvModalState, useGetAllTvs } from "@features/Tv";
import { useState, useEffect } from "react";

export function CreateOrUpdateContent() {
  const { type, tvId } = useTvModalState();
  const { data: tvs } = useGetAllTvs();
  const [identifier, setIdentifier] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (type === "update" && tvId && tvs) {
      const tv = tvs.find((t) => t.id === tvId);
      if (tv) {
        setIdentifier(tv.identifier);
        setTitle(tv.title);
      }
    }
  }, [type, tvId, tvs]);

  const handleCloseModal = () => {
    closeTvModal();
    setIdentifier("");
    setTitle("");
  };

  const submitHandler = useSubmit({ identifier, title });
  const handleSubmit = async () => {
    await submitHandler();
    handleCloseModal();
  };

  return (
    <div className="space-y-4">
      <Title />
      <div className="space-y-4">
        <div>
          <Label field="identifier" />
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter TV identifier"
            className="input input-bordered w-full"
          />
        </div>
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
      <Actions onSubmit={handleSubmit} onCancel={handleCloseModal} />
    </div>
  );
}
