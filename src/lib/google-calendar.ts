import { google } from "googleapis";

export const BOOKING_TIMEZONE = "Asia/Kolkata";
export const OWNER_EMAIL =
  process.env.GOOGLE_CALENDAR_ID ||
  process.env.OWNER_EMAIL ||
  "aadesh.panwar@admeasy.in";

export const SLOT_DURATION_MINUTES = 30;

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN,
  );
}

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return client;
}

export function getCalendarClient() {
  return google.calendar({ version: "v3", auth: getOAuthClient() });
}

export async function getBusyIntervals(
  timeMin: string,
  timeMax: string,
): Promise<Array<{ start: string; end: string }>> {
  const calendar = getCalendarClient();
  const calendarId = OWNER_EMAIL;

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: BOOKING_TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busy = response.data.calendars?.[calendarId]?.busy ?? [];
  return busy
    .filter((slot) => slot.start && slot.end)
    .map((slot) => ({ start: slot.start!, end: slot.end! }));
}

export interface CreateBookingInput {
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface CreateBookingResult {
  eventId: string;
  meetLink?: string;
  htmlLink?: string;
}

export async function createBookingEvent(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const calendar = getCalendarClient();
  const calendarId = OWNER_EMAIL;
  const requestId = `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const response = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Portfolio call · ${input.name}`,
      description: [
        input.notes?.trim() || "Booked via Aadesh OS portfolio.",
        "",
        `Guest: ${input.name} <${input.email}>`,
      ].join("\n"),
      start: {
        dateTime: input.startTime,
        timeZone: BOOKING_TIMEZONE,
      },
      end: {
        dateTime: input.endTime,
        timeZone: BOOKING_TIMEZONE,
      },
      attendees: [
        { email: input.email, displayName: input.name },
        { email: OWNER_EMAIL },
      ],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: true,
      },
    },
  });

  const meetLink =
    response.data.hangoutLink ||
    response.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")
      ?.uri;

  return {
    eventId: response.data.id || requestId,
    meetLink: meetLink || undefined,
    htmlLink: response.data.htmlLink || undefined,
  };
}
