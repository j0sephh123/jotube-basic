import { type Identifier } from "./rangePickerStore";

export type Parsed = { min: number | null; max: number | null };

export type RangePickerProps = {
  wrapperClassName?: string;
  minLabel: string;
  maxLabel: string;
  identifier: Identifier;
} & RangePickerKeys;

export type RangePickerKeys = {
  minKey: string;
  maxKey: string;
  identifier: Identifier;
};
