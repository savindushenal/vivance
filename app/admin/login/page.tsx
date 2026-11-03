import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <p className="font-serif text-2xl font-semibold text-stone-900">Choir Admin</p>
          <p className="mt-1 text-sm text-stone-500">Sign in to manage the website</p>
        </div>
        <LoginForm from={from} />
      </div>
    </main>
  );
}
