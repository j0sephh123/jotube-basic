import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

export function useSetUrlParam() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (key: string, value: string) => {
    const newParams = { ...params, [key]: value };

    // reconstruct path from current pathname
    const segments = location.pathname.split("/").filter(Boolean);
    const dashboardIndex = segments.indexOf("dashboard");

    if (dashboardIndex !== -1) {
      // overwrite params after /dashboard
      segments[dashboardIndex + 1] = newParams.dashboardType || "";
      segments[dashboardIndex + 2] = newParams.viewType || "";
    }

    const queryString = searchParams.toString();
    const search = queryString ? `?${queryString}` : "";

    navigate("/" + segments.join("/") + search);
  };
}
