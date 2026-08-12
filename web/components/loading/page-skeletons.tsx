import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`space-y-4 ${className}`}>{children}</section>;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
        <Card>
          <CardContent className="space-y-6 p-6 sm:p-8">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-14 w-full max-w-[480px]" />
            <Skeleton className="h-5 w-full max-w-[720px]" />
            <div className="grid gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-40 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-9 w-60" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[4.5rem] w-full" />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-9 w-60" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[4.5rem] w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TeamBuilderSkeleton() {
  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 xl:px-8">
      <Card>
        <CardContent className="space-y-6 p-6">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-14 w-full max-w-[420px]" />
          <div className="grid gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-8">
          <div className="grid gap-6 2xl:grid-cols-2">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <Card key={groupIndex}>
                <CardHeader className="space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full max-w-[320px]" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.from({ length: 3 }).map((_, cardIndex) => (
                    <Skeleton key={cardIndex} className="h-48 w-full" />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-56 w-full" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className={index === 0 ? "h-72 w-full" : "h-56 w-full"} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReferenceListSkeleton() {
  return (
    <div className="grid w-full gap-8 px-4 py-8 md:px-6 xl:px-8 xl:py-10">
      <Card className="bg-[var(--surface)]">
        <CardHeader className="space-y-5 p-8">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-12 w-full max-w-[540px]" />
          <Skeleton className="h-5 w-full max-w-[760px]" />
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-44 w-full" />
        ))}
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="grid w-full gap-8 px-4 py-8 md:px-6 xl:px-8 xl:py-10 3xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-8">
        <Card>
          <CardHeader className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-12 w-full max-w-[460px]" />
            <Skeleton className="h-5 w-full max-w-[720px]" />
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
            <Skeleton className="h-44 w-full max-w-[180px]" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-56 w-full" />
        ))}
      </div>
      <aside className="space-y-6">
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-44 w-full" />
      </aside>
    </div>
  );
}

export function UtilityPageSkeleton() {
  return (
    <div className="grid w-full gap-8 px-4 py-8 md:px-6 xl:px-8 xl:py-10">
      <Card>
        <CardHeader className="space-y-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-12 w-full max-w-[460px]" />
          <Skeleton className="h-5 w-full max-w-[760px]" />
        </CardHeader>
      </Card>
      <SectionShell>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-56 w-full" />
        ))}
      </SectionShell>
    </div>
  );
}
