// Local hook implementation to avoid cross-layer dependencies
const useLocalSidePanel = () => {
  return {
    isOpen: false,
    toggle: () => {},
    close: () => {},
    open: () => {},
  };
};

export const useSidePanel = () => {
  return useLocalSidePanel();
};
