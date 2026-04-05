import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[128px] w-full border border-white/20 bg-black px-4 py-3.5 text-sm text-white outline-none transition focus:border-[rgba(162,210,255,0.8)]",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
