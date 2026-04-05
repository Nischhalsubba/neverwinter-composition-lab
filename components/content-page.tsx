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
    <div className="grid w-full gap-8 px-4 py-8 md:px-6 xl:px-8 xl:py-10 3xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-8">
        <Card className="bg-[rgba(255,255,255,0.015)]">
          <CardHeader className="space-y-5 p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="teal">{eyebrow}</Badge>
              {metadata ? <SourceBadge {...metadata} /> : null}
            </div>
            <div className="space-y-3">
              <CardTitle className="max-w-4xl text-[34px] uppercase leading-[1.02] tracking-[-0.06em]">
                {title}
              </CardTitle>
              <CardDescription className="max-w-3xl text-sm leading-7">{description}</CardDescription>
            </div>
          </CardHeader>
        </Card>
        {children}
      </div>
      {rightRail ? <aside className="space-y-6">{rightRail}</aside> : null}
    </div>
  );
}
