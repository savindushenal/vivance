/** Split a contact phone field that may list multiple numbers. */
export function phoneList(value: string): string[] {
  return value
    .split(/[\n,;/]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
