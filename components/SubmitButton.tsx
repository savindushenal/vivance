"use client";

import { useFormStatus } from "react-dom";
import { buttonStyles } from "@/components/ui";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingText = "Saving...",
  variant = "primary",
  className,
  confirmMessage,
  ...rest
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: keyof typeof buttonStyles;
  className?: string;
  confirmMessage?: string;
  name?: string;
  value?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(buttonStyles[variant], className)}
      onClick={(e) => {
        if (confirmMessage && !window.confirm(confirmMessage)) e.preventDefault();
      }}
      {...rest}
    >
      {pending ? pendingText : children}
    </button>
  );
}
