"use client";

import { useActionState } from "react";
import { submitBooking } from "@/app/actions/public";
import { BookingCalendar } from "@/components/forms/BookingCalendar";
import { Honeypot } from "@/components/forms/Honeypot";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Select, Textarea } from "@/components/ui";
import { BOOKING_EVENT_TYPES, BOOKING_EVENT_TYPE_LABELS } from "@/lib/constants";
import { initialActionState } from "@/lib/validations";

export function BookingForm({
  minDate,
  unavailableDates = [],
}: {
  minDate: string;
  unavailableDates?: string[];
}) {
  const [state, action] = useActionState(submitBooking, initialActionState);

  if (state.ok) {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="font-serif text-2xl font-semibold text-emerald-900">Request received</p>
        <p className="mt-2 text-emerald-800">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} className="relative space-y-8" noValidate>
      {state.message && <Alert variant="error">{state.message}</Alert>}
      <Honeypot />

      <fieldset className="space-y-5">
        <legend className="font-serif text-lg font-semibold text-[var(--color-navy)]">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name" error={e.name} required>
            <Input id="name" name="name" defaultValue={v.name} autoComplete="name" required />
          </Field>
          <Field label="Organization" htmlFor="organization" error={e.organization}>
            <Input
              id="organization"
              name="organization"
              defaultValue={v.organization}
              autoComplete="organization"
            />
          </Field>
          <Field label="Email" htmlFor="email" error={e.email} required>
            <Input id="email" name="email" type="email" defaultValue={v.email} autoComplete="email" required />
          </Field>
          <Field label="Phone" htmlFor="phone" error={e.phone} required>
            <Input id="phone" name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" required />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-serif text-lg font-semibold text-[var(--color-navy)]">Event details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Type of event" htmlFor="eventType" error={e.eventType} required>
            <Select id="eventType" name="eventType" defaultValue={v.eventType ?? ""} required>
              <option value="" disabled>
                Select...
              </option>
              {BOOKING_EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {BOOKING_EVENT_TYPE_LABELS[type]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Expected guests" htmlFor="expectedGuests" error={e.expectedGuests}>
            <Input
              id="expectedGuests"
              name="expectedGuests"
              type="number"
              min={1}
              defaultValue={v.expectedGuests}
            />
          </Field>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-stone-700">
            Event date <span className="text-red-600">*</span>
          </p>
          <BookingCalendar
            minDate={minDate}
            unavailableDates={unavailableDates}
            defaultValue={v.eventDate}
            error={e.eventDate}
          />
        </div>

        <Field label="Start time" htmlFor="eventTime" error={e.eventTime}>
          <Input id="eventTime" name="eventTime" type="time" defaultValue={v.eventTime} />
        </Field>
        <Field label="Venue / location" htmlFor="venue" error={e.venue} required>
          <Input id="venue" name="venue" defaultValue={v.venue} required />
        </Field>
        <Field
          label="Additional details"
          htmlFor="message"
          error={e.message}
          hint="Tell us about the occasion, preferred songs, duration, etc."
        >
          <Textarea id="message" name="message" rows={5} defaultValue={v.message} />
        </Field>
      </fieldset>

      <SubmitButton pendingText="Sending request...">Request booking</SubmitButton>
    </form>
  );
}
