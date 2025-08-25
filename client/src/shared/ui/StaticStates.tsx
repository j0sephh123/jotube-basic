import { type PropsWithChildren } from "react";
import { Loading, ErrorMessage, NoDataAvailable } from "./static";

type Props = PropsWithChildren<{
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}>;

export default function StaticStates({
  isLoading,
  isError,
  isEmpty,
  children,
}: Props) {
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage message="Error loading gallery" />;
  }

  if (isEmpty) {
    return <NoDataAvailable message="No screenshots found" />;
  }

  return children;
}
