import { AutoSizer, Grid } from "react-virtualized";
import type { GridCellProps } from "react-virtualized";
import type { WithSrc, GalleryProps } from "./types";
import clsx from "clsx";

export function GalleryVirtualised<T extends WithSrc>({
  items,
  ItemComponent,
  itemsPerRow = 4,
  rowHeight = 200,
  onScrollProgress,
  className,
}: GalleryProps<T>) {
  return (
    <div className={clsx("w-full h-[78vh]", className)}>
      <AutoSizer>
        {(size: { width: number; height: number }) => {
          const { width, height } = size;
          const colCount = Math.max(1, itemsPerRow);
          const colWidth = Math.floor(width / colCount);
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
              rowHeight={rowHeight}
              overscanRowCount={3}
              cellRenderer={cell}
              onScroll={({ scrollTop }) => {
                const totalHeight = rowCount * rowHeight;
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
