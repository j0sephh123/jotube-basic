import { AutoSizer, Grid as ReactVirtualizedGrid } from "react-virtualized";
import type { GridCellProps as ReactVirtualizedGridCellProps } from "react-virtualized";
import type { VirtualizerProps } from "./types";
import clsx from "clsx";
import { useState } from "react";
// eslint-disable-next-line import/no-internal-modules
import { setSelectedItems } from "@shared/store/selectedItemsStore";

export function Virtualizer<T>({
  items,
  ItemComponent,
  itemsPerRow = 4,
  className,
  flexibleHeight = false,
  getItemId = (item: any) => item.id,
}: VirtualizerProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

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
            <div className="relative">
              <ReactVirtualizedGrid
                width={width}
                height={height}
                columnCount={colCount}
                columnWidth={colWidth}
                rowCount={rowCount}
                rowHeight={computedRowHeight}
                overscanRowCount={3}
                onScroll={({ scrollTop }) => setScrollTop(scrollTop)}
                containerStyle={{
                  overflow: "auto",
                  paddingLeft: 32, // space for the button rail
                }}
                cellRenderer={cell}
              />

              {/* Button rail stays inside same scroll context */}
              <div
                className="absolute left-0 top-0"
                style={{
                  transform: `translateY(${-scrollTop}px)`,
                  width: 32,
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: rowCount }).map((_, rowIndex) => {
                  const startIndex = rowIndex * colCount;
                  const endIndex = Math.min(
                    startIndex + colCount,
                    items.length
                  );
                  const rowItems = items.slice(startIndex, endIndex);
                  const rowItemIds = rowItems.map((item) => getItemId(item));

                  return (
                    <div
                      key={`row-btn-${rowIndex}`}
                      style={{
                        height: computedRowHeight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "auto",
                      }}
                    >
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm rounded px-1"
                        onClick={() => {
                          setSelectedItems((prev) => [
                            ...new Set([...prev, ...rowItemIds]),
                          ]);
                        }}
                      >
                        Select Row
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
}
