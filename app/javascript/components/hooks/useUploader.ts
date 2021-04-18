import React from "react";
import { Upload } from "../models/upload";
import { Error } from "../models/error";
import { create } from "../services/upload";

type PropsType = {
  onFinish: () => void;
  onUploadStart: (name: string) => void;
  onUploadEnd: (upload: Upload) => void;
  onUploadError: (error: Error) => void;
};

type Return = {
  upload: (files: Array<File>) => void;
  isUploading: boolean;
};

export const useUploader = ({ onFinish, onUploadStart, onUploadEnd, onUploadError }: PropsType): Return => {
  const [isUploading, setUploading] = React.useState(false);

  const upload = React.useCallback(async (files: Array<File>) => {
    if (!files) return;
    setUploading(true);

    const uploads = files.map(async (file) => {
      onUploadStart(file.name);
      await create({ file, onSuccess: onUploadEnd, onError: onUploadError });
    });

    await Promise.all(uploads);
    
    setUploading(false);
    onFinish();
  }, [onUploadStart, onUploadEnd, onFinish]);

  return {
    upload,
    isUploading,
  }
};
