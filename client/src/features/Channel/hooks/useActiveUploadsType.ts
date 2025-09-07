import { useTypedParams } from "@shared/hooks";

export function useActiveUploadsType() {
  const uploadsType = useTypedParams("uploadsType");
  return uploadsType;
}