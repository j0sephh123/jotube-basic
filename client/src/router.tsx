import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TheLayout from "./shared/components/Layout";
import ScreenshotsPage from "./pages/ScreenshotsPage";
import ScreenshotsByMonth from "./pages/ScreenshotsPageMonth";
import ScreenshotsByDayDate from "./pages/ScreenshotsPageDate";
import ScreenshotsLayout from "./features/Screenshot/components/ScreenshotsPageLayout";
import SavedUploads from "./pages/SavedUploadsPage";
import ChannelsPageWrapper from "./features/Channel/ChannelsPageLayout";
import ThumbnailsPage from "./pages/ThumbnailsPage";
import ChannelsWithoutScreenshotsPage from "./pages/ChannelsWithoutScreenshotsPage";
import GalleryPage from "./pages/GalleryPage";
import GalleryLayout from "./features/Gallery/components/GalleryLayout";
import Dashboard from "@/features/Dashboard/components/Dashboard";
import DashboardWrapper from "@/features/Dashboard/components/DashboardWrapper";
import The404 from "./shared/components/404";
import DefaultUploadsPage from "./pages/DefaultUploadsPage";
import NewChannelsPage from "./pages/ChannelsWithoutUploadsPage";
import GalleryVideoPage from "./features/Gallery/components/GalleryVideoPage";

export const Router = (
  <BrowserRouter>
    <Routes>
      <Route element={<TheLayout />}>
        <Route path="/" element={<Navigate to="/dashboard/saved" />} />
        <Route path="dashboard" element={<DashboardWrapper />}>
          <Route path=":viewType" element={<Dashboard />} />
          <Route
            path="channels-without-uploads"
            element={<NewChannelsPage />}
          />
          <Route
            path="channels-without-screenshots"
            element={<ChannelsWithoutScreenshotsPage />}
          />
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
        <Route path="/thumbnails" element={<ThumbnailsPage />} />
        <Route path="*" element={<The404 />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
