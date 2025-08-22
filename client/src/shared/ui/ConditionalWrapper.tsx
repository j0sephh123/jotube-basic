import type { ReactNode } from "react";

type ConditionalWrapperProps = {
  condition: boolean;
  trueWrapper: (children: ReactNode) => ReactNode;
  falseWrapper: (children: ReactNode) => ReactNode;
  children: ReactNode;
};

export default function ConditionalWrapper({
  condition,
  trueWrapper,
  falseWrapper,
  children,
}: ConditionalWrapperProps) {
  return condition ? trueWrapper(children) : falseWrapper(children);
}
