import { ContentPage } from "@/components/content-page";
import { EmptyState } from "@/components/empty-state";

export default function Page() {
  return (
    <ContentPage
      eyebrow="Settings"
      title="Preferences and interface options"
      description="Settings is scaffolded as a utility view so the sidebar structure now follows the frontend/UI spec."
    >
      <EmptyState
        title="Settings are not implemented yet"
        description="This page reserves the surface for future density, accessibility, and saved-preference controls."
      />
    </ContentPage>
  );
}
