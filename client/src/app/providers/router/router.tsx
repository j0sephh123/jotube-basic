/* eslint-disable import/no-internal-modules */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/Layout";
import { ChannelPageLayout } from "@widgets/ChannelPageLayout";
import { ImageNavigatorPage } from "@pages/image-navigator";
import { PlaylistsPage } from "@pages/playlists";
import { RecentlyViewedPage } from "@pages/recently-viewed";
import SimpleStorybookPage from "@pages/simple-storybook";
import { TvDetailsPage } from "@pages/tv-details";
import { EpisodeDetailsPage } from "@pages/episode-details";
import { NotFound } from "@shared/ui";
import { UploadsDecorator } from "@features/Upload";
import {
  ProcessingPhasePage,
  ProcessingPhaseWrapper,
} from "@pages/processing-phase";
import { PageWrapper } from "@widgets/PageWrapper";
import { VideoDetailsPage } from "@pages/video-details";
import DashboardPage from "@widgets/Dashboard/components/DashboardPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard/channels/saved" />}
          />
          <Route
            path="/dashboard/videos/no-screenshots"
            element={<Navigate to="/dashboard/videos/storyboards" />}
          />
          <Route
            path="/dashboard/videos/no-uploads"
            element={<Navigate to="/dashboard/videos/storyboards" />}
          />

          <Route
            path="/dashboard/tv/no-uploads"
            element={<Navigate to="/dashboard/tv/tvs" />}
          />
          <Route
            path="/dashboard/tv/no-screenshots"
            element={<Navigate to="/dashboard/tv/tvs" />}
          />
          <Route
            path="/dashboard/tv/storyboards"
            element={<Navigate to="/dashboard/tv/tvs" />}
          />

          <Route
            path="/dashboard/tv/processed"
            element={<Navigate to="/dashboard/tv/tvs" />}
          />

          <Route
            path={`/dashboard/:dashboardType/:viewType`}
            element={<DashboardPage />}
          />
          <Route
            path={`/dashboard/:dashboardType/:viewType/:playlistId`}
            element={<DashboardPage />}
          />
          <Route
            path="/channels/:ytChannelId"
            element={<Navigate to="default" replace />}
          />
          <Route
            path="/channels/:ytChannelId/:uploadsType"
            element={
              <ChannelPageLayout>
                <UploadsDecorator />
              </ChannelPageLayout>
            }
          />
          <Route
            path="/channels/:ytChannelId/videos/:ytVideoId"
            element={<VideoDetailsPage />}
          />
          <Route path="/playlists" element={<PageWrapper />}>
            <Route index element={<PlaylistsPage />} />
          </Route>
          <Route path="/tv" element={<PageWrapper />}>
            <Route path=":tvId" element={<TvDetailsPage />} />
            <Route
              path=":tvId/episode/:episodeId"
              element={<EpisodeDetailsPage />}
            />
          </Route>
          <Route path="/image-navigator" element={<ImageNavigatorPage />} />
          <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
          <Route path="/simple-storybook" element={<SimpleStorybookPage />} />
          <Route path="/processing-phase" element={<ProcessingPhaseWrapper />}>
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
