import type * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border border-[rgba(205,180,219,0.3)] bg-[linear-gradient(180deg,rgba(205,180,219,0.18),rgba(255,200,221,0.14),rgba(189,224,254,0.12))] shadow-[0_16px_36px_rgba(205,180,219,0.12)] backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3 p-6 pb-0", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold tracking-[0.01em] text-[rgba(205,180,219,0.96)]", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-7 text-[rgba(205,180,219,0.78)]", className)} {...props} />;
}
