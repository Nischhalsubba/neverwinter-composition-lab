import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(162,210,255,0.7)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[rgba(162,210,255,0.9)] bg-[rgba(162,210,255,0.95)] text-black hover:bg-[rgba(189,224,254,1)]",
        secondary:
          "border-[rgba(205,180,219,0.9)] bg-[rgba(205,180,219,0.18)] text-white hover:bg-[rgba(205,180,219,0.28)]",
        ghost:
          "border-transparent bg-transparent text-white hover:bg-[rgba(255,255,255,0.08)]",
        danger:
          "border-[rgba(255,175,204,0.9)] bg-[rgba(255,175,204,0.92)] text-black hover:bg-[rgba(255,200,221,1)]",
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
