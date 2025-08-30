import { usePlaylistModalState } from "@features/Playlist";
import Wrapper from "./Wrapper";
import { match } from "ts-pattern";
import { CreateOrUpdateContent } from "./CreateOrUpdateContent";

export default function PlaylistModal() {
  const { type } = usePlaylistModalState();

  const modifyChannelForPlaylistContent = <div>modifyChannelForPlaylist</div>;
  const modifyPlaylistForChannelContent = <div>modifyPlaylistForChannel</div>;

  const content = match(type)
    .with("create", () => <CreateOrUpdateContent />)
    .with("update", () => <CreateOrUpdateContent />)
    .with("modifyChannelForPlaylist", () => {
      console.log("modifyChannel");
      return modifyChannelForPlaylistContent;
    })
    .with("modifyPlaylistForChannel", () => {
      console.log("modifyPlaylist");
      return modifyPlaylistForChannelContent;
    })
    .with(null, () => null)
    .exhaustive();

  return <Wrapper>{content}</Wrapper>;
}
