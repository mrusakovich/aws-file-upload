import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { useUploadQuery } from '../hooks/useUploadQuery';
import { Upload } from '../models/upload';
import { Column, Row } from '../shared/Grid';
import { FlashContext } from '../contexts/flash';

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const collectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const columnStyle: React.CSSProperties = {
  flexBasis: '33%',
};

const linkStyle: React.CSSProperties = {
  marginTop: '20px',
};

const Collection: React.FC<{ data: Array<Upload> }> = ({ data }) => (
  <div style={collectionStyle}>
    <div style={rowStyle}>
      <div style={columnStyle}>Name</div>
      <div style={columnStyle}>State</div>
      <div style={columnStyle}>Message</div>
    </div>

    {data.map(({ id, attributes }) => (
      <div key={id} style={rowStyle}>
        <div style={{ ...columnStyle, lineBreak: 'anywhere' }}>
          <a href={attributes.url} target="_blank">{attributes.name}</a>
        </div>
        <div style={columnStyle}>{attributes.state}</div>
        <div style={columnStyle}>{attributes.message}</div>
      </div>
    ))}
  </div>
);

export const List: React.FC<RouteComponentProps> = () => {
  const { addMessage, clear } = React.useContext(FlashContext);
  const onClean = React.useCallback((count: number) => {
    addMessage(`Removed ${count} uploads`);
    setTimeout(clear, 5000);
  }, [addMessage]);

  const { collection, isLoading, clean } = useUploadQuery({ onClean });

  return (
    <Row>
      <Column style={{ width: '100%' }}>
        {isLoading && 'Loading...'}
        {collection && <Collection data={collection} />}
        <div style={linkStyle}>
          <Link to="/bucket/upload">Go Upload</Link>
          {collection?.length > 0 && <button type="button" onClick={clean}>Clean</button>}
        </div>
      </Column>
    </Row>
  );
}
