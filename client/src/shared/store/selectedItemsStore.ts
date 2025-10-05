import { proxy, useSnapshot } from "valtio";

type State = {
  selectedIds: string[];
};

const selectedItemsState = proxy<State>({
  selectedIds: [],
});

export const useSelectedItemsState = () => useSnapshot(selectedItemsState);

export const toggleSelectedItem = (id: string) => {
  const isSelected = selectedItemsState.selectedIds.includes(id);
  if (isSelected) {
    selectedItemsState.selectedIds = selectedItemsState.selectedIds.filter(
      (selectedId) => selectedId !== id
    );
  } else {
    selectedItemsState.selectedIds = [...selectedItemsState.selectedIds, id];
  }
};

export const setSelectedItems = (
  arg: readonly string[] | string[] | ((prev: readonly string[]) => string[])
) => {
  if (typeof arg === "function") {
    selectedItemsState.selectedIds = arg(selectedItemsState.selectedIds);
  } else {
    selectedItemsState.selectedIds = [...arg];
  }
};

export const clearSelectedItems = () => {
  selectedItemsState.selectedIds = [];
};

export const isItemSelected = (id: string) =>
  selectedItemsState.selectedIds.includes(id);
