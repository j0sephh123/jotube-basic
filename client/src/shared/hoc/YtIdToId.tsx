import { useTypedParams } from "@shared/hooks";
import { useConvertQuery } from "@shared/hooks";

export function YtIdToId<T extends { channelId: number; ytChannelId: string }>(
  Component: React.ComponentType<T>
): React.ComponentType<Omit<T, "channelId" | "ytChannelId">> {
  function WrappedComponent(props: Omit<T, "channelId" | "ytChannelId">) {
    const ytChannelId = useTypedParams("ytChannelId");
    const { data } = useConvertQuery({
      type: "youtube",
      value: ytChannelId,
      resource: "channel",
    });

    if (!data) return null;

    return (
      <Component
        {...(props as T)}
        channelId={data.id}
        ytChannelId={ytChannelId}
      />
    );
  }

  WrappedComponent.displayName = `YtIdToId(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
}
