"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookingStatusSchema } from "@/lib/validations";

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = bookingStatusSchema.parse(formData.get("status"));
  await db.booking.update({ where: { id }, data: { status } });
  revalidatePath("/admin", "layout");
}

export async function updateBookingNotes(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const notes = String(formData.get("adminNotes") ?? "").trim().slice(0, 5000);
  await db.booking.update({ where: { id }, data: { adminNotes: notes || null } });
  revalidatePath("/admin", "layout");
}

export async function deleteBooking(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await db.booking.delete({ where: { id } });
  revalidatePath("/admin", "layout");
  redirect("/admin/bookings");
}
