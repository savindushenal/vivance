"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input } from "@/components/ui";
import { initialActionState } from "@/lib/validations";

export function LoginForm({ from }: { from?: string }) {
  const [state, action] = useActionState(login, initialActionState);

  return (
    <form action={action} className="space-y-4">
      {state.message && <Alert variant="error">{state.message}</Alert>}
      <input type="hidden" name="from" value={from ?? ""} />
      <Field label="Email" htmlFor="email" error={state.errors?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state.values?.email}
          required
        />
      </Field>
      <Field label="Password" htmlFor="password" error={state.errors?.password}>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      <SubmitButton pendingText="Signing in..." className="w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}
