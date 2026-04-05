import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full border border-white/20 bg-black px-4 text-sm text-white outline-none transition focus:border-[rgba(162,210,255,0.8)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
