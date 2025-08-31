/* eslint-disable boundaries/element-types */
import { useEffect } from "react";
import { snapshot, subscribe } from "valtio";
import { processingState } from "@shared/store";

export function Debug() {
  useEffect(() => {
    const unsub = subscribe(processingState, () => {
      const state = snapshot(processingState);
      console.log(state);
    });
    return unsub;
  }, []);
  return null;
}
