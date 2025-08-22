// client/src/app/providers/store/store-root.ts
import { create } from "zustand";

import { createSidePanelSlice } from "@widgets/SidePanel/model/side-panel-slice";
import { createZoomSlice } from "./zoom-slice";

import type { Store as StoreType } from "./store-types";

export const useStore = create<StoreType>()((set, _get) => ({
  ...createSidePanelSlice(set),
  ...createZoomSlice(set),
}));
