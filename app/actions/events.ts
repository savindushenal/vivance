"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseDateInput } from "@/lib/dates";
import { isFile, saveImage } from "@/lib/upload";
import { formDataToObject, slugify } from "@/lib/utils";
import { eventSchema, fieldErrors, type ActionState } from "@/lib/validations";

async function uniqueSlug(base: string, excludeId: string | null) {
  const root = base || "event";
  let slug = root;
  for (let i = 2; ; i++) {
    const existing = await db.event.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${root}-${i}`;
  }
}

export async function saveEvent(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const values = formDataToObject(formData);
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors below.", errors: fieldErrors(parsed.error), values };
  }
  const data = parsed.data;

  let imageUrl = values.removeImage === "on" ? null : data.imageUrl;
  const gallery = (data.gallery ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  try {
    const imageFile = formData.get("imageFile");
    if (isFile(imageFile)) imageUrl = await saveImage(imageFile);
    for (const file of formData.getAll("galleryFiles")) {
      if (isFile(file)) gallery.push(await saveImage(file));
    }
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Upload failed", values };
  }

  const record = {
    title: data.title,
    slug: await uniqueSlug(slugify(data.slug || data.title), id),
    description: data.description,
    date: parseDateInput(data.date),
    startTime: data.startTime,
    endTime: data.endTime,
    venue: data.venue,
    imageUrl,
    gallery: JSON.stringify(gallery),
    isPublished: data.isPublished,
  };

  if (id) {
    await db.event.update({ where: { id }, data: record });
  } else {
    await db.event.create({ data: record });
  }

  revalidatePath("/", "layout");
  redirect("/admin/events?saved=1");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.event.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/events");
}

export async function toggleEventPublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const event = await db.event.findUnique({ where: { id }, select: { isPublished: true } });
  if (!event) return;
  await db.event.update({ where: { id }, data: { isPublished: !event.isPublished } });
  revalidatePath("/", "layout");
}
