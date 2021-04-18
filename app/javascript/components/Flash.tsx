import React from "react";
import { FlashContext } from "./contexts/flash";
import { Column, Row } from "./shared/Grid";

const style: React.CSSProperties = {
  height: '200px',
  marginTop: '20px',
  overflowY: 'auto',
};

export const Flash: React.FC = () => {
  const { messages } = React.useContext(FlashContext);

  return (
    <Row>
      <Column>
        <div style={style}>
          {messages.map((message) => (
            <div key={message}>{message}</div>
          ))}
        </div>
      </Column>
    </Row>
  );
}
