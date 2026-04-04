import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[128px] w-full rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.46),rgba(17,0,28,0.8))] px-4 py-3.5 text-sm text-stone-100 outline-none transition focus:border-fuchsia-300/28 focus:bg-[linear-gradient(180deg,rgba(63,7,54,0.58),rgba(17,0,28,0.9))]",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
