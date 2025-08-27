import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { GoBack } from "../GoBack";

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
          <Link to={`/dashboard/channels/saved`}>
            <button className="btn btn-primary">
              <HomeIcon className="w-4 h-4 mr-2" />
              Go to Dashboard
            </button>
          </Link>
          <GoBack to={`/dashboard/channels/saved`} />
        </div>
      </div>
    </div>
  );
}
