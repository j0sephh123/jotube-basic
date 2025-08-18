### Step 1 — Normalize `pages` into FSD pages

```bash
set -euxo pipefail

mkdir -p src/pages/{uploads,gallery,saved-uploads,screenshots,screenshots-date,screenshots-month,storyboard,playlists,playlist-details,gallery-video}/ui

git mv src/pages/DefaultUploadsPage.tsx                         src/pages/uploads/ui/Page.tsx
git mv src/pages/GalleryPage.tsx                                src/pages/gallery/ui/Page.tsx
git mv src/pages/SavedUploadsPage.tsx                           src/pages/saved-uploads/ui/Page.tsx
git mv src/pages/ScreenshotsPage.tsx                            src/pages/screenshots/ui/Page.tsx
git mv src/pages/ScreenshotsPageDate.tsx                        src/pages/screenshots-date/ui/Page.tsx
git mv src/pages/ScreenshotsPageMonth.tsx                       src/pages/screenshots-month/ui/Page.tsx
git mv src/pages/StoryboardPage.tsx                             src/pages/storyboard/ui/Page.tsx
git mv src/src/features/Playlist/components/PlaylistsPage/index.tsx         src/pages/playlists/ui/Page.tsx
git mv src/src/features/Playlist/components/PlaylistDetailsPage/index.tsx   src/pages/playlist-details/ui/Page.tsx
git mv src/src/features/Gallery/components/GalleryVideoPage.tsx             src/pages/gallery-video/ui/Page.tsx

# Imports (router & any deep imports)
find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
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
```

---

### Step 2 — `features/Thumbnail` UI → `widgets/Thumbnails/ui`

```bash
set -euxo pipefail

mkdir -p src/widgets/Thumbnails/ui

git mv src/features/Thumbnail/index.tsx                                         src/widgets/Thumbnails/ui/Thumbnails.tsx
git mv src/features/Thumbnail/components/Container.tsx                          src/widgets/Thumbnails/ui/Container.tsx
git mv src/features/Thumbnail/components/Footer.tsx                             src/widgets/Thumbnails/ui/Footer.tsx
git mv src/features/Thumbnail/components/Grid.tsx                               src/widgets/Thumbnails/ui/Grid.tsx
git mv src/features/Thumbnail/components/Header.tsx                             src/widgets/Thumbnails/ui/Header.tsx
git mv src/features/Thumbnail/components/HoverableDiv.tsx                       src/widgets/Thumbnails/ui/HoverableDiv.tsx
git mv src/features/Thumbnail/components/SmoothProgressBar.tsx                  src/widgets/Thumbnails/ui/SmoothProgressBar.tsx
git mv src/features/Thumbnail/components/ThumbnailGridCell.tsx                  src/widgets/Thumbnails/ui/ThumbnailGridCell.tsx
git mv src/features/Thumbnail/components/ThumbnailImage.tsx                     src/widgets/Thumbnails/ui/ThumbnailImage.tsx
git mv src/features/Thumbnail/components/ThumbnailsProcessingContent.tsx        src/widgets/Thumbnails/ui/ThumbnailsProcessingContent.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/features/Thumbnail/components/|@/widgets/Thumbnails/ui/|g' \
  -e 's|@/features/Thumbnail/index|@/widgets/Thumbnails/ui/Thumbnails|g' {} +
```

---

### Step 3 — Thumbnails hooks (batch 1) → `widgets/Thumbnails/lib`

