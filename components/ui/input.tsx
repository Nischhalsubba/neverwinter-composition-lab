import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full border border-[rgba(205,180,219,0.34)] bg-[linear-gradient(180deg,rgba(205,180,219,0.18),rgba(189,224,254,0.12))] px-4 text-sm text-[rgba(205,180,219,0.96)] outline-none transition focus:border-[rgba(162,210,255,0.56)] focus:bg-[linear-gradient(180deg,rgba(205,180,219,0.24),rgba(189,224,254,0.18))]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
