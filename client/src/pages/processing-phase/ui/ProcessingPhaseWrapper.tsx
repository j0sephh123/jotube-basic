import { Outlet } from "react-router-dom";

export function ProcessingPhaseWrapper() {
  return (
    <div className="container mx-auto p-6">
      <Outlet />
    </div>
  );
}