```bash
set -euxo pipefail

mkdir -p src/widgets/Thumbnails/lib

git mv src/features/Thumbnail/hooks/useGridCalculator.ts         src/widgets/Thumbnails/lib/useGridCalculator.ts
git mv src/features/Thumbnail/hooks/useHandleContainerWheel.ts   src/widgets/Thumbnails/lib/useHandleContainerWheel.ts
git mv src/features/Thumbnail/hooks/useHandleKeyDown.ts          src/widgets/Thumbnails/lib/useHandleKeyDown.ts
git mv src/features/Thumbnail/hooks/useHandleNext.ts             src/widgets/Thumbnails/lib/useHandleNext.ts
git mv src/features/Thumbnail/hooks/useIsLastItem.ts             src/widgets/Thumbnails/lib/useIsLastItem.ts
git mv src/features/Thumbnail/hooks/usePaginate.ts               src/widgets/Thumbnails/lib/usePaginate.ts
git mv src/features/Thumbnail/hooks/useResetSelection.ts         src/widgets/Thumbnails/lib/useResetSelection.ts
git mv src/features/Thumbnail/hooks/useSubmit.ts                 src/widgets/Thumbnails/lib/useSubmit.ts
git mv src/features/Thumbnail/hooks/useThumbnailByVideoId.ts     src/widgets/Thumbnails/lib/useThumbnailByVideoId.ts
git mv src/features/Thumbnail/hooks/useThumbnailsCount.ts        src/widgets/Thumbnails/lib/useThumbnailsCount.ts

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/features/Thumbnail/hooks/|@/widgets/Thumbnails/lib/|g' {} +
```

---

### Step 4 — Thumbnails leftovers: hooks + store + utils; SidePanel UI split

```bash
set -euxo pipefail

mkdir -p src/widgets/Thumbnails/{model,utils} src/widgets/{SidePanel/ui,ScreenshotsSidePanel/ui}

git mv src/features/Thumbnail/hooks/useEvents.ts                    src/widgets/Thumbnails/lib/useEvents.ts
git mv src/features/Thumbnail/hooks/useGetUploadsWithThumbnails.ts  src/widgets/Thumbnails/lib/useGetUploadsWithThumbnails.ts
git mv src/features/Thumbnail/hooks/useViewScreenshots.ts           src/widgets/Thumbnails/lib/useViewScreenshots.ts
git mv src/features/Thumbnail/store/thumbnails-processing-slice.ts  src/widgets/Thumbnails/model/thumbnails-processing-slice.ts
git mv src/features/Thumbnail/store/slides-slice.ts                 src/widgets/Thumbnails/model/slides-slice.ts
git mv src/features/Thumbnail/utils/calculateGridDimensions.ts      src/widgets/Thumbnails/utils/calculateGridDimensions.ts
git mv src/features/Thumbnail/utils/constants.ts                    src/widgets/Thumbnails/utils/constants.ts
git mv src/features/Thumbnail/utils/generateMainThumbnailUrl.ts     src/widgets/Thumbnails/utils/generateMainThumbnailUrl.ts
git mv src/widgets/ScreenshotsSidePanel/index.tsx                   src/widgets/ScreenshotsSidePanel/ui/ScreenshotsSidePanel.tsx
git mv src/widgets/SidePanel/index.tsx                              src/widgets/SidePanel/ui/SidePanel.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/widgets/ScreenshotsSidePanel/index|@/widgets/ScreenshotsSidePanel/ui/ScreenshotsSidePanel|g' \
  -e 's|@/widgets/SidePanel/index|@/widgets/SidePanel/ui/SidePanel|g' {} +
```

---

### Step 5 — Dashboard: move remaining UI from feature → widget

