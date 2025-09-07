import { CustomLink } from ".";
import { type To } from "@shared/types";
import clsx from "clsx";

export function TabsLinksIterator({
  baseLink,
  label,
  items,
  getActive,
}: {
  baseLink: string;
  label: string;
  items: { name: string; count: number }[];
  getActive: (name: string) => boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-base-content/70">{label}</span>
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
    </div>
  );
}