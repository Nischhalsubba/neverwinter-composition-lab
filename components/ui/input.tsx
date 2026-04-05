import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm text-black outline-none transition focus:border-[var(--border-strong)]",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
