import Link from "next/link";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

/** Primary CTA: goes to booking by default (form sends via WhatsApp). */
export function WhatsAppLink({
  href = "/booking",
  className,
  children = "WhatsApp us",
}: Props) {
  const classNames = cn("btn-whatsapp", className);

  if (href.startsWith("http") || href.startsWith("https://wa.me")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classNames}>
        <WhatsAppIcon />
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      <WhatsAppIcon />
      <span>{children}</span>
    </Link>
  );
}
