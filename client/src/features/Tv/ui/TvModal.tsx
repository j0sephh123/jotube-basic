import { useTvModalState } from "@features/Tv";
import Wrapper from "./Wrapper";
import { match } from "ts-pattern";
import { CreateOrUpdateContent } from "./CreateOrUpdateContent";

export default function TvModal() {
  const { type } = useTvModalState();

  const content = match(type)
    .with("create", () => <CreateOrUpdateContent />)
    .with("update", () => <CreateOrUpdateContent />)
    .with(null, () => null)
    .exhaustive();

  return <Wrapper>{content}</Wrapper>;
}
