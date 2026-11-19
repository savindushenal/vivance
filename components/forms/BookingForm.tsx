"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { submitBooking } from "@/app/actions/public";
import { BookingCalendar } from "@/components/forms/BookingCalendar";
import { Honeypot } from "@/components/forms/Honeypot";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Textarea } from "@/components/ui";
import {
  BOOKING_EVENT_TYPES,
  BOOKING_EVENT_TYPE_LABELS,
  type BookingEventType,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { initialActionState } from "@/lib/validations";

const STEPS = [
  { id: 1, label: "Occasion" },
  { id: 2, label: "Details" },
  { id: 3, label: "Contact" },
] as const;

const OCCASION_HINTS: Partial<Record<BookingEventType, string>> = {
  WEDDING: "Ceremony, signing, recessional, or reception set",
  CHURCH_SERVICE: "Liturgy, hymns, and sacred repertoire",
  CORPORATE: "Galas, openings, and formal programmes",
  CONCERT: "Standalone performance or shared bill",
  FUNERAL: "Memorials and thanksgiving services",
  OTHER: "Tell us about your occasion in the next step",
};

function stepForErrors(errors: Record<string, string[] | undefined>) {
  if (errors.eventType || errors.eventDate) return 1;
  if (errors.venue || errors.eventTime || errors.expectedGuests || errors.message) return 2;
  return 3;
}

export function BookingForm({
  minDate,
  unavailableDates = [],
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
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState(initialType);
  const [eventDate, setEventDate] = useState("");

  const v = state.values ?? {};
  const e = state.errors ?? {};

  useEffect(() => {
    if (!state.ok && state.errors) {
      if (v.eventType) setEventType(v.eventType);
      if (v.eventDate) setEventDate(v.eventDate);
      setStep(stepForErrors(state.errors));
    }
  }, [state, v.eventDate, v.eventType]);

  const stepErrors = useMemo(() => {
    if (step === 1) return Boolean(e.eventType || e.eventDate);
    if (step === 2) return Boolean(e.venue || e.eventTime || e.expectedGuests || e.message);
    return Boolean(e.name || e.email || e.phone || e.organization);
  }, [e, step]);

  if (state.ok) {
    return (
      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-emerald-800">
          Lead received
        </p>
        <p className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-emerald-950">
          We&apos;ll be in touch soon
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-emerald-900/80">
          {state.message}
        </p>
        <ol className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-emerald-900/85">
          <li className="rounded-2xl bg-white/70 px-4 py-3">
            <span className="font-semibold">1.</span> We review your date and occasion within 1–2 business days.
          </li>
          <li className="rounded-2xl bg-white/70 px-4 py-3">
            <span className="font-semibold">2.</span> We confirm availability and suggest repertoire & ensemble size.
          </li>
          <li className="rounded-2xl bg-white/70 px-4 py-3">
            <span className="font-semibold">3.</span> You lock the booking and we prepare for the day.
          </li>
        </ol>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="btn-primary">
              Email us
            </a>
          )}
          {contactPhone && (
            <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="btn-ghost-dark">
              Call {contactPhone}
            </a>
          )}
          <Link href="/#occasions" className="btn-ghost-dark">
            Back to top
          </Link>
        </div>
      </div>
    );
  }

  function goNext() {
    if (step === 1 && (!eventType || !eventDate)) return;
    if (step === 2) {
      const venue = (document.getElementById("venue") as HTMLInputElement | null)?.value?.trim();
      if (!venue) {
        document.getElementById("venue")?.focus();
        return;
      }
    }
    setStep((s) => Math.min(3, s + 1));
  }

  return (
    <form action={action} className="relative space-y-8" noValidate>
      {state.message && <Alert variant="error">{state.message}</Alert>}
      {stepErrors && state.errors && (
        <Alert variant="error">Please complete the highlighted fields before continuing.</Alert>
      )}
      <Honeypot />
      <input type="hidden" name="eventType" value={eventType} />
      <input type="hidden" name="eventDate" value={eventDate} />

      <div className="flex flex-wrap items-center gap-2">
        {STEPS.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => item.id < step && setStep(item.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] transition",
                step === item.id
                  ? "bg-[var(--color-navy)] text-white"
                  : step > item.id
                    ? "bg-[var(--color-champagne)]/30 text-[var(--color-navy)]"
                    : "bg-black/5 text-[var(--color-ink)]/45",
              )}
            >
              {item.id}. {item.label}
            </button>
            {index < STEPS.length - 1 && <span className="text-[var(--color-ink)]/25">—</span>}
          </div>
        ))}
      </div>

      {/* Keep every step mounted so FormData includes all fields on submit. */}
      <div className={cn("space-y-6", step !== 1 && "hidden")}>
        <div>
          <p className="font-serif text-xl font-bold tracking-tight text-[var(--color-navy)]">
            What are you planning?
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            Choose an occasion so we can qualify your request quickly.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {BOOKING_EVENT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setEventType(type)}
              className={cn(
                "rounded-[1.25rem] border px-4 py-4 text-left transition",
                eventType === type
                  ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white"
                  : "border-[var(--color-navy)]/10 bg-white hover:border-[var(--color-navy)]/30",
              )}
            >
              <p className="font-semibold">{BOOKING_EVENT_TYPE_LABELS[type]}</p>
              <p
                className={cn(
                  "mt-1 text-xs leading-relaxed",
                  eventType === type ? "text-white/70" : "text-[var(--color-ink)]/55",
                )}
              >
                {OCCASION_HINTS[type]}
              </p>
            </button>
          ))}
        </div>
        {e.eventType && <p className="text-sm text-red-600">{e.eventType[0]}</p>}

        <div>
          <p className="mb-2 text-sm font-medium text-[var(--color-navy)]">
            Preferred date <span className="text-red-600">*</span>
          </p>
          <BookingCalendar
            minDate={minDate}
            unavailableDates={unavailableDates}
            defaultValue={eventDate || v.eventDate}
            error={e.eventDate}
            onChange={setEventDate}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="btn-primary disabled:opacity-40"
            disabled={!eventType || !eventDate}
            onClick={goNext}
          >
            Continue to details
          </button>
        </div>
      </div>

      <div className={cn("space-y-5", step !== 2 && "hidden")}>
        <div>
          <p className="font-serif text-xl font-bold tracking-tight text-[var(--color-navy)]">
            Event details
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            {BOOKING_EVENT_TYPE_LABELS[eventType as BookingEventType] || "Your occasion"}
            {eventDate ? ` · ${eventDate}` : ""}
          </p>
        </div>
        <Field label="Venue / location" htmlFor="venue" error={e.venue} required>
          <Input id="venue" name="venue" defaultValue={v.venue} required placeholder="Church, hotel, hall…" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Start time" htmlFor="eventTime" error={e.eventTime}>
            <Input id="eventTime" name="eventTime" type="time" defaultValue={v.eventTime} />
          </Field>
          <Field label="Expected guests" htmlFor="expectedGuests" error={e.expectedGuests}>
            <Input
              id="expectedGuests"
              name="expectedGuests"
              type="number"
              min={1}
              defaultValue={v.expectedGuests}
              placeholder="Approx. headcount"
            />
          </Field>
        </div>
        <Field
          label="What should we know?"
          htmlFor="message"
          error={e.message}
          hint="Moments to cover, song ideas, duration, indoors/outdoors, PA available…"
        >
          <Textarea
            id="message"
            name="message"
            rows={5}
            defaultValue={v.message}
            placeholder="Ceremony processional + signing, 45 minutes, outdoor garden…"
          />
        </Field>
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" className="btn-ghost-dark" onClick={() => setStep(1)}>
            Back
          </button>
          <button type="button" className="btn-primary" onClick={goNext}>
            Continue to contact
          </button>
        </div>
      </div>

      <div className={cn("space-y-5", step !== 3 && "hidden")}>
        <div>
          <p className="font-serif text-xl font-bold tracking-tight text-[var(--color-navy)]">
            How can we reach you?
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink)]/60">
            We only use these details to confirm your booking request.
          </p>
        </div>
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
              placeholder="Optional"
            />
          </Field>
          <Field label="Email" htmlFor="email" error={e.email} required>
            <Input id="email" name="email" type="email" defaultValue={v.email} autoComplete="email" required />
          </Field>
          <Field label="Phone" htmlFor="phone" error={e.phone} required>
            <Input id="phone" name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" required />
          </Field>
        </div>
        <div className="rounded-[1.25rem] bg-[var(--color-pearl)] px-4 py-3 text-sm text-[var(--color-ink)]/65">
          Submitting does not lock the date. We confirm availability before anything is final.
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" className="btn-ghost-dark" onClick={() => setStep(2)}>
            Back
          </button>
          <SubmitButton pendingText="Sending request...">Submit booking request</SubmitButton>
        </div>
      </div>
    </form>
  );
}
