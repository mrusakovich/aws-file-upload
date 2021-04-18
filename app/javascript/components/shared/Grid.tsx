import React from "react";

type PropsType = {
  style?: React.CSSProperties,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const Row: React.FC<PropsType> = ({ children, style }) => (
  <div style={{ ...rowStyle, ...style }}>
    {children}
  </div>
);

export const Column: React.FC<PropsType> = ({ children, style }) => (
  <div style={{ ...columnStyle, ...style }}>
    {children}
  </div>
);
