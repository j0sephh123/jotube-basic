import { forwardRef } from "react";

const Container = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <div
    ref={ref}
    className="overflow-auto flex flex-col items-center"
    style={{ maxHeight: "calc(100vh - 140px)" }}
  >
    {children}
  </div>
));

export default Container;
