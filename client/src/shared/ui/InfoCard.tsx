import type { ReactNode } from "react";

type InfoCardProps = {
  title: ReactNode;
  content: ReactNode;
};

export default function InfoCard({ title, content }: InfoCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title text-sm truncate">{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}
