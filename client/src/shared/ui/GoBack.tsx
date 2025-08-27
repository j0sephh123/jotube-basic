import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./button";

export function GoBack({ to }: { to: string }) {
  return (
    <Link to={to}>
      <Button>
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </Link>
  );
}
