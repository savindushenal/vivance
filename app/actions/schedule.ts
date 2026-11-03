"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseDateInput } from "@/lib/dates";
import { formDataToObject } from "@/lib/utils";
import { fieldErrors, scheduleSchema, type ActionState } from "@/lib/validations";

export async function saveScheduleItem(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();
  const values = formDataToObject(formData);
  const parsed = scheduleSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors below.", errors: fieldErrors(parsed.error), values };
  }

  const record = { ...parsed.data, date: parseDateInput(parsed.data.date) };
  if (id) {
    await db.scheduleItem.update({ where: { id }, data: record });
  } else {
    await db.scheduleItem.create({ data: record });
  }

  revalidatePath("/", "layout");
  redirect("/admin/schedule?saved=1");
}

export async function deleteScheduleItem(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.scheduleItem.delete({ where: { id } });
  revalidatePath("/", "layout");
  redirect("/admin/schedule");
}
