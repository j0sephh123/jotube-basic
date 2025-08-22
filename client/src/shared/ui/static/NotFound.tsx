import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";
import { routes } from "@shared/routes";
import { ViewType } from "@features/Dashboard";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100"
      style={{ transform: "translateY(-70px)" }}
    >
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={routes.dashboard(ViewType.SAVED)}>
            <button className="btn btn-primary">
              <HomeIcon className="w-4 h-4 mr-2" />
              Go to Dashboard
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
