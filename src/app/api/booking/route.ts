import { NextResponse } from "next/server";
import {
  createBookingEvent,
  isGoogleCalendarConfigured,
  OWNER_EMAIL,
} from "@/lib/google-calendar";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    if (!isGoogleCalendarConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Google Calendar is not configured on the server. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN to your deployment environment.",
          ownerEmail: OWNER_EMAIL,
        },
        { status: 503 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      startTime?: string;
      endTime?: string;
      notes?: string;
    };

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const startTime = body.startTime || "";
    const endTime = body.endTime || "";
    const notes = body.notes?.trim().slice(0, 500);

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid date/time." }, { status: 400 });
    }

    if (start.getTime() <= now.getTime()) {
      return NextResponse.json(
        { ok: false, error: "Please choose a future time slot." },
        { status: 400 },
      );
    }

    if (end.getTime() - start.getTime() !== 30 * 60 * 1000) {
      return NextResponse.json(
        { ok: false, error: "Meetings must be 30 minutes." },
        { status: 400 },
      );
    }

    const result = await createBookingEvent({
      name,
      email,
      startTime,
      endTime,
      notes,
    });

    return NextResponse.json({
      ok: true,
      eventId: result.eventId,
      meetLink: result.meetLink,
      htmlLink: result.htmlLink,
      message: `Invite sent to ${email} and ${OWNER_EMAIL}. Check your inbox for the Google Meet link.`,
    });
  } catch (error) {
    console.error("[booking]", error);
    const message =
      error instanceof Error ? error.message : "Failed to create calendar event.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
