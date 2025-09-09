import { useState } from "react";
import { Button } from "@shared/ui";
import { useConvert } from "@shared/hooks";

export default function Converter() {
  const [type, setType] = useState<"youtube" | "id">("youtube");
  const [value, setValue] = useState("");
  const [resource, setResource] = useState<"video" | "channel">("video");
  const converterMutation = useConvert();

  const handleSubmit = () => {
    if (!value.trim()) return;

    converterMutation.mutateAsync({
      type,
      value: value.trim(),
      resource,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Type</span>
          </label>
          <select
            className="select select-bordered w-full bg-base-100"
            value={type}
            onChange={(e) => setType(e.target.value as "youtube" | "id")}
          >
            <option value="youtube">YouTube</option>
            <option value="id">ID</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Resource</span>
          </label>
          <select
            className="select select-bordered w-full bg-base-100"
            value={resource}
            onChange={(e) => setResource(e.target.value as "video" | "channel")}
          >
            <option value="video">Video</option>
            <option value="channel">Channel</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Value</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full bg-base-100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={type === "youtube" ? "YouTube ID" : "Database ID"}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || converterMutation.isPending}
          className="btn btn-primary"
        >
          {converterMutation.isPending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
