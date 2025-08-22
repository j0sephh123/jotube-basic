/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

/* =========================================================
   Button Type System + Class Builder (DaisyUI-style)
   ========================================================= */

export type BtnBase = "btn";

export type BtnColorClass =
  | "btn-neutral"
  | "btn-primary"
  | "btn-secondary"
  | "btn-accent"
  | "btn-info"
  | "btn-success"
  | "btn-warning"
  | "btn-error";

export type BtnStyleClass =
  | "btn-outline"
  | "btn-dash"
  | "btn-soft"
  | "btn-ghost"
  | "btn-link";

export type BtnBehaviorClass = "btn-active" | "btn-disabled";

export type BtnSizeClass = "btn-xs" | "btn-sm" | "btn-md" | "btn-lg" | "btn-xl";

export type BtnModifierClass =
  | "btn-wide"
  | "btn-block"
  | "btn-square"
  | "btn-circle";

export type BtnClass =
  | BtnBase
  | BtnColorClass
  | BtnStyleClass
  | BtnBehaviorClass
  | BtnSizeClass
  | BtnModifierClass;

export type ButtonColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ButtonStyle = "outline" | "dash" | "soft" | "ghost" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonOptions {
  color?: ButtonColor;
  variant?: ButtonStyle;
  size?: ButtonSize;
  active?: boolean;
  disabled?: boolean;
  wide?: boolean;
  block?: boolean;
  square?: boolean;
  circle?: boolean;
  className?: string;
}

/** Build a Tailwind/DaisyUI-style `btn` className string from options. */
export function btnClass(opts: ButtonOptions = {}): string {
  const {
    color,
    variant,
    size = "md",
    active,
    disabled,
    wide,
    block,
    square,
    circle,
    className,
  } = opts;

  const parts: string[] = ["btn"];

  if (color) parts.push(`btn-${color}`);
  if (variant) parts.push(`btn-${variant}`);
  if (size && size !== "md") parts.push(`btn-${size}`);

  if (active) parts.push("btn-active");
  if (disabled) parts.push("btn-disabled");

  if (wide) parts.push("btn-wide");
  if (block) parts.push("btn-block");
  if (square) parts.push("btn-square");
  if (circle) parts.push("btn-circle");

  if (className) parts.push(className);

  return parts.join(" ");
}

/* =========================================================
   React Button (supports left icon and icon-only usage)
   ========================================================= */

const iconSizeByBtnSize: Record<NonNullable<ButtonOptions["size"]>, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

function withIcon(node: React.ReactNode, className: string): React.ReactNode {
  if (!node) return null;
  if (React.isValidElement(node)) {
    return React.cloneElement(node as React.ReactElement, {
      className: [className, (node.props as any).className]
        .filter(Boolean)
        .join(" "),
      focusable: "false",
    });
  }
  return node;
}

const isSingleElement = (node: React.ReactNode): node is React.ReactElement =>
  !!node && React.isValidElement(node) && typeof node.type !== "string";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> &
  ButtonOptions & {
    /** Optional icon rendered to the left of the content. */
    leftIcon?: React.ReactNode;
    /** Override applied to the icon wrapper (default is size-based). */
    leftIconClassName?: string;
  };

export function Button({
  color,
  variant,
  size = "md",
  active,
  disabled,
  wide,
  block,
  square,
  circle,
  className,
  leftIcon,
  leftIconClassName,
  children,
  ...rest
}: ButtonProps) {
  const classes = btnClass({
    color,
    variant,
    size,
    active,
    disabled,
    wide,
    block,
    square,
    circle,
    className,
  });

  const iconCls = leftIconClassName ?? `${iconSizeByBtnSize[size]} shrink-0`;

  const hasChildren = React.Children.count(children) > 0;
  const isIconOnly =
    (!leftIcon && hasChildren && isSingleElement(children)) ||
    (leftIcon && !hasChildren);

  const content = isIconOnly ? (
    leftIcon ? (
      withIcon(leftIcon, iconCls)
    ) : (
      withIcon(children as React.ReactElement, iconCls)
    )
  ) : (
    <>
      {leftIcon && withIcon(leftIcon, iconCls)}
      {children}
    </>
  );

  return (
    <button
      className={[
        classes,
        "inline-flex items-center justify-center",
        !isIconOnly && leftIcon ? "gap-2" : "",
      ]
        .join(" ")
        .trim()}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;
