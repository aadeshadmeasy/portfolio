import { NextResponse } from "next/server";
import {
  filterAvailableSlots,
  generateCandidateSlots,
} from "@/lib/booking-slots";
import {
  getBusyIntervals,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar";

export async function GET() {
  try {
    const candidates = generateCandidateSlots(14);

    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json({
        configured: false,
        slots: candidates.slice(0, 24),
        message:
          "Showing suggested slots. Connect Google Calendar env vars on Vercel for live availability.",
      });
    }

    const timeMin = candidates[0]?.start || new Date().toISOString();
    const timeMax =
      candidates[candidates.length - 1]?.end ||
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const busy = await getBusyIntervals(timeMin, timeMax);
    const available = filterAvailableSlots(candidates, busy).slice(0, 32);

    return NextResponse.json({
      configured: true,
      slots: available,
    });
  } catch (error) {
    console.error("[booking/slots]", error);
    return NextResponse.json(
      {
        configured: isGoogleCalendarConfigured(),
        slots: generateCandidateSlots(7).slice(0, 16),
        error: "Could not load live availability. Showing suggested slots.",
      },
      { status: 200 },
    );
  }
}
