import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full border border-[var(--border)] bg-[rgba(205,180,219,0.12)] px-4 text-sm text-white outline-none transition focus:border-[var(--sky-blue)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
