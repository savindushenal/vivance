"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
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
  const [venue, setVenue] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [expectedGuests, setExpectedGuests] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [venueError, setVenueError] = useState(false);
  /** Freeze shell height after leaving the tall calendar step so the page doesn't collapse into the footer. */
  const [shellMinHeight, setShellMinHeight] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);

  const v = state.values ?? {};
  const e = state.errors ?? {};

  useEffect(() => {
    if (!state.ok && state.errors) {
      if (v.eventType) setEventType(v.eventType);
      if (v.eventDate) setEventDate(v.eventDate);
      if (v.venue) setVenue(v.venue);
      if (v.eventTime) setEventTime(v.eventTime);
      if (v.expectedGuests) setExpectedGuests(v.expectedGuests);
      if (v.message) setMessage(v.message);
      if (v.name) setName(v.name);
      if (v.organization) setOrganization(v.organization);
      if (v.email) setEmail(v.email);
      if (v.phone) setPhone(v.phone);
      setStep(stepForErrors(state.errors));
    }
  }, [state, v]);

  const stepErrors = useMemo(() => {
    if (step === 1) return Boolean(e.eventType || e.eventDate);
    if (step === 2) return Boolean(e.venue || e.eventTime || e.expectedGuests || e.message || venueError);
    return Boolean(e.name || e.email || e.phone || e.organization);
  }, [e, step, venueError]);

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

  function goToStep(next: number) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Capture height BEFORE unmounting the calendar / current step.
    if (shellRef.current) {
      setShellMinHeight((h) => Math.max(h, shellRef.current!.offsetHeight));
    }
    setVenueError(false);
    setStep(next);
  }

  function goNext() {
    if (step === 1 && (!eventType || !eventDate)) return;
    if (step === 2) {
      if (!venue.trim()) {
        setVenueError(true);
        return;
      }
    }
    goToStep(Math.min(3, step + 1));
  }

  return (
    <form action={action} className="relative space-y-8 [overflow-anchor:none]" noValidate>
      {state.message && <Alert variant="error">{state.message}</Alert>}
      {stepErrors && (state.errors || venueError) && (
        <Alert variant="error">Please complete the highlighted fields before continuing.</Alert>
      )}
      <Honeypot />

      <input type="hidden" name="eventType" value={eventType} />
      <input type="hidden" name="eventDate" value={eventDate} />
      <input type="hidden" name="venue" value={venue} />
      <input type="hidden" name="eventTime" value={eventTime} />
      <input type="hidden" name="expectedGuests" value={expectedGuests} />
      <input type="hidden" name="message" value={message} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="organization" value={organization} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="phone" value={phone} />

      <div className="flex flex-wrap items-center gap-2">
        {STEPS.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => item.id < step && goToStep(item.id)}
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

      <div
        ref={shellRef}
        className="[overflow-anchor:none]"
        style={shellMinHeight ? { minHeight: shellMinHeight } : undefined}
      >
        {step === 1 && (
          <div className="space-y-6">
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
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <p className="font-serif text-xl font-bold tracking-tight text-[var(--color-navy)]">
                Event details
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink)]/60">
                {BOOKING_EVENT_TYPE_LABELS[eventType as BookingEventType] || "Your occasion"}
                {eventDate ? ` · ${eventDate}` : ""}
              </p>
            </div>
            <Field
              label="Venue / location"
              htmlFor="venue"
              error={venueError ? ["Venue is required"] : e.venue}
              required
            >
              <Input
                id="venue"
                value={venue}
                onChange={(ev) => {
                  setVenue(ev.target.value);
                  if (ev.target.value.trim()) setVenueError(false);
                }}
                placeholder="Church, hotel, hall…"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Start time" htmlFor="eventTime" error={e.eventTime}>
                <Input
                  id="eventTime"
                  type="time"
                  value={eventTime}
                  onChange={(ev) => setEventTime(ev.target.value)}
                />
              </Field>
              <Field label="Expected guests" htmlFor="expectedGuests" error={e.expectedGuests}>
                <Input
                  id="expectedGuests"
                  type="number"
                  min={1}
                  value={expectedGuests}
                  onChange={(ev) => setExpectedGuests(ev.target.value)}
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
                rows={5}
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                placeholder="Ceremony processional + signing, 45 minutes, outdoor garden…"
              />
            </Field>
            <div className="flex flex-wrap justify-between gap-3">
              <button type="button" className="btn-ghost-dark" onClick={() => goToStep(1)}>
                Back
              </button>
              <button type="button" className="btn-primary" onClick={goNext}>
                Continue to contact
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
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
                <Input
                  id="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Organization" htmlFor="organization" error={e.organization}>
                <Input
                  id="organization"
                  value={organization}
                  onChange={(ev) => setOrganization(ev.target.value)}
                  autoComplete="organization"
                  placeholder="Optional"
                />
              </Field>
              <Field label="Email" htmlFor="email" error={e.email} required>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone" htmlFor="phone" error={e.phone} required>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  autoComplete="tel"
                />
              </Field>
            </div>
            <div className="rounded-[1.25rem] bg-[var(--color-pearl)] px-4 py-3 text-sm text-[var(--color-ink)]/65">
              Submitting does not lock the date. We confirm availability before anything is final.
            </div>
            <div className="flex flex-wrap justify-between gap-3">
              <button type="button" className="btn-ghost-dark" onClick={() => goToStep(2)}>
                Back
              </button>
              <SubmitButton pendingText="Sending request...">Submit booking request</SubmitButton>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
