import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-11 w-full rounded-2xl border border-white/10 bg-black/25 px-3 text-sm text-stone-100 outline-none transition focus:border-teal-300/50",
      className,
    )}
    {...props}
  />
));

Select.displayName = "Select";
