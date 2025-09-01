export type Parsed = { min: number | null; max: number | null };

export type RangePickerProps = {
  minLabel: string;
  maxLabel: string;
} & RangePickerKeys;

export type RangePickerKeys = {
  minKey: string;
  maxKey: string;
};
