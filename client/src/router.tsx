import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./shared/components/Layout";
import ScreenshotsPage from "./pages/ScreenshotsPage";
import ScreenshotsByMonth from "./pages/ScreenshotsPageMonth";
import ScreenshotsByDayDate from "./pages/ScreenshotsPageDate";
import ScreenshotsLayout from "./features/Screenshot/components/ScreenshotsPageLayout";
import SavedUploads from "./pages/SavedUploadsPage";
import ChannelPageLayout from "./features/Channel/ChannelPageLayout";
import GalleryPage from "./pages/GalleryPage";
import GalleryLayout from "./features/Gallery/components/GalleryLayout";
import Dashboard from "@/features/Dashboard";
import DashboardWrapper from "@/features/Dashboard/components/DashboardWrapper";
import DefaultUploadsPage from "./pages/DefaultUploadsPage";
import GalleryVideoPage from "./features/Gallery/components/GalleryVideoPage";
import StoryboardPage from "./pages/StoryboardPage";
import { PlaylistsPage, PlaylistDetailsPage } from "./features/Playlist";
import NotFound from "./shared/components/static/NotFound";
import { TodosFetcher } from "./shared/components/TodosFetcher";

export const Router = (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard/channels/saved" />} />
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
        <Route path="/todos" element={<TodosFetcher />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
