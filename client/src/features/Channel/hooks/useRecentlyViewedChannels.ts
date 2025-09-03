import { useCallback, useMemo, useState } from "react";

type RecentlyViewedItem = { id: number; ytId: string; title: string; when: Date };
type PersistedItem = { id: number; ytId: string; title: string; when: string };
type Store = { recentlyViewed: RecentlyViewedItem[] };

const STORAGE_KEY = "recentlyViewedChannels";
const MAX_ITEMS = 50;

const load = (): Store => {
  if (typeof window === "undefined") return { recentlyViewed: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { recentlyViewed: [] };
    const parsed = JSON.parse(raw) as { recentlyViewed?: PersistedItem[] };
    const items = (parsed.recentlyViewed ?? []).map<RecentlyViewedItem>((i) => ({
      id: i.id,
      ytId: i.ytId,
      title: i.title,
      when: new Date(i.when),
    }));
    return { recentlyViewed: items };
  } catch {
    return { recentlyViewed: [] };
  }
};

const save = (store: Store) => {
  if (typeof window === "undefined") return;
  const persisted: { recentlyViewed: PersistedItem[] } = {
    recentlyViewed: store.recentlyViewed.map((i) => ({
      id: i.id,
      ytId: i.ytId,
      title: i.title,
      when: i.when.toISOString(),
    })),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
};

export function useRecentlyViewedChannels() {
  const [store, setStore] = useState<Store>(() => load());

  const persist = useCallback((next: Store) => {
    setStore(next);
    save(next);
  }, []);

  const get = useCallback(() => store.recentlyViewed, [store.recentlyViewed]);

  const add = useCallback(
    (item: { id: number; ytId: string; title: string; when?: Date }) => {
      const when = item.when ?? new Date();
      const deduped = store.recentlyViewed.filter(
        (i) => i.id !== item.id && i.ytId !== item.ytId
      );
      const nextList = [{ id: item.id, ytId: item.ytId, title: item.title, when }, ...deduped].slice(0, MAX_ITEMS);
      persist({ recentlyViewed: nextList });
    },
    [persist, store.recentlyViewed]
  );

  const remove = useCallback(
    (id: number) => {
      const nextList = store.recentlyViewed.filter((i) => i.id !== id);
      persist({ recentlyViewed: nextList });
    },
    [persist, store.recentlyViewed]
  );

  const clear = useCallback(() => {
    persist({ recentlyViewed: [] });
  }, [persist]);

  return useMemo(
    () => ({ get, add, remove, clear }),
    [get, add, remove, clear]
  );
}
