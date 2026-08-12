import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <Card>
      <CardContent className="space-y-3 py-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-16 w-full" />
        <p className="text-sm text-black/80">{label}</p>
      </CardContent>
    </Card>
  );
}
