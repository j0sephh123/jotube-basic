# Files with Relative Imports

This document lists all files in the project that contain relative imports (using `./` or `../`).

## Client-side Files

### Main Entry Points

- `client/src/main.tsx` - imports AppProvider from "./app/providers/AppProvider"

### Store

- `client/src/store/store.ts` - multiple relative imports from "./slices/" and "./store-types"
- `client/src/store/store-types.ts` - imports from "./slices/side-panel-slice"
- `client/src/store/slices/zoom-slice.ts` - imports from "../store-types"

### App Providers

- `client/src/app/providers/AppProvider.tsx` - imports from "./ToastProvider", "./GQLProvider", "./RestProvider"
- `client/src/app/providers/ToastProvider/index.tsx` - imports from "./Toast", "./useToastProvider"
- `client/src/app/providers/ToastProvider/context.ts` - exports from "./index.tsx"
- `client/src/app/providers/ToastProvider/useToastContext.ts` - imports from "./index.tsx"
- `client/src/app/providers/ToastProvider/index.ts` - multiple exports from "./" files

### Widgets

- `client/src/widgets/Navbar/index.tsx` - imports from "./InitCarouselButton", "./Screenshots", "./ProcessingProgress", "./VideoProcessingInfo", "./ThemeSwitcher"
- `client/src/widgets/RangePicker/ui/RangeFilterPopover.tsx` - imports from "./RangeFilter"
- `client/src/widgets/RangePicker/ui/RangeFilter.tsx` - imports from "./RangePicker"
- `client/src/widgets/Dashboard/lib/useDashboard.ts` - imports from "./index"
- `client/src/widgets/Dashboard/lib/index.ts` - exports from "./useFetchDashboard", "./useFetchVideosDashboard"
- `client/src/widgets/Dashboard/api/useChannelsDashboardQuery.ts` - imports from "../lib"
- `client/src/widgets/Dashboard/api/useVideosDashboardQuery.ts` - imports from "../lib"

### Shared Components

- `client/src/shared/components/Layout.tsx` - imports from "../ui/dialog/DialogProvider"
- `client/src/shared/ui/Layout.tsx` - imports from "./dialog/DialogProvider", "./ZoomModal"
- `client/src/shared/ui/InfoCard.tsx` - imports from "./ConditionalWrapper", "./Tooltip"
- `client/src/shared/ui/icons/IconButton.tsx` - imports from "../Tooltip"
- `client/src/shared/ui/card/CardMenu.tsx` - imports from "../OpenDirectoryButton/useOpenDirectory"
- `client/src/shared/ui/card/index.tsx` - multiple exports from "./" files
- `client/src/shared/ui/dialog/DialogProvider.tsx` - imports from "./ConfirmDialog", "./InputDialog"

### Shared API

- `client/src/shared/api/apolloClient.ts` - imports from "../utils/globals"
- `client/src/shared/api/index.ts` - multiple exports from "./" files

### Shared Hooks

- `client/src/shared/hooks/useWebSocket.ts` - imports from "./useQueue", "../utils/globals"
- `client/src/shared/hooks/useGlobalWebSocket.ts` - imports from "../utils/globals"

### Shared Utils

- `client/src/shared/utils/routes.ts` - imports from "../hooks/useDashboardParams"

### Features - Channel

- `client/src/features/Channel/ChannelsHeader/index.tsx` - imports from "./HeaderLayout", "./ChannelControls", "./Tabs", "./BulkOperations", "../../../entities/Channel/ui/ViewThumbnails", "../../../entities/Channel/ui/ViewScreenshots"
- `client/src/features/Channel/ChannelsHeader/Tabs.tsx` - imports from "./useTabs", "./useGetIsActiveRoute"
- `client/src/features/Channel/ChannelsHeader/useTabs.ts` - imports from "../hooks/useChannelMetadata"
- `client/src/features/Channel/ChannelPageLayout.tsx` - imports from "./ChannelsHeader"
- `client/src/features/Channel/hooks/useGetChannel.ts` - imports from "../../../entities/Channel/api/useChannelForPlaylist.gql"

### Features - CreateChannel

- `client/src/features/CreateChannel/index.tsx` - multiple imports from "./ui/" and "./hooks/"
- `client/src/features/CreateChannel/ui/Label.tsx` - imports from "../lib/validation"
- `client/src/features/CreateChannel/ui/CreateChannelForm.tsx` - imports from "./Title", "./Label"

### Features - Dashboard

- `client/src/features/Dashboard/components/ChannelsHeader/index.tsx` - imports from "./SelectSortDirection", "./ViewTypeToggle"
- `client/src/features/Dashboard/components/ChannelsHeader/SelectSortDirection.tsx` - imports from "../../../../widgets/Dashboard/model/useDashboardContext"
- `client/src/features/Dashboard/components/ChannelDashboardCard.tsx` - imports from "../../Upload/components/SyncUploadsButton", "../../Upload/components/FetchUploadsButton", "../../../entities/Channel/ui/DeleteChannel"

### Features - Gallery

- `client/src/features/Gallery/components/GalleryVideoPage.tsx` - imports from "./GalleryItem"

### Features - Playlist

