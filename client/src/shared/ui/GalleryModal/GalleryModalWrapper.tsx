// eslint-disable-next-line boundaries/element-types
import { closeGalleryModal } from "@features/Gallery";
import { type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export function GalleryModalWrapper({ children }: PropsWithChildren) {
  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={closeGalleryModal}
    >
      <div
        className="bg-base-100 w-full h-full p-0 relative overflow-hidden"
        style={{ maxWidth: "100vw", maxHeight: "100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="btn btn-lg btn-circle btn-ghost absolute right-4 top-4 z-50"
          onClick={closeGalleryModal}
        >
          ✕
        </button>
        <div className="w-full h-full p-4 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}
