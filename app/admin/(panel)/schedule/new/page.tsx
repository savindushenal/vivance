import type { Metadata } from "next";
import { AdminPageHeader, Card } from "@/components/admin/common";
import { ScheduleForm } from "@/components/admin/ScheduleForm";

export const metadata: Metadata = { title: "New schedule item" };

export default function NewScheduleItemPage() {
  return (
    <>
      <AdminPageHeader title="New schedule item" />
      <Card className="p-6">
        <ScheduleForm />
      </Card>
    </>
  );
}
