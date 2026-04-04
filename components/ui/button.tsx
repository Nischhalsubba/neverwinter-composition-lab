import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-sky-200/40 bg-[linear-gradient(180deg,rgba(162,210,255,0.28),rgba(189,224,254,0.2))] text-slate-950 hover:bg-[linear-gradient(180deg,rgba(162,210,255,0.38),rgba(189,224,254,0.28))]",
        secondary:
          "border-white/10 bg-[linear-gradient(180deg,rgba(205,180,219,0.14),rgba(189,224,254,0.08))] text-stone-100 hover:border-white/16 hover:bg-[linear-gradient(180deg,rgba(205,180,219,0.22),rgba(189,224,254,0.14))]",
        ghost: "border-transparent bg-transparent text-stone-300 hover:bg-white/6",
        danger: "border-pink-200/40 bg-[linear-gradient(180deg,rgba(255,175,204,0.24),rgba(255,200,221,0.18))] text-slate-950 hover:bg-[linear-gradient(180deg,rgba(255,175,204,0.34),rgba(255,200,221,0.24))]",
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
