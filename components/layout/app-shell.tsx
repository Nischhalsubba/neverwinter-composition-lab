"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  Compass,
  GitCompareArrows,
  Menu,
  ScrollText,
  Search,
  ShieldEllipsis,
  Sparkles,
  Swords,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appRoutes, utilityRoutes } from "@/config/navigation";
import { titleCase } from "@/lib/utils";

const spotlight = [
  {
    title: "Patch-aware model",
    copy: "Every meaningful entry keeps source provenance, version tags, and verification status.",
    icon: ScrollText,
  },
  {
    title: "Carry-first planning",
    copy: "The team builder keeps typed support, boss debuffs, and carry state separated.",
    icon: ShieldEllipsis,
  },
  {
    title: "Transparent math",
    copy: "Buffs, debuffs, and mount-hit stages remain inspectable instead of collapsing into one hidden total.",
    icon: GitCompareArrows,
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentRoute = appRoutes.find((route) => route.href === pathname);
  const pageTitle =
    currentRoute?.label ?? (pathname === "/" ? "Dashboard" : titleCase(pathname.replaceAll("/", " ")));

  return (
    <div className="min-h-screen text-stone-100">
      <div className="mx-auto grid min-h-screen max-w-[2140px] grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-[300px_minmax(0,1fr)] min-[1900px]:grid-cols-[300px_minmax(0,1fr)_340px] min-[1900px]:px-6">
        <aside className="hidden lg:block">
          <Card className="sticky top-5 overflow-hidden">
            <CardHeader className="border-b border-white/6 pb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-fuchsia-300/14 bg-fuchsia-300/10 p-3.5">
                  <Swords className="h-5 w-5 text-fuchsia-100" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/80">Neverwinter</p>
                  <CardTitle>Composition Lab</CardTitle>
                </div>
              </div>
              <CardDescription>
                Patch-aware endgame planning with cleaner structure than wiki pages, spreadsheets, or pin dumps.
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
                      className={`flex items-center justify-between rounded-[20px] border px-4 py-3.5 text-sm transition ${
                        isActive
                          ? "border-fuchsia-300/16 bg-[linear-gradient(180deg,rgba(79,1,71,0.8),rgba(58,1,92,0.5))] text-stone-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                          : "border-white/6 bg-[linear-gradient(180deg,rgba(53,1,44,0.24),rgba(17,0,28,0.38))] text-stone-300 hover:border-white/12 hover:bg-[linear-gradient(180deg,rgba(63,7,54,0.32),rgba(17,0,28,0.46))]"
                      }`}
                    >
                      <span>{route.label}</span>
                      <route.icon className={`h-4 w-4 ${isActive ? "text-fuchsia-100" : "text-stone-500"}`} />
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-white/6 pt-4">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-stone-500">Utilities</p>
                <div className="space-y-2">
                  {utilityRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="flex items-center justify-between rounded-[20px] border border-white/6 bg-[linear-gradient(180deg,rgba(53,1,44,0.22),rgba(17,0,28,0.34))] px-4 py-3.5 text-sm text-stone-300 transition hover:border-white/12 hover:bg-[linear-gradient(180deg,rgba(63,7,54,0.3),rgba(17,0,28,0.42))]"
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className="h-4 w-4 text-stone-500" />
                        <span>{route.label}</span>
                      </div>
                      {route.badge ? (
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-stone-500">
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
          <header className="mb-6 rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(79,1,71,0.18),rgba(23,3,29,0.94)_28%,rgba(17,0,28,0.98))] px-6 py-6 backdrop-blur-xl min-[1900px]:px-8 min-[1900px]:py-7">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-stone-200 lg:hidden"
                    aria-label="Open navigation"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/80">Dark fantasy-tech</p>
                    <h1 className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-stone-50 min-[1900px]:text-[34px]">
                      {pageTitle}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-stone-400">
                  <span className="rounded-full border border-fuchsia-300/16 bg-fuchsia-300/10 px-3 py-2 text-fuchsia-100">
                    Module 32.5
                  </span>
                  <span className="rounded-full border border-white/8 bg-white/4 px-3 py-2">Premium shell</span>
                  <span className="rounded-full border border-white/8 bg-white/4 px-3 py-2">Local typed data</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <label className="flex h-13 w-full max-w-[520px] items-center gap-3 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.42),rgba(17,0,28,0.78))] px-4 text-sm text-stone-400">
                  <Search className="h-4 w-4" />
                  <input
                    className="w-full bg-transparent text-stone-100 outline-none placeholder:text-stone-500"
                    placeholder="Search companions, artifacts, mounts, patches..."
                    aria-label="Global search"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.42),rgba(17,0,28,0.7))] px-4 py-3 text-sm text-stone-200 transition hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(63,7,54,0.52),rgba(17,0,28,0.78))]"
                  >
                    Quick Compare
                  </button>
                  <button
                    type="button"
                    className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.42),rgba(17,0,28,0.7))] px-4 py-3 text-sm text-stone-200 transition hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(63,7,54,0.52),rgba(17,0,28,0.78))]"
                  >
                    Saved Builds
                  </button>
                  <button
                    type="button"
                    className="rounded-[20px] border border-fuchsia-300/16 bg-[linear-gradient(180deg,rgba(79,1,71,0.8),rgba(58,1,92,0.58))] px-4 py-3 text-sm text-fuchsia-50 transition hover:bg-[linear-gradient(180deg,rgba(90,5,84,0.9),rgba(66,4,99,0.68))]"
                  >
                    Data Notes
                  </button>
                </div>
              </div>
            </div>
          </header>
          {children}
        </div>

        <aside className="hidden min-[1900px]:block">
          <Card className="sticky top-5">
            <CardHeader>
              <div className="flex items-center gap-2 text-fuchsia-200">
                <Compass className="h-4 w-4" />
                <p className="text-xs uppercase tracking-[0.22em]">Summary Rail Pattern</p>
              </div>
              <CardTitle>Foundation Signals</CardTitle>
              <CardDescription>
                Reusable right-rail cards for verification, patch awareness, and product direction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {spotlight.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.34),rgba(17,0,28,0.8))] p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-fuchsia-200" />
                    <p className="text-sm font-medium text-stone-100">{item.title}</p>
                  </div>
                  <p className="text-sm leading-6 text-stone-400">{item.copy}</p>
                </div>
              ))}
              <div className="rounded-[22px] border border-white/8 bg-gradient-to-br from-amber-300/10 to-transparent p-5">
                <div className="mb-2 flex items-center gap-2 text-amber-200">
                  <BookOpenText className="h-4 w-4" />
                  <p className="text-xs uppercase tracking-[0.22em]">Source rules</p>
                </div>
                <p className="text-sm leading-6 text-stone-300">
                  Unverified values stay in the model with provenance fields instead of being dropped or guessed.
                </p>
              </div>
              <div className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(53,1,44,0.34),rgba(17,0,28,0.8))] p-5">
                <div className="mb-2 flex items-center gap-2 text-indigo-200">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-xs uppercase tracking-[0.22em]">Frontend spec</p>
                </div>
                <p className="text-sm leading-6 text-stone-400">
                  This shell was simplified to reduce chrome density and give the main workflow more space.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

