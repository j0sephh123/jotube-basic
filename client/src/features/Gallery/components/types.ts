export type WithSrc = { src: string };

export type GalleryProps<T extends WithSrc> = {
  items: T[];
  ItemComponent: (props: GalleryItemProps<T>) => JSX.Element;
  itemsPerRow?: number;
  rowHeight?: number;
  onScrollProgress?: (scrollProgress: number) => void;
  className?: string;
};

export type GalleryItemProps<T extends WithSrc> = {
  item: T;
  src: string;
};
