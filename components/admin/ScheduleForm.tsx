"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ScheduleItem } from "@prisma/client";
import { saveScheduleItem } from "@/app/actions/schedule";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Select, Textarea, buttonStyles } from "@/components/ui";
import { SCHEDULE_TYPES, SCHEDULE_TYPE_LABELS } from "@/lib/constants";
import { toDateInput } from "@/lib/dates";
import { initialActionState } from "@/lib/validations";

export function ScheduleForm({ item }: { item?: ScheduleItem }) {
  const [state, action] = useActionState(saveScheduleItem.bind(null, item?.id ?? null), initialActionState);
  const e = state.errors ?? {};
  const v = state.values;

  const initial = {
    title: item?.title ?? "",
    type: item?.type ?? "REHEARSAL",
    date: item ? toDateInput(item.date) : "",
    startTime: item?.startTime ?? "",
    endTime: item?.endTime ?? "",
    location: item?.location ?? "",
    notes: item?.notes ?? "",
  };
  const val = (key: keyof typeof initial) => v?.[key] ?? initial[key];

  return (
    <form action={action} className="space-y-6">
      {state.message && <Alert variant="error">{state.message}</Alert>}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title" htmlFor="title" error={e.title} required>
          <Input id="title" name="title" defaultValue={val("title")} placeholder="Weekly rehearsal" required />
        </Field>
        <Field label="Type" htmlFor="type" error={e.type} required>
          <Select id="type" name="type" defaultValue={val("type")}>
            {SCHEDULE_TYPES.map((type) => (
              <option key={type} value={type}>
                {SCHEDULE_TYPE_LABELS[type]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Date" htmlFor="date" error={e.date} required>
          <Input id="date" name="date" type="date" defaultValue={val("date")} required />
        </Field>
        <Field label="Location" htmlFor="location" error={e.location}>
          <Input id="location" name="location" defaultValue={val("location")} />
        </Field>
        <Field label="Start time" htmlFor="startTime" error={e.startTime}>
          <Input id="startTime" name="startTime" type="time" defaultValue={val("startTime")} />
        </Field>
        <Field label="End time" htmlFor="endTime" error={e.endTime}>
          <Input id="endTime" name="endTime" type="time" defaultValue={val("endTime")} />
        </Field>
        <Field label="Notes" htmlFor="notes" error={e.notes} className="md:col-span-2">
          <Textarea id="notes" name="notes" rows={3} defaultValue={val("notes")} />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={v ? v.isPublished === "on" : (item?.isPublished ?? true)}
          className="h-4 w-4 rounded border-stone-300"
        />
        Published (visible on the website)
      </label>

      <div className="flex gap-3">
        <SubmitButton>{item ? "Save changes" : "Add to schedule"}</SubmitButton>
        <Link href="/admin/schedule" className={buttonStyles.secondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
