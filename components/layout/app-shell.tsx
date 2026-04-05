"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Search, Settings, Swords } from "lucide-react";

import { appRoutes, referenceRoutes, utilityRoutes } from "@/config/navigation";
import { Input } from "@/components/ui/input";

function ShellLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 border-l-2 px-6 py-3 text-[11px] uppercase tracking-[0.18em] transition ${
        active
          ? "border-[var(--sky-blue)] bg-[rgba(205,180,219,0.08)] text-white"
          : "border-transparent text-white/66 hover:text-white"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-[var(--sky-blue)]" : "text-white/58"}`} />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto flex h-full max-w-[1680px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-semibold uppercase tracking-[-0.05em] text-white">
              Neverwinter Lab
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/"
                className={`border-b-2 px-0 py-2 text-xs uppercase tracking-[0.14em] ${
                  pathname === "/" ? "border-[var(--sky-blue)] text-white" : "border-transparent text-white/62"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/team-builder"
                className={`border-b-2 px-0 py-2 text-xs uppercase tracking-[0.14em] ${
                  pathname === "/team-builder"
                    ? "border-[var(--sky-blue)] text-white"
                    : "border-transparent text-white/62"
                }`}
              >
                Team Builder
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden w-64 lg:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
              <Input placeholder="Search builds, items, notes..." className="pl-10 text-[11px] uppercase tracking-[0.14em]" />
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <Bell className="h-4 w-4 text-white/72" />
              <HelpCircle className="h-4 w-4 text-white/72" />
              <Settings className="h-4 w-4 text-white/72" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
              <Swords className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 pt-16 lg:grid-cols-[224px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-64px)] border-r border-[var(--border)] bg-[rgba(255,255,255,0.015)] lg:flex lg:flex-col">
          <div className="border-b border-[var(--border)] px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
                <Swords className="h-4 w-4 text-[var(--sky-blue)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/62">Elite endgame</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-white">Strategist Hub</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 py-6">
            {appRoutes.map((route) => (
              <ShellLink
                key={route.href}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={pathname === route.href}
              />
            ))}
            {referenceRoutes.length > 0 ? (
              <ShellLink
                href="/reference"
                label="Reference"
                icon={referenceRoutes[0].icon}
                active={pathname.startsWith("/reference") || referenceRoutes.some((route) => pathname === route.href)}
              />
            ) : null}
          </div>

          <div className="mt-auto space-y-1 border-t border-[var(--border)] py-6">
            {utilityRoutes.map((route) => (
              <ShellLink
                key={route.href}
                href={route.href}
                label={route.label}
                icon={route.icon}
                active={pathname === route.href}
              />
            ))}
          </div>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
