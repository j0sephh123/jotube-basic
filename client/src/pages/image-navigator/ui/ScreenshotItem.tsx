interface ScreenshotItemProps {
  src: string;
}

export default function ScreenshotItem({ src }: ScreenshotItemProps) {
  return (
    <img
      src={src}
      alt="Screenshot"
      className="w-full object-cover rounded-lg"
    />
  );
}
