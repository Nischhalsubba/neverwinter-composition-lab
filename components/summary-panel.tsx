import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SummaryPanel({
  icon: Icon,
  title,
  highlights,
  lines,
  onHeaderClick,
  onLineClick,
}: {
  icon: LucideIcon;
  title: string;
  highlights?: { label: string; value: string }[];
  lines: { label: string; value: string; detail: string }[];
  onHeaderClick?: () => void;
  onLineClick?: (label: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <button
          type="button"
          onClick={onHeaderClick}
          className="flex items-center gap-2 text-left text-black"
        >
          <Icon className="h-4 w-4 text-[var(--sky-blue)]" />
          <p className="text-[10px] uppercase tracking-[0.22em]">{title}</p>
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {highlights && highlights.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-black/58">{item.label}</p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-black">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
        {lines.map((line) => (
          <button
            type="button"
            key={line.label}
            onClick={() => onLineClick?.(line.label)}
            className="block w-full border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-left"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-black">{line.label}</p>
              <p className="text-sm font-medium text-black">{line.value}</p>
            </div>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-black/58">{line.detail}</p>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
