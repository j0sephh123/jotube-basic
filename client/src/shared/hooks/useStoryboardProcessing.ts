import { useStore } from "@app/providers/store/store-root";
import type { StoryboardProcessingSlice } from "@app/providers/store/store-types";

function makeScopedHook<Slice>() {
  function useScoped(): Slice;
  function useScoped<T>(selector: (s: Slice) => T): T;
  function useScoped<T>(selector?: (s: Slice) => T): T | Slice {
    const sel = (selector ?? ((s: Slice) => s as unknown as T)) as (
      s: Slice
    ) => T;
    return useStore((s) => sel(s as unknown as Slice));
  }
  return useScoped;
}

export const useStoryboardProcessing =
  makeScopedHook<StoryboardProcessingSlice>();
