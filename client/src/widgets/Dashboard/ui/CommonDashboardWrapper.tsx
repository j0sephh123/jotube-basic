import { Outlet } from "react-router-dom";

export function CommonDashboardWrapper() {
  return (
    <div className="h-screen flex flex-col p-2 pb-14">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <Outlet />
      </div>
    </div>
  );
}
