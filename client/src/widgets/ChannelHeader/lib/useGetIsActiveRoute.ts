import { useLocation } from "react-router-dom";

export const useGetIsActiveRoute = (ytChannelId: string) => {
  const location = useLocation();

  return (where: "index" | "saved" | "gallery" | "storyboard") => {
    const path = `/channels/${ytChannelId}${
      where === "index" ? "" : `/${where}`
    }`;
    return location.pathname === path;
  };
};