- `client/src/features/Playlist/index.ts` - exports from "./hooks", "./components"
- `client/src/features/Playlist/components/PlaylistDetailsPage/PlaylistDetailsContainer.tsx` - imports from "../../hooks"
- `client/src/features/Playlist/components/PlaylistDetailsPage/index.tsx` - imports from "./Header", "./PlaylistDetailsContainer", "./RightSection"
- `client/src/features/Playlist/store/index.ts` - exports from "./playlist-slice"

### Features - Screenshot

- `client/src/features/Screenshot/components/StoryboardContainer.tsx` - imports from "../useUploadsWithStoryboard", "./Header"
- `client/src/features/Screenshot/components/Viewer.tsx` - imports from "../useUploadsWithStoryboard"
- `client/src/features/Screenshot/components/StoryboardItem.tsx` - imports from "../useUploadsWithStoryboard"
- `client/src/features/Screenshot/components/index.ts` - exports from "./StoryboardContainer", "./Header", "./StoryboardItem", "./Viewer"

### Features - Statistics

- `client/src/features/Statistics/hooks/useTotalCounts.ts` - imports from "../../../generated/graphql"

### Features - Storyboard

- `client/src/features/Storyboard/components/StoryboardContainer.tsx` - imports from "../useUploadsWithStoryboard", "./Header"
- `client/src/features/Storyboard/components/Viewer.tsx` - imports from "../useUploadsWithStoryboard"
- `client/src/features/Storyboard/components/StoryboardItem.tsx` - imports from "../useUploadsWithStoryboard"
- `client/src/features/Storyboard/components/index.ts` - exports from "./StoryboardContainer", "./Header", "./StoryboardItem", "./Viewer"

### Entities

- `client/src/entities/Screenshot/ui/SimpleCardWithImage.tsx` - imports from "../../../features/Screenshot/components/ScreenshotZoomModal"
- `client/src/entities/Playlist/ui/PlaylistCard.tsx` - imports from "../../../features/Playlist/hooks"

## Server-side Files

### Main Entry Points

- `server/src/main.ts` - imports from './app.module'

### App Module

- `server/src/app.module.ts` - multiple imports from './core/', './channels/', './images/', './screenshots/', './dashboard/', './thumbnails/', './video-worker/', './queue/', './search/', './statistics/', './events/', './file/', './storyboard/', './uploads-video/', './database/', './logging/', './artifacts-aggregator/', './playlist/', './graphql/'

### Core Database

- `server/src/core/database/database.module.ts` - imports from './prisma/prisma.service'
- `server/src/core/database/playlist-repository/playlist-repository.module.ts` - imports from './playlist-repository.service'
- `server/src/core/database/playlist-repository/playlist-repository.service.ts` - imports from '../prisma/prisma.service'
- `server/src/core/database/playlist-repository/index.ts` - exports from './playlist-repository.module', './playlist-repository.service'

### Core External Services

- `server/src/core/external-services/youtube-downloader/download.module.ts` - imports from './download.service', './youtube-downloader.module'
- `server/src/core/external-services/youtube-downloader/youtube-downloader.module.ts` - imports from './youtube-downloader.service'

### Artifacts Aggregator

- `server/src/artifacts-aggregator/artifacts-aggregator.module.ts` - imports from './artifacts-aggregator.service'

### Logging

- `server/src/logging/logging.module.ts` - imports from './service-logger'

### Dashboard

- `server/src/dashboard/dashboard.module.ts` - imports from './dashboard.service', './dashboard.resolver', '../core/database/database.module', '../channels/channels.module', '../logging/logging.module'

### Thumbnails

- `server/src/thumbnails/thumbnails.module.ts` - imports from './thumbnails.service', './api/thumbnails-api.service', './thumbnails.resolver', './manager/thumbnails-manager.module'

### Storyboard

- `server/src/storyboard/storyboard.resolver.ts` - imports from './storyboard.service', './dtos/upload-with-storyboard.response', './dtos/storyboard-query.input'
- `server/src/storyboard/storyboard.module.ts` - imports from './storyboard.service', './storyboard.controller', './storyboard.resolver'
- `server/src/storyboard/storyboard.controller.ts` - imports from './storyboard.service'

### Uploads Video

- `server/src/uploads-video/uploads-video.service.ts` - imports from './dtos/uploads-list.input'
- `server/src/uploads-video/uploads-video.resolver.ts` - imports from './uploads-video.service', './dtos/delete-uploads.response', './dtos/finish-process-upload.response', './dtos/save-upload.response'

### Video Worker

- `server/src/video-worker/video.processor.ts` - imports from './add-to-queue.dto'

### Events

- `server/src/events.gateway.ts` - imports from './shared/types'

## Summary

The project contains **over 100 files** with relative imports, primarily in:

1. **Client-side components** - Most UI components use relative imports for local dependencies
2. **Feature modules** - Each feature typically imports from its own components and hooks
3. **Shared utilities** - Common utilities and components use relative paths
4. **Server modules** - NestJS modules import from their related services and DTOs

Relative imports are used extensively throughout the codebase for:

- Local component imports within the same directory
- Cross-directory imports between related features
- Shared utility and hook imports
- Module exports and re-exports

This pattern suggests the project follows a feature-based architecture where related functionality is grouped together and imports are kept local when possible.
