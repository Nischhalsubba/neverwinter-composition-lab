"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import { getMotionDuration, useReducedMotionSetting } from "@/lib/motion";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionSetting();

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: reducedMotion ? 0 : 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: getMotionDuration(reducedMotion, 0.32),
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
        },
      );

      const revealTargets = containerRef.current?.querySelectorAll("[data-reveal]");
      if (revealTargets && revealTargets.length > 0) {
        gsap.fromTo(
          revealTargets,
          { autoAlpha: 0, y: reducedMotion ? 0 : 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: getMotionDuration(reducedMotion, 0.28),
            ease: "power2.out",
            stagger: reducedMotion ? 0 : 0.05,
            delay: reducedMotion ? 0 : 0.04,
            clearProps: "opacity,visibility,transform",
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [pathname, reducedMotion]);

  return (
    <div ref={containerRef} key={pathname}>
      {children}
    </div>
  );
}