```bash
set -euxo pipefail

mkdir -p src/widgets/Dashboard/ui/{ChannelsHeader,VideosHeader}

git mv src/features/Dashboard/components/ChannelDashboardCard.tsx              src/widgets/Dashboard/ui/ChannelDashboardCard.tsx
git mv src/features/Dashboard/components/ScreenshotCountButton.tsx             src/widgets/Dashboard/ui/ScreenshotCountButton.tsx
git mv src/features/Dashboard/components/VideoChannelInfo.tsx                  src/widgets/Dashboard/ui/VideoChannelInfo.tsx
git mv src/features/Dashboard/components/ChannelsHeader/index.tsx              src/widgets/Dashboard/ui/ChannelsHeader/index.tsx
git mv src/features/Dashboard/components/ChannelsHeader/SelectSortDirection.tsx src/widgets/Dashboard/ui/ChannelsHeader/SelectSortDirection.tsx
git mv src/features/Dashboard/components/ChannelsHeader/ViewTypeToggle.tsx     src/widgets/Dashboard/ui/ChannelsHeader/ViewTypeToggle.tsx
git mv src/features/Dashboard/components/VideosHeader/index.tsx                src/widgets/Dashboard/ui/VideosHeader/index.tsx
git mv src/features/Dashboard/components/VideosHeader/SelectSortDirection.tsx  src/widgets/Dashboard/ui/VideosHeader/SelectSortDirection.tsx
git mv src/features/Dashboard/components/VideosHeader/VideosPaginationControl.tsx src/widgets/Dashboard/ui/VideosHeader/VideosPaginationControl.tsx
git mv src/features/Dashboard/index.tsx                                        src/widgets/Dashboard/ui/index.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/features/Dashboard/components/|@/widgets/Dashboard/ui/|g' \
  -e 's|@/features/Dashboard/index|@/widgets/Dashboard/ui/index|g' {} +
```

---

### Step 6 — Evict domain hooks from `shared/hooks`; tidy Navbar ThemeSwitcher

```bash
set -euxo pipefail

mkdir -p src/widgets/Dashboard/lib src/app/providers/ws src/shared/lib \
         src/shared/ui/{VideoModal/model,dialog/model} src/features/Upload/lib \
         src/features/Search/model src/shared/ui

git mv src/shared/hooks/useDashboardParams.ts     src/widgets/Dashboard/lib/useDashboardParams.ts
git mv src/shared/hooks/useGlobalWebSocket.ts     src/app/providers/ws/useGlobalWebSocket.ts
git mv src/shared/hooks/useWebSocket.ts           src/shared/lib/useWebSocket.ts
git mv src/shared/hooks/useClickOutside.ts        src/shared/lib/useClickOutside.ts
git mv src/shared/hooks/useImageSrc.ts            src/shared/lib/useImageSrc.ts
git mv src/shared/hooks/useDialog.ts              src/shared/ui/dialog/model/useDialog.ts
git mv src/shared/hooks/useVideoModal.ts          src/shared/ui/VideoModal/model/useVideoModal.ts
git mv src/shared/hooks/useQueue.ts               src/features/Upload/lib/useQueue.ts
git mv src/features/Search/useSearch.ts           src/features/Search/model/useSearch.ts
git mv src/widgets/Navbar/ThemeSwitcher.tsx       src/shared/ui/ThemeSwitcher.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/shared/hooks/useDashboardParams|@/widgets/Dashboard/lib/useDashboardParams|g' \
  -e 's|@/shared/hooks/useGlobalWebSocket|@/app/providers/ws/useGlobalWebSocket|g' \
  -e 's|@/shared/hooks/useWebSocket|@/shared/lib/useWebSocket|g' \
  -e 's|@/shared/hooks/useClickOutside|@/shared/lib/useClickOutside|g' \
  -e 's|@/shared/hooks/useImageSrc|@/shared/lib/useImageSrc|g' \
  -e 's|@/shared/hooks/useDialog|@/shared/ui/dialog/model/useDialog|g' \
  -e 's|@/shared/hooks/useVideoModal|@/shared/ui/VideoModal/model/useVideoModal|g' \
  -e 's|@/shared/hooks/useQueue|@/features/Upload/lib/useQueue|g' \
  -e 's|@/features/Search/useSearch|@/features/Search/model/useSearch|g' \
  -e 's|@/widgets/Navbar/ThemeSwitcher|@/shared/ui/ThemeSwitcher|g' {} +
```

---

### Step 7 — Global store → `app/providers` and Navbar UI split

