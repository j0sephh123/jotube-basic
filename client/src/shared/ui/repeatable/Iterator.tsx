import { type To } from "@shared/types";
import clsx from "clsx";
import { useCustomNavigate } from "@shared/hooks";
import { match } from "ts-pattern";

export function Iterator({
  items,
  onClick,
  ...props
}: {
  items: { name: string; count: number }[];
  onClick?: (name: string) => void;
} & (
  | { variant: "link"; baseLink: string; getActive: (name: string) => boolean }
  | { variant: "click" }
)) {
  const navigate = useCustomNavigate();

  return (
    <>
      <span className="text-sm font-medium text-base-content/70">uploads</span>
      <div className="tabs tabs-boxed bg-base-100">
        {items.map((item) => {
          return (
            <button
              onClick={() => {
                match(props)
                  .with({ variant: "click" }, () => {
                    onClick?.(item.name);
                  })
                  .with({ variant: "link" }, ({ baseLink }) => {
                    navigate(`${baseLink}/${item.name}` as To);
                  })
                  .run();
              }}
              className={clsx("tab tab-sm", {
                "tab-active bg-primary text-primary-content": match(props)
                  .with({ variant: "link" }, ({ getActive }) =>
                    getActive(item.name)
                  )
                  .with({ variant: "click" }, () => false)
                  .run(),
              })}
            >
              {item.name} {item.count}
            </button>
          );
        })}
      </div>
    </>
  );
}
