import "server-only";
import { cache } from "react";
import { CONTENT_FIELDS, CONTENT_KEYS, type SiteContent } from "@/lib/content-fields";
import { db } from "@/lib/db";

export * from "@/lib/content-fields";

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const rows = await db.siteContent.findMany();
  const stored = new Map(rows.map((r) => [r.key, r.value]));
  return Object.fromEntries(
    CONTENT_KEYS.map((key) => [key, stored.get(key) ?? CONTENT_FIELDS[key].defaultValue]),
  ) as SiteContent;
});
