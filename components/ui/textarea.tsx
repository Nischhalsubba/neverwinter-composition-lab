import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[128px] w-full border border-[rgba(205,180,219,0.34)] bg-[linear-gradient(180deg,rgba(205,180,219,0.18),rgba(189,224,254,0.12))] px-4 py-3.5 text-sm text-[rgba(205,180,219,0.96)] outline-none transition focus:border-[rgba(162,210,255,0.56)] focus:bg-[linear-gradient(180deg,rgba(205,180,219,0.24),rgba(189,224,254,0.18))]",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
