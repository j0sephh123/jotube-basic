import { useState, useRef, useEffect } from "react";

export const useCreateChannelForm = () => {
  const [ytVideoId, setVideoId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setVideoId(value);
  };

  return {
    ytVideoId,
    inputRef,
    handleInputChange,
  };
};
