export function makeScopedHook<Root, Slice>(
  useStoreSelect: <T>(selector: (r: Root) => T) => T,
  selectSlice: (r: Root) => Slice
) {
  return function useScoped<T = Slice>(selector?: (s: Slice) => T): T {
    return useStoreSelect((root) => {
      const slice = selectSlice(root);
      return selector ? selector(slice) : (slice as unknown as T);
    });
  };
}
