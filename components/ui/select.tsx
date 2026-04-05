import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-12 w-full border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm text-white outline-none transition focus:border-[var(--border-strong)]",
      className,
    )}
    {...props}
  />
));

Select.displayName = "Select";
