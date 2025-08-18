set -euxo pipefail

mkdir -p src/pages/{uploads, gallery, saved-uploads, screenshots, screenshots-date, screenshots-month, storyboard, playlists, playlist-details, gallery-video}/ui

git mv src/pages/DefaultUploadsPage.tsx       src/pages/uploads/ui/Page.tsx
git mv src/pages/GalleryPage.tsx              src/pages/gallery/ui/Page.tsx
git mv src/pages/SavedUploadsPage.tsx         src/pages/saved-uploads/ui/Page.tsx
git mv src/pages/ScreenshotsPage.tsx          src/pages/screenshots/ui/Page.tsx
git mv src/pages/ScreenshotsPageDate.tsx      src/pages/screenshots-date/ui/Page.tsx
git mv src/pages/ScreenshotsPageMonth.tsx     src/pages/screenshots-month/ui/Page.tsx
git mv src/pages/StoryboardPage.tsx           src/pages/storyboard/ui/Page.tsx
git mv src/features/Playlist/components/PlaylistsPage/index.tsx     src/pages/playlists/ui/Page.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/index.tsx src/pages/playlist-details/ui/Page.tsx
git mv src/features/Gallery/components/GalleryVideoPage.tsx         src/pages/gallery-video/ui/Page.tsx

# router imports often reference old locations
find src -type f -name "*.*ts*" -exec sed -i \
  -e 's|@/pages/DefaultUploadsPage|@/pages/uploads/ui/Page|g' \
  -e 's|@/pages/GalleryPage|@/pages/gallery/ui/Page|g' \
  -e 's|@/pages/SavedUploadsPage|@/pages/saved-uploads/ui/Page|g' \
  -e 's|@/pages/ScreenshotsPageDate|@/pages/screenshots-date/ui/Page|g' \
  -e 's|@/pages/ScreenshotsPageMonth|@/pages/screenshots-month/ui/Page|g' \
  -e 's|@/pages/ScreenshotsPage|@/pages/screenshots/ui/Page|g' \
  -e 's|@/pages/StoryboardPage|@/pages/storyboard/ui/Page|g' \
  -e 's|@/features/Playlist/components/PlaylistsPage|@/pages/playlists/ui/Page|g' \
  -e 's|@/features/Playlist/components/PlaylistDetailsPage|@/pages/playlist-details/ui/Page|g' \
  -e 's|@/features/Gallery/components/GalleryVideoPage|@/pages/gallery-video/ui/Page|g' {} +
