import React from "react";

export const useFlash = () => {
  const [message, setMessage] = React.useState<string>();

  return {
    message,
    setMessage,
  }
};

export const FlashContext = React.createContext({
  message: '',
  setMessage: (message: string) => {},
} as ReturnType<typeof useFlash>);
