import { useState, useRef, useEffect } from "react";

export function useCreateEntityForm(isModalVisible: boolean) {
  const [value, setValue] = useState("");
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
    setValue(value);
  };

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
