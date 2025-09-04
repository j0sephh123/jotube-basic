import { useEpisodeModalState } from "../model/episodeModalStore";
import { match } from "ts-pattern";
import { CreateOrUpdateContent } from "./CreateOrUpdateContent";

export default function EpisodeModal() {
  const { type, tvId } = useEpisodeModalState();

  const content = match(type)
    .with("create", () => (tvId ? <CreateOrUpdateContent tvId={tvId} /> : null))
    .with("update", () => (tvId ? <CreateOrUpdateContent tvId={tvId} /> : null))
    .with(null, () => null)
    .exhaustive();

  if (!content) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">{content}</div>
      <div
        className="modal-backdrop"
        onClick={() => useEpisodeModalState.getState().closeEpisodeModal()}
      ></div>
    </div>
  );
}
