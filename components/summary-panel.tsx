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
        <div className="flex items-center gap-2 text-sky-100">
          <Icon className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.22em]">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lines.map((line) => (
          <div
            key={line.label}
            className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.4),rgba(17,0,28,0.84))] px-5 py-4"
          >
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
