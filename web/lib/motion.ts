"use client";

import { useEffect, useState } from "react";
import { subscribeMediaQueryChanges } from "@/lib/media-query-subscription";

function readReducedMotionFlag() {
  if (typeof document === "undefined") {
    return false;
  }

  const datasetValue = document.documentElement.dataset.reducedMotion;
  if (datasetValue === "true") {
    return true;
  }

  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  return false;
}

export function useReducedMotionSetting() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const apply = () => setReducedMotion(readReducedMotionFlag());

    apply();
    window.addEventListener("storage", apply);
    window.addEventListener("focus", apply);

    const mediaQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    const unsubscribe = mediaQuery ? subscribeMediaQueryChanges(mediaQuery, apply) : () => {};

    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("focus", apply);
      unsubscribe();
    };
  }, []);

  return reducedMotion;
}

export function getMotionDuration(reducedMotion: boolean, duration: number) {
  return reducedMotion ? 0.01 : duration;
}
