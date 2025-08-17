import useImageSrc from "@/shared/hooks/useImageSrc";

type Props = {
  ytId: string;
  id: number;
  src: string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

export default function Avatar({
  ytId,
  id,
  src,
  className = "w-16 h-16 object-cover",
  onClick,
}: Props) {
  const { imageSrc, handleImageError } = useImageSrc(src, ytId, id);

  return (
    <img
      src={imageSrc}
      alt="Channel Avatar"
      onError={handleImageError}
      className={className}
      onClick={onClick}
    />
  );
}
