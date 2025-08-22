export enum RangePickerTypes {
  PROCESSED = "processed",
  DEFAULTS = "defaults",
}

export type RangePickerConfig = {
  values: ReadonlyArray<number>;
  min: number;
  max: number;
  stepSize: number;
};

export type RangePickerProps = {
  rangeKey: RangePickerTypes;
};

export type RequestBodyKey = "min" | "max" | "defaultMin" | "defaultMax";
