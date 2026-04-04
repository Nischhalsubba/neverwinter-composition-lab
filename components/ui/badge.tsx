import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] uppercase",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/8 text-stone-200",
        teal: "border-teal-400/25 bg-teal-400/10 text-teal-200",
        green: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
        red: "border-rose-400/25 bg-rose-400/10 text-rose-200",
        purple: "border-violet-400/25 bg-violet-400/10 text-violet-200",
        orange: "border-orange-400/25 bg-orange-400/10 text-orange-200",
        gold: "border-amber-400/25 bg-amber-400/10 text-amber-200",
        blue: "border-sky-400/25 bg-sky-400/10 text-sky-200",
        muted: "border-white/8 bg-black/20 text-stone-400",
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
