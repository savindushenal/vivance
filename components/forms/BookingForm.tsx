"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { submitBooking } from "@/app/actions/public";
import { Honeypot } from "@/components/forms/Honeypot";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Select, Textarea } from "@/components/ui";
import {
  BOOKING_EVENT_TYPES,
  BOOKING_EVENT_TYPE_LABELS,
} from "@/lib/constants";
import { phoneList, telHref } from "@/lib/phones";
import { initialActionState } from "@/lib/validations";

export function BookingForm({
  minDate,
  defaultEventType,
  contactEmail,
  contactPhone,
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

  const [state, action] = useActionState(submitBooking, initialActionState);
  const [eventType, setEventType] = useState(initialType);

  const v = state.values ?? {};
  const e = state.errors ?? {};

  useEffect(() => {
    if (!state.ok && state.errors && v.eventType) {
      setEventType(v.eventType);
    }
  }, [state, v.eventType]);

  if (state.ok) {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
          Request received
        </p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-emerald-950">
          We will be in touch soon
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-emerald-900/80">
          {state.message}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="btn-primary">
              Email us
            </a>
          )}
          {phoneList(contactPhone ?? "").map((phone) => (
            <a key={phone} href={telHref(phone)} className="btn-ghost-dark">
              Call {phone}
            </a>
          ))}
          <Link href="/#book" className="btn-ghost-dark">
            Back to booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {state.message && <Alert variant="error">{state.message}</Alert>}
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
        Submitting does not lock the date. We confirm availability before anything is final.
      </p>

      <SubmitButton pendingText="Sending request...">Submit booking request</SubmitButton>
    </form>
  );
}
