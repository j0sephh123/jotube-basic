import { DoubleAction } from "../DoubleAction";

type Label =
  | "storyboard"
  | "screenshot"
  | "gallery"
  | "default"
  | "saved"
  | "thumbnail";

export function Iterator({
  items,
  actions,
}: {
  items: { name: string; count: number }[];
  actions: Record<string, { onNavigate: () => void; onFirst?: () => void }>;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => {
        const action = actions[item.name];
        if (!action) return null;

        return (
          <DoubleAction
            key={item.name}
            label={item.name as Label}
            count={item.count}
            onNavigate={action.onNavigate}
            onFirst={action.onFirst}
          />
        );
      })}
    </div>
  );
}
