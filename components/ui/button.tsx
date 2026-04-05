import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sky-blue)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--thistle)] bg-[var(--thistle)] text-[var(--sky-blue)] hover:border-[var(--pastel-petal)] hover:bg-[var(--pastel-petal)] hover:text-[var(--sky-blue)]",
        secondary:
          "border-[var(--pastel-petal)] bg-[var(--surface)] text-black hover:border-[var(--baby-pink)] hover:bg-[var(--panel)]",
        ghost:
          "border-[var(--pastel-petal)] bg-transparent text-black hover:bg-[var(--panel)]",
        danger:
          "border-[var(--baby-pink)] bg-[var(--baby-pink)] text-[var(--thistle)] hover:border-[var(--pastel-petal)] hover:bg-[var(--pastel-petal)]",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
