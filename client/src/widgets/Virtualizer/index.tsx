import { AutoSizer, Grid as ReactVirtualizedGrid } from "react-virtualized";
import type { GridCellProps as ReactVirtualizedGridCellProps } from "react-virtualized";
import type { VirtualizerProps } from "./types";
import clsx from "clsx";

export function Virtualizer<T>({
  items,
  ItemComponent,
  itemsPerRow = 4,
  className,
  flexibleHeight = false,
}: VirtualizerProps<T>) {
  return (
    <div className={clsx("w-full h-[78vh]", className)}>
      <AutoSizer>
        {({ width, height }: { width: number; height: number }) => {
          const colCount = Math.max(1, itemsPerRow);
          // Account for gaps between columns (8px gap between each column)
          const totalGapWidth = (colCount - 1) * 8;
          const colWidth = Math.floor((width - totalGapWidth) / colCount);

          // Tailwind p-2 = 8px each side
          const gutter = 8;
          const horizontalPad = gutter * 2;
          const verticalPad = gutter * 2;

          // Calculate row height based on flexibleHeight prop
          let computedRowHeight: number;
          if (flexibleHeight) {
            // For flexible height (like cards with content), use a larger fixed height
            const innerWidth = Math.max(0, colWidth - horizontalPad);
            const aspect = 16 / 9;
            const imageHeight = Math.ceil(innerWidth / aspect);
            // Add extra height for card content (title, buttons, metadata)
            const extraContentHeight = 120;
            computedRowHeight = imageHeight + extraContentHeight + verticalPad;
          } else {
            // Original 16:9 aspect calculation for image-only content
            const aspect = 16 / 9;
            const innerWidth = Math.max(0, colWidth - horizontalPad);
            const contentHeight = Math.ceil(innerWidth / aspect);
            computedRowHeight = contentHeight + verticalPad;
          }

          const rowCount = Math.ceil(items.length / colCount);

          const cell = ({
            columnIndex,
            rowIndex,
            key,
            style,
          }: ReactVirtualizedGridCellProps) => {
            const index = rowIndex * colCount + columnIndex;
            if (index >= items.length) return <div key={key} style={style} />;
            const item = items[index]!;
            // Add gap spacing between columns
            const gapOffset = columnIndex * 8;
            const adjustedStyle = {
              ...style,
              left: (style.left as number) + gapOffset,
            };
            return (
              <div key={key} style={adjustedStyle} className="box-border">
                <ItemComponent item={item} />
              </div>
            );
          };

          return (
            <ReactVirtualizedGrid
              width={width}
              height={height}
              columnCount={colCount}
              columnWidth={colWidth}
              rowCount={rowCount}
              rowHeight={computedRowHeight}
              overscanRowCount={3}
              cellRenderer={cell}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}
