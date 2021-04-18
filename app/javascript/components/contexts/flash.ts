import React from "react";

export const useFlash = () => {
  const [messages, setMessages] = React.useState<Array<string>>([]);

  const addMessage = React.useCallback((message: string) => {
    setMessages((oldMessages) => [...oldMessages, message]);
  }, [messages]);

  const clear = React.useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    clear,
  }
};

export const FlashContext = React.createContext({} as ReturnType<typeof useFlash>);
