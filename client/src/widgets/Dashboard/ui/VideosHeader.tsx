import { useVideosDashboardQuery } from "@features/Dashboard";
import { PaginationControl } from "@widgets/PaginationControl";

type Props = {
  leftSlot: React.ReactNode;
};

export default function VideosHeader({ leftSlot }: Props) {
  const { data } = useVideosDashboardQuery();

  return (
    <>
      {leftSlot}
      <PaginationControl total={data?.total || 0} />
    </>
  );
}
