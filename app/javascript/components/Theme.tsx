import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Flash } from "./Flash";
import { FlashContext, useFlash } from "./contexts/flash";

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

export const Theme: React.FC<RouteComponentProps> = ({ children }) => {
  const flasher = useFlash();

  return (
    <div style={style}>
    <FlashContext.Provider value={flasher}>
      {children}
      <Flash />
    </FlashContext.Provider>
  </div>
  );
};
