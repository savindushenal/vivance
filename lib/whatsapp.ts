import {
  BOOKING_EVENT_TYPE_LABELS,
  type BookingEventType,
} from "@/lib/constants";

/** Vivàce WhatsApp business number (digits only, country code included). */
export const WHATSAPP_NUMBER = "94702433654";

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text.trim())}`;
}

export type BookingWhatsAppFields = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  message?: string | null;
};

export function bookingWhatsAppMessage(data: BookingWhatsAppFields) {
  const functionLabel =
    BOOKING_EVENT_TYPE_LABELS[data.eventType as BookingEventType] ?? data.eventType;

  const lines = [
    "Hello Vivàce, I'd like to book the choir.",
    "",
    `Function: ${functionLabel}`,
    `Date: ${data.eventDate}`,
    `Starting time: ${data.eventTime}`,
    `Venue: ${data.venue}`,
    "",
    `Name: ${data.name}`,
    `WhatsApp: ${data.phone}`,
    `Email: ${data.email}`,
  ];

  if (data.message?.trim()) {
    lines.push("", `Notes: ${data.message.trim()}`);
  }

  return lines.join("\n");
}

export function bookingWhatsAppUrl(data: BookingWhatsAppFields) {
  return whatsappUrl(bookingWhatsAppMessage(data));
}
