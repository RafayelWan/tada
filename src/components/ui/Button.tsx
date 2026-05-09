import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blush-300 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-blush-400 to-blush-500 text-white shadow-soft hover:shadow-glow",
        secondary:
          "bg-white/80 text-ink-900 border border-ink-100 hover:bg-white",
        ghost:
          "bg-transparent text-ink-700 hover:bg-white/60",
        soft:
          "bg-blush-100 text-blush-500 hover:bg-blush-200",
        mauve:
          "bg-gradient-to-br from-mauve-300 to-mauve-400 text-white shadow-soft",
        outline:
          "bg-transparent text-ink-900 border border-ink-300 hover:border-blush-300 hover:text-blush-500",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-13 px-8 text-base py-3",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";
