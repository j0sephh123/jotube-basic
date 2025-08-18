set -euxo pipefail

mkdir -p src/widgets/Dashboard/model src/widgets/PaginationControl/{ui,lib} src/widgets/RangePicker/ui

git mv src/features/Dashboard/store/dashboard-slice.ts          src/widgets/Dashboard/model/dashboard-slice.ts
git mv src/features/Dashboard/store/videos-dashboard-slice.ts   src/widgets/Dashboard/model/videos-dashboard-slice.ts
git mv src/features/Dashboard/store/range-picker-slice.ts       src/widgets/Dashboard/model/range-picker-slice.ts
git mv src/features/Dashboard/store/videos-range-picker-slice.ts src/widgets/Dashboard/model/videos-range-picker-slice.ts
git mv src/features/Dashboard/widgets/PaginationControl/index.tsx src/widgets/PaginationControl/ui/PaginationControl.tsx
git mv src/features/Dashboard/widgets/PaginationControl/getPaginationRange.ts src/widgets/PaginationControl/lib/getPaginationRange.ts
git mv src/features/Dashboard/widgets/RangePicker/index.ts      src/widgets/RangePicker/index.ts
git mv src/features/Dashboard/widgets/RangePicker/RangePicker.tsx src/widgets/RangePicker/ui/RangePicker.tsx
git mv src/features/Dashboard/widgets/RangePicker/RangeFilter.tsx src/widgets/RangePicker/ui/RangeFilter.tsx
git mv src/features/Dashboard/widgets/RangePicker/RangeFilterPopover.tsx src/widgets/RangePicker/ui/RangeFilterPopover.tsx

find src -type f -name "*.*ts*" -exec sed -i \
  -e 's|@/features/Dashboard/store/|@/widgets/Dashboard/model/|g' \
  -e 's|@/features/Dashboard/widgets/PaginationControl/|@/widgets/PaginationControl/|g' \
  -e 's|@/features/Dashboard/widgets/RangePicker/|@/widgets/RangePicker/|g' {} +
