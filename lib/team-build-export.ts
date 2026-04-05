import { artifacts, classes, mountCombatPowers, powers } from "@/data/game-data";
import type { SavedTeamBuild } from "@/lib/team-build-storage";

type ExportableBuild = Pick<
  SavedTeamBuild,
  "id" | "name" | "mode" | "trialPreset" | "bossId" | "teamMembers"
>;

const overviewPalette = {
  thistle: "FFCDB4DB",
  petal: "FFFFC8DD",
  pink: "FFFFAFCC",
  icy: "FFBDE0FE",
  sky: "FFA2D2FF",
  black: "FF000000",
  white: "FFFFFFFF",
};

function getArtifactName(artifactId: string) {
  return artifacts.find((item) => item.id === artifactId)?.name ?? "";
}

function getClassName(classId: string) {
  return classes.find((item) => item.id === classId)?.name ?? "";
}

function getMountPowerName(powerId: string) {
  return mountCombatPowers.find((item) => item.id === powerId)?.name ?? "";
}

function getPowerName(powerId: string) {
  return powers.find((item) => item.id === powerId)?.name ?? "";
}

function getClassImageUrl(classId: string) {
  return classes.find((item) => item.id === classId)?.image_url ?? null;
}

function getArtifactImageUrl(artifactId: string) {
  return artifacts.find((item) => item.id === artifactId)?.image_url ?? null;
}

function getPowerImageUrl(powerId: string) {
  return powers.find((item) => item.id === powerId)?.image_url ?? null;
}

const imageCache = new Map<string, Promise<string | null>>();

function parseCellReference(reference: string) {
  const match = reference.match(/^([A-Z]+)(\d+)$/i);
  if (!match) {
    return { col: 1, row: 1 };
  }

  const [, letters, rowText] = match;
  const col = letters
    .toUpperCase()
    .split("")
    .reduce((sum, char) => sum * 26 + (char.charCodeAt(0) - 64), 0);

  return {
    col,
    row: Number(rowText),
  };
}

async function fetchImageAsDataUrl(url: string) {
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  const promise = (async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return null;
      }

      const blob = await response.blob();
      const bitmap = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext("2d");
      if (!context) {
        return null;
      }

      context.drawImage(bitmap, 0, 0);
      return canvas.toDataURL("image/png");
    } catch {
      return null;
    }
  })();

  imageCache.set(url, promise);
  return promise;
}

function countRoles(build: ExportableBuild) {
  return {
    tank: build.teamMembers.filter((member) => member.role === "tank").length,
    healer: build.teamMembers.filter((member) => member.role === "healer").length,
    dps: build.teamMembers.filter((member) => member.role === "dps").length,
    support: build.teamMembers.filter((member) => member.role === "support").length,
    boost: build.teamMembers.filter((member) => member.role === "boost").length,
    supportDps: build.teamMembers.filter((member) => member.role === "support_dps").length,
  };
}

