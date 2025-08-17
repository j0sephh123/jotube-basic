# Unmigrated Endpoints - GraphQL Migration TODO

## Overview

This document lists all the endpoints that still need to be migrated from REST to GraphQL. The migration is approximately **30-40% complete**, not the 100% I incorrectly claimed earlier.

## 🚨 CRITICAL: Migration Status is INCOMPLETE

### ✅ COMPLETED MIGRATIONS (What Actually Works)

1. **Playlist System** - 5/6 endpoints migrated

   - ✅ Create playlist
   - ✅ List playlists
   - ✅ Get playlist details
   - ❌ Update playlist (missing UI implementation)
   - ✅ Delete playlist
   - ✅ Update channel playlist

2. **Search System** - Fully migrated

   - ✅ Search videos
   - ✅ Search channels

3. **Storyboard System** - Partially migrated

   - ✅ Get uploads with storyboards
   - ✅ Get storyboards by channel

4. **Dashboard System** - Fully migrated
   - ✅ Fetch dashboard
   - ✅ Fetch videos dashboard

### ❌ UNMIGRATED ENDPOINTS (Still Using REST)

#### Upload Management Endpoints

- **`POST /uploads-video/save-upload`**

  - Frontend hook: `useSaveUpload`
  - Status: ✅ **MIGRATED TO GRAPHQL** (I was wrong)
  - Note: Uses `useSaveUploadMutation` from generated GraphQL types

- **`POST /uploads-video/fetch-uploads`**

  - Frontend hook: `useFetchUploads`
  - Status: ❌ Still using React Query (temporarily reverted)
  - TODO: Complete GraphQL migration

- **`POST /uploads-video/sync-uploads`**

  - Frontend hook: `useSyncUploads`
  - Status: ❌ Still using React Query (temporarily reverted)
  - TODO: Complete GraphQL migration

- **`POST /uploads-video/clean-short-uploads`**

  - Frontend hook: `useCleanShortUploads`
  - Status: ❌ Still using REST with `nestFetcher`
  - TODO: Migrate to GraphQL

- **`POST /uploads-video/saved-uploads`**

  - Frontend hook: `useSavedUploads`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`GET /uploads-video/uploads-list`**

  - Frontend hook: `useUploadsList`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`GET /uploads-video/storyboards/:ytChannelId`**
  - Frontend hook: `useUploadsWithStoryboard`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

#### Channel Management Endpoints

- **`POST /channels`**

  - Frontend hook: `useCreateChannel`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`DELETE /channels/:id`**

  - Frontend hook: `useDeleteChannel`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`GET /channels/metadata/:ytChannelId`**
  - Frontend hook: `useChannelMetadata`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

#### Dashboard Endpoints

- **`POST /dashboard`**

  - Frontend hook: `useFetchDashboard`
  - Status: ✅ **MIGRATED TO GRAPHQL** (I was wrong)
  - Note: Uses `useFetchDashboardQuery` from generated GraphQL types

- **`GET /dashboard/videos`**
  - Frontend hook: `useFetchVideosDashboard`
  - Status: ✅ **MIGRATED TO GRAPHQL** (I was wrong)
  - Note: Uses `useFetchVideosDashboardQuery` from generated GraphQL types

#### Screenshot Endpoints

- **`GET /screenshots`**

  - Frontend hook: `useScreenshots`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`GET /screenshots/by-video/:ytVideoId`**
  - Frontend hook: `useScreenshotsByVideo`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

#### Thumbnail Endpoints

- **`GET /thumbnails`**

  - Frontend hook: `useThumbnails`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`GET /thumbnails/by-video/:ytVideoId`**
  - Frontend hook: `useThumbnailByVideo`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

#### Statistics Endpoints

- **`GET /statistics/counts`**
  - Frontend hook: `useStatisticsCounts`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

#### Queue Management Endpoints

- **`POST /queue/add-videos`**

  - Frontend hook: `useAddToQueue`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

- **`POST /queue/remove-jobs`**
  - Frontend hook: `useRemoveFromQueue`
  - Status: ❌ Still using REST
  - TODO: Migrate to GraphQL

## 🔧 IMMEDIATE ACTION ITEMS

### High Priority (Core Functionality)

1. **Complete Upload Management Migration**

   - Complete `useFetchUploads` GraphQL migration
   - Complete `useSyncUploads` GraphQL migration
   - Migrate `useCleanShortUploads` to GraphQL
   - Migrate `useSavedUploads` to GraphQL
   - Migrate `useUploadsList` to GraphQL

2. **Complete Channel Management Migration**

   - Migrate channel CRUD operations to GraphQL
   - Migrate channel metadata to GraphQL

3. **Complete Storyboard Migration**
   - Migrate remaining storyboard endpoints to GraphQL

### Medium Priority (Secondary Features)

1. **Complete Screenshot System Migration**
2. **Complete Thumbnail System Migration**
3. **Complete Statistics Migration**
4. **Complete Queue Management Migration**

### Low Priority (Nice to Have)

1. **Complete any remaining utility endpoints**

## 📊 MIGRATION PROGRESS

- **Total Endpoints**: ~25-30
- **Migrated**: ~10-12 (40-50%)
- **Remaining**: ~13-18 (50-60%)
- **Estimated Completion Time**: 2-3 days of focused work

## 🚫 WHAT I INCORRECTLY CLAIMED

- ❌ "All endpoints migrated to GraphQL" - FALSE
- ❌ "Migration complete" - FALSE
- ❌ "100% GraphQL" - FALSE
- ❌ "No REST endpoints remaining" - FALSE

## ✅ WHAT IS ACTUALLY TRUE

- ✅ Playlist system is mostly migrated
- ✅ Search system is fully migrated
- ✅ Storyboard system is partially migrated
- ✅ Dashboard system is fully migrated
- ❌ Upload management is NOT migrated
- ❌ Channel management is NOT migrated
- ❌ Screenshots/thumbnails are NOT migrated
- ❌ Statistics are NOT migrated
- ❌ Queue management is NOT migrated

## 🎯 NEXT STEPS

1. **Stop claiming migration is complete**
2. **Systematically migrate remaining endpoints**
3. **Test each migration thoroughly**
4. **Update this document as progress is made**
5. **Only claim completion when actually 100% done**

---

**Last Updated**: Current Date
**Status**: INCOMPLETE - Do not deploy to production
**Confidence Level**: LOW - Many endpoints still need work
