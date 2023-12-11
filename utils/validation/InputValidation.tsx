import { ChangeEvent, useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    error,
    errorMessage,
    onChange: handleChange,
    setError,
    setErrorMessage,
  };
};

export const useConfirmPasswordInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    error,
    errorMessage,
    onChange: handleChange,
    setError,
    setErrorMessage,
  };
};
