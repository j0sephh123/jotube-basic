export function TitleCell({ title, ytId }: { title: string; ytId: string }) {
  return (
    <td>
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        <span className="text-xs opacity-70">{ytId}</span>
      </div>
    </td>
  );
}
