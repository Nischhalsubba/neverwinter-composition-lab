"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Swords } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appRoutes, utilityRoutes } from "@/config/navigation";
import { titleCase } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentRoute = appRoutes.find((route) => route.href === pathname);
  const pageTitle =
    currentRoute?.label ?? (pathname === "/" ? "Dashboard" : titleCase(pathname.replaceAll("/", " ")));

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-[280px_minmax(0,1fr)] min-[1900px]:px-6">
        <aside className="hidden lg:block">
          <Card className="sticky top-5 overflow-hidden">
            <CardHeader className="border-b border-white/6 pb-6">
              <div className="flex items-center gap-3">
                <div className="border border-[rgba(162,210,255,0.9)] bg-[rgba(162,210,255,0.16)] p-3.5">
                  <Swords className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Neverwinter</p>
                  <CardTitle>Composition Lab</CardTitle>
                </div>
              </div>
              <CardDescription>
                Focused planning shell for composition setup, support coverage, and source-aware loadout decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
              <div className="space-y-2">
                {appRoutes.map((route) => {
                  const isActive = pathname === route.href;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`flex items-center justify-between border px-4 py-3.5 text-sm transition ${
                        isActive
                          ? "border-[rgba(162,210,255,0.9)] bg-[rgba(162,210,255,0.18)] text-white"
                          : "border-white/10 bg-black text-white/80 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span>{route.label}</span>
                      <route.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-white/55"}`} />
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-white/6 pt-4">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/60">Notes</p>
                <div className="space-y-2">
                  {utilityRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="flex items-center justify-between border border-white/10 bg-black px-4 py-3.5 text-sm text-white/80 transition hover:border-white/25 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className="h-4 w-4 text-white/55" />
                        <span>{route.label}</span>
                      </div>
                      {route.badge ? (
                        <span className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/60">
                          {route.badge}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0">
          <header className="mb-6 border border-white/12 bg-black px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-black text-white lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Composition planner</p>
                  <h1 className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-white">
                    {pageTitle}
                  </h1>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/70">
                <span className="border border-[rgba(162,210,255,0.9)] bg-[rgba(162,210,255,0.18)] px-3 py-2 text-white">Module 32.5</span>
                <span className="border border-white/15 bg-black px-3 py-2">Local typed data</span>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

