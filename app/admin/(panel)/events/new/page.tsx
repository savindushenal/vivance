import type { Metadata } from "next";
import { AdminPageHeader, Card } from "@/components/admin/common";
import { EventForm } from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "New event" };

export default function NewEventPage() {
  return (
    <>
      <AdminPageHeader title="New event" />
      <Card className="p-6">
        <EventForm />
      </Card>
    </>
  );
}
