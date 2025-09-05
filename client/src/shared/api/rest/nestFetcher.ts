import { API_BASE_URL } from "@shared/utils";

type Props = {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: unknown;
};

export async function nestFetcher<T>({ method, url, body }: Props): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let data: T;
  try {
    data = await response.json();
  } catch {
    return {} as T;
  }
  return data;
}

export async function nestFetcherFile<T>({
  method,
  url,
  body,
}: {
  method: "POST" | "PUT";
  url: string;
  body: FormData;
}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    body,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  let data: T;
  try {
    data = await response.json();
  } catch {
    return {} as T;
  }
  return data;
}

export default nestFetcher;
