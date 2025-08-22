import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/Layout";
import { ScreenshotsPage } from "@pages/screenshots";
import { ScreenshotsByMonthPage } from "@pages/screenshots-month";
import { ScreenshotsByDatePage } from "@pages/screenshots-date";
import { SavedUploadsPage } from "@pages/saved-uploads";
import { ChannelPageLayout } from "@widgets/ChannelPageLayout";
import { GalleryPage } from "@pages/gallery";
import Dashboard from "@features/Dashboard";
import { DashboardWrapper } from "@widgets/Dashboard";
import { UploadsPage } from "@pages/uploads";
import { GalleryVideoPage } from "@pages/gallery-video";
import { StoryboardPage } from "@pages/storyboard";
import { ImageNavigatorPage } from "@pages/image-navigator";
import { PlaylistsPage, PlaylistDetailsPage } from "@features/Playlist";
import { NotFound } from "@shared/ui";

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
            <Route path=":type" element={<Dashboard />}>
              <Route path=":viewType" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/channels/:ytChannelId" element={<ChannelPageLayout />}>
            <Route index element={<UploadsPage />} />
            <Route path="saved" element={<SavedUploadsPage />} />
            <Route path="storyboard" element={<StoryboardPage />} />
            <Route path="gallery" element={<GalleryPage />}>
              <Route index element={<GalleryPage />} />
              <Route path=":ytVideoId" element={<GalleryVideoPage />} />
            </Route>
          </Route>
          <Route path="/screenshots" element={<ScreenshotsPage />}>
            <Route index element={<ScreenshotsPage />} />
            <Route path=":month" element={<ScreenshotsByMonthPage />} />
            <Route path=":month/:date" element={<ScreenshotsByDatePage />} />
          </Route>
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailsPage />} />
          <Route path="/image-navigator" element={<ImageNavigatorPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
