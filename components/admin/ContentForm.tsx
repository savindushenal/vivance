"use client";

import { useActionState } from "react";
import { saveContent } from "@/app/actions/content";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Textarea } from "@/components/ui";
import { CONTENT_FIELDS, CONTENT_KEYS, type SiteContent } from "@/lib/content-fields";
import { initialActionState } from "@/lib/validations";

export function ContentForm({ content }: { content: SiteContent }) {
  const [state, action] = useActionState(saveContent, initialActionState);

  const groups = new Map<string, typeof CONTENT_KEYS>();
  for (const key of CONTENT_KEYS) {
    const group = CONTENT_FIELDS[key].group;
    groups.set(group, [...(groups.get(group) ?? []), key]);
  }

  return (
    <form action={action} className="space-y-8">
      {state.message && <Alert variant={state.ok ? "success" : "error"}>{state.message}</Alert>}

      {[...groups.entries()].map(([group, keys]) => (
        <fieldset key={group} className="space-y-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <legend className="px-1 font-semibold text-stone-900">{group}</legend>
          {keys.map((key) => {
            const field = CONTENT_FIELDS[key];
            return (
              <Field key={key} label={field.label} htmlFor={key}>
                {field.type === "textarea" ? (
                  <Textarea id={key} name={key} rows={key === "aboutText" ? 10 : 3} defaultValue={content[key]} />
                ) : (
                  <Input id={key} name={key} type={field.type} defaultValue={content[key]} />
                )}
              </Field>
            );
          })}
        </fieldset>
      ))}

      <div className="sticky bottom-4">
        <SubmitButton className="shadow-lg">Save content</SubmitButton>
      </div>
    </form>
  );
}
