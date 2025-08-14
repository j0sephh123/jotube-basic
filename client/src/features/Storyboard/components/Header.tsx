import { StoryboardArtifact } from "../useStoryboards";

export default function Header({
  storyboards,
}: {
  storyboards: StoryboardArtifact[];
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Storyboards</h1>
      <p className="text-base-content/70">
        {storyboards.length} storyboard
        {storyboards.length !== 1 ? "s" : ""} found
      </p>
    </div>
  );
}
