import { CustomLink } from "..";
import { type To } from "@shared/types";
import clsx from "clsx";

export function Iterator({
  baseLink,
  items,
  getActive,
}: {
  baseLink: string;
  items: { name: string; count: number }[];
  getActive: (name: string) => boolean;
}) {
  return (
    <>
      <span className="text-sm font-medium text-base-content/70">uploads</span>
      <div className="tabs tabs-boxed bg-base-100">
        {items.map((item) => (
          <CustomLink
            to={`${baseLink}/${item.name}` as To}
            className={clsx("tab tab-sm", {
              "tab-active bg-primary text-primary-content": getActive(
                item.name
              ),
            })}
          >
            {item.name} {item.count}
          </CustomLink>
        ))}
      </div>
    </>
  );
}
