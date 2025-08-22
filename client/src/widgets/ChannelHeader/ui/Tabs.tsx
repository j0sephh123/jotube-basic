import { useTabs, useGetIsActiveRoute } from "@widgets/ChannelHeader";
import { ChannelLink, Button } from "@shared/ui";

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
