/* eslint-disable @typescript-eslint/no-explicit-any */
enum ApiType {
  Rest = "rest",
  Graphql = "graphql",
}

const getApiType = (): ApiType => {
  return (import.meta as any).env.VITE_API_TYPE as ApiType;
}

export const isGraphql = () => getApiType() === ApiType.Graphql;
export const isRest = () => getApiType() === ApiType.Rest;