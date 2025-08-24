import { useLocation } from "react-router-dom";

export const useGetIsActiveRoute = (ytChannelId: string) => {
  const location = useLocation();

  return (where: "index" | "saved" | "gallery" | "storyboard" | "new-gallery") => {
    const path = `/channels/${ytChannelId}${
      where === "index" ? "" : `/${where}`
    }`;
    
    if (where === "gallery") {
      return location.pathname === path;
    }
    
    return location.pathname === path;
  };
};
