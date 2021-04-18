export type Upload = {
  id: number;
  attributes: {
    name: string;
    url: string;
    state: string;
    message: string;
  }
};
