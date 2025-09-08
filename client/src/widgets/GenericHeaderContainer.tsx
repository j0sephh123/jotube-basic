export const GenericHeaderContainer = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: {
  topLeft: React.ReactNode;
  topRight: React.ReactNode;
  bottomLeft: React.ReactNode;
  bottomRight: React.ReactNode;
}) => {
  return (
    <div className="bg-base-200 rounded-lg px-6 pt-16 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          {topLeft}
          {topRight}
        </div>

        <div className="flex justify-between items-center">
          {bottomLeft}
          {bottomRight}
        </div>
      </div>
    </div>
  );
};
