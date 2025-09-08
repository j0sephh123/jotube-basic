export const GenericHeaderContainer = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: {
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
}) => {
  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">{topLeft}</div>
          <div className="flex items-center gap-2">{topRight}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">{bottomLeft}</div>
          <div className="flex items-center gap-2">{bottomRight}</div>
        </div>
      </div>
    </div>
  );
};
