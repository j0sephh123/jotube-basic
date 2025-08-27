import { AutoSizer, Grid } from "react-virtualized";
import type { GridCellProps } from "react-virtualized";
import type { WithSrc, GalleryProps } from "./types";
import clsx from "clsx";

export function GalleryVirtualised<T extends WithSrc>({
  items,
  ItemComponent,
  itemsPerRow = 4,
  onScrollProgress,
  className,
}: GalleryProps<T>) {
  return (
    <div className={clsx("w-full h-[78vh]", className)}>
      <AutoSizer>
        {({ width, height }: { width: number; height: number }) => {
          const colCount = Math.max(1, itemsPerRow);
          const colWidth = Math.floor(width / colCount);

          // Tailwind p-2 = 8px each side
          const gutter = 8;
          const horizontalPad = gutter * 2;
          const verticalPad = gutter * 2;

          // 16:9 aspect box inside the padded cell
          const aspect = 16 / 9;
          const innerWidth = Math.max(0, colWidth - horizontalPad);
          const contentHeight = Math.ceil(innerWidth / aspect);
          const computedRowHeight = contentHeight + verticalPad;

          const rowCount = Math.ceil(items.length / colCount);

          const cell = ({
            columnIndex,
            rowIndex,
            key,
            style,
          }: GridCellProps) => {
            const index = rowIndex * colCount + columnIndex;
            if (index >= items.length) return <div key={key} style={style} />;
            const item = items[index]!;
            return (
              <div key={key} style={style} className="p-2 box-border">
                <ItemComponent item={item} src={item.src} />
              </div>
            );
          };

          return (
            <Grid
              width={width}
              height={height}
              columnCount={colCount}
              columnWidth={colWidth}
              rowCount={rowCount}
              rowHeight={computedRowHeight}
              overscanRowCount={3}
              cellRenderer={cell}
              onScroll={({ scrollTop }) => {
                const totalHeight = rowCount * computedRowHeight;
                const scrollProgress = Math.min(scrollTop / totalHeight, 1);
                onScrollProgress?.(scrollProgress);
              }}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}
