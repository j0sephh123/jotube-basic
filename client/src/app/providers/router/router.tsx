import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/Layout";
import { ChannelPageLayout } from "@widgets/ChannelPageLayout";
import { GalleryPage } from "@pages/gallery";
import { DashboardWidget, DashboardWrapper } from "@widgets/Dashboard";
import { GalleryVideoPage } from "@pages/gallery-video";
import { StoryboardPage } from "@pages/storyboard";
import { ImageNavigatorPage } from "@pages/image-navigator";
import { PlaylistsPage } from "@pages/playlists";
import { PlaylistDetailsPage } from "@pages/playlist-details";
import { NotFound } from "@shared/ui";
import { GalleryLayout } from "@features/Gallery";
import { UploadsDecorator } from "@features/Upload";
import { PlaylistUploadsListPage } from "@pages/playlistUploadsList";
import { PlaylistWrapper } from "@widgets/PlaylistWrapper";

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
            <Route path=":type" element={<DashboardWidget />}>
              <Route path=":viewType" element={<DashboardWidget />} />
            </Route>
          </Route>
          <Route path="/channels/:ytChannelId" element={<ChannelPageLayout />}>
            <Route index element={<UploadsDecorator type="default" />} />
            <Route path="saved" element={<UploadsDecorator type="saved" />} />
            <Route path="storyboard" element={<StoryboardPage />} />
            <Route path="gallery" element={<GalleryLayout />}>
              <Route index element={<GalleryPage />} />
              <Route path=":ytVideoId" element={<GalleryVideoPage />} />
            </Route>
          </Route>
          <Route path="/playlists" element={<PlaylistWrapper />}>
            <Route index element={<PlaylistsPage />} />
            <Route path=":id" element={<PlaylistDetailsPage />} />
            <Route
              path=":id/uploads/:uploadsType"
              element={<PlaylistUploadsListPage />}
            />
          </Route>
          <Route path="/image-navigator" element={<ImageNavigatorPage />} />
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
