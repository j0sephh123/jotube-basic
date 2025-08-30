import { useState, useRef, useEffect, useCallback } from "react";

export function useCreateEntityForm() {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const clearInput = () => {
    setValue("");
  };

  return {
    value,
    inputRef,
    handleInputChange,
    clearInput,
  };
}
