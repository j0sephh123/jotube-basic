import { type Parsed } from "../types";

export function parse(params: URLSearchParams, minKey: string, maxKey: string): Parsed {
  const minRaw = params.get(minKey);
  const maxRaw = params.get(maxKey);
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
