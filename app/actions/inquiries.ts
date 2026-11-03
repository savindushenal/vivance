"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { inquiryStatusSchema } from "@/lib/validations";

export async function updateInquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = inquiryStatusSchema.parse(formData.get("status"));
  await db.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin", "layout");
}

export async function deleteInquiry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.inquiry.delete({ where: { id } });
  revalidatePath("/admin", "layout");
  redirect("/admin/inquiries");
}
