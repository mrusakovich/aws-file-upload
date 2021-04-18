import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Flash } from "./Flash";
import { FlashContext, useFlash } from "./contexts/flash";

export const Theme: React.FC<RouteComponentProps> = ({ children }) => {
  const flasher = useFlash();

  return (
    <FlashContext.Provider value={flasher}>
      {children}
      <Flash />
    </FlashContext.Provider>
  );
};
