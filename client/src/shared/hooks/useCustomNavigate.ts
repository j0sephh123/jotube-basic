import { useNavigate } from "react-router-dom";
import { type To } from "@shared/types";

export function useCustomNavigate() {
  const navigate = useNavigate();

  return (to: To) => navigate(to);
}