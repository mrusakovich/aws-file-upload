import React from "react";
import { Upload } from "../models/upload";
import { index, clear } from "../services/upload";

type PropsType = {
  onClean: (count: number) => void;
}

type Return = {
  collection: Array<Upload>;
  isLoading: boolean;
  clean: () => void;
};

export const useUploadQuery = ({ onClean }: PropsType): Return => {
  const [collection, setCollection] = React.useState<Array<Upload>>();
  const [isLoading, setLoading] = React.useState(false);
  const [isFetched, setFetched] = React.useState(false);

  const fetch = React.useCallback(async () => {
    setLoading(true);
    const result = await index();
    
    setCollection(result);
    setLoading(false);
    setFetched(true);
  }, []);

  const clean = React.useCallback(async () => {
    const removed = await clear();
    onClean(removed);
    setFetched(false);
  }, [onClean]);

  React.useEffect(() => {
    if (!isFetched) fetch();
  }, [isFetched]);

  return {
    collection,
    isLoading,
    clean,
  }
};
