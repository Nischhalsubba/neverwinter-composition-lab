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
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="teal">{eyebrow}</Badge>
              {metadata ? <SourceBadge {...metadata} /> : null}
            </div>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <CardDescription className="max-w-3xl text-base">{description}</CardDescription>
          </CardHeader>
        </Card>
        {children}
      </div>
      <div className="space-y-6">{rightRail}</div>
    </div>
  );
}
