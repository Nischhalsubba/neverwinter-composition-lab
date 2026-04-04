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
    copy: "The team builder surfaces typed support, boss debuffs, and the selected carry state separately.",
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
  const pageTitle = currentRoute?.label ?? (pathname === "/" ? "Dashboard" : titleCase(pathname.replaceAll("/", " ")));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(19,74,82,0.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(143,78,37,0.18),transparent_22%),linear-gradient(180deg,#07080d_0%,#0b0d13_35%,#090a10_100%)] text-stone-100">
      <div className="mx-auto grid min-h-screen max-w-[1800px] grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_360px]">
        <aside className="hidden lg:block">
          <Card className="sticky top-4 overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-teal-300/20 bg-teal-300/10 p-3">
                  <Swords className="h-5 w-5 text-teal-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-teal-200/80">Neverwinter</p>
                  <CardTitle>Composition Lab</CardTitle>
                </div>
              </div>
              <CardDescription>
                Premium endgame planning for patch-aware teams, support coverage, and mount-hit review.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {appRoutes.map((route) => {
                  const isActive = pathname === route.href;
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                        isActive
                          ? "border-teal-300/35 bg-teal-300/10 text-stone-50"
                          : "border-white/8 bg-white/[0.03] text-stone-200 hover:border-teal-300/30 hover:bg-teal-300/8"
                      }`}
                    >
                      <span>{route.label}</span>
                      <route.icon className={`h-4 w-4 ${isActive ? "text-teal-200" : "text-stone-400"}`} />
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-white/8 pt-3">
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-stone-500">Utilities</p>
                <div className="space-y-2">
                  {utilityRoutes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-stone-200 transition hover:border-teal-300/30 hover:bg-teal-300/8"
                    >
                      <div className="flex items-center gap-3">
                        <route.icon className="h-4 w-4 text-stone-400" />
                        <span>{route.label}</span>
                      </div>
                      {route.badge ? (
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-stone-400">
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
          <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-stone-200 lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-teal-200/80">Dark fantasy-tech</p>
                  <h1 className="text-xl font-semibold tracking-[0.01em] text-stone-50">{pageTitle}</h1>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-stone-400">
                <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-2 text-teal-100">Module 32.5</span>
                <span className="rounded-full border border-white/10 px-3 py-2">Desktop-first</span>
                <span className="rounded-full border border-white/10 px-3 py-2">Dark mode only</span>
                <span className="rounded-full border border-white/10 px-3 py-2">Local typed data</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <label className="flex h-11 w-full max-w-[420px] items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-3 text-sm text-stone-400">
                <Search className="h-4 w-4" />
                <input
                  className="w-full bg-transparent text-stone-100 outline-none placeholder:text-stone-500"
                  placeholder="Search companions, artifacts, mounts, patches..."
                  aria-label="Global search"
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-stone-100 transition hover:bg-white/10"
                >
                  Quick Compare
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-stone-100 transition hover:bg-white/10"
                >
                  Saved Builds
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-teal-300/25 bg-teal-300/10 px-4 py-3 text-sm text-teal-50 transition hover:bg-teal-300/15"
                >
                  Data Notes
                </button>
              </div>
            </div>
          </div>
          {children}
        </div>
        <aside className="hidden xl:block">
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex items-center gap-2 text-teal-200">
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
                <div key={item.title} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-teal-200" />
                    <p className="text-sm font-medium text-stone-100">{item.title}</p>
                  </div>
                  <p className="text-sm leading-6 text-stone-400">{item.copy}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-amber-300/8 to-transparent p-4">
                <div className="mb-2 flex items-center gap-2 text-amber-200">
                  <BookOpenText className="h-4 w-4" />
                  <p className="text-xs uppercase tracking-[0.22em]">Source rules</p>
                </div>
                <p className="text-sm leading-6 text-stone-300">
                  Unverified values stay in the model with provenance fields instead of being dropped or guessed.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <div className="mb-2 flex items-center gap-2 text-sky-200">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-xs uppercase tracking-[0.22em]">Frontend spec</p>
                </div>
                <p className="text-sm leading-6 text-stone-400">
                  Current shell now follows the UI doc’s sidebar, top-bar, and utility-navigation direction.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
