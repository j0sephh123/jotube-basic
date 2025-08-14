import { StoryboardArtifact } from "../useStoryboards";
import InfoCard from "@/shared/components/InfoCard";

interface StoryboardItemProps {
  storyboard: StoryboardArtifact;
  onStoryboardClick: (storyboard: StoryboardArtifact) => void;
}

export default function StoryboardItem({ storyboard, onStoryboardClick }: StoryboardItemProps) {
  return (
    <div
      key={storyboard.id}
      onClick={() => {
        if (storyboard.storyboard) {
          onStoryboardClick(storyboard);
        }
      }}
      className="cursor-pointer"
    >
      <InfoCard
        title={storyboard.title}
        content={
          <div className="space-y-1">
            <p className="text-sm text-base-content/70">
              Published:{" "}
              {new Date(storyboard.publishedAt).toLocaleDateString()}
            </p>
            {storyboard.duration && (
              <p className="text-sm text-base-content/70">
                Duration: {Math.floor(storyboard.duration / 60)}:
                {String(storyboard.duration % 60).padStart(2, "0")}
              </p>
            )}
            {storyboard.storyboard && (
              <p className="text-sm text-base-content/70">
                Fragments: {storyboard.storyboard.fragments}
              </p>
            )}
          </div>
        }
        showTooltip
      />
    </div>
  );
}
