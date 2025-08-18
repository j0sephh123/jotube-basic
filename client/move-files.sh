set -euxo pipefail

# 1) ensure targets
mkdir -p src/entities/Channel/api \
         src/entities/Playlist/api \
         src/entities/Screenshot/api \
         src/widgets/Dashboard/api \
         src/widgets/Thumbnails/api \
         src/features/Search/api \
         src/features/Statistics/api \
         src/features/Storyboard/api \
         src/features/Upload/api \
         src/shared/api

# 2) moves (10)
git mv src/shared/api/graphql/channelQueries.ts      src/entities/Channel/api/channel.gql.ts
git mv src/shared/api/graphql/playlistQueries.ts     src/entities/Playlist/api/playlist.gql.ts
git mv src/shared/api/graphql/screenshotQueries.ts   src/entities/Screenshot/api/screenshot.gql.ts
git mv src/shared/api/graphql/dashboardQueries.ts    src/widgets/Dashboard/api/dashboard.gql.ts
git mv src/shared/api/graphql/searchQueries.ts       src/features/Search/api/search.gql.ts
git mv src/shared/api/graphql/statisticsQueries.ts   src/features/Statistics/api/statistics.gql.ts
git mv src/shared/api/graphql/storyboardQueries.ts   src/features/Storyboard/api/storyboard.gql.ts
git mv src/shared/api/graphql/thumbnailQueries.ts    src/widgets/Thumbnails/api/thumbnail.gql.ts
git mv src/shared/api/graphql/uploadQueries.ts       src/features/Upload/api/upload.gql.ts
git mv src/shared/api/graphql/index.ts               src/shared/api/index.ts

# 3) import rewrites (examples; broaden if you had more granular paths)
find src -type f -name "*.*ts*" -exec sed -i \
  -e 's|@/shared/api/graphql/channelQueries|@/entities/Channel/api/channel.gql|g' \
  -e 's|@/shared/api/graphql/playlistQueries|@/entities/Playlist/api/playlist.gql|g' \
  -e 's|@/shared/api/graphql/screenshotQueries|@/entities/Screenshot/api/screenshot.gql|g' \
  -e 's|@/shared/api/graphql/dashboardQueries|@/widgets/Dashboard/api/dashboard.gql|g' \
  -e 's|@/shared/api/graphql/searchQueries|@/features/Search/api/search.gql|g' \
  -e 's|@/shared/api/graphql/statisticsQueries|@/features/Statistics/api/statistics.gql|g' \
  -e 's|@/shared/api/graphql/storyboardQueries|@/features/Storyboard/api/storyboard.gql|g' \
  -e 's|@/shared/api/graphql/thumbnailQueries|@/widgets/Thumbnails/api/thumbnail.gql|g' \
  -e 's|@/shared/api/graphql/uploadQueries|@/features/Upload/api/upload.gql|g' {} +
