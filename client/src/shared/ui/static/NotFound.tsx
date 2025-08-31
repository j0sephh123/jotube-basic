import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { CustomLink } from "../CustomLink";
import Button from "../button";

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
          <CustomLink to={`/dashboard/channels/saved`}>
            <button className="btn btn-primary">
              <HomeIcon className="w-4 h-4 mr-2" />
              Go to Dashboard
            </button>
          </CustomLink>
          <CustomLink to={`/dashboard/channels/saved`}>
            <Button>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
