import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Variant = "blush" | "mauve" | "sage" | "outline" | "muted";

export function Badge({
  className,
  variant = "blush",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const variants: Record<Variant, string> = {
    blush: "bg-blush-100 text-blush-500",
    mauve: "bg-mauve-100 text-mauve-500",
    sage: "bg-sage-100 text-sage-500",
    outline: "border border-ink-300 text-ink-700",
    muted: "bg-ink-100 text-ink-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
