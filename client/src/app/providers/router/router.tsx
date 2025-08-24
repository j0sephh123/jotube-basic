import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/Layout";
import { ScreenshotsPage } from "@pages/screenshots";
import { ScreenshotsByMonthPage } from "@pages/screenshots-month";
import { ScreenshotsByDatePage } from "@pages/screenshots-date";
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
import {
  UploadsDecorator,
  SavedUploads,
  DefaultUploads,
} from "@features/Upload";

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
            <Route
              index
              element={
                <UploadsDecorator type="default" Component={DefaultUploads} />
              }
            />
            <Route
              path="saved"
              element={
                <UploadsDecorator type="saved" Component={SavedUploads} />
              }
            />
            <Route path="storyboard" element={<StoryboardPage />} />
            <Route path="gallery" element={<GalleryLayout />}>
              <Route index element={<GalleryPage />} />
              <Route path=":ytVideoId" element={<GalleryVideoPage />} />
            </Route>
          </Route>
          <Route path="/screenshots" element={<ScreenshotsPage />} />
          <Route
            path="/screenshots/:month"
            element={<ScreenshotsByMonthPage />}
          />
          <Route
            path="/screenshots/:month/:date"
            element={<ScreenshotsByDatePage />}
          />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailsPage />} />
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
