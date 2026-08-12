"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, HelpCircle, Menu, Search, Settings, Swords, X } from "lucide-react";

import { appRoutes, referenceRoutes, utilityRoutes } from "@/config/navigation";
import { SlideInPanel } from "@/components/motion/reveal";
import { RouteTransition } from "@/components/motion/route-transition";
import { Input } from "@/components/ui/input";
import { readAppSettings } from "@/lib/app-settings";

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
      style={active ? { color: "#ffffff" } : undefined}
      className={`flex items-center gap-4 border-l-2 px-6 py-3 text-[11px] uppercase tracking-[0.18em] transition ${
        active
          ? "border-[var(--foreground)] bg-[var(--foreground)] !text-white shadow-[0_0_0_1px_var(--foreground)_inset]"
          : "border-transparent text-[var(--foreground)]/72 hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "!text-white" : "text-[var(--foreground)]/58"}`} />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const applySettings = () => {
      const settings = readAppSettings();
      root.dataset.highContrast = settings.highContrastMode ? "true" : "false";
      root.dataset.reducedMotion = settings.reducedMotion ? "true" : "false";
    };

    applySettings();
    window.addEventListener("storage", applySettings);
    window.addEventListener("focus", applySettings);

    return () => {
      window.removeEventListener("storage", applySettings);
      window.removeEventListener("focus", applySettings);
    };
  }, []);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) {
      router.push("/search");
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="fixed inset-x-0 top-0 z-40 h-[72px] border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex h-full w-full items-center justify-between gap-4 px-4 md:px-6 xl:px-8 2xl:px-10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="flex h-9 w-9 items-center justify-center border border-[var(--border)] bg-[var(--panel)] lg:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4 text-[var(--foreground)]" />
                ) : (
                  <Menu className="h-4 w-4 text-[var(--foreground)]" />
                )}
              </button>
              <Link href="/" className="text-xl font-semibold uppercase tracking-[-0.05em] text-[var(--foreground)]">
                Neverwinter Lab
              </Link>
            </div>
            <nav className="hidden items-center gap-3 md:flex">
              <Link
                href="/"
                style={pathname === "/" ? { color: "#ffffff" } : undefined}
                className={`border px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  pathname === "/"
                    ? "border-[var(--foreground)] bg-[var(--foreground)] font-semibold !text-white shadow-[0_0_0_1px_var(--foreground)_inset]"
                    : "border-transparent text-[var(--foreground)]/66 hover:border-[var(--pastel-petal)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/team-builder"
                style={pathname === "/team-builder" ? { color: "#ffffff" } : undefined}
                className={`border px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  pathname === "/team-builder"
                    ? "border-[var(--foreground)] bg-[var(--foreground)] font-semibold !text-white shadow-[0_0_0_1px_var(--foreground)_inset]"
                    : "border-transparent text-[var(--foreground)]/66 hover:border-[var(--pastel-petal)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
                }`}
              >
                Team Builder
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden h-12 min-w-[360px] max-w-[560px] flex-1 items-center border border-[var(--border-strong)] bg-[var(--surface)] pl-4 pr-2 lg:flex"
            >
              <Search className="h-3.5 w-3.5 shrink-0 text-[var(--foreground)]/56" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search builds, items, notes..."
                className="h-full border-0 bg-transparent px-3 text-[11px] uppercase tracking-[0.14em]"
              />
              <button
                type="submit"
                aria-label="Run search"
                className="flex h-8 min-w-[112px] items-center justify-center gap-2 border border-[var(--thistle)] bg-[var(--thistle)] px-3 text-[10px] uppercase tracking-[0.18em] text-white transition hover:border-[var(--pastel-petal)] hover:bg-[var(--pastel-petal)] hover:text-white"
              >
                Search
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/reference" aria-label="Reference hub">
                <HelpCircle className="h-4 w-4 text-[var(--foreground)]/72 transition hover:text-[var(--thistle)]" />
              </Link>
              <Link href="/settings" aria-label="Settings">
                <Settings className="h-4 w-4 text-[var(--foreground)]/72 transition hover:text-[var(--thistle)]" />
              </Link>
            </div>
            <Link href="/team-builder" className="flex h-8 w-8 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
              <Swords className="h-4 w-4 text-[var(--foreground)]" />
            </Link>
          </div>
        </div>
      </header>

      <div className="min-h-screen w-full pt-[72px] lg:pl-[248px]">
        {mobileMenuOpen ? (
          <div
            className="fixed inset-0 top-[72px] z-30 bg-[rgba(0,119,182,0.18)] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <SlideInPanel side="left" className="h-full w-[88vw] max-w-[380px]">
              <aside
                className="h-full overflow-y-auto border-r border-[var(--border)] bg-[var(--background)]"
                onClick={(event) => event.stopPropagation()}
              >
              <div className="border-b border-[var(--border)] px-5 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
                    <Swords className="h-4 w-4 text-[var(--sky-blue)]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]/62">Elite endgame</p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-[var(--foreground)]">Strategist Hub</p>
                  </div>
                </div>
                <form onSubmit={handleSearchSubmit} className="relative mt-5 flex h-12 items-center border border-[var(--border-strong)] bg-[var(--surface)] pl-4 pr-2">
                  <Search className="h-3.5 w-3.5 shrink-0 text-[var(--foreground)]/50" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search builds, items, notes..."
                    className="h-full border-0 bg-transparent px-3 text-[11px] uppercase tracking-[0.14em]"
                  />
                </form>
              </div>

              <div className="space-y-2 py-4">
                {appRoutes.map((route) => (
                  <div key={route.href} onClick={() => setMobileMenuOpen(false)}>
                    <ShellLink href={route.href} label={route.label} icon={route.icon} active={pathname === route.href} />
                  </div>
                ))}
                {referenceRoutes.length > 0 ? (
                  <div onClick={() => setMobileMenuOpen(false)}>
                    <ShellLink
                      href="/reference"
                      label="Reference"
                      icon={referenceRoutes[0].icon}
                      active={pathname !== "/reference" && referenceRoutes.some((route) => pathname === route.href)}
                    />
                  </div>
                ) : null}
              </div>

              <div className="border-t border-[var(--border)] py-4">
                {utilityRoutes.map((route) => (
                  <div key={route.href} onClick={() => setMobileMenuOpen(false)}>
                    <ShellLink href={route.href} label={route.label} icon={route.icon} active={pathname === route.href} />
                  </div>
                ))}
              </div>
              </aside>
            </SlideInPanel>
          </div>
        ) : null}

        <aside className="hidden lg:fixed lg:inset-y-[72px] lg:left-0 lg:flex lg:w-[248px] lg:flex-col lg:overflow-hidden lg:border-r lg:border-[var(--border)] lg:bg-[var(--background)]">
          <div className="border-b border-[var(--border)] px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--panel)]">
                <Swords className="h-4 w-4 text-[var(--sky-blue)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]/62">Elite endgame</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-[var(--foreground)]">Strategist Hub</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 py-6">
            {appRoutes.map((route) => (
              <ShellLink key={route.href} href={route.href} label={route.label} icon={route.icon} active={pathname === route.href} />
            ))}
            {referenceRoutes.length > 0 ? (
              <ShellLink
                href="/reference"
                label="Reference"
                icon={referenceRoutes[0].icon}
                active={pathname !== "/reference" && referenceRoutes.some((route) => pathname === route.href)}
              />
            ) : null}
          </div>

          <div className="mt-auto space-y-1 border-t border-[var(--border)] py-6">
            {utilityRoutes.map((route) => (
              <ShellLink key={route.href} href={route.href} label={route.label} icon={route.icon} active={pathname === route.href} />
            ))}
          </div>
        </aside>

        <main className="min-w-0">
          <RouteTransition>{children}</RouteTransition>
        </main>
      </div>
    </div>
  );
}
