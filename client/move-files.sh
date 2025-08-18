set -euxo pipefail

mkdir -p src/widgets/Dashboard/{model,lib,api}

git mv src/features/Dashboard/hooks/useDashboardContext.ts      src/widgets/Dashboard/model/useDashboardContext.ts
git mv src/features/Dashboard/hooks/useVideosDashboardContext.ts src/widgets/Dashboard/model/useVideosDashboardContext.ts
git mv src/features/Dashboard/hooks/useDashboard.ts             src/widgets/Dashboard/lib/useDashboard.ts
git mv src/features/Dashboard/hooks/useFetchDashboard.ts        src/widgets/Dashboard/lib/useFetchDashboard.ts
git mv src/features/Dashboard/hooks/useFetchVideosDashboard.ts  src/widgets/Dashboard/lib/useFetchVideosDashboard.ts
git mv src/features/Dashboard/hooks/useTitleClick.ts            src/widgets/Dashboard/lib/useTitleClick.ts
git mv src/features/Dashboard/hooks/index.ts                    src/widgets/Dashboard/lib/index.ts
git mv src/features/Dashboard/types.ts                          src/widgets/Dashboard/types.ts
git mv src/features/Dashboard/useChannelsDashboardQuery.ts      src/widgets/Dashboard/api/useChannelsDashboardQuery.ts
git mv src/features/Dashboard/useVideosDashboardQuery.ts        src/widgets/Dashboard/api/useVideosDashboardQuery.ts

find src -type f -name "*.*ts*" -exec sed -i \
  -e 's|@/features/Dashboard/hooks/|@/widgets/Dashboard/lib/|g' \
  -e 's|@/features/Dashboard/types|@/widgets/Dashboard/types|g' \
  -e 's|@/features/Dashboard/useChannelsDashboardQuery|@/widgets/Dashboard/api/useChannelsDashboardQuery|g' \
  -e 's|@/features/Dashboard/useVideosDashboardQuery|@/widgets/Dashboard/api/useVideosDashboardQuery|g' {} +
