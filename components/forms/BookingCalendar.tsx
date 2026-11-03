"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

function toYmd(year: number, monthIndex: number, day: number) {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseYmd(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return { y, m: m - 1, d };
}

function formatLong(value: string) {
  const { y, m, d } = parseYmd(value);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
    new Date(y, m, d).getDay()
  ];
  return `${weekday}, ${MONTHS[m]} ${d}, ${y}`;
}

type Props = {
  name?: string;
  minDate: string;
  unavailableDates?: string[];
  defaultValue?: string;
  error?: string[] | string;
  id?: string;
};

export function BookingCalendar({
  name = "eventDate",
  minDate,
  unavailableDates = [],
  defaultValue = "",
  error,
  id = "eventDate",
}: Props) {
  const min = parseYmd(minDate);
  const unavailable = useMemo(() => new Set(unavailableDates), [unavailableDates]);
  const initial = defaultValue && defaultValue >= minDate ? defaultValue : "";
  const seed = initial ? parseYmd(initial) : min;

  const [selected, setSelected] = useState(initial);
  const [viewYear, setViewYear] = useState(seed.y);
  const [viewMonth, setViewMonth] = useState(seed.m);

  const message = Array.isArray(error) ? error[0] : error;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startWeekday = new Date(viewYear, viewMonth, 1).getDay();

  const canGoPrev =
    viewYear > min.y || (viewYear === min.y && viewMonth > min.m);

  function shiftMonth(delta: number) {
    const date = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  }

  const cells: Array<{ key: string; day?: number; ymd?: string }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ key: `pad-${i}` });
  for (let day = 1; day <= daysInMonth; day++) {
    const ymd = toYmd(viewYear, viewMonth, day);
    cells.push({ key: ymd, day, ymd });
  }

  return (
    <div className="space-y-1.5">
      <input type="hidden" id={id} name={name} value={selected} required />

      <div
        className={cn(
          "border bg-white p-4 sm:p-5",
          message ? "border-red-400" : "border-[var(--color-navy)]/15",
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canGoPrev}
            className="rounded-sm px-2 py-1 text-sm text-[var(--color-navy)] transition hover:bg-[var(--color-mist)] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous month"
          >
            ←
          </button>
          <p className="font-serif text-lg font-semibold tracking-wide text-[var(--color-navy)]">
            {MONTHS[viewMonth]} {viewYear}
          </p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="rounded-sm px-2 py-1 text-sm text-[var(--color-navy)] transition hover:bg-[var(--color-mist)]"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[0.7rem] font-semibold uppercase tracking-wider text-[var(--color-ink)]/45">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell) => {
            if (!cell.day || !cell.ymd) {
              return <div key={cell.key} className="aspect-square" />;
            }

            const isPast = cell.ymd < minDate;
            const isBusy = unavailable.has(cell.ymd);
            const isSelected = selected === cell.ymd;
            const disabled = isPast || isBusy;

            return (
              <button
                key={cell.key}
                type="button"
                disabled={disabled}
                onClick={() => setSelected(cell.ymd!)}
                aria-pressed={isSelected}
                aria-label={
                  isBusy
                    ? `${formatLong(cell.ymd)} unavailable`
                    : formatLong(cell.ymd)
                }
                className={cn(
                  "aspect-square rounded-sm text-sm transition",
                  disabled && "cursor-not-allowed text-[var(--color-ink)]/25",
                  isBusy && "line-through decoration-[var(--color-ink)]/30",
                  !disabled && !isSelected && "text-[var(--color-navy)] hover:bg-[var(--color-champagne)]/25",
                  isSelected && "bg-[var(--color-navy)] font-semibold text-white",
                )}
              >
                {cell.day}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--color-navy)]/10 pt-3 text-xs text-[var(--color-ink)]/55">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--color-navy)]" />
            Selected
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--color-mist)] line-through" />
            Unavailable
          </span>
        </div>
      </div>

      <p className="text-sm text-[var(--color-ink)]/60">
        {selected ? (
          <>
            Selected date:{" "}
            <span className="font-medium text-[var(--color-navy)]">{formatLong(selected)}</span>
          </>
        ) : (
          "Pick an available date on the calendar."
        )}
      </p>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </div>
  );
}
