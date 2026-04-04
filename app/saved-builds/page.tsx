import { ContentPage } from "@/components/content-page";
import { EmptyState } from "@/components/empty-state";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Saved Builds"
      title="Saved build workspace"
      description="This utility page exists in the navigation now to match the frontend spec. Local preset persistence is still a later implementation step."
    >
      <EmptyState
        title="No saved builds yet"
        description="The utility route is in place so the shell and navigation do not have to be redesigned later when local save/load lands."
      />
    </ContentPage>
  );
}
