import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SummaryPanel({
  icon: Icon,
  title,
  lines,
}: {
  icon: LucideIcon;
  title: string;
  lines: { label: string; value: string; detail: string }[];
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-white">
          <Icon className="h-4 w-4 text-[var(--sky-blue)]" />
          <p className="text-xs uppercase tracking-[0.22em]">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lines.map((line) => (
          <div
            key={line.label}
            className="border border-[var(--border)] bg-[rgba(205,180,219,0.1)] px-5 py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white">{line.label}</p>
              <p className="text-sm font-medium text-white">{line.value}</p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/80">{line.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
