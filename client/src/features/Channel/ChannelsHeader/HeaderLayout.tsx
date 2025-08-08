type Props = {
  leftTopSlot?: React.ReactNode;
  leftBottomSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

const HeaderLayout = ({ leftTopSlot, leftBottomSlot, rightSlot }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">{leftTopSlot}</div>
        <div className="flex flex-wrap gap-2">
          {leftBottomSlot}
          {rightSlot}
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
