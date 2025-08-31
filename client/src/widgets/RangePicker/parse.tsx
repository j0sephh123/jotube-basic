import { Parsed } from "./RangePicker";

export function parse(params: URLSearchParams): Parsed {
  const minRaw = params.get("min");
  const maxRaw = params.get("max");
  const min =
    minRaw !== null && minRaw.trim() !== "" && !Number.isNaN(Number(minRaw))
      ? Number(minRaw)
      : null;
  const max =
    maxRaw !== null && maxRaw.trim() !== "" && !Number.isNaN(Number(maxRaw))
      ? Number(maxRaw)
      : null;
  return { min, max };
}
