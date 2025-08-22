import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ConditionalWrapper, Tooltip } from "@shared/ui";

type InfoCardProps = {
  title: ReactNode;
  content: ReactNode;
  titleLink?: string;
  showTooltip?: boolean;
};

export default function InfoCard({
  title,
  content,
  titleLink,
  showTooltip = false,
}: InfoCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <ConditionalWrapper
          condition={!!titleLink}
          trueWrapper={(children) =>
            showTooltip ? (
              <Tooltip content={title}>
                <Link to={titleLink!} className="card-title text-sm truncate">
                  {children}
                </Link>
              </Tooltip>
            ) : (
              <Link to={titleLink!} className="card-title text-sm truncate">
                {children}
              </Link>
            )
          }
          falseWrapper={(children) =>
            showTooltip ? (
              <Tooltip content={title}>
                <div className="card-title text-sm truncate">{children}</div>
              </Tooltip>
            ) : (
              <div className="card-title text-sm truncate">{children}</div>
            )
          }
        >
          {title}
        </ConditionalWrapper>
        <div>{content}</div>
      </div>
    </div>
  );
}
