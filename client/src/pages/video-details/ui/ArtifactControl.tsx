interface ArtifactControlProps {
  artifact: string;
}

export function ArtifactControl({ artifact }: ArtifactControlProps) {
  return (
    <div className="stats stats-vertical shadow">
      <div className="stat">
        <div className="stat-title text-sm">Status</div>
        <div className="stat-value text-lg capitalize">
          {artifact.toLowerCase()}
        </div>
      </div>
    </div>
  );
}
