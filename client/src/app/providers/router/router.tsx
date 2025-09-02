import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/Layout";
import { ChannelPageLayout } from "@widgets/ChannelPageLayout";
import { DashboardWidget, DashboardWrapper } from "@widgets/Dashboard";
import { ImageNavigatorPage } from "@pages/image-navigator";
import { PlaylistsPage } from "@pages/playlists";
import { PlaylistDetailsPage } from "@pages/playlist-details";
import { NotFound } from "@shared/ui";
import { GalleryVideosList } from "@features/Gallery";
import { UploadsDecorator } from "@features/Upload";
import { PlaylistUploadsListPage } from "@pages/playlistUploadsList";
import {
  ProcessingPhasePage,
  ProcessingPhaseWrapper,
} from "@pages/processing-phase";
import { PageWrapper } from "@widgets/PageWrapper";
import { VideoDetailsPage } from "@pages/video-details";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard/channels/saved" />}
          />
          <Route path="dashboard" element={<DashboardWrapper />}>
            {/* fix at some point */}
            <Route path=":type" element={<DashboardWidget />}>
              <Route path=":viewType" element={<DashboardWidget />} />
            </Route>
          </Route>
          <Route path="/channels/:ytChannelId" element={<ChannelPageLayout />}>
            <Route index element={<UploadsDecorator type="default" />} />
            <Route path="saved" element={<UploadsDecorator type="saved" />} />
            <Route path="gallery" element={<GalleryVideosList />} />
          </Route>
          <Route
            path="/channels/:ytChannelId/videos/:ytVideoId"
            element={<VideoDetailsPage />}
          />
          <Route path="/playlists" element={<PageWrapper />}>
            <Route index element={<PlaylistsPage />} />
            <Route path=":id" element={<PlaylistDetailsPage />} />
            <Route
              path=":id/uploads/:uploadsType"
              element={<PlaylistUploadsListPage />}
            />
          </Route>
          <Route path="/image-navigator" element={<ImageNavigatorPage />} />
          <Route path="/processing-phase" element={<ProcessingPhaseWrapper />}>
            <Route path=":variant" element={<ProcessingPhasePage />} />
            <Route path=":variant" element={<ProcessingPhasePage />} />
          </Route>
          <Route
            path="/thumbnails"
            element={<Navigate to="/dashboard/channels/thumbnails" />}
          />
          <Route path="/videos" element={<Navigate to="/dashboard/videos" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
