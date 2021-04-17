import React from "react";
import { FlashContext } from "./contexts/flash";

const style: React.CSSProperties = {
  height: '200px',
  marginTop: '20px',
};

export const Flash: React.FC = () => {
  const { message } = React.useContext(FlashContext);

  return (
    <div id="flash" style={style}>
      {message}
    </div>
  );
}
