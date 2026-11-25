import { redirect } from "next/navigation";

/** Contact lives on the home page. */
export default function ContactRedirect() {
  redirect("/#contact");
}
