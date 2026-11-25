"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { submitBooking } from "@/app/actions/public";
import { Honeypot } from "@/components/forms/Honeypot";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { Alert, Field, Input, Select, Textarea } from "@/components/ui";
import {
  BOOKING_EVENT_TYPES,
  BOOKING_EVENT_TYPE_LABELS,
} from "@/lib/constants";
import { formDataToObject } from "@/lib/utils";
import {
  bookingSchema,
  fieldErrors,
  initialActionState,
  type ActionState,
  type FieldErrors,
} from "@/lib/validations";
import { bookingWhatsAppUrl } from "@/lib/whatsapp";

export function BookingForm({
  minDate,
  defaultEventType,
}: {
  minDate: string;
  unavailableDates?: string[];
  defaultEventType?: string;
  contactEmail?: string;
  contactPhone?: string;
}) {
  const initialType =
    defaultEventType && (BOOKING_EVENT_TYPES as readonly string[]).includes(defaultEventType)
      ? defaultEventType
      : "";

  const [eventType, setEventType] = useState(initialType);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const v = values;
  const e = errors;

  function handleSubmit(formData: FormData) {
    const raw = formDataToObject(formData);
    setValues(raw);
    setMessage(undefined);
    setErrors({});

    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setMessage("Please fix the errors below.");
      return;
    }

    const waUrl = bookingWhatsAppUrl(parsed.data);

    // Soft-save for admin, then open WhatsApp with the booking details.
    startTransition(async () => {
      try {
        const fd = new FormData();
        for (const [key, value] of Object.entries(raw)) {
          fd.set(key, value);
        }
        await submitBooking(initialActionState as ActionState, fd);
      } catch {
        // Still open WhatsApp even if the soft save fails.
      }
      window.location.assign(waUrl);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5" noValidate>
      {message && <Alert variant="error">{message}</Alert>}
      <Honeypot />

      <Field label="Function" htmlFor="eventType" error={e.eventType} required>
        <Select
          id="eventType"
          name="eventType"
          value={eventType}
          onChange={(ev) => setEventType(ev.target.value)}
          required
        >
          <option value="" disabled>
            Select a function
          </option>
          {BOOKING_EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {BOOKING_EVENT_TYPE_LABELS[type]}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" htmlFor="eventDate" error={e.eventDate} required>
          <Input
            id="eventDate"
            name="eventDate"
            type="date"
            min={minDate}
            defaultValue={v.eventDate}
            required
          />
        </Field>
        <Field label="Starting Time" htmlFor="eventTime" error={e.eventTime} required>
          <Input
            id="eventTime"
            name="eventTime"
            type="time"
            defaultValue={v.eventTime}
            required
          />
        </Field>
      </div>

      <Field label="Venue" htmlFor="venue" error={e.venue} required>
        <Input
          id="venue"
          name="venue"
          defaultValue={v.venue}
          placeholder="Church, hotel, hall…"
          required
        />
      </Field>

      <Field label="Your Name" htmlFor="name" error={e.name} required>
        <Input
          id="name"
          name="name"
          defaultValue={v.name}
          autoComplete="name"
          required
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp Number" htmlFor="phone" error={e.phone} required>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={v.phone}
            autoComplete="tel"
            placeholder="+94…"
            required
          />
        </Field>
        <Field label="Email" htmlFor="email" error={e.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={v.email}
            autoComplete="email"
            required
          />
        </Field>
      </div>

      <Field label="Any other notes" htmlFor="message" error={e.message}>
        <Textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={v.message}
          placeholder="Anything else we should know"
        />
      </Field>

      <p className="text-sm text-[var(--color-ink)]/60">
        Submit opens WhatsApp with your details ready to send. It does not lock the date until we
        confirm.
      </p>

      <button type="submit" disabled={pending} className="btn-whatsapp-solid w-full sm:w-auto">
        <WhatsAppIcon />
        <span>{pending ? "Opening WhatsApp..." : "Send via WhatsApp"}</span>
      </button>

      <p className="text-xs text-[var(--color-ink)]/45">
        Prefer not to use WhatsApp?{" "}
        <Link href="/#contact" className="underline underline-offset-2 hover:text-[var(--color-navy)]">
          Call or email us
        </Link>
        .
      </p>
    </form>
  );
}
