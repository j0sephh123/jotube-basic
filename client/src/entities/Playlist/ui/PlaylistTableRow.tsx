type TableRowProps = {
  cols: JSX.Element[];
};

export default function PlaylistTableRow({ cols }: TableRowProps) {
  return <tr>{cols.map((col) => col)}</tr>;
}
