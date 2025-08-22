import type { PropsWithChildren } from "react";

export default function FormWrapper({ children }: PropsWithChildren) {
  return (
    <div className="card bg-base-200 shadow-xl my-6">
      <div className="card-body">
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </div>
  );
}
