export const SCHEDULE_TYPES = ["REHEARSAL", "PERFORMANCE", "SERVICE", "OTHER"] as const;
export type ScheduleType = (typeof SCHEDULE_TYPES)[number];

export const SCHEDULE_TYPE_LABELS: Record<ScheduleType, string> = {
  REHEARSAL: "Rehearsal",
  PERFORMANCE: "Performance",
  SERVICE: "Service",
  OTHER: "Other",
};

export const INQUIRY_STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "DECLINED", "CANCELLED"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_EVENT_TYPES = [
  "WEDDING",
  "CHURCH_SERVICE",
  "CORPORATE",
  "CONCERT",
  "FUNERAL",
  "OTHER",
] as const;
export type BookingEventType = (typeof BOOKING_EVENT_TYPES)[number];

export const BOOKING_EVENT_TYPE_LABELS: Record<BookingEventType, string> = {
  WEDDING: "Wedding",
  CHURCH_SERVICE: "Church service",
  CORPORATE: "Corporate event",
  CONCERT: "Concert",
  FUNERAL: "Funeral / memorial",
  OTHER: "Other",
};

export function labelFor(map: Record<string, string>, key: string) {
  return map[key] ?? key;
}
