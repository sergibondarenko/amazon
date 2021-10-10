export interface IHttpClient {
  post: ({ path, data, headers }: { path: string, data: object, headers?: object }) => Promise<object>;
  put: ({ path, data, headers }: { path: string, data: object, headers?: object }) => Promise<object>;
  get: ({ path }: { path: string }) => Promise<object>;
}

export class HttpClient implements IHttpClient {
  post({ path, data, headers = { 'Content-Type': 'application/json'} }: { path: string, data: object, headers?: object }) {
    return fetch(path, {
      method: 'POST',
      headers: { ...headers },
      body: JSON.stringify(data)
    }).then((r) => r.json());
  }

  put({ path, data, headers = { 'Content-Type': 'application/json'} }: { path: string, data: object, headers?: object }) {
    return fetch(path, {
      method: 'PUT',
      headers: { ...headers },
      body: JSON.stringify(data)
    }).then((r) => r.json());
  }

  get({ path }: { path: string }) {
    return fetch(path).then((r) => r.json());
  }
}