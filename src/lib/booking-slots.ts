import { BOOKING_TIMEZONE, SLOT_DURATION_MINUTES } from "@/lib/google-calendar";

const BUSINESS_START_HOUR = 10;
const BUSINESS_END_HOUR = 18;

function toIstParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value || "";

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    weekday: get("weekday"),
  };
}

function istSlotToUtcIso(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const local = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00`;
  const probe = new Date(
  `${local}+05:30`,
  );
  return probe.toISOString();
}

export interface BookingSlot {
  start: string;
  end: string;
  label: string;
}

export function generateCandidateSlots(daysAhead = 14): BookingSlot[] {
  const slots: BookingSlot[] = [];
  const now = new Date();
  const startDay = new Date(now);
  startDay.setHours(0, 0, 0, 0);

  for (let d = 0; d < daysAhead; d += 1) {
    const day = new Date(startDay);
    day.setDate(startDay.getDate() + d);
    const { year, month, day: dom, weekday } = toIstParts(day);

    if (weekday === "Sun") continue;

    for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour += 1) {
      for (const minute of [0, 30]) {
        if (hour === BUSINESS_END_HOUR - 1 && minute === 30) continue;

        const startIso = istSlotToUtcIso(year, month, dom, hour, minute);
        const startDate = new Date(startIso);
        if (startDate.getTime() <= now.getTime() + 60 * 60 * 1000) continue;

        const endDate = new Date(startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
        const label = startDate.toLocaleString("en-IN", {
          timeZone: BOOKING_TIMEZONE,
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        });

        slots.push({
          start: startIso,
          end: endDate.toISOString(),
          label,
        });
      }
    }
  }

  return slots;
}

export function filterAvailableSlots(
  candidates: BookingSlot[],
  busy: Array<{ start: string; end: string }>,
): BookingSlot[] {
  return candidates.filter((slot) => {
    const slotStart = new Date(slot.start).getTime();
    const slotEnd = new Date(slot.end).getTime();

    return !busy.some((b) => {
      const busyStart = new Date(b.start).getTime();
      const busyEnd = new Date(b.end).getTime();
      return slotStart < busyEnd && slotEnd > busyStart;
    });
  });
}
