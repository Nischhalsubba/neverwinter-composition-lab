"use client";

import { useEffect, useState } from "react";

function readReducedMotionFlag() {
  if (typeof document === "undefined") {
    return false;
  }

  const datasetValue = document.documentElement.dataset.reducedMotion;
  if (datasetValue === "true") {
    return true;
  }

  if (typeof window !== "undefined" && "matchMedia" in window) {
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

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => apply();
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("storage", apply);
      window.removeEventListener("focus", apply);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return reducedMotion;
}

export function getMotionDuration(reducedMotion: boolean, duration: number) {
  return reducedMotion ? 0.01 : duration;
}
