import { CreateEntityForm } from "@shared/ui";
import { Actions } from "./Actions";
import { Title } from "./Title";
import { Label } from "./Label";
import { useCreateEntityForm } from "@shared/ui";
import { useSubmit } from "./useSubmit";
import { closePlaylistModal } from "@features/Playlist";
import { useLoadPlaylist } from "./useLoadPlaylist";

export function CreateOrUpdateContent() {
  const { value, inputRef, handleInputChange, clearInput } =
    useCreateEntityForm();

  const handleCloseModal = () => {
    closePlaylistModal();
    clearInput();
  };

  const submitHandler = useSubmit(value);
  const handleSubmit = async () => {
    await submitHandler();
    handleCloseModal();
  };

  useLoadPlaylist(handleInputChange);

  return (
    <CreateEntityForm
      value={value}
      inputRef={inputRef}
      handleInputChange={handleInputChange}
      placeholder="Enter playlist name"
      actions={<Actions onSubmit={handleSubmit} onCancel={handleCloseModal} />}
      title={<Title />}
      label={<Label />}
    />
  );
}
