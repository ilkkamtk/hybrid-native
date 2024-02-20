import {ErrorResponse} from '@sharedTypes/MessageTypes';

const fetchData = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const errorJson = json as unknown as ErrorResponse;
    if (errorJson.message) {
      throw new Error(errorJson.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }
  return json;
};

const makeQuery = async <TF, TV>(
  query: string,
  variables?: TV,
  token?: string,
): Promise<TF> => {
  const headers: {'Content-Type': string; Authorization?: string} = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const body: {query: string; variables?: TV} = {
    query,
  };

  if (variables) {
    body.variables = variables;
  }

  const options: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };
  return await fetchData<TF>(
    process.env.EXPO_PUBLIC_GRAPHQL_API as string,
    options,
  );
};

export {fetchData, makeQuery};
