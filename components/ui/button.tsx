import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(162,210,255,0.6)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-[rgba(162,210,255,0.5)] bg-[linear-gradient(180deg,rgba(162,210,255,0.42),rgba(189,224,254,0.28))] text-[rgba(205,180,219,0.98)] hover:bg-[linear-gradient(180deg,rgba(162,210,255,0.52),rgba(189,224,254,0.36))]",
        secondary:
          "border-[rgba(205,180,219,0.34)] bg-[linear-gradient(180deg,rgba(205,180,219,0.18),rgba(189,224,254,0.12))] text-[rgba(205,180,219,0.96)] hover:border-[rgba(255,200,221,0.46)] hover:bg-[linear-gradient(180deg,rgba(205,180,219,0.26),rgba(189,224,254,0.18))]",
        ghost:
          "border-transparent bg-transparent text-[rgba(205,180,219,0.82)] hover:bg-[rgba(255,200,221,0.16)]",
        danger:
          "border-[rgba(255,175,204,0.48)] bg-[linear-gradient(180deg,rgba(255,175,204,0.28),rgba(255,200,221,0.24))] text-[rgba(205,180,219,0.98)] hover:bg-[linear-gradient(180deg,rgba(255,175,204,0.38),rgba(255,200,221,0.3))]",
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
