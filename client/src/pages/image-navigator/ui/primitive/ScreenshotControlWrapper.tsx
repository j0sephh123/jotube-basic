import type { PropsWithChildren } from "react";

export default function ScreenshotControlWrapper({
  children,
}: PropsWithChildren) {
  return (
    <div className="flex justify-center mt-16">
      <div className="relative group">{children}</div>
    </div>
  );
}
