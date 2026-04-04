const uncertainPatterns = [
  /<[^>]+>/i,
  /depends on the quality/i,
  /depends on the item level/i,
  /pending/i,
  /unresolved/i,
  /partially recovered/i,
  /unknown/i,
];

export function hasUncertainText(text: string | null | undefined) {
  if (!text) {
    return false;
  }

  return uncertainPatterns.some((pattern) => pattern.test(text));
}

export function sanitizeUiText(
  text: string | null | undefined,
  fallback = "Verified source entry.",
) {
  if (!text) {
    return fallback;
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .filter((sentence) => !hasUncertainText(sentence));

  return sentences.length > 0 ? sentences.join(" ") : fallback;
}
