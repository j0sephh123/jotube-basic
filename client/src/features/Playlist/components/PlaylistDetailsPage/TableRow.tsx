type TableRowProps = {
  cols: JSX.Element[];
};

export default function TableRow({ cols }: TableRowProps) {
  return <tr>{cols.map((col) => col)}</tr>;
}
