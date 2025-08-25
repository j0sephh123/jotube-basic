type Props = {
  src: string;
};

export default function Image({ src }: Props) {
  return (
    <img src={src} className="w-full h-full object-cover" loading="lazy" />
  );
}
