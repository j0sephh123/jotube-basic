import { Outlet } from "react-router-dom";

export const PageWrapper = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <Outlet />
    </div>
  );
};
