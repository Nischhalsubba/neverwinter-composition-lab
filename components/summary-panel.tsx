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
        <div className="flex items-center gap-2 text-teal-200">
          <Icon className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.22em]">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {lines.map((line) => (
          <div key={line.label} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-stone-300">{line.label}</p>
              <p className="text-sm font-medium text-stone-100">{line.value}</p>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-stone-500">{line.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
