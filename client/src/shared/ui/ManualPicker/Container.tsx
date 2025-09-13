import { forwardRef } from "react";
// eslint-disable-next-line boundaries/element-types
import { IMG_WIDTH } from "@features/Thumbnails";

export const Container = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    className="overflow-auto flex flex-col items-center"
    style={{ maxHeight: "calc(100vh - 140px)" }}
  >
    <div className="relative inline-block" style={{ width: `${IMG_WIDTH}px` }}>
      {children}
    </div>
  </div>
));
