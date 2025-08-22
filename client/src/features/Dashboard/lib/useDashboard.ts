// Local hook implementations to avoid internal module imports
const useFetchDashboard = (_options: {
  fetchDashboardInput: { page: number; sortOrder: string };
}) => {
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  };
};

const useFetchVideosDashboard = () => {
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  };
};

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
