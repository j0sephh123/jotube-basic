import { useTabs } from "./useTabs";
import { useGetIsActiveRoute } from "./useGetIsActiveRoute";
import clsx from "clsx";
import ChannelLink from "@/shared/components/ChannelLink";

export default function Tabs({ ytChannelId }: { ytChannelId: string }) {
  const links = useTabs();
  const isActiveRoute = useGetIsActiveRoute(ytChannelId);

  return (
    <>
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
    </>
  );
}
