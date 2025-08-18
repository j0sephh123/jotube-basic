### Chunk 3 — Dashboard UI from feature → widget (part 1)

1. `src/features/Dashboard/components/ChannelDashboardCard.tsx` → `src/widgets/Dashboard/ui/ChannelDashboardCard.tsx`
2. `src/features/Dashboard/components/ScreenshotCountButton.tsx` → `src/widgets/Dashboard/ui/ScreenshotCountButton.tsx`
3. `src/features/Dashboard/components/VideoChannelInfo.tsx` → `src/widgets/Dashboard/ui/VideoChannelInfo.tsx`
4. `src/features/Dashboard/components/ChannelsHeader/index.tsx` → `src/widgets/Dashboard/ui/ChannelsHeader/index.tsx`
5. `src/features/Dashboard/components/ChannelsHeader/SelectSortDirection.tsx` → `src/widgets/Dashboard/ui/ChannelsHeader/SelectSortDirection.tsx`

### Chunk 4 — Dashboard UI from feature → widget (part 2)

1. `src/features/Dashboard/components/ChannelsHeader/ViewTypeToggle.tsx` → `src/widgets/Dashboard/ui/ChannelsHeader/ViewTypeToggle.tsx`
2. `src/features/Dashboard/components/VideosHeader/index.tsx` → `src/widgets/Dashboard/ui/VideosHeader/index.tsx`
3. `src/features/Dashboard/components/VideosHeader/SelectSortDirection.tsx` → `src/widgets/Dashboard/ui/VideosHeader/SelectSortDirection.tsx`
4. `src/features/Dashboard/components/VideosHeader/VideosPaginationControl.tsx` → `src/widgets/Dashboard/ui/VideosHeader/VideosPaginationControl.tsx`
5. `src/features/Dashboard/index.tsx` → `src/widgets/Dashboard/ui/index.tsx`

---

### Chunk 5 — Playlist details: move cell components to entity

1. `src/features/Playlist/components/PlaylistDetailsPage/cells/ActionsCell.tsx` → `src/entities/Playlist/ui/cells/ActionsCell.tsx`
2. `src/features/Playlist/components/PlaylistDetailsPage/cells/GalleryCell.tsx` → `src/entities/Playlist/ui/cells/GalleryCell.tsx`
3. `src/features/Playlist/components/PlaylistDetailsPage/cells/SavedCountCell.tsx` → `src/entities/Playlist/ui/cells/SavedCountCell.tsx`
4. `src/features/Playlist/components/PlaylistDetailsPage/cells/ScreenshotCountCell.tsx` → `src/entities/Playlist/ui/cells/ScreenshotCountCell.tsx`
5. `src/features/Playlist/components/PlaylistDetailsPage/cells/ThumbnailCountCell.tsx` → `src/entities/Playlist/ui/cells/ThumbnailCountCell.tsx`

### Chunk 6 — Playlist details: move frame pieces to widget

1. `src/features/Playlist/components/PlaylistDetailsPage/cells/TitleCell.tsx` → `src/entities/Playlist/ui/cells/TitleCell.tsx`
2. `src/features/Playlist/components/PlaylistDetailsPage/Header.tsx` → `src/widgets/PlaylistDetails/ui/Header.tsx`
3. `src/features/Playlist/components/PlaylistDetailsPage/RightSection.tsx` → `src/widgets/PlaylistDetails/ui/RightSection.tsx`
4. `src/features/Playlist/components/PlaylistDetailsPage/TableCol.tsx` → `src/widgets/PlaylistDetails/ui/TableCol.tsx`
5. `src/features/Playlist/components/PlaylistDetailsPage/PlaylistDetailsContainer.tsx` → `src/widgets/PlaylistDetails/ui/PlaylistDetailsContainer.tsx`

---

### Chunk 7 — Channel header: move UI to widget

1. `src/features/Channel/ChannelsHeader/BulkOperations.tsx` → `src/widgets/ChannelHeader/ui/BulkOperations.tsx`
2. `src/features/Channel/ChannelsHeader/ChannelControls.tsx` → `src/widgets/ChannelHeader/ui/ChannelControls.tsx`
3. `src/features/Channel/ChannelsHeader/HeaderLayout.tsx` → `src/widgets/ChannelHeader/ui/HeaderLayout.tsx`
4. `src/features/Channel/ChannelsHeader/Tabs.tsx` → `src/widgets/ChannelHeader/ui/Tabs.tsx`
5. `src/features/Channel/ChannelsHeader/index.tsx` → `src/widgets/ChannelHeader/ui/index.tsx`

### Chunk 8 — Channel logic: split model + layout

1. `src/features/Channel/ChannelsHeader/useGetIsActiveRoute.ts` → `src/widgets/ChannelHeader/lib/useGetIsActiveRoute.ts`
2. `src/features/Channel/ChannelsHeader/useTabs.ts` → `src/widgets/ChannelHeader/lib/useTabs.ts`
3. `src/features/Channel/ChannelPageLayout.tsx` → `src/widgets/ChannelPageLayout/ui/ChannelPageLayout.tsx`
4. `src/features/Channel/hooks/useChannelMetadata.ts` → `src/entities/Channel/model/useChannelMetadata.ts`
5. `src/features/Channel/hooks/useGetChannel.ts` → `src/entities/Channel/model/useGetChannel.ts`

---