```bash
set -euxo pipefail

mkdir -p src/app/providers/{store,ws/model} src/widgets/Navbar/ui src/shared/model src/features/Storyboard/model

git mv src/store/store.ts                               src/app/providers/store/store.ts
git mv src/store/store-types.ts                         src/app/providers/store/types.ts
git mv src/store/slices/side-panel-slice.ts             src/widgets/SidePanel/model/side-panel-slice.ts
git mv src/store/slices/zoom-slice.ts                   src/shared/model/zoom-slice.ts
git mv src/store/slices/websocket-slice.ts              src/app/providers/ws/model/websocket-slice.ts
git mv src/store/slices/storyboard-processing-slice.ts  src/features/Storyboard/model/storyboard-processing-slice.ts
git mv src/widgets/Navbar/index.tsx                     src/widgets/Navbar/ui/Navbar.tsx
git mv src/widgets/Navbar/InitCarouselButton.tsx        src/widgets/Navbar/ui/InitCarouselButton.tsx
git mv src/widgets/Navbar/ProcessingProgress.tsx        src/widgets/Navbar/ui/ProcessingProgress.tsx
git mv src/widgets/Navbar/VideoProcessingInfo.tsx       src/widgets/Navbar/ui/VideoProcessingInfo.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/store/store|@/app/providers/store/store|g' \
  -e 's|@/store/store-types|@/app/providers/store/types|g' \
  -e 's|@/widgets/Navbar/index|@/widgets/Navbar/ui/Navbar|g' \
  -e 's|@/widgets/Navbar/InitCarouselButton|@/widgets/Navbar/ui/InitCarouselButton|g' \
  -e 's|@/widgets/Navbar/ProcessingProgress|@/widgets/Navbar/ui/ProcessingProgress|g' \
  -e 's|@/widgets/Navbar/VideoProcessingInfo|@/widgets/Navbar/ui/VideoProcessingInfo|g' {} +
```

---

### Step 8 — API infra + router + routes + Toast provider + Layout

```bash
set -euxo pipefail

mkdir -p src/shared/api/{generated,rest} src/app/providers/{api,router,toast/model} src/widgets/Layout/ui

git mv src/generated/graphql.ts                        src/shared/api/generated/graphql.ts
git mv src/shared/api/apolloClient.ts                  src/app/providers/api/apolloClient.ts
git mv src/shared/api/queryClient.ts                   src/app/providers/api/queryClient.ts
git mv src/shared/api/nestFetcher.ts                   src/shared/api/rest/nestFetcher.ts
git mv src/app/router.tsx                              src/app/providers/router/router.tsx
git mv src/shared/utils/routes.ts                      src/shared/routes.ts
git mv src/app/providers/ToastProvider/index.tsx       src/app/providers/toast/ToastProvider.tsx
git mv src/app/providers/ToastProvider/useToastProvider.ts src/app/providers/toast/model/useToastProvider.ts
git mv src/app/providers/ToastProvider/useToastContext.ts  src/app/providers/toast/model/useToastContext.ts
git mv src/shared/components/Layout.tsx                src/widgets/Layout/ui/Layout.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/generated/graphql|@/shared/api/generated/graphql|g' \
  -e 's|@/shared/api/apolloClient|@/app/providers/api/apolloClient|g' \
  -e 's|@/shared/api/queryClient|@/app/providers/api/queryClient|g' \
  -e 's|@/shared/api/nestFetcher|@/shared/api/rest/nestFetcher|g' \
  -e 's|@/app/router|@/app/providers/router/router|g' \
  -e 's|@/shared/utils/routes|@/shared/routes|g' \
  -e 's|@/app/providers/ToastProvider/index|@/app/providers/toast/ToastProvider|g' \
  -e 's|@/app/providers/ToastProvider/useToastProvider|@/app/providers/toast/model/useToastProvider|g' \
  -e 's|@/app/providers/ToastProvider/useToastContext|@/app/providers/toast/model/useToastContext|g' \
  -e 's|@/shared/components/Layout|@/widgets/Layout/ui/Layout|g' {} +
```

---

### Step 9 — Channel feature split: header → widget, data hooks → entity

