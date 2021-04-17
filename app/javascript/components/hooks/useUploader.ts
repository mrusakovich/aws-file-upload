import React from "react";

type Return = {
  processing: string;
  upload: (files: Array<File>) => void;
};

const apiUrl = "/api/v1/uploads";
const csrfToken = sessionStorage.getItem('csrf-token');

export const useUploader = (): Return => {
  const [processing, setProcessing] = React.useState<string>();

  const upload = React.useCallback(async (files: Array<File>) => {
    if (!files) return;

    files.forEach(async (file, index) => {
      setProcessing(file.name);
      const data = new FormData();
      data.append('authenticity_token', csrfToken);
      data.append('file', file);

      await fetch(apiUrl, {
        credentials: 'include',
        method: 'POST',
        body: data
      });

      if (index === files.length - 1) setProcessing(undefined);
    });
  }, []);

  return {
    processing,
    upload,
  }
};
