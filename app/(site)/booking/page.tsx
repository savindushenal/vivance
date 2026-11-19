import { redirect } from "next/navigation";

/** One-page site: booking lives on the home page. */
export default async function BookingRedirect({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  redirect(type ? `/?type=${encodeURIComponent(type)}` : "/");
}
