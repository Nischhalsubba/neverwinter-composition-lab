"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Swords } from "lucide-react";

import { appRoutes, utilityRoutes } from "@/config/navigation";
import { titleCase } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentRoute = appRoutes.find((route) => route.href === pathname);
  const pageTitle =
    currentRoute?.label ?? (pathname === "/" ? "Dashboard" : titleCase(pathname.replaceAll("/", " ")));

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-[1680px] px-4 py-5 min-[1900px]:px-6">
        <header className="mb-6 border border-[var(--border)] bg-[var(--panel)] px-5 py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[rgba(205,180,219,0.16)] text-white lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center border border-[var(--sky-blue)] bg-[rgba(162,210,255,0.18)]">
                    <Swords className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/80">Neverwinter Composition Lab</p>
                    <h1 className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-white">{pageTitle}</h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white">
                <span className="border border-[var(--sky-blue)] bg-[rgba(162,210,255,0.18)] px-3 py-2">Module 32.5</span>
                <span className="border border-[var(--thistle)] bg-[rgba(205,180,219,0.14)] px-3 py-2">Local typed data</span>
              </div>
            </div>

            <nav className="flex flex-wrap gap-2">
              {appRoutes.map((route) => {
                const isActive = pathname === route.href;
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`inline-flex items-center gap-2 border px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "border-[var(--sky-blue)] bg-[rgba(162,210,255,0.18)] text-white"
                        : "border-[var(--thistle)] bg-[rgba(205,180,219,0.12)] text-white hover:border-[var(--pastel-petal)] hover:bg-[rgba(255,200,221,0.16)]"
                    }`}
                  >
                    <route.icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Link>
                );
              })}
              {utilityRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="inline-flex items-center gap-2 border border-[var(--pastel-petal)] bg-[rgba(255,200,221,0.12)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[rgba(255,200,221,0.18)]"
                >
                  <route.icon className="h-4 w-4" />
                  <span>{route.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

