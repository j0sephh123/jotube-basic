import { useTabs } from "../lib/useTabs";
import { useGetIsActiveRoute } from "../lib/useGetIsActiveRoute";
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
