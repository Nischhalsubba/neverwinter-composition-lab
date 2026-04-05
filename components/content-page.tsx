import type { ReactNode } from "react";

import { SourceBadge } from "@/components/source-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SourceMetadata } from "@/lib/types";

export function ContentPage({
  eyebrow,
  title,
  description,
  children,
  rightRail,
  metadata,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  rightRail?: ReactNode;
  metadata?: SourceMetadata;
}) {
  return (
    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="teal">{eyebrow}</Badge>
              {metadata ? <SourceBadge {...metadata} /> : null}
            </div>
            <div className="space-y-3">
              <CardTitle className="text-[32px] leading-[1.05] tracking-[-0.04em]">{title}</CardTitle>
              <CardDescription className="max-w-4xl text-base leading-7">{description}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        {children}
      </div>
      {rightRail ? <aside className="space-y-6">{rightRail}</aside> : null}
    </div>
  );
}
