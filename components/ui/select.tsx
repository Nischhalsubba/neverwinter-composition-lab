import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-12 w-full border border-white/10 bg-[linear-gradient(180deg,rgba(205,180,219,0.12),rgba(189,224,254,0.08))] px-4 text-sm text-stone-100 outline-none transition focus:border-sky-200/60 focus:bg-[linear-gradient(180deg,rgba(205,180,219,0.18),rgba(189,224,254,0.14))]",
      className,
    )}
    {...props}
  />
));

Select.displayName = "Select";
