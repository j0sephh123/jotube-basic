type TableHeaderProps = {
  children: React.ReactNode;
};

export default function TableHeader({ children }: TableHeaderProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="w-[120px]">Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
