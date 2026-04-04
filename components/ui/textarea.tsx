import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[112px] w-full rounded-2xl border border-white/10 bg-black/25 px-3 py-3 text-sm text-stone-100 outline-none transition focus:border-teal-300/50",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
