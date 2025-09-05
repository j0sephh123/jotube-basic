import { type PropsWithChildren } from "react";
import { Loading, ErrorMessage, NoDataAvailable } from "./static";

type Props = PropsWithChildren<{
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  message?: string;
  emptyMessage?: string;
}>;

export default function StaticStates({
  isLoading,
  isError,
  isEmpty,
  children,
  message,
  emptyMessage,
}: Props) {
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message={message || "Error loading gallery"} />;
  }

  if (isEmpty) {
    return <NoDataAvailable message={emptyMessage || "No screenshots found"} />;
  }

  return children;
}
