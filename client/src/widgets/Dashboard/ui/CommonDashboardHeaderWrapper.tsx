export function CommonDashboardHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
}
