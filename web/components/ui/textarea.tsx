import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[128px] w-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3.5 text-sm text-black outline-none transition focus:border-[var(--border-strong)]",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
