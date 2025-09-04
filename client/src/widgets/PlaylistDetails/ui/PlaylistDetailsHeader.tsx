import type { PlaylistDetailsResponse } from "@shared/api";
import { ArrowLeft } from "lucide-react";
import { SmallCard } from "./SmallCard";
import { useScreenshotsForCarousel } from "@features/Screenshot";
import { setGalleryModal } from "@features/Gallery";
import { CustomLink } from "@shared/ui";
import { useCustomNavigate, useTypedParams } from "@shared/hooks";

type HeaderProps = {
  playlist: PlaylistDetailsResponse;
};

export default function PlaylistDetailsHeader({
  playlist: { id, name, channels },
}: HeaderProps) {
  const handleGetScreenshots = useScreenshotsForCarousel();

  const uploadsType = useTypedParams("uploadsType");

  const totalCounts = channels.reduce(
    (acc, channel) => ({
      videoCount: acc.videoCount + channel.videoCount,
      savedCount: acc.savedCount + channel.savedCount,
      screenshotCount: acc.screenshotCount + channel.screenshotCount,
      thumbnailCount: acc.thumbnailCount + channel.thumbnailCount,
    }),
    {
      videoCount: 0,
      savedCount: 0,
      screenshotCount: 0,
      thumbnailCount: 0,
    }
  );

  const navigate = useCustomNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <CustomLink
          to={`/playlists`}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <ArrowLeft className="w-5 h-5" />
        </CustomLink>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-base-content/60">{channels.length} channels</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="flex gap-4">
          <SmallCard
            hasDistinctBorder={uploadsType === "default"}
            onClick={() => navigate(`/playlists/${id}/uploads/default`)}
            title="Total Videos"
            value={totalCounts.videoCount}
            className="text-primary"
            wrapperClassName="bg-primary/10"
          />
          <SmallCard
            hasDistinctBorder={uploadsType === "saved"}
            onClick={() => navigate(`/playlists/${id}/uploads/saved`)}
            title="Saved Videos"
            value={totalCounts.savedCount}
            className="text-success"
            wrapperClassName="bg-success/10"
          />
          <SmallCard
            onClick={() =>
              setGalleryModal({
                ytVideoId: "",
                ytChannelIds: channels.map((channel) => channel.ytId),
              })
            }
            title="Gallery"
            value={totalCounts.screenshotCount}
            className="text-primary"
            wrapperClassName="bg-primary/10"
          />
          <SmallCard
            onClick={() =>
              handleGetScreenshots(channels.map((channel) => channel.id))
            }
            title="Screenshots"
            value={totalCounts.screenshotCount}
            className="text-warning"
            wrapperClassName="bg-warning/10"
          />
          <SmallCard
            onClick={() => undefined}
            title="Thumbnails"
            value={totalCounts.thumbnailCount}
            className="text-info"
            wrapperClassName="bg-info/10"
          />
        </div>
      </div>
    </div>
  );
}
