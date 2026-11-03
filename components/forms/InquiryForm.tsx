"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/actions/public";
import { Honeypot } from "@/components/forms/Honeypot";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Textarea } from "@/components/ui";
import { initialActionState } from "@/lib/validations";

export function InquiryForm() {
  const [state, action] = useActionState(submitInquiry, initialActionState);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="font-serif text-2xl font-semibold text-emerald-900">Message sent</p>
        <p className="mt-2 text-emerald-800">{state.message}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} className="relative space-y-5" noValidate>
      {state.message && <Alert variant="error">{state.message}</Alert>}
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={e.name} required>
          <Input id="name" name="name" defaultValue={v.name} autoComplete="name" required />
        </Field>
        <Field label="Email" htmlFor="email" error={e.email} required>
          <Input id="email" name="email" type="email" defaultValue={v.email} autoComplete="email" required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" error={e.phone}>
          <Input id="phone" name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" />
        </Field>
        <Field label="Subject" htmlFor="subject" error={e.subject} required>
          <Input id="subject" name="subject" defaultValue={v.subject} required />
        </Field>
      </div>
      <Field label="Message" htmlFor="message" error={e.message} required>
        <Textarea id="message" name="message" rows={6} defaultValue={v.message} required />
      </Field>
      <SubmitButton pendingText="Sending...">Send message</SubmitButton>
    </form>
  );
}