```bash
set -euxo pipefail

mkdir -p src/widgets/ChannelHeader/{ui,lib} src/widgets/ChannelPageLayout/ui src/entities/Channel/model

git mv src/features/Channel/ChannelsHeader/BulkOperations.tsx   src/widgets/ChannelHeader/ui/BulkOperations.tsx
git mv src/features/Channel/ChannelsHeader/ChannelControls.tsx  src/widgets/ChannelHeader/ui/ChannelControls.tsx
git mv src/features/Channel/ChannelsHeader/HeaderLayout.tsx     src/widgets/ChannelHeader/ui/HeaderLayout.tsx
git mv src/features/Channel/ChannelsHeader/index.tsx            src/widgets/ChannelHeader/ui/index.tsx
git mv src/features/Channel/ChannelsHeader/Tabs.tsx             src/widgets/ChannelHeader/ui/Tabs.tsx
git mv src/features/Channel/ChannelsHeader/useGetIsActiveRoute.ts src/widgets/ChannelHeader/lib/useGetIsActiveRoute.ts
git mv src/features/Channel/ChannelsHeader/useTabs.ts           src/widgets/ChannelHeader/lib/useTabs.ts
git mv src/features/Channel/ChannelPageLayout.tsx               src/widgets/ChannelPageLayout/ui/ChannelPageLayout.tsx
git mv src/features/Channel/hooks/useChannelMetadata.ts         src/entities/Channel/model/useChannelMetadata.ts
git mv src/features/Channel/hooks/useGetChannel.ts              src/entities/Channel/model/useGetChannel.ts

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/features/Channel/ChannelsHeader/|@/widgets/ChannelHeader/|g' \
  -e 's|@/features/Channel/ChannelPageLayout|@/widgets/ChannelPageLayout/ui/ChannelPageLayout|g' \
  -e 's|@/features/Channel/hooks/useChannelMetadata|@/entities/Channel/model/useChannelMetadata|g' \
  -e 's|@/features/Channel/hooks/useGetChannel|@/entities/Channel/model/useGetChannel|g' {} +
```

---

### Step 10 — Playlist details: entity cells + widget frame

```bash
set -euxo pipefail

mkdir -p src/entities/Playlist/ui/cells src/widgets/PlaylistDetails/ui

git mv src/features/Playlist/components/PlaylistDetailsPage/cells/ActionsCell.tsx        src/entities/Playlist/ui/cells/ActionsCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/cells/GalleryCell.tsx        src/entities/Playlist/ui/cells/GalleryCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/cells/SavedCountCell.tsx     src/entities/Playlist/ui/cells/SavedCountCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/cells/ScreenshotCountCell.tsx src/entities/Playlist/ui/cells/ScreenshotCountCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/cells/ThumbnailCountCell.tsx src/entities/Playlist/ui/cells/ThumbnailCountCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/cells/TitleCell.tsx          src/entities/Playlist/ui/cells/TitleCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/cells/VideoCountCell.tsx     src/entities/Playlist/ui/cells/VideoCountCell.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/Header.tsx                   src/widgets/PlaylistDetails/ui/Header.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/RightSection.tsx             src/widgets/PlaylistDetails/ui/RightSection.tsx
git mv src/features/Playlist/components/PlaylistDetailsPage/TableCol.tsx                 src/widgets/PlaylistDetails/ui/TableCol.tsx

find src -type f \( -name '*.ts' -o -name '*.tsx' \) -exec sed -i \
  -e 's|@/features/Playlist/components/PlaylistDetailsPage/cells/|@/entities/Playlist/ui/cells/|g' \
  -e 's|@/features/Playlist/components/PlaylistDetailsPage/Header|@/widgets/PlaylistDetails/ui/Header|g' \
  -e 's|@/features/Playlist/components/PlaylistDetailsPage/RightSection|@/widgets/PlaylistDetails/ui/RightSection|g' \
  -e 's|@/features/Playlist/components/PlaylistDetailsPage/TableCol|@/widgets/PlaylistDetails/ui/TableCol|g' {} +
```

---

### After each step

```bash
pnpm typecheck || true
pnpm lint --fix || true
```

If any path doesn’t exist on your branch, the `git mv` will fail immediately—adjust that single line and continue.
