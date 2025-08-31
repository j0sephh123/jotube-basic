export function FormWrapper({
  main,
  footer,
}: {
  main: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="p-6 sm:p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Set Range</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{main}</div>
      {footer}
    </div>
  );
}
