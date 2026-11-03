import type { Metadata } from "next";
import type { ScheduleItem } from "@prisma/client";
import { PageHeader } from "@/components/site/PageHeader";
import { SCHEDULE_TYPE_LABELS, labelFor } from "@/lib/constants";
import { getSiteContent } from "@/lib/content";
import { formatMonth, formatTimeRange } from "@/lib/dates";
import { getUpcomingSchedule } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Schedule" };

const TYPE_STYLES: Record<string, string> = {
  REHEARSAL: "bg-[var(--color-navy)]/5 text-[var(--color-navy)]",
  PERFORMANCE: "bg-[var(--color-champagne)]/20 text-[var(--color-champagne-deep)]",
  SERVICE: "bg-emerald-50 text-emerald-800",
  OTHER: "bg-[var(--color-mist)] text-[var(--color-ink)]/70",
};

function groupByMonth(items: ScheduleItem[]) {
  const groups = new Map<string, ScheduleItem[]>();
  for (const item of items) {
    const key = formatMonth(item.date);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()];
}

export default async function SchedulePage() {
  const [items, content] = await Promise.all([getUpcomingSchedule(), getSiteContent()]);
  const groups = groupByMonth(items);

  return (
    <>
      <PageHeader title="Schedule" subtitle={content.rehearsalInfo} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {groups.length === 0 && (
          <p className="text-center text-[var(--color-ink)]/55">
            No scheduled items yet. Please check back soon.
          </p>
        )}
        <div className="space-y-12">
          {groups.map(([month, monthItems]) => (
            <div key={month}>
              <h2 className="font-serif text-2xl font-semibold tracking-wide text-[var(--color-navy)]">
                {month}
              </h2>
              <ul className="mt-4 divide-y divide-[var(--color-navy)]/10 border-y border-[var(--color-navy)]/10">
                {monthItems.map((item) => (
                  <li key={item.id} className="flex gap-4 py-4">
                    <div className="w-16 shrink-0 bg-[var(--color-navy)] py-2 text-center text-white">
                      <p className="text-[0.65rem] uppercase tracking-wider text-[var(--color-champagne-soft)]">
                        {item.date.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="font-serif text-2xl font-semibold leading-tight">
                        {item.date.getDate()}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-[var(--color-navy)]">{item.title}</p>
                        <span
                          className={cn(
                            "rounded-sm px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
                            TYPE_STYLES[item.type] ?? TYPE_STYLES.OTHER,
                          )}
                        >
                          {labelFor(SCHEDULE_TYPE_LABELS, item.type)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--color-ink)]/55">
                        {[formatTimeRange(item.startTime, item.endTime), item.location]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      {item.notes && (
                        <p className="mt-2 text-sm text-[var(--color-ink)]/65">{item.notes}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
