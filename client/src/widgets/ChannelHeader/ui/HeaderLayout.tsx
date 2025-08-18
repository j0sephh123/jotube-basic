type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

const HeaderLayout = ({ left, center, right }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">{left}</div>
      <div className="flex items-center gap-2 flex-wrap">{center}</div>
      <div className="flex items-center gap-2 flex-shrink-0">{right}</div>
    </div>
  );
};

export default HeaderLayout;
