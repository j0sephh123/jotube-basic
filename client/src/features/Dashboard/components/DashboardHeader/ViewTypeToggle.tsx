import { useNavigate } from "react-router-dom";
import { routes } from "@/shared/utils/routes";
import { useTypedViewType, ViewType } from "@/shared/hooks/useTypedParams";
import clsx from "clsx";



export default function ViewTypeToggle() {
  const navigate = useNavigate();
  const viewType = useTypedViewType();

  const handleToggle = (newViewType: ViewType) => {
    navigate(routes.dashboard(newViewType), {
      replace: true,
      state: { viewType: newViewType, timestamp: Date.now() },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">View:</span>
      <div className="join">
        {Object.values(ViewType).map((type) => (
          <button
            key={type}
            className={clsx("join-item btn btn-sm", {
              "btn-primary": viewType === type,
              "btn-outline": viewType !== type,
            })}
            onClick={() => handleToggle(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
