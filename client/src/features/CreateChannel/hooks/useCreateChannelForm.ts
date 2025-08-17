import { useState, useRef, useEffect } from "react";

export const useCreateChannelForm = (isModalVisible: boolean) => {
  const [ytVideoId, setVideoId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalVisible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isModalVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setVideoId(value);
  };

  const clearInput = () => {
    setVideoId("");
  };

  return {
    ytVideoId,
    inputRef,
    handleInputChange,
    clearInput,
  };
};
