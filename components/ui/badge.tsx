import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase",
  {
    variants: {
      variant: {
        default: "border-[rgba(205,180,219,0.9)] bg-[rgba(205,180,219,0.2)] text-white",
        teal: "border-[rgba(162,210,255,0.95)] bg-[rgba(162,210,255,0.2)] text-white",
        green: "border-[rgba(189,224,254,0.95)] bg-[rgba(189,224,254,0.2)] text-white",
        red: "border-[rgba(255,175,204,0.95)] bg-[rgba(255,175,204,0.18)] text-white",
        purple: "border-[rgba(205,180,219,0.95)] bg-[rgba(205,180,219,0.2)] text-white",
        orange: "border-[rgba(255,200,221,0.95)] bg-[rgba(255,200,221,0.18)] text-white",
        gold: "border-[rgba(255,200,221,0.95)] bg-[rgba(255,200,221,0.18)] text-white",
        blue: "border-[rgba(189,224,254,0.95)] bg-[rgba(189,224,254,0.18)] text-white",
        muted: "border-white/20 bg-white/5 text-white/80",
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
