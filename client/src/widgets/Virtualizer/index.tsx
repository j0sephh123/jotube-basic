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
    <div className={clsx("w-full h-[80vh]", className)}>
      <AutoSizer>
        {({ width, height }: { width: number; height: number }) => {
          const colCount = Math.max(1, itemsPerRow);
          const totalGapWidth = (colCount - 1) * 8;
          const colWidth = Math.floor((width - totalGapWidth) / colCount);

          const gutter = 8;
          const horizontalPad = gutter * 2;
          const verticalPad = gutter * 2;

          const innerWidth = Math.max(0, colWidth - horizontalPad);
          const aspect = 16 / 9;
          const baseHeight = Math.ceil(innerWidth / aspect);
          const extraContentHeight = flexibleHeight ? 120 : 0;
          const computedRowHeight =
            baseHeight + extraContentHeight + verticalPad;

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
            const gapOffset = columnIndex * 8;
            const adjustedStyle = {
              ...style,
              left: (style.left as number) + gapOffset,
            };
            return (
              <div
                key={key}
                style={adjustedStyle}
                className="box-border relative"
              >
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
              containerStyle={{
                overflow: "auto",
              }}
              cellRenderer={cell}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
}
