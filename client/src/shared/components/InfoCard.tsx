import { ReactNode } from "react";
import { Link } from "react-router-dom";
import ConditionalWrapper from "./ConditionalWrapper";
import Tooltip from "./Tooltip";

type InfoCardProps = {
  title: ReactNode;
  content: ReactNode;
  titleLink?: string;
};

export default function InfoCard({ title, content, titleLink }: InfoCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <ConditionalWrapper
          condition={!!titleLink}
          trueWrapper={(children) => (
            <Tooltip content={title}>
              <Link to={titleLink!} className="card-title text-sm truncate">
                {children}
              </Link>
            </Tooltip>
          )}
          falseWrapper={(children) => (
            <Tooltip content={title}>
              <div className="card-title text-sm truncate">{children}</div>
            </Tooltip>
          )}
        >
          {title}
        </ConditionalWrapper>
        <div>{content}</div>
      </div>
    </div>
  );
}
