import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase",
  {
    variants: {
      variant: {
        default: "border-[var(--thistle)] bg-[rgba(205,180,219,0.16)] text-white",
        teal: "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.18)] text-white",
        green: "border-[var(--icy-blue)] bg-[rgba(189,224,254,0.18)] text-white",
        red: "border-[var(--baby-pink)] bg-[rgba(255,175,204,0.18)] text-white",
        purple: "border-[var(--thistle)] bg-[rgba(205,180,219,0.18)] text-white",
        orange: "border-[var(--pastel-petal)] bg-[rgba(255,200,221,0.18)] text-white",
        gold: "border-[var(--pastel-petal)] bg-[rgba(255,200,221,0.18)] text-white",
        blue: "border-[var(--icy-blue)] bg-[rgba(189,224,254,0.18)] text-white",
        muted: "border-[var(--thistle)] bg-[rgba(205,180,219,0.1)] text-white",
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
