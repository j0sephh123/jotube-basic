import { usePlaylistModalState } from "@features/Playlist";
import Wrapper from "./Wrapper";
import { match } from "ts-pattern";
import { CreateOrUpdateContent } from "./CreateOrUpdateContent";
import { ModifyChannelForPlaylist } from "./ModifyChannelForPlaylist";
import { ModifyPlaylistForChannel } from "./ModifyPlaylistForChannel";

export default function PlaylistModal() {
  const { type } = usePlaylistModalState();

  const content = match(type)
    .with("create", () => <CreateOrUpdateContent />)
    .with("update", () => <CreateOrUpdateContent />)
    .with("modifyChannelForPlaylist", () => <ModifyChannelForPlaylist />)
    .with("modifyPlaylistForChannel", () => <ModifyPlaylistForChannel />)
    .with(null, () => null)
    .exhaustive();

  return <Wrapper>{content}</Wrapper>;
}
