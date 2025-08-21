interface VideoIdInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VideoIdInput({ value, onChange }: VideoIdInputProps) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="text-sm font-medium">YouTube Video ID</label>
      <input
        type="text"
        placeholder="Enter YouTube Video ID"
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
