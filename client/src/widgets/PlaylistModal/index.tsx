import { useCreateEntityForm, CreateEntityForm } from "@shared/ui";
import { closePlaylistModal, usePlaylistModalState } from "@features/Playlist";
import { useSubmit } from "./useSubmit";
import { useLoadPlaylist } from "./useLoadPlaylist";
import Wrapper from "./Wrapper";
import { Actions } from "./Actions";
import { Title } from "./Title";
import { Label } from "./Label";

export default function PlaylistModal() {
  const { type } = usePlaylistModalState();

  const { value, inputRef, handleInputChange, clearInput } =
    useCreateEntityForm(type !== null);

  useLoadPlaylist(handleInputChange);

  const handleCloseModal = () => {
    closePlaylistModal();
    clearInput();
  };

  const submitHandler = useSubmit(value);
  const handleSubmit = async () => {
    await submitHandler();
    handleCloseModal();
  };

  if(type === 'modifyChannelForPlaylist') {
    console.log('modifyChannel');
  }

  if(type === 'modifyPlaylistForChannel') {
    console.log('modifyPlaylist');
  }

  return (
    <Wrapper>
      <CreateEntityForm
        value={value}
        inputRef={inputRef}
        handleInputChange={handleInputChange}
        placeholder="Enter playlist name"
        actions={
          <Actions onSubmit={handleSubmit} onCancel={handleCloseModal} />
        }
        title={<Title />}
        label={<Label />}
      />
    </Wrapper>
  );
}
