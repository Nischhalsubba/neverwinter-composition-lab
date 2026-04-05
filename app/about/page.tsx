import { ContentPage } from "@/components/content-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <ContentPage
      eyebrow="About / Data Notes"
      title="Project notes and data honesty"
      description="This route is the shell-level location for project notes, data provenance rules, and future QA guidance."
    >
      <Card>
        <CardHeader>
          <CardTitle>Current note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-white/74">
          Neverwinter values in this repo remain split into verified, partially recovered, inferred, and pending live checks. This page now exists so those notes have a stable product home.
        </CardContent>
      </Card>
    </ContentPage>
  );
}
