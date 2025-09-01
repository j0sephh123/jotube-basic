import { Outlet } from "react-router-dom";

export const PageWrapper = () => {
  return (
    <div className="container mx-auto p-6 mt-12">
      <Outlet />
    </div>
  );
};
