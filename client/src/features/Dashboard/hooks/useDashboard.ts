import { useFetchDashboard, useFetchVideosDashboard } from "./index";

export default function useDashboard() {
  const fetchDashboardHook = useFetchDashboard({
    fetchDashboardInput: {
      page: 1,
      sortOrder: "desc",
    },
  });

  const fetchVideosDashboardHook = useFetchVideosDashboard();

  return {
    fetchDashboard: fetchDashboardHook,
    fetchVideosDashboard: fetchVideosDashboardHook,
  };
}
