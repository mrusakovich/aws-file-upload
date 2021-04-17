import React from 'react';

type PropsType = {

};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '20vh',
};

const flashStyle: React.CSSProperties = {
  height: '200px',
  marginTop: '20px',
};

export const Upload: React.FC<PropsType> = () => (
  <>
    <div style={containerStyle}>
      <div>Select multiple files in file browser</div>
      <div>
        File field here
      </div>
      <div>
        <button id="uploadBtn" type="button">Upload</button>
        Link to list here
      </div>
    </div>
    <div id="flash" style={flashStyle}>Flash</div>
  </>
);
