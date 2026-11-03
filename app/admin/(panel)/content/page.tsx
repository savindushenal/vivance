import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/common";
import { ContentForm } from "@/components/admin/ContentForm";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "Site content" };

export default async function ContentPage() {
  const content = await getSiteContent();
  return (
    <>
      <AdminPageHeader
        title="Site content"
        description="Edit the text shown on the home, about and contact pages. Leave a blank line between paragraphs."
      />
      <ContentForm content={content} />
    </>
  );
}