### Chunk 9 — Shared hooks: move domain-specific ones out of `shared`

1. `src/shared/hooks/useDashboardParams.ts` → `src/widgets/Dashboard/lib/useDashboardParams.ts`
2. `src/shared/hooks/useGlobalWebSocket.ts` → `src/app/providers/ws/useGlobalWebSocket.ts`
3. `src/shared/hooks/useWebSocket.ts` → `src/shared/lib/useWebSocket.ts`
4. `src/shared/hooks/useClickOutside.ts` → `src/shared/lib/useClickOutside.ts`
5. `src/shared/hooks/useImageSrc.ts` → `src/shared/lib/useImageSrc.ts`

### Chunk 10 — Shared hooks (cont.) + Search

1. `src/shared/hooks/useDialog.ts` → `src/shared/ui/dialog/model/useDialog.ts`
2. `src/shared/hooks/useVideoModal.ts` → `src/shared/ui/VideoModal/model/useVideoModal.ts`
3. `src/shared/hooks/useQueue.ts` → `src/features/Upload/lib/useQueue.ts`
4. `src/shared/hooks/useViewThumbnails.ts` → `src/widgets/Thumbnails/lib/useViewThumbnails.ts`
5. `src/features/Search/useSearch.ts` → `src/features/Search/model/useSearch.ts`

---

### Chunk 11 — API infra + generated

1. `src/generated/graphql.ts` → `src/shared/api/generated/graphql.ts`
2. `src/shared/api/apolloClient.ts` → `src/app/providers/api/apolloClient.ts`
3. `src/shared/api/queryClient.ts` → `src/app/providers/api/queryClient.ts`
4. `src/shared/api/nestFetcher.ts` → `src/shared/api/rest/nestFetcher.ts`
5. `src/shared/utils/routes.ts` → `src/shared/routes.ts`

### Chunk 12 — Router + Toast provider + Layout

1. `src/app/router.tsx` → `src/app/providers/router/router.tsx`
2. `src/app/providers/ToastProvider/index.tsx` → `src/app/providers/toast/ToastProvider.tsx`
3. `src/app/providers/ToastProvider/useToastProvider.ts` → `src/app/providers/toast/model/useToastProvider.ts`
4. `src/app/providers/ToastProvider/useToastContext.ts` → `src/app/providers/toast/model/useToastContext.ts`
5. `src/shared/ui/Layout.tsx` → `src/widgets/Layout/ui/Layout.tsx`

---

### Chunk 13 — Global store → app/providers

1. `src/store/store.ts` → `src/app/providers/store/store.ts`
2. `src/store/store-types.ts` → `src/app/providers/store/types.ts`
3. `src/store/slices/side-panel-slice.ts` → `src/widgets/SidePanel/model/side-panel-slice.ts`
4. `src/store/slices/zoom-slice.ts` → `src/shared/model/zoom-slice.ts`
5. `src/store/slices/websocket-slice.ts` → `src/app/providers/ws/model/websocket-slice.ts`

### Chunk 14 — Store leftover + Navbar structure

1. `src/store/slices/storyboard-processing-slice.ts` → `src/features/Storyboard/model/storyboard-processing-slice.ts`
2. `src/widgets/Navbar/index.tsx` → `src/widgets/Navbar/ui/Navbar.tsx`
3. `src/widgets/Navbar/InitCarouselButton.tsx` → `src/widgets/Navbar/ui/InitCarouselButton.tsx`
4. `src/widgets/Navbar/ProcessingProgress.tsx` → `src/widgets/Navbar/ui/ProcessingProgress.tsx`
5. `src/widgets/Navbar/VideoProcessingInfo.tsx` → `src/widgets/Navbar/ui/VideoProcessingInfo.tsx`

---

### Chunk 15 — Navbar ThemeSwitcher + SidePanel pieces + Storyboards view + Search UI

1. `src/widgets/Navbar/ThemeSwitcher.tsx` → `src/shared/ui/ThemeSwitcher.tsx`
2. `src/shared/ui/SidePanel/SidePanelHeader.tsx` → `src/widgets/SidePanel/ui/SidePanelHeader.tsx`
3. `src/shared/ui/SidePanel/SidePanelWrapper.tsx` → `src/widgets/SidePanel/ui/SidePanelWrapper.tsx`
4. `src/shared/ui/ViewStoryboards/ViewStoryboards.tsx` → `src/widgets/Storyboard/ui/ViewStoryboards.tsx`
5. `src/features/Search/Search.tsx` → `src/widgets/Search/ui/Search.tsx`

### Chunk 16 — Playlist modals and store

1. `src/features/Playlist/components/AddChannelToPlaylistModal/index.tsx` → `src/widgets/PlaylistAddChannel/ui/AddChannelToPlaylistModal.tsx`
2. `src/features/Playlist/components/AddChannelToPlaylistModal/SelectPlaylistForm.tsx` → `src/widgets/PlaylistAddChannel/ui/SelectPlaylistForm.tsx`
3. `src/features/Playlist/components/AddChannelToPlaylistModal/Title.tsx` → `src/widgets/PlaylistAddChannel/ui/Title.tsx`
4. `src/features/Playlist/components/CreatePlaylistModal.tsx` → `src/widgets/CreatePlaylist/ui/CreatePlaylistModal.tsx`
5. `src/features/Playlist/store/playlist-slice.ts` → `src/features/Playlist/model/playlist-slice.ts`
