import { redirect } from "next/navigation";

/** About lives on the home page. */
export default function AboutRedirect() {
  redirect("/#about");
}
