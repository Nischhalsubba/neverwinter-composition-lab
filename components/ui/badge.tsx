import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/8 text-stone-200",
        teal: "border-sky-200/40 bg-sky-200/20 text-sky-100",
        green: "border-emerald-200/38 bg-emerald-200/18 text-emerald-50",
        red: "border-pink-200/40 bg-pink-200/18 text-pink-50",
        purple: "border-violet-200/40 bg-violet-200/18 text-violet-50",
        orange: "border-rose-100/45 bg-rose-100/20 text-rose-50",
        gold: "border-amber-100/45 bg-amber-100/18 text-amber-50",
        blue: "border-blue-100/45 bg-blue-100/20 text-blue-50",
        muted: "border-white/8 bg-white/6 text-stone-400",
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
