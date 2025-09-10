/* eslint-disable import/no-internal-modules */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@app/Layout";
import { ChannelPageLayout } from "@widgets/ChannelPageLayout";
import { ImageNavigatorPage } from "@pages/image-navigator";
import { PlaylistsPage } from "@pages/playlists";
import { PlaylistDetailsPage } from "@pages/playlist-details";
import { RecentlyViewedPage } from "@pages/recently-viewed";
import { TvPage } from "@pages/tv";
import { TvDetailsPage } from "@pages/tv-details";
import { EpisodeDetailsPage } from "@pages/episode-details";
import { NotFound } from "@shared/ui";
import { UploadsDecorator } from "@features/Upload";
import { PlaylistUploadsListPage } from "@pages/playlistUploadsList";
import {
  ProcessingPhasePage,
  ProcessingPhaseWrapper,
} from "@pages/processing-phase";
import { PageWrapper } from "@widgets/PageWrapper";
import { VideoDetailsPage } from "@pages/video-details";
import { DashboardType } from "@features/Dashboard";
import VideosDashboardPage from "@widgets/Dashboard/ui/VideosDashboardPage";
import ChannelsDashboardPage from "@widgets/Dashboard/ui/ChannelsDashboardPage";

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
            path={`/dashboard/${DashboardType.CHANNELS}/:viewType`}
            element={<ChannelsDashboardPage />}
          />
          <Route
            path={`/dashboard/${DashboardType.VIDEOS}/:viewType`}
            element={<VideosDashboardPage />}
          />
          <Route
            path="/channels/:ytChannelId"
            element={<Navigate to="default" />}
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
            <Route path=":playlistId" element={<PlaylistDetailsPage />} />
            <Route
              path=":playlistId/uploads/:uploadsType"
              element={<PlaylistUploadsListPage />}
            />
          </Route>
          <Route path="/tv" element={<PageWrapper />}>
            <Route index element={<TvPage />} />
            <Route path=":tvId" element={<TvDetailsPage />} />
            <Route
              path=":tvId/episode/:episodeId"
              element={<EpisodeDetailsPage />}
            />
          </Route>
          <Route path="/image-navigator" element={<ImageNavigatorPage />} />
          <Route path="/recently-viewed" element={<RecentlyViewedPage />} />
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
