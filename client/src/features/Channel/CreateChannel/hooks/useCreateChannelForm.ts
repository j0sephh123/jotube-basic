import { useCallback, useState, useRef, useEffect } from "react";
import { validateYoutubeId, YT_VIDEO_ID_LENGTH } from "../utils/validation";

export const useCreateChannelForm = () => {
  const [ytVideoId, setVideoId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const validateInput = useCallback((value: string) => {
    const { isValid, error: validationError } = validateYoutubeId(value);
    setError(validationError);
    return isValid;
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setVideoId(value);

    if (!value) {
      setError(null);
    } else if (value.length > YT_VIDEO_ID_LENGTH) {
      setError(`YouTube ID must be exactly ${YT_VIDEO_ID_LENGTH} characters`);
    } else if (value.length === YT_VIDEO_ID_LENGTH) {
      validateInput(value);
    }
  };

  const clearInput = () => {
    setVideoId("");
    setError(null);
  };

  const isInputValid = ytVideoId.trim().length === YT_VIDEO_ID_LENGTH;

  return {
    ytVideoId,
    error,
    inputRef,
    isInputValid,
    handleInputChange,
    clearInput,
    validateInput,
  };
};
