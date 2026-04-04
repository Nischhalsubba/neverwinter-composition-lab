import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-2xl border border-white/10 bg-black/25 px-3 text-sm text-stone-100 outline-none transition focus:border-teal-300/50",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";
