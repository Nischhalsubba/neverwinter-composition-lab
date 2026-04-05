import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-12 w-full border border-white/20 bg-black px-4 text-sm text-white outline-none transition focus:border-[rgba(162,210,255,0.8)]",
      className,
    )}
    {...props}
  />
));

Select.displayName = "Select";
