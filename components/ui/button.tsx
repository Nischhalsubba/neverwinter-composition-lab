import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[18px] border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-fuchsia-300/18 bg-[linear-gradient(180deg,rgba(79,1,71,0.78),rgba(58,1,92,0.82))] text-fuchsia-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-[linear-gradient(180deg,rgba(90,5,84,0.88),rgba(66,4,99,0.92))]",
        secondary:
          "border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.55),rgba(17,0,28,0.82))] text-stone-100 hover:border-white/12 hover:bg-[linear-gradient(180deg,rgba(62,7,53,0.7),rgba(22,2,32,0.9))]",
        ghost: "border-transparent bg-transparent text-stone-300 hover:bg-white/6",
        danger: "border-rose-300/25 bg-rose-300/12 text-rose-100 hover:bg-rose-300/16",
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
