import { useLocation } from "react-router-dom";
import ChannelLink from "@/shared/components/ChannelLink";
import OpenExplorerButton from "@/shared/components/OpenDirectoryButton/OpenDirectoryButton";
import CopyValue from "@/shared/components/CopyValue";
import clsx from "clsx";
import BulkOperations from "./BulkOperations";

type Props = {
  ytChannelId: string;
  title: string;
  videoArtifactsCount: number;
  savedArtifactsCount: number;
  screenshotArtifactsCount: number;
  storyboardArtifactsCount: number;
  isSavedPage: boolean;
  isIndexPage: boolean;
};

const ChannelMetadata = ({
  ytChannelId,
  title,
  videoArtifactsCount,
  savedArtifactsCount,
  screenshotArtifactsCount,
  storyboardArtifactsCount,
  isSavedPage,
  isIndexPage,
}: Props) => {
  const location = useLocation();

  const isActiveRoute = (
    where: "index" | "saved" | "gallery" | "storyboard"
  ) => {
    const path = `/channels/${ytChannelId}${
      where === "index" ? "" : `/${where}`
    }`;
    return location.pathname === path;
  };

  const links = [
    {
      where: "index" as const,
      label: "Uploads",
      count: videoArtifactsCount,
    },
    {
      where: "storyboard" as const,
      label: "Storyboard",
      count: storyboardArtifactsCount,
    },
    {
      where: "saved" as const,
      label: "Saved",
      count: savedArtifactsCount,
    },
    {
      where: "gallery" as const,
      label: "Gallery",
      count: screenshotArtifactsCount,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ChannelLink ytId={ytChannelId} where="saved">
          <h2 className="text-xl font-bold pr-4">{title}</h2>
        </ChannelLink>
        <CopyValue type="youtube" value={ytChannelId} />
        <OpenExplorerButton ytChannelId={ytChannelId} />
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(({ where, label, count }) => (
          <ChannelLink key={where} ytId={ytChannelId} where={where}>
            <button
              className={clsx("btn btn-sm", {
                "btn-primary": isActiveRoute(where),
                "btn-ghost": !isActiveRoute(where),
              })}
            >
              {label}: {count}
            </button>
          </ChannelLink>
        ))}
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
