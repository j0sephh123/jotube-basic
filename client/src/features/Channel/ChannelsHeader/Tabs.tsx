import { useTabs } from "@features/Channel/ChannelsHeader/useTabs";
import { useGetIsActiveRoute } from "@features/Channel/ChannelsHeader/useGetIsActiveRoute";
import ChannelLink from "@shared/ui/ChannelLink";
import Button from "@shared/ui/button";

export default function Tabs({ ytChannelId }: { ytChannelId: string }) {
  const links = useTabs();
  const isActiveRoute = useGetIsActiveRoute(ytChannelId);

  return (
    <>
      {links.map(({ where, label, count }) => (
        <ChannelLink key={where} ytId={ytChannelId} where={where}>
          <Button
            color={isActiveRoute(where) ? "primary" : undefined}
            variant={!isActiveRoute(where) ? "ghost" : undefined}
            size="sm"
          >
            {label}: {count}
          </Button>
        </ChannelLink>
      ))}
    </>
  );
}
