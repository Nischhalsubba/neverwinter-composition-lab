import { Badge } from "@/components/ui/badge";
import type { SourceMetadata } from "@/lib/types";

export function SourceBadge({ source_type, verification_status }: SourceMetadata) {
  const variant =
    verification_status === "verified"
      ? "teal"
      : verification_status === "partially_recovered"
        ? "blue"
        : verification_status === "inferred"
          ? "orange"
          : "red";

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant={variant}>{verification_status.replaceAll("_", " ")}</Badge>
      <Badge variant="muted">{source_type.replaceAll("_", " ")}</Badge>
    </div>
  );
}
