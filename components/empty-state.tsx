import { Inbox } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
        <Inbox className="h-8 w-8 text-[var(--sky-blue)]" />
        <div>
          <p className="text-sm font-medium text-black">{title}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-black/80">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
