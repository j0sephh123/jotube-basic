import { Outlet } from "react-router-dom";
import DashboardHeader from "@/features/Dashboard/components/DashboardHeader";

export default function DashboardWrapper() {
  return (
    <div className="h-screen flex flex-col p-2 mt-16">
      <div className="bg-base-100 rounded-lg flex flex-col h-full">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
}
