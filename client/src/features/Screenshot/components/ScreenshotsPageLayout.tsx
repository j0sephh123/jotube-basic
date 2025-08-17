import { Outlet } from "react-router-dom";
import Breadcrumb from "@/shared/ui/Breadcrumb";
import useBreadcrumbs from "@/features/Screenshot/hooks/useBreadcrumbs";

export default function ScreenshotsLayout(): JSX.Element {
  const items = useBreadcrumbs("screenshots");

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto p-4">
        <Breadcrumb items={items} />
        <Outlet />
      </div>
    </div>
  );
}
