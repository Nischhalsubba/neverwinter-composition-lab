"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { getMotionDuration, useReducedMotionSetting } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionSetting();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: reducedMotion ? 0 : 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: getMotionDuration(reducedMotion, 0.28),
          delay: reducedMotion ? 0 : delay,
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, reducedMotion]);

  return (
    <div ref={ref} className={className} data-reveal>
      {children}
    </div>
  );
}

export function SlideInPanel({
  children,
  side = "right",
  className,
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionSetting();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const x = side === "right" ? 32 : -32;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, x: reducedMotion ? 0 : x },
        {
          autoAlpha: 1,
          x: 0,
          duration: getMotionDuration(reducedMotion, 0.28),
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, side]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerGroup({
  children,
  className,
  deps = [],
}: {
  children: React.ReactNode;
  className?: string;
  deps?: Array<string | number | boolean | null | undefined>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionSetting();
  const depKey = JSON.stringify(deps);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const targets = Array.from(ref.current.children);
    if (targets.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: reducedMotion ? 0 : 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: getMotionDuration(reducedMotion, 0.24),
          stagger: reducedMotion ? 0 : 0.04,
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [depKey, reducedMotion]);

  return <div ref={ref} className={className}>{children}</div>;
}
