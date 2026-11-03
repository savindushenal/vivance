import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPageHeader, Card } from "@/components/admin/common";
import { ScheduleForm } from "@/components/admin/ScheduleForm";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Edit schedule item" };

export default async function EditScheduleItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.scheduleItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <AdminPageHeader title="Edit schedule item" description={item.title} />
      <Card className="p-6">
        <ScheduleForm item={item} />
      </Card>
    </>
  );
}
