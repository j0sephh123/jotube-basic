import { Outlet } from "react-router-dom";
import TheCarousel from "@/features/Screenshot/components/TheCarousel";
import CreateChannelButton from "@/features/Channel/CreateChannelButton";
import { useSSE } from "@/shared/hooks/useSSE";
import TheNavbar from "@/shared/components/Navbar";
import { DialogProvider } from "./dialog/DialogProvider";
import ThumbnailsProcessing from "@/features/Thumbnail/components";
  
export default function TheLayout(): JSX.Element {
  useSSE();

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
