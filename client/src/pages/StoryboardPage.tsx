import { useTypedChannelYtId } from "@/shared/hooks/useTypedParams";
import { useQuery } from "@tanstack/react-query";
import nestFetcher from "@/shared/api/nestFetcher";

type StoryboardArtifact = {
  id: number;
  ytId: string;
  title: string;
  src: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  channelId: number;
  nextPageToken: string | null;
  duration: number | null;
  artifact: string;
};

export default function StoryboardPage() {
  const ytChannelId = useTypedChannelYtId();

  const {
    data: storyboards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["storyboards", ytChannelId],
    queryFn: () =>
      nestFetcher<StoryboardArtifact[]>({
        url: `/uploads-video/storyboards/${ytChannelId}`,
        method: "GET",
      }),
    enabled: !!ytChannelId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Storyboards...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Storyboards</h1>
          <p className="text-red-400">Failed to load storyboards</p>
        </div>
      </div>
    );
  }

  if (!storyboards || storyboards.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Storyboards Found</h1>
          <p className="text-gray-400">This channel has no storyboards yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Storyboards</h1>
        <p className="text-gray-600">
          {storyboards.length} storyboard{storyboards.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storyboards.map((storyboard) => (
          <div
            key={storyboard.id}
            className="bg-base-200 rounded-lg p-4 shadow-md"
          >
            <h3 className="font-semibold text-lg mb-2">{storyboard.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Published: {new Date(storyboard.publishedAt).toLocaleDateString()}
            </p>
            {storyboard.duration && (
              <p className="text-sm text-gray-600 mb-2">
                Duration: {Math.floor(storyboard.duration / 60)}:
                {String(storyboard.duration % 60).padStart(2, "0")}
              </p>
            )}
            <div className="flex gap-2">
              <a
                href={storyboard.src}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                View Storyboard
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
