import { type To } from "@shared/types";
import { CustomLink, Tooltip } from "@shared/ui";

type CardTitleProps = {
  title: string;
  to: To;
};

export default function CardTitle({ title, to }: CardTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <CustomLink to={to}>
        <Tooltip content={title} position="top" color="primary">
          <div className="text-base font-medium text-gray-200 hover:text-blue-400 hover:underline transition-colors truncate cursor-pointer max-w-[140px]">
            {title}
          </div>
        </Tooltip>
      </CustomLink>
    </div>
  );
}
