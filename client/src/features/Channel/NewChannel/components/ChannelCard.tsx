import { useState } from "react";
import FetchUploadsButton from "@/features/Upload/components/FetchUploadsButton";
import DeleteChannel from "@/features/Channel/NewChannel/components/DeleteChannel";
import ChannelLink from "@/shared/components/ChannelLink";

type ChannelCardProps = {
  channel: {
    id: number;
    src: string;
    title: string;
    createdAt: string;
    ytId: string;
    videoCount?: number;
  };
  onRefetch?: () => void;
  showActions?: boolean;
  clickable?: boolean;
}

export default function ChannelCard({
  channel,
  onRefetch,
  showActions = true,
  clickable = true,
}: ChannelCardProps): JSX.Element {
  const [imageError, setImageError] = useState(false);

  const cardContent = (
    <div className="flex gap-4 p-2 rounded transition-colors relative border-2 border-gray-500/30 h-fit max-w-full w-full hover:bg-gray-700/50">
      {imageError ? (
        <div className="w-32 h-20 bg-gray-600 rounded ml-2 my-2 shrink-0 flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      ) : (
        <img
          src={channel.src}
          alt={channel.title}
          className="w-32 h-20 object-cover rounded ml-2 my-2 shrink-0"
          onError={() => setImageError(true)}
        />
      )}
      <div className="w-[36%] flex flex-col justify-center gap-1 min-w-0">
        <h3 className="font-medium truncate block w-[95%] text-base leading-tight mb-0.5">
          {channel.title}
        </h3>
        <span className="text-xs text-gray-400">
          Created:{" "}
          <span className="font-semibold text-gray-200">
            {new Date(channel.createdAt).toLocaleDateString()}
          </span>
        </span>
        {channel.videoCount !== undefined && (
          <span className="text-xs text-gray-400">
            Videos:{" "}
            <span className="font-semibold text-gray-200">
              {channel.videoCount}
            </span>
          </span>
        )}
        {showActions && onRefetch && channel.videoCount !== undefined && (
          <>
            <FetchUploadsButton
              ytChannelId={channel.ytId}
              videoCount={channel.videoCount}
              onSuccess={onRefetch}
            />
            <DeleteChannel id={channel.id} onSuccess={onRefetch} />
          </>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <ChannelLink ytId={channel.ytId} where="index">
        {cardContent}
      </ChannelLink>
    );
  }

  return cardContent;
}
