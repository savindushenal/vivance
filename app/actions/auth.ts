"use server";

import { redirect } from "next/navigation";
import { checkCredentials, createSession, destroySession } from "@/lib/auth";
import { formDataToObject } from "@/lib/utils";
import { fieldErrors, loginSchema, type ActionState } from "@/lib/validations";

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const values = formDataToObject(formData);
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, errors: fieldErrors(parsed.error), values: { email: values.email ?? "" } };
  }

  const valid = await checkCredentials(parsed.data.email, parsed.data.password);
  if (!valid) {
    return { ok: false, message: "Invalid email or password", values: { email: parsed.data.email } };
  }

  await createSession(parsed.data.email);

  const from = values.from;
  redirect(from && from.startsWith("/admin") && from !== "/admin/login" ? from : "/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
