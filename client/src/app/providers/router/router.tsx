import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/widgets/Layout/ui/Layout";
import ScreenshotsPage from "@/pages/screenshots/ui/Page";
import ScreenshotsByMonth from "@/pages/screenshots-month/ui/Page";
import ScreenshotsByDayDate from "@/pages/screenshots-date/ui/Page";
import ScreenshotsLayout from "@/features/Screenshot/components/ScreenshotsPageLayout";
import SavedUploads from "@/pages/saved-uploads/ui/Page";
import ChannelPageLayout from "@/widgets/ChannelPageLayout/ui/ChannelPageLayout";
import GalleryPage from "@/pages/gallery/ui/Page";
import GalleryLayout from "@/features/Gallery/components/GalleryLayout";
import Dashboard from "@/features/Dashboard";
import DashboardWrapper from "@/widgets/Dashboard/ui/DashboardWrapper";
import DefaultUploadsPage from "@/pages/uploads/ui/Page";
import GalleryVideoPage from "@/pages/gallery-video/ui/Page";
import StoryboardPage from "@/pages/storyboard/ui/Page";
import { PlaylistsPage, PlaylistDetailsPage } from "@/features/Playlist";
import NotFound from "@/shared/ui/static/NotFound";

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
            <Route index element={<DefaultUploadsPage />} />
            <Route path="saved" element={<SavedUploads />} />
            <Route path="storyboard" element={<StoryboardPage />} />
            <Route path="gallery" element={<GalleryLayout />}>
              <Route index element={<GalleryPage />} />
              <Route path=":ytVideoId" element={<GalleryVideoPage />} />
            </Route>
          </Route>
          <Route path="/screenshots" element={<ScreenshotsLayout />}>
            <Route index element={<ScreenshotsPage />} />
            <Route path=":month" element={<ScreenshotsByMonth />} />
            <Route path=":month/:date" element={<ScreenshotsByDayDate />} />
          </Route>
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
