import { useTypedParams } from "@shared/hooks";
import { DoubleAction } from "../DoubleAction";
import clsx from "clsx";

type Label =
  | "storyboards"
  | "screenshots"
  | "gallery"
  | "default"
  | "saved"
  | "thumbnails";

export function Iterator({
  items,
  actions,
  cols = 3,
}: {
  items: { name: string; count: number }[];
  actions: Record<string, { onNavigate?: () => void; onFirst?: () => void }>;
  cols?: number;
}) {
  const uploadType = useTypedParams("uploadsType");

  return (
    <div className={clsx("grid grid-cols-2 gap-2", {
      "grid-cols-3": cols === 3,
    })}>
      {items.map((item) => {
        const action = actions[item.name];
        if (!action) return null;

        return (
          <DoubleAction
            key={item.name}
            label={item.name as Label}
            count={item.count}
            onNavigate={action.onNavigate ?? (() => {})}
            onFirst={action.onFirst ?? (() => {})}
            isActive={uploadType === item.name}
          />
        );
      })}
    </div>
  );
}
