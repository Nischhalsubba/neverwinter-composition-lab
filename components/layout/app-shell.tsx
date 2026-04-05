"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Info, Search, Swords } from "lucide-react";

import { appRoutes, referenceRoutes, utilityRoutes } from "@/config/navigation";
import { Input } from "@/components/ui/input";
import { titleCase } from "@/lib/utils";

function RouteLink({
  href,
  label,
  icon: Icon,
  active,
  compact = false,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 border transition ${
        compact ? "px-3 py-2.5 text-sm" : "px-4 py-3.5 text-sm"
      } ${
        active
          ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.14)] text-white"
          : "border-[var(--border)] bg-[var(--panel)] text-white/82 hover:border-[var(--pastel-petal)] hover:bg-[rgba(255,200,221,0.08)]"
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--border)] bg-[rgba(205,180,219,0.08)]">
        <Icon className={`h-4 w-4 ${active ? "text-white" : "text-white/72"}`} />
      </div>
      <div className="min-w-0">
        <p className="font-medium">{label}</p>
      </div>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentRoute =
    [...appRoutes, ...referenceRoutes, ...utilityRoutes].find((route) => route.href === pathname);
  const pageTitle =
    currentRoute?.label ?? (pathname === "/" ? "Dashboard" : titleCase(pathname.replaceAll("/", " ")));

  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[304px_minmax(0,1fr)] lg:px-5 xl:gap-8 xl:px-6">
        <aside className="hidden lg:flex lg:min-h-0 lg:flex-col lg:border lg:border-[var(--border)] lg:bg-[var(--panel)]">
          <div className="border-b border-[var(--border)] px-5 py-5">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--sky-blue)] bg-[rgba(162,210,255,0.14)]">
                <Swords className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/68">Neverwinter</p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">
                  Composition Lab
                </h1>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  Endgame setup, support coverage, and transparent team math.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto px-4 py-5">
            <section className="space-y-3">
              <p className="px-1 text-[11px] uppercase tracking-[0.2em] text-white/55">Primary</p>
              <div className="space-y-2">
                {appRoutes.map((route) => (
                  <RouteLink
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    icon={route.icon}
                    active={pathname === route.href}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Info className="h-4 w-4 text-white/55" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Reference</p>
              </div>
              <div className="space-y-2">
                {referenceRoutes.map((route) => (
                  <RouteLink
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    icon={route.icon}
                    active={pathname === route.href}
                    compact
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="border-t border-[var(--border)] px-4 py-4">
            <div className="space-y-2">
              {utilityRoutes.map((route) => (
                <RouteLink
                  key={route.href}
                  href={route.href}
                  label={route.label}
                  icon={route.icon}
                  active={pathname === route.href}
                  compact
                />
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <header className="border border-[var(--border)] bg-[var(--panel)]">
            <div className="flex flex-col gap-5 px-5 py-5 xl:px-6 xl:py-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                    Neverwinter Endgame Hub
                  </p>
                  <h2 className="text-[30px] font-semibold tracking-[-0.04em] text-white">
                    {pageTitle}
                  </h2>
                  <p className="max-w-3xl text-sm leading-6 text-white/72">
                    Recognition-first planning surfaces with source-aware data, role clarity, and premium readability.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                  <span className="border border-[var(--sky-blue)] bg-[rgba(162,210,255,0.12)] px-3 py-2 text-white">
                    Module 32.5
                  </span>
                  <span className="border border-[var(--thistle)] bg-[rgba(205,180,219,0.1)] px-3 py-2 text-white">
                    Local typed data
                  </span>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                <div className="relative max-w-2xl">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                  <Input
                    aria-label="Global search"
                    placeholder="Search classes, artifacts, companions, mounts, patches..."
                    className="pl-11"
                  />
                </div>

                <nav className="flex flex-wrap gap-2">
                  {appRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`inline-flex items-center gap-2 border px-4 py-3 text-sm font-medium transition ${
                        pathname === route.href
                          ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.14)] text-white"
                          : "border-[var(--border)] bg-[rgba(205,180,219,0.08)] text-white/80 hover:border-[var(--pastel-petal)] hover:bg-[rgba(255,200,221,0.08)]"
                      }`}
                    >
                      <route.icon className="h-4 w-4" />
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
