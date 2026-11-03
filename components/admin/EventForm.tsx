"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { Event } from "@prisma/client";
import { saveEvent } from "@/app/actions/events";
import { SubmitButton } from "@/components/SubmitButton";
import { Alert, Field, Input, Textarea, buttonStyles } from "@/components/ui";
import { toDateInput } from "@/lib/dates";
import { parseGallery } from "@/lib/utils";
import { initialActionState } from "@/lib/validations";

export function EventForm({ event }: { event?: Event }) {
  const [state, action] = useActionState(saveEvent.bind(null, event?.id ?? null), initialActionState);
  const e = state.errors ?? {};
  const v = state.values;

  const initial = {
    title: event?.title ?? "",
    slug: event?.slug ?? "",
    description: event?.description ?? "",
    date: event ? toDateInput(event.date) : "",
    startTime: event?.startTime ?? "",
    endTime: event?.endTime ?? "",
    venue: event?.venue ?? "",
    imageUrl: event?.imageUrl ?? "",
    gallery: parseGallery(event?.gallery).join("\n"),
    isPublished: event?.isPublished ?? true,
  };
  const val = (key: Exclude<keyof typeof initial, "isPublished">) => v?.[key] ?? initial[key];

  return (
    <form action={action} className="space-y-6">
      {state.message && <Alert variant="error">{state.message}</Alert>}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title" htmlFor="title" error={e.title} required className="md:col-span-2">
          <Input id="title" name="title" defaultValue={val("title")} required />
        </Field>
        <Field label="Date" htmlFor="date" error={e.date} required>
          <Input id="date" name="date" type="date" defaultValue={val("date")} required />
        </Field>
        <Field label="Venue" htmlFor="venue" error={e.venue}>
          <Input id="venue" name="venue" defaultValue={val("venue")} />
        </Field>
        <Field label="Start time" htmlFor="startTime" error={e.startTime}>
          <Input id="startTime" name="startTime" type="time" defaultValue={val("startTime")} />
        </Field>
        <Field label="End time" htmlFor="endTime" error={e.endTime}>
          <Input id="endTime" name="endTime" type="time" defaultValue={val("endTime")} />
        </Field>
        <Field label="Description" htmlFor="description" error={e.description} required className="md:col-span-2">
          <Textarea id="description" name="description" rows={7} defaultValue={val("description")} required />
        </Field>
        <Field
          label="URL slug"
          htmlFor="slug"
          error={e.slug}
          hint="Leave empty to generate from the title."
          className="md:col-span-2"
        >
          <Input id="slug" name="slug" defaultValue={val("slug")} placeholder="christmas-concert" />
        </Field>
      </div>

      <fieldset className="space-y-4 rounded-xl border border-stone-200 p-5">
        <legend className="px-1 text-sm font-semibold text-stone-700">Cover image</legend>
        {initial.imageUrl && (
          <div className="flex items-center gap-4">
            <img src={initial.imageUrl} alt="" className="h-20 w-32 rounded-lg object-cover" />
            <label className="flex items-center gap-2 text-sm text-stone-600">
              <input type="checkbox" name="removeImage" /> Remove current image
            </label>
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Upload image" htmlFor="imageFile" hint="JPG, PNG, WEBP or GIF up to 5 MB.">
            <Input id="imageFile" name="imageFile" type="file" accept="image/*" />
          </Field>
          <Field label="...or image URL" htmlFor="imageUrl" error={e.imageUrl}>
            <Input id="imageUrl" name="imageUrl" defaultValue={val("imageUrl")} placeholder="https://..." />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border border-stone-200 p-5">
        <legend className="px-1 text-sm font-semibold text-stone-700">Photo gallery</legend>
        <p className="text-sm text-stone-500">Great for past events. Shown at the bottom of the event page.</p>
        <Field label="Add photos" htmlFor="galleryFiles">
          <Input id="galleryFiles" name="galleryFiles" type="file" accept="image/*" multiple />
        </Field>
        <Field label="Gallery image URLs" htmlFor="gallery" hint="One URL per line. Delete a line to remove a photo.">
          <Textarea id="gallery" name="gallery" rows={4} defaultValue={val("gallery")} className="font-mono text-xs" />
        </Field>
      </fieldset>

      <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={v ? v.isPublished === "on" : initial.isPublished}
          className="h-4 w-4 rounded border-stone-300"
        />
        Published (visible on the website)
      </label>

      <div className="flex gap-3">
        <SubmitButton>{event ? "Save changes" : "Create event"}</SubmitButton>
        <Link href="/admin/events" className={buttonStyles.secondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
