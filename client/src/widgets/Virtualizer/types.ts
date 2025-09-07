export type VirtualizerProps<T> = {
  items: T[];
  ItemComponent: (props: VirtualizerItemProps<T>) => JSX.Element;
  itemsPerRow?: number;
  rowHeight?: number;
  className?: string;
  flexibleHeight?: boolean;
};

export type VirtualizerItemProps<T> = {
  item: T;
};
