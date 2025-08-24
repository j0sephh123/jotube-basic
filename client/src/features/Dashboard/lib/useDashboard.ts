import { useFetchDashboard } from "./useFetchDashboard";
import { useFetchVideosDashboard } from "./useFetchVideosDashboard";

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
