import { ContentPage } from "@/components/content-page";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Settings"
      title="Preferences and interface options"
      description="Settings now serves as a functional utility page with links into the app flows that control saving, data notes, and reference browsing."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Build Data</CardTitle>
            <CardDescription>Open the save-management and planning surfaces.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/80">
            <Link href="/saved-builds" className="block border border-[var(--border)] px-4 py-3 hover:border-[var(--sky-blue)]">
              Saved Builds
            </Link>
            <Link href="/team-builder" className="block border border-[var(--border)] px-4 py-3 hover:border-[var(--sky-blue)]">
              Team Builder
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reference and Notes</CardTitle>
            <CardDescription>Open the app’s supporting knowledge surfaces.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/80">
            <Link href="/reference" className="block border border-[var(--border)] px-4 py-3 hover:border-[var(--sky-blue)]">
              Reference Hub
            </Link>
            <Link href="/about" className="block border border-[var(--border)] px-4 py-3 hover:border-[var(--sky-blue)]">
              Data Notes
            </Link>
            <Link href="/patch-tracker" className="block border border-[var(--border)] px-4 py-3 hover:border-[var(--sky-blue)]">
              Patch Tracker
            </Link>
          </CardContent>
        </Card>
      </div>
    </ContentPage>
  );
}
