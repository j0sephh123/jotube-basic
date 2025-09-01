export function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="w-10" />
            <th>Video</th>
            <th>Download</th>
            <th>Screenshots</th>
            <th>Thumbnails</th>
            <th>Last activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
