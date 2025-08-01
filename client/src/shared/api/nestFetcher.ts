import { API_BASE_URL } from "@/shared/utils/globals";

type Props = {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: unknown;
};

export default async function nestFetcher<T>({
  method,
  url,
  body,
}: Props): Promise<T> {
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
