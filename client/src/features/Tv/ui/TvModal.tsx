import { useTvModalState } from "@features/Tv";
import Wrapper from "./Wrapper";
import { match } from "ts-pattern";
import { UpdateContent } from "./UpdateContent";

export default function TvModal() {
  const { type } = useTvModalState();

  const content = match(type)
    .with("update", () => <UpdateContent />)
    .with(null, () => null)
    .exhaustive();

  return <Wrapper>{content}</Wrapper>;
}
