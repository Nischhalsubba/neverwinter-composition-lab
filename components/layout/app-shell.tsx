"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { Bell, HelpCircle, Menu, Search, Settings, Swords, X } from "lucide-react";

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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      <header className="fixed inset-x-0 top-0 z-40 h-[72px] border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex h-full w-full items-center justify-between px-4 md:px-6 xl:px-8 2xl:px-10">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="flex h-9 w-9 items-center justify-center border border-[var(--border)] bg-[var(--panel)] lg:hidden"
              >
                {mobileMenuOpen ? <X className="h-4 w-4 text-white" /> : <Menu className="h-4 w-4 text-white" />}
              </button>
              <Link href="/" className="text-xl font-semibold uppercase tracking-[-0.05em] text-white">
                Neverwinter Lab
              </Link>
            </div>
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
            <form onSubmit={handleSearchSubmit} className="relative hidden w-64 lg:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search builds, items, notes..."
                className="pl-10 text-[11px] uppercase tracking-[0.14em]"
              />
            </form>
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/patch-tracker" aria-label="Patch tracker">
                <Bell className="h-4 w-4 text-white/72 transition hover:text-white" />
              </Link>
              <Link href="/reference" aria-label="Reference hub">
                <HelpCircle className="h-4 w-4 text-white/72 transition hover:text-white" />
              </Link>
              <Link href="/settings" aria-label="Settings">
                <Settings className="h-4 w-4 text-white/72 transition hover:text-white" />
              </Link>
            </div>
            <Link href="/team-builder" className="flex h-8 w-8 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
              <Swords className="h-4 w-4 text-white" />
            </Link>
          </div>
        </div>
      </header>

      <div className="min-h-screen w-full pt-[72px] lg:pl-[248px]">
        {mobileMenuOpen ? (
          <div className="fixed inset-0 top-[72px] z-30 bg-[rgba(0,0,0,0.72)] lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <aside
              className="h-full w-[88vw] max-w-[360px] overflow-y-auto border-r border-[var(--border)] bg-[var(--background)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-[var(--border)] px-5 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
                    <Swords className="h-4 w-4 text-[var(--sky-blue)]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/62">Elite endgame</p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-white">Strategist Hub</p>
                  </div>
                </div>
                <form onSubmit={handleSearchSubmit} className="relative mt-5">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search builds, items, notes..."
                    className="pl-10 text-[11px] uppercase tracking-[0.14em]"
                  />
                </form>
              </div>

              <div className="space-y-2 py-4">
                {appRoutes.map((route) => (
                  <div key={route.href} onClick={() => setMobileMenuOpen(false)}>
                    <ShellLink
                      href={route.href}
                      label={route.label}
                      icon={route.icon}
                      active={pathname === route.href}
                    />
                  </div>
                ))}
                {referenceRoutes.length > 0 ? (
                  <div onClick={() => setMobileMenuOpen(false)}>
                    <ShellLink
                      href="/reference"
                      label="Reference"
                      icon={referenceRoutes[0].icon}
                      active={pathname.startsWith("/reference") || referenceRoutes.some((route) => pathname === route.href)}
                    />
                  </div>
                ) : null}
              </div>

              <div className="border-t border-[var(--border)] py-4">
                {utilityRoutes.map((route) => (
                  <div key={route.href} onClick={() => setMobileMenuOpen(false)}>
                    <ShellLink
                      href={route.href}
                      label={route.label}
                      icon={route.icon}
                      active={pathname === route.href}
                    />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        ) : null}

        <aside className="hidden lg:fixed lg:inset-y-[72px] lg:left-0 lg:flex lg:w-[248px] lg:flex-col lg:overflow-hidden lg:border-r lg:border-[var(--border)] lg:bg-[rgba(255,255,255,0.015)]">
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
