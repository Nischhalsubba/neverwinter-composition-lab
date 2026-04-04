import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase",
  {
    variants: {
      variant: {
        default: "border-[rgba(205,180,219,0.36)] bg-[rgba(205,180,219,0.14)] text-[rgba(205,180,219,0.94)]",
        teal: "border-[rgba(162,210,255,0.48)] bg-[rgba(162,210,255,0.22)] text-[rgba(189,224,254,0.98)]",
        green: "border-[rgba(189,224,254,0.44)] bg-[rgba(189,224,254,0.22)] text-[rgba(205,180,219,0.98)]",
        red: "border-[rgba(255,175,204,0.5)] bg-[rgba(255,175,204,0.24)] text-[rgba(255,200,221,0.98)]",
        purple: "border-[rgba(205,180,219,0.52)] bg-[rgba(205,180,219,0.24)] text-[rgba(205,180,219,0.98)]",
        orange: "border-[rgba(255,200,221,0.5)] bg-[rgba(255,200,221,0.24)] text-[rgba(255,175,204,0.98)]",
        gold: "border-[rgba(255,200,221,0.5)] bg-[rgba(255,175,204,0.18)] text-[rgba(255,200,221,0.98)]",
        blue: "border-[rgba(162,210,255,0.52)] bg-[rgba(189,224,254,0.24)] text-[rgba(162,210,255,0.98)]",
        muted: "border-[rgba(205,180,219,0.22)] bg-[rgba(205,180,219,0.08)] text-[rgba(205,180,219,0.72)]",
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
