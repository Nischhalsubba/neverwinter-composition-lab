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
        <div className="flex items-center gap-2 text-[rgba(162,210,255,0.98)]">
          <Icon className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.22em]">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lines.map((line) => (
          <div
            key={line.label}
            className="border border-[rgba(205,180,219,0.26)] bg-[linear-gradient(180deg,rgba(205,180,219,0.18),rgba(189,224,254,0.12))] px-5 py-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-[rgba(205,180,219,0.78)]">{line.label}</p>
              <p className="text-sm font-medium text-[rgba(205,180,219,0.96)]">{line.value}</p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[rgba(205,180,219,0.62)]">{line.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
