import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TheLayout from "./shared/components/Layout";
import ScreenshotsPage from "./pages/ScreenshotsPage";
import ScreenshotsByMonth from "./pages/ScreenshotsPageMonth";
import ScreenshotsByDayDate from "./pages/ScreenshotsPageDate";
import ScreenshotsLayout from "./features/Screenshot/components/ScreenshotsPageLayout";
import SavedUploads from "./pages/SavedUploadsPage";
import ChannelsPageWrapper from "./features/Channel/ChannelsPageLayout";
import GalleryPage from "./pages/GalleryPage";
import GalleryLayout from "./features/Gallery/components/GalleryLayout";
import Dashboard from "@/features/Dashboard/views";
import DashboardWrapper from "@/features/Dashboard/components/DashboardWrapper";
import DefaultUploadsPage from "./pages/DefaultUploadsPage";
import GalleryVideoPage from "./features/Gallery/components/GalleryVideoPage";
import NotFound from "./shared/components/static/NotFound";

export const Router = (
  <BrowserRouter>
    <Routes>
      <Route element={<TheLayout />}>
        <Route path="/" element={<Navigate to="/dashboard/saved" />} />
        <Route path="dashboard" element={<DashboardWrapper />}>
          <Route path=":viewType" element={<Dashboard />} />
        </Route>
        <Route path="/channels/:ytChannelId" element={<ChannelsPageWrapper />}>
          <Route index element={<DefaultUploadsPage />} />
          <Route path="saved" element={<SavedUploads />} />
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
