"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { parseDateInput } from "@/lib/dates";
import { formDataToObject } from "@/lib/utils";
import {
  bookingSchema,
  fieldErrors,
  inquirySchema,
  type ActionState,
} from "@/lib/validations";

/** Bots tend to fill every field, including the hidden "website" honeypot. */
function isSpam(values: Record<string, string>) {
  return Boolean(values.website);
}

export async function submitInquiry(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = formDataToObject(formData);
  if (isSpam(values)) return { ok: true, message: "Thank you! Your message has been sent." };

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors below.", errors: fieldErrors(parsed.error), values };
  }

  await db.inquiry.create({ data: parsed.data });
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Thank you! Your message has been sent. We will get back to you soon." };
}

export async function submitBooking(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = formDataToObject(formData);
  if (isSpam(values)) return { ok: true, message: "Thank you! Your booking request has been received." };

  const parsed = bookingSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors below.", errors: fieldErrors(parsed.error), values };
  }

  const { eventDate, expectedGuests, ...rest } = parsed.data;
  await db.booking.create({
    data: {
      ...rest,
      eventDate: parseDateInput(eventDate),
      expectedGuests: expectedGuests ?? null,
    },
  });
  revalidatePath("/admin", "layout");
  return {
    ok: true,
    message: "Thank you! Your booking request has been received. We will contact you to confirm availability.",
  };
}
