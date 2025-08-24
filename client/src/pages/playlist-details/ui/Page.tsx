import { PlaylistTable } from "@entities/Playlist";
import {
  Header,
  PlaylistDetailsContainer,
  RightSection,
} from "@widgets/PlaylistDetails";
import { SyncUploadsButton } from "@features/Upload";
import {
  VideoCountCell,
  SavedCountCell,
  ScreenshotCountCell,
  ThumbnailCountCell,
  GalleryCell,
  ActionsCell,
  useRemoveFromPlaylist,
} from "@features/Playlist";

export const PlaylistDetailsPage = () => {
  const { handleRemoveFromPlaylist, isPending } = useRemoveFromPlaylist();

  return (
    <PlaylistDetailsContainer>
      {(playlist) => (
        <div className="container mx-auto p-6">
          <Header playlist={playlist} />

          <div className="grid grid-cols-4 gap-6 mt-6">
            <div className="col-span-3">
              <PlaylistTable
                playlist={playlist}
                onRemoveFromPlaylist={handleRemoveFromPlaylist}
                isRemoving={isPending}
                refetchPlaylist={() => {}}
                ActionsCell={ActionsCell}
                GalleryCell={GalleryCell}
                SavedCountCell={SavedCountCell}
                ScreenshotCountCell={ScreenshotCountCell}
                ThumbnailCountCell={ThumbnailCountCell}
                VideoCountCell={VideoCountCell}
                SyncUploadsButton={SyncUploadsButton}
              />
            </div>
            <div className="col-span-1">
              <RightSection playlist={playlist} />
            </div>
          </div>
        </div>
      )}
    </PlaylistDetailsContainer>
  );
};
