import { forwardRef } from "react";

const Container = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; onWheel?: (event: React.WheelEvent) => void }
>(({ children, onWheel }, ref) => (
  <div
    ref={ref}
    className="overflow-auto flex flex-col items-center"
    style={{ maxHeight: "calc(100vh - 140px)" }}
    onWheel={onWheel}
  >
    {children}
  </div>
));

export default Container;
