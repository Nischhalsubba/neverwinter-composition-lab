import { Card, CardContent } from "@/components/ui/card";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <Card>
      <CardContent className="space-y-3 py-6">
        <div className="h-4 w-32 animate-pulse bg-[rgba(162,210,255,0.18)]" />
        <div className="h-16 animate-pulse bg-[rgba(205,180,219,0.16)]" />
        <p className="text-sm text-black/80">{label}</p>
      </CardContent>
    </Card>
  );
}
