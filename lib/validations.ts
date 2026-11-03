import { z } from "zod";
import {
  BOOKING_EVENT_TYPES,
  BOOKING_STATUSES,
  INQUIRY_STATUSES,
  SCHEDULE_TYPES,
} from "@/lib/constants";
import { parseDateInput, startOfToday } from "@/lib/dates";

const requiredText = (label: string, max = 200) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} is too long`);

const optionalText = (max = 200) =>
  z
    .string()
    .trim()
    .max(max, "Too long")
    .optional()
    .transform((v) => (v ? v : null));

const dateInput = z
  .string({ error: "Date is required" })
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a valid date");

const timeInput = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM format")
  .optional()
  .or(z.literal(""))
  .transform((v) => (v ? v : null));

const checkbox = z
  .string()
  .optional()
  .transform((v) => v === "on" || v === "true");

export const inquirySchema = z.object({
  name: requiredText("Name", 100),
  email: z.email("Please enter a valid email"),
  phone: optionalText(30),
  subject: requiredText("Subject", 150),
  message: requiredText("Message", 5000),
});

export const bookingSchema = z.object({
  name: requiredText("Name", 100),
  email: z.email("Please enter a valid email"),
  phone: requiredText("Phone", 30),
  organization: optionalText(150),
  eventType: z.enum(BOOKING_EVENT_TYPES, { error: "Please choose an event type" }),
  eventDate: dateInput.refine(
    (v) => parseDateInput(v) >= startOfToday(),
    "Event date must be today or later",
  ),
  eventTime: timeInput,
  venue: requiredText("Venue", 200),
  expectedGuests: z.preprocess(
    (v) => (v === "" || v == null ? undefined : v),
    z.coerce
      .number({ error: "Must be a number" })
      .int("Must be a whole number")
      .min(1, "Must be at least 1")
      .max(100000, "That seems too high")
      .optional(),
  ),
  message: optionalText(5000),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const eventSchema = z.object({
  title: requiredText("Title", 150),
  slug: z
    .string()
    .trim()
    .max(80)
    .regex(/^[a-z0-9-]*$/, "Only lowercase letters, numbers and dashes")
    .optional(),
  description: requiredText("Description", 10000),
  date: dateInput,
  startTime: timeInput,
  endTime: timeInput,
  venue: optionalText(200),
  imageUrl: optionalText(500),
  gallery: z.string().optional(),
  isPublished: checkbox,
});

export const scheduleSchema = z.object({
  title: requiredText("Title", 150),
  type: z.enum(SCHEDULE_TYPES, { error: "Please choose a type" }),
  date: dateInput,
  startTime: timeInput,
  endTime: timeInput,
  location: optionalText(200),
  notes: optionalText(2000),
  isPublished: checkbox,
});

export const inquiryStatusSchema = z.enum(INQUIRY_STATUSES);
export const bookingStatusSchema = z.enum(BOOKING_STATUSES);

export type FieldErrors = Record<string, string[] | undefined>;

export type ActionState = {
  ok: boolean;
  message?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
};

export const initialActionState: ActionState = { ok: false };

export function fieldErrors(error: z.ZodError): FieldErrors {
  return z.flattenError(error).fieldErrors as FieldErrors;
}
