import { Card, CardContent } from "@/components/ui/card";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <Card>
      <CardContent className="space-y-3 py-6">
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="h-16 animate-pulse rounded-2xl bg-white/6" />
        <p className="text-sm text-stone-500">{label}</p>
      </CardContent>
    </Card>
  );
}
