import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteInquiry, updateInquiryStatus } from "@/app/actions/inquiries";
import { AdminPageHeader, Card, StatusBadge } from "@/components/admin/common";
import { SubmitButton } from "@/components/SubmitButton";
import { buttonStyles } from "@/components/ui";
import { INQUIRY_STATUSES } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/dates";

export const metadata: Metadata = { title: "Inquiry" };

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await db.inquiry.findUnique({ where: { id } });
  if (!found) notFound();

  const inquiry =
    found.status === "NEW"
      ? await db.inquiry.update({ where: { id }, data: { status: "READ" } })
      : found;

  const replyHref = `mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: ${inquiry.subject}`)}`;

  return (
    <>
      <Link href="/admin/inquiries" className="text-sm text-amber-700 hover:underline">
        ← Back to inquiries
      </Link>
      <div className="mt-3">
        <AdminPageHeader
          title={inquiry.subject}
          description={`Received ${formatDateTime(inquiry.createdAt)}`}
          action={<StatusBadge status={inquiry.status} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <p className="whitespace-pre-wrap leading-relaxed text-stone-800">{inquiry.message}</p>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-3 p-6 text-sm">
            <div>
              <p className="text-xs uppercase text-stone-500">From</p>
              <p className="font-medium text-stone-900">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-stone-500">Email</p>
              <a href={`mailto:${inquiry.email}`} className="text-amber-700 hover:underline">
                {inquiry.email}
              </a>
            </div>
            {inquiry.phone && (
              <div>
                <p className="text-xs uppercase text-stone-500">Phone</p>
                <a href={`tel:${inquiry.phone}`} className="text-stone-900">
                  {inquiry.phone}
                </a>
              </div>
            )}
            <a href={replyHref} className={`${buttonStyles.primary} w-full`}>
              Reply by email
            </a>
          </Card>

          <Card className="space-y-3 p-6">
            <p className="text-sm font-semibold text-stone-900">Update status</p>
            <div className="flex flex-wrap gap-2">
              {INQUIRY_STATUSES.filter((s) => s !== inquiry.status).map((status) => (
                <form key={status} action={updateInquiryStatus}>
                  <input type="hidden" name="id" value={inquiry.id} />
                  <input type="hidden" name="status" value={status} />
                  <SubmitButton variant="secondary" pendingText="..." className="capitalize">
                    Mark {status.toLowerCase()}
                  </SubmitButton>
                </form>
              ))}
            </div>
            <form action={deleteInquiry} className="border-t border-stone-100 pt-3">
              <input type="hidden" name="id" value={inquiry.id} />
              <SubmitButton
                variant="ghost"
                pendingText="Deleting..."
                className="text-red-600 hover:bg-red-50"
                confirmMessage="Delete this inquiry permanently?"
              >
                Delete inquiry
              </SubmitButton>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
