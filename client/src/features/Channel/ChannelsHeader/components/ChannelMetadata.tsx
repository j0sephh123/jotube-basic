import { useLocation } from "react-router-dom";
import ChannelLink from "@/shared/components/ChannelLink";
import OpenExplorerButton from "@/shared/components/OpenDirectoryButton/OpenDirectoryButton";
import CopyValue from "@/shared/components/CopyValue";
import clsx from "clsx";
import BulkOperations from "./BulkOperations";

type Props = {
  ytChannelId: string;
  metadata:
    | {
        title: string;
        videoArtifactsCount: number;
        savedArtifactsCount: number;
        screenshotArtifactsCount: number;
      }
    | undefined;
  isSavedPage: boolean;
  isIndexPage: boolean;
};

const ChannelMetadata = ({
  ytChannelId,
  metadata,
  isSavedPage,
  isIndexPage,
}: Props) => {
  const location = useLocation();

  const isActiveRoute = (where: "index" | "saved" | "gallery") => {
    const path = `/channels/${ytChannelId}${
      where === "index" ? "" : `/${where}`
    }`;
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ChannelLink ytId={ytChannelId} where="saved">
          <h2 className="text-xl font-bold pr-4">{metadata?.title}</h2>
        </ChannelLink>
        <CopyValue type="youtube" value={ytChannelId} />
        <OpenExplorerButton ytChannelId={ytChannelId} />
      </div>
      <div className="flex flex-wrap gap-2">
        <ChannelLink ytId={ytChannelId} where="index">
          <button
            className={clsx("btn btn-sm", {
              "btn-primary": isActiveRoute("index"),
              "btn-ghost": !isActiveRoute("index"),
            })}
          >
            Uploads: {metadata?.videoArtifactsCount}
          </button>
        </ChannelLink>
        <ChannelLink ytId={ytChannelId} where="saved">
          <button
            className={clsx("btn btn-sm", {
              "btn-primary": isActiveRoute("saved"),
              "btn-ghost": !isActiveRoute("saved"),
            })}
          >
            Saved: {metadata?.savedArtifactsCount}
          </button>
        </ChannelLink>
        <ChannelLink ytId={ytChannelId} where="gallery">
          <button
            className={clsx("btn btn-sm", {
              "btn-primary": isActiveRoute("gallery"),
              "btn-ghost": !isActiveRoute("gallery"),
            })}
          >
            Gallery: {metadata?.screenshotArtifactsCount}
          </button>
        </ChannelLink>
        <BulkOperations
          ytChannelId={ytChannelId}
          isSavedPage={isSavedPage}
          isIndexPage={isIndexPage}
        />
      </div>
    </div>
  );
};

export default ChannelMetadata;