export async function exportBuildWorkbook(build: ExportableBuild) {
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Neverwinter Composition Lab";
  workbook.created = new Date();

  const overview = workbook.addWorksheet("Overview", {
    views: [{ state: "frozen", ySplit: 1 }],
  });
  const teamSheet = workbook.addWorksheet("Team Setup", {
    views: [{ state: "frozen", ySplit: 1, xSplit: 4 }],
  });

  overview.columns = [
    { header: "Field", key: "field", width: 28 },
    { header: "Value", key: "value", width: 42 },
  ];

  overview.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: overviewPalette.black } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: overviewPalette.sky } };
    cell.alignment = { vertical: "middle" };
  });

  const roleCounts = countRoles(build);
  [
    ["Build Name", build.name],
    ["Mode", build.mode],
    ["Trial Preset", build.trialPreset],
    ["Boss Preset", build.bossId],
    ["Members", String(build.teamMembers.length)],
    ["Carry Slots", String(build.teamMembers.filter((member) => member.is_carry).length)],
    ["Tanks", String(roleCounts.tank)],
    ["Healers", String(roleCounts.healer)],
    ["DPS", String(roleCounts.dps)],
    ["Support", String(roleCounts.support)],
    ["Boost", String(roleCounts.boost)],
    ["Support DPS", String(roleCounts.supportDps)],
  ].forEach(([field, value]) => overview.addRow({ field, value }));

  teamSheet.columns = [
    { header: "Group", key: "group", width: 8 },
    { header: "Slot", key: "slot", width: 8 },
    { header: "Player Name", key: "playerName", width: 26 },
    { header: "Class Icon", key: "classIcon", width: 12 },
    { header: "Class", key: "className", width: 18 },
    { header: "Paragon", key: "paragon", width: 18 },
    { header: "Race", key: "race", width: 16 },
    { header: "Role", key: "role", width: 16 },
    { header: "Artifact Icon", key: "artifactIcon", width: 13 },
    { header: "Artifact", key: "artifactName", width: 28 },
    { header: "Companion", key: "companionId", width: 26 },
    { header: "Enhancement", key: "enhancementId", width: 24 },
    { header: "Mount Power", key: "mountPower", width: 24 },
    { header: "Encounter 1 Icon", key: "encounter1Icon", width: 14 },
    { header: "Encounter 1", key: "encounter1", width: 24 },
    { header: "Encounter 2 Icon", key: "encounter2Icon", width: 14 },
    { header: "Encounter 2", key: "encounter2", width: 24 },
    { header: "Encounter 3 Icon", key: "encounter3Icon", width: 14 },
    { header: "Encounter 3", key: "encounter3", width: 24 },
    { header: "Daily Icon", key: "dailyIcon", width: 14 },
    { header: "Daily", key: "daily", width: 22 },
    { header: "Feature 1 Icon", key: "feature1Icon", width: 14 },
    { header: "Feature 1", key: "feature1", width: 22 },
    { header: "Feature 2 Icon", key: "feature2Icon", width: 14 },
    { header: "Feature 2", key: "feature2", width: 22 },
    { header: "Carry", key: "carry", width: 10 },
    { header: "Notes", key: "notes", width: 32 },
  ];

  teamSheet.getRow(1).height = 22;
  teamSheet.autoFilter = {
    from: "A1",
    to: "AA1",
  };

  teamSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: overviewPalette.black } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: overviewPalette.icy } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin", color: { argb: overviewPalette.black } },
      left: { style: "thin", color: { argb: overviewPalette.black } },
      bottom: { style: "thin", color: { argb: overviewPalette.black } },
      right: { style: "thin", color: { argb: overviewPalette.black } },
    };
  });

  build.teamMembers.forEach((member) => {
    const row = teamSheet.addRow({
      group: member.group,
      slot: member.slot,
      playerName: member.label,
      className: getClassName(member.class_id),
      paragon: member.paragon,
      race: member.race,
      role: member.role,
      artifactName: getArtifactName(member.artifact_id),
      companionId: member.companion_id,
      enhancementId: member.enhancement_id,
      mountPower: getMountPowerName(member.mount_combat_power_id),
      encounter1: getPowerName(member.encounter_ids[0] ?? ""),
      encounter2: getPowerName(member.encounter_ids[1] ?? ""),
      encounter3: getPowerName(member.encounter_ids[2] ?? ""),
      daily: getPowerName(member.daily_ids[0] ?? ""),
      feature1: getPowerName(member.feature_ids[0] ?? ""),
      feature2: getPowerName(member.feature_ids[1] ?? ""),
      carry: member.is_carry ? "Yes" : "No",
      notes: member.notes,
    });

    row.height = 48;
    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle", wrapText: true };
      cell.border = {
        top: { style: "thin", color: { argb: "22111111" } },
        left: { style: "thin", color: { argb: "22111111" } },
        bottom: { style: "thin", color: { argb: "22111111" } },
        right: { style: "thin", color: { argb: "22111111" } },
      };
    });
  });

  const imagePlacements = build.teamMembers.flatMap((member, index) => {
    const rowNumber = index + 2;
    return [
      { url: getClassImageUrl(member.class_id), cell: `D${rowNumber}` },
      { url: getArtifactImageUrl(member.artifact_id), cell: `I${rowNumber}` },
      { url: getPowerImageUrl(member.encounter_ids[0] ?? ""), cell: `N${rowNumber}` },
      { url: getPowerImageUrl(member.encounter_ids[1] ?? ""), cell: `P${rowNumber}` },
      { url: getPowerImageUrl(member.encounter_ids[2] ?? ""), cell: `R${rowNumber}` },
      { url: getPowerImageUrl(member.daily_ids[0] ?? ""), cell: `T${rowNumber}` },
      { url: getPowerImageUrl(member.feature_ids[0] ?? ""), cell: `V${rowNumber}` },
      { url: getPowerImageUrl(member.feature_ids[1] ?? ""), cell: `X${rowNumber}` },
    ].filter((item): item is { url: string; cell: string } => Boolean(item.url));
  });

  await Promise.all(
    imagePlacements.map(async ({ url, cell }) => {
      const dataUrl = await fetchImageAsDataUrl(url);
      if (!dataUrl) {
        return;
      }

      const position = parseCellReference(cell);

      const imageId = workbook.addImage({
        base64: dataUrl,
        extension: "png",
      });

      teamSheet.addImage(imageId, {
        tl: { col: position.col - 1 + 0.15, row: position.row - 1 + 0.1 },
        ext: { width: 34, height: 34 },
      });
    }),
  );

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${build.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "team-build"}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
}
