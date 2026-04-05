import {
  artifacts,
  bossPresets,
  classes,
  classSnapshots,
  companionEnhancementSnapshots,
  companionPowerSnapshots,
  companions,
  dungeons,
  effectCatalog,
  events,
  glossaryTerms,
  mountCombatPowers,
  mounts,
  patchChanges,
  trials,
} from "@/data/game-data";
import type { SourceMetadata } from "@/lib/types";

export type ReferenceEntityType =
  | "artifacts"
  | "companions"
  | "classes"
  | "mounts"
  | "effects"
  | "dungeons"
  | "trials"
  | "events"
  | "patches"
  | "glossary"
  | "bosses"
  | "enhancements"
  | "companion-powers";

export interface ReferenceIndexItem {
  entityType: ReferenceEntityType;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  badges?: readonly string[];
  source?: SourceMetadata;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildHref(entityType: ReferenceEntityType, id: string) {
  return `/reference/${entityType}/${id}`;
}

export function getReferenceIndex(): ReferenceIndexItem[] {
  return [
    ...artifacts.map((item) => ({
      entityType: "artifacts" as const,
      id: item.id,
      title: item.name,
      subtitle: "Artifact",
      description: item.notes,
      href: buildHref("artifacts", item.id),
      badges: [item.category, item.team_or_personal],
      source: item,
    })),
    ...companions.map((item) => ({
      entityType: "companions" as const,
      id: item.id,
      title: item.name,
      subtitle: "Companion",
      description: item.notes,
      href: buildHref("companions", item.id),
      badges: [item.role_tag, item.archetype],
      source: item,
    })),
    ...classes.map((item) => ({
      entityType: "classes" as const,
      id: item.id,
      title: item.name,
      subtitle: "Class",
      description: item.identity_note,
      href: buildHref("classes", item.id),
      badges: item.paragon_options,
      source: item,
    })),
    ...mounts.map((item) => ({
      entityType: "mounts" as const,
      id: item.id,
      title: item.name,
      subtitle: "Mount",
      description: item.notes,
      href: buildHref("mounts", item.id),
      badges: [item.mount_type],
      source: item,
    })),
    ...mountCombatPowers.map((item) => ({
      entityType: "mounts" as const,
      id: item.id,
      title: item.name,
      subtitle: "Mount Combat Power",
      description: item.notes,
      href: buildHref("mounts", item.id),
      badges: [item.damage_type],
      source: item,
    })),
    ...effectCatalog.map((item) => ({
      entityType: "effects" as const,
      id: item.id,
      title: item.name,
      subtitle: "Effect",
      description: item.notes,
      href: buildHref("effects", item.id),
      badges: [item.effect_category, item.stat, item.stack_rule],
      source: item,
    })),
    ...dungeons.map((item) => ({
      entityType: "dungeons" as const,
      id: item.id,
      title: item.name,
      subtitle: "Dungeon",
      description: item.notes,
      href: buildHref("dungeons", item.id),
      badges: [`${item.size} players`],
    })),
    ...trials.map((item) => ({
      entityType: "trials" as const,
      id: item.id,
      title: item.name,
      subtitle: "Trial",
      description: item.notes,
      href: buildHref("trials", item.id),
      badges: [`${item.size} players`],
    })),
    ...events.map((item) => ({
      entityType: "events" as const,
      id: item.id,
      title: item.name,
      subtitle: "Event",
      description: item.notes,
      href: buildHref("events", item.id),
    })),
    ...patchChanges.map((item) => ({
      entityType: "patches" as const,
      id: item.id,
      title: item.name,
      subtitle: "Patch Change",
      description: item.notes,
      href: buildHref("patches", item.id),
      badges: [item.category, item.importance],
      source: item,
    })),
    ...glossaryTerms.map((item) => ({
      entityType: "glossary" as const,
      id: slugify(item.term),
      title: item.term,
      subtitle: "Glossary Term",
      description: item.definition,
      href: buildHref("glossary", slugify(item.term)),
    })),
    ...bossPresets.map((item) => ({
      entityType: "bosses" as const,
      id: item.id,
      title: item.name,
      subtitle: "Boss Preset",
      description: item.notes,
      href: buildHref("bosses", item.id),
      badges: item.typed_tags,
      source: item,
    })),
    ...companionEnhancementSnapshots.map((item) => ({
      entityType: "enhancements" as const,
      id: slugify(item.name),
      title: item.name,
      subtitle: "Companion Enhancement",
      description: item.text,
      href: buildHref("enhancements", slugify(item.name)),
    })),
    ...companionPowerSnapshots.map((item) => ({
      entityType: "companion-powers" as const,
      id: slugify(item.name),
      title: item.name,
      subtitle: "Companion Power",
      description: item.text,
      href: buildHref("companion-powers", slugify(item.name)),
      badges: item.roles,
    })),
    ...classSnapshots.flatMap((item) =>
      item.paragons.map((paragon) => ({
        entityType: "classes" as const,
        id: `${slugify(item.className)}-${slugify(paragon.name)}`,
        title: `${item.className} / ${paragon.name}`,
        subtitle: "Paragon",
        description: `${paragon.name} paragon for ${item.className}.`,
        href: buildHref("classes", `${slugify(item.className)}-${slugify(paragon.name)}`),
        badges: [paragon.role],
      })),
    ),
  ];
}

export function findReferenceItem(entityType: string, itemId: string) {
  return getReferenceIndex().find((item) => item.entityType === entityType && item.id === itemId);
}

export function searchReferenceIndex(query: string) {
  const normalized = query.trim().toLowerCase();
  const items = getReferenceIndex();

  if (!normalized) {
    return items.slice(0, 60);
  }

  return items.filter((item) => {
    const haystack = `${item.title} ${item.subtitle} ${item.description} ${(item.badges ?? []).join(" ")}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
