import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { useUploader } from '../hooks/useUploader';
import { FlashContext } from '../contexts/flash';

export const Upload: React.FC<RouteComponentProps> = () => {
  const [files, setFiles] = React.useState<Array<File>>();

  const fileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files: inputFiles } = event.target;
    if (inputFiles) setFiles(Array.from(inputFiles));
  }, []);

  const uploader = useUploader();
  const { setMessage } = React.useContext(FlashContext);
  
  React.useEffect(() => {
    if (uploader.processing) {
      setMessage(`Uploading ${uploader.processing}...`);
    } else {
      setMessage(undefined)
    }
  }, [uploader.processing]);

  return (
    <>
      <div>Select multiple files in file browser</div>
      <div>
        <input type="file" onChange={fileChange} multiple />
      </div>
      <div>
        <button type="button" onClick={() => uploader.upload(files)}>Upload</button>
        <Link to="/bucket/list" >List</Link>
      </div>
    </>
  );
};
