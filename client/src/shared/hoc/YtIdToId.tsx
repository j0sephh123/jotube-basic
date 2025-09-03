import { useTypedParams } from "@shared/hooks";
import { useConvertQuery } from "@shared/hooks";

export function YtIdToId(
  Component: React.ComponentType<{
    channelId: number;
    ytChannelId: string;
  }>
): React.ComponentType {
  function WrappedComponent() {
    const ytChannelId = useTypedParams("ytChannelId");
    const { data } = useConvertQuery({
      type: "youtube",
      value: ytChannelId,
      resource: "channel",
    });

    if (!data) return null;

    return <Component channelId={data.id} ytChannelId={ytChannelId} />;
  }

  WrappedComponent.displayName = `YtIdToId(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
}
