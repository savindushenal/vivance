import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader, Card } from "@/components/admin/common";
import { EventForm } from "@/components/admin/EventForm";
import { buttonStyles } from "@/components/ui";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Edit event" };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await db.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <>
      <AdminPageHeader
        title="Edit event"
        description={event.title}
        action={
          event.isPublished ? (
            <Link href={`/events/${event.slug}`} target="_blank" className={buttonStyles.secondary}>
              View on site ↗
            </Link>
          ) : undefined
        }
      />
      <Card className="p-6">
        <EventForm event={event} />
      </Card>
    </>
  );
}
