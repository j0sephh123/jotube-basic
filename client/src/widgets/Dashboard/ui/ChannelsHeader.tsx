import { useChannelsDashboardQuery } from "@features/Dashboard";
import { PaginationControl } from "@widgets/PaginationControl";

type Props = {
  leftSlot: React.ReactNode;
};

export default function ChannelsHeader({ leftSlot }: Props) {
  const { data } = useChannelsDashboardQuery();

  return (
    <>
      {leftSlot}
      <PaginationControl total={data?.total || 0} />
    </>
  );
}
