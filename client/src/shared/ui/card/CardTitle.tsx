import { type To } from "@shared/types";
import { CustomLink } from "../CustomLink";

type CardTitleProps = {
  title: string;
  to: To;
};

export default function CardTitle({ title, to }: CardTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <CustomLink to={to}>
        <div className="text-base font-medium text-gray-200 hover:text-blue-400 hover:underline transition-colors truncate cursor-pointer">
          {title}
        </div>
      </CustomLink>
    </div>
  );
}
