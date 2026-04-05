import { cn } from "@/lib/utils";

export function Skeleton({
  className,
}: {
  className?: string;
}) {
  return <div className={cn("nw-skeleton border border-[var(--border)] bg-[var(--surface-2)]", className)} />;
}
