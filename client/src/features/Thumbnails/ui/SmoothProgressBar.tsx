type Props = {
  current: number;
  total: number;
  className?: string;
};

export function SmoothProgressBar({
  current,
  total,
  className = "",
}: Props) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-out rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, 
              #ef4444 0%, 
              #f97316 25%, 
              #eab308 50%, 
              #22c55e 75%, 
              #06b6d4 100%)`,
          }}
        />
      </div>
    </div>
  );
}
