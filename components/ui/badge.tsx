import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/6 text-stone-200",
        teal: "border-fuchsia-300/18 bg-fuchsia-300/10 text-fuchsia-100",
        green: "border-emerald-300/18 bg-emerald-300/10 text-emerald-100",
        red: "border-rose-300/18 bg-rose-300/10 text-rose-100",
        purple: "border-violet-300/18 bg-violet-300/12 text-violet-100",
        orange: "border-orange-300/18 bg-orange-300/10 text-orange-100",
        gold: "border-amber-300/18 bg-amber-300/10 text-amber-100",
        blue: "border-indigo-300/18 bg-indigo-300/10 text-indigo-100",
        muted: "border-white/8 bg-black/16 text-stone-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
