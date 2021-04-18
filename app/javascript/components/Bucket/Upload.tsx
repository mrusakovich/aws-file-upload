import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { useUploader } from '../hooks/useUploader';
import { FlashContext } from '../contexts/flash';
import { Upload as UploadResult } from '../models/upload';
import { Error } from '../models/error';
import { Row, Column } from '../shared/Grid';

export const Upload: React.FC<RouteComponentProps> = () => {
  const [files, setFiles] = React.useState<Array<File>>();
  const { addMessage, clear } = React.useContext(FlashContext);


  const fileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files: inputFiles } = event.target;
    if (inputFiles) setFiles(Array.from(inputFiles));
  }, []);

  const onFinish = React.useCallback(() => {
    addMessage("Upload is finished");
  }, [clear, addMessage]);

  const onUploadEnd = React.useCallback((upload: UploadResult) => {
    addMessage(`Uploaded ${upload.attributes.name}`);
  }, []);

  const onUploadStart = React.useCallback((name: string) => {
    addMessage(`Uploading ${name}...`);
  }, []);

  const onUploadError = React.useCallback((error: Error) => {
    addMessage(`Upload of ${error.name} failed with code ${error.code} and message ${error.message}`);
  }, []);

  const { upload, isUploading } = useUploader({ onFinish, onUploadStart, onUploadEnd, onUploadError });

  const startUpload = React.useCallback(() => {
    clear();
    upload(files);
  }, [clear, upload, files]);

  return (
    <Row>
      <Column>
        <div>Select multiple files in file browser</div>
        <div>
          <input type="file" onChange={fileChange} multiple />
        </div>
        <div>
          <button disabled={isUploading} type="button" onClick={startUpload}>Upload</button>
          <Link to="/bucket/list" onClick={clear} >List</Link>
        </div>
      </Column>
    </Row>
  );
};
