"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { CONTENT_KEYS } from "@/lib/content";
import { db } from "@/lib/db";
import type { ActionState } from "@/lib/validations";

export async function saveContent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const updates = CONTENT_KEYS.map((key) => {
    const value = String(formData.get(key) ?? "").trim().slice(0, 10000);
    return db.siteContent.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  });
  await db.$transaction(updates);

  revalidatePath("/", "layout");
  return { ok: true, message: "Content saved." };
}
