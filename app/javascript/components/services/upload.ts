import { Upload } from "../models/upload";
import { Error as ErrorMessage } from "../models/error";

const apiUrl = "/api/v1/uploads";

function csrfToken() {
  return sessionStorage.getItem('csrf-token');
}

type CreateProps = {
  file: File;
  onSuccess: (upload: Upload) => void;
  onError: (error: ErrorMessage) => void;
}

export async function create({ file, onSuccess, onError }: CreateProps): Promise<void> {
  const data = new FormData();
      data.append('authenticity_token', csrfToken());
      data.append('file', file);

      const response = await fetch(apiUrl, {
        credentials: 'include',
        method: 'POST',
        body: data
      });


      if (response.status === 200) {
        const { data } = await response.json();
        onSuccess(data);
      } else {
        onError({ name: file.name, code: response.status, message: response.statusText });
      }
};

export async function index(): Promise<Array<Upload>> {
  const response = await fetch(apiUrl);

  if (response.status !== 200) {
    throw new Error(`Error while fetching uploads ${response.status}`);
  }

  const { data } = await response.json();
  return data;
};

export async function clear(): Promise<number> {
  const response = await fetch(`${apiUrl}/clear`, {
    method: 'DELETE',
    headers: {
      'x-csrf-token': csrfToken(),
    }
  });

  if (response.status !== 200) {
    throw new Error(`Error while deleting uploads ${response.status}`);
  }

  const { data } = await response.json();
  return data.count;
}
