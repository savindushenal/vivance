import type { Metadata } from "next";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Choir Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const [newInquiries, pendingBookings] = await Promise.all([
    db.inquiry.count({ where: { status: "NEW" } }),
    db.booking.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="min-h-screen bg-stone-100">
      <Sidebar email={session.email} counts={{ newInquiries, pendingBookings }} />
      <div className="lg:pl-60">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
