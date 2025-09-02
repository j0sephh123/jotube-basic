interface ArtifactControlProps {
  artifact: string;
}

export function ArtifactControl({ artifact }: ArtifactControlProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col">
        <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
          Status
        </div>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
          {artifact.toLowerCase()}
        </div>
      </div>
    </div>
  );
}
