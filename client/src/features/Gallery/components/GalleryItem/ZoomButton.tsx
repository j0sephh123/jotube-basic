import { Eye } from "lucide-react";

type Props = {
  index: number;
  onImageClick: (index: number) => void;
};

export default function ZoomButton({ index, onImageClick }: Props) {
  return (
    <div
      className="cursor-pointer absolute top-0 right-0 w-1/2 h-full bg-blue-500/80 hover:bg-blue-500 flex items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onImageClick(index);
      }}
    >
      <Eye className="w-8 h-8 text-white" />
    </div>
  );
}
