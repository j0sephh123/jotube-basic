import { Outlet } from "react-router-dom";
import TheCarousel from "@/features/Screenshot/components/TheCarousel";
import { CreateChannelButton } from "@/features/Channel/CreateChannel";
import { useSSE } from "@/shared/hooks/useSSE";
import { useGlobalWebSocket } from "@/shared/hooks/useGlobalWebSocket";
import TheNavbar from "@/shared/components/Navbar";
import { DialogProvider } from "./dialog/DialogProvider";
import ThumbnailsProcessing from "@/features/Thumbnail/components";

export default function Layout(): JSX.Element {
  useSSE();
  useGlobalWebSocket();

  return (
    <DialogProvider>
      <TheNavbar />
      <div className="w-full h-[99vh] overflow-hidden">
        <Outlet />
      </div>
      <CreateChannelButton />
      <TheCarousel />
      <ThumbnailsProcessing />
    </DialogProvider>
  );
}
