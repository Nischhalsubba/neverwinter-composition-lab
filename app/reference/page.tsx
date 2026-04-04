import Link from "next/link";

import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { referenceRoutes } from "@/config/navigation";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Reference Hub"
      title="All secondary reference pages in one place"
      description="Team Builder remains the primary workflow. The rest of the app lives here as supporting reference material instead of occupying the main navigation."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {referenceRoutes.map((route) => (
          <Link key={route.href} href={route.href}>
            <Card className="h-full transition hover:border-[rgba(162,210,255,0.36)]">
              <CardHeader>
                <CardTitle>{route.label}</CardTitle>
                <CardDescription>
                  Open the supporting reference view for {route.label.toLowerCase()}.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-[rgba(205,180,219,0.84)]">
                Supporting reference content only.
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
