import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: { default: `${content.choirName} | Choir for hire`, template: `%s | ${content.choirName}` },
    description:
      content.heroSubtitle ||
      "Vivàce is a choir for hire. We sing for weddings, celebrations, sacred services and private events.",
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <div className="flex min-h-screen flex-col">
      <Header choirName={content.choirName} />
      <main className="flex-1">{children}</main>
      <Footer content={content} />
    </div>
  );
}
