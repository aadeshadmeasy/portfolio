import type { AppDefinition } from "@/lib/types";

/** Desktop + dock apps — order matches reference OS layout */
export const desktopApps: AppDefinition[] = [
  { id: "projects", name: "Projects", description: "12 selected case files", badge: "MAIN DRIVE", icon: "folder" },
  { id: "results", name: "Results", description: "Evidence, not claims", badge: "PROOF VAULT", icon: "chart" },
  { id: "systems", name: "Systems", description: "How the work ships", icon: "gear" },
  { id: "proof", name: "Proof", description: "5 client videos", icon: "play" },
  { id: "journey", name: "Journey", description: "2023 — now", icon: "timeline" },
  { id: "socials", name: "Socials", description: "LinkedIn & community", icon: "share" },
  { id: "voice", name: "AI Voice Agent", description: "Talk to the AI voice agent", icon: "mic" },
  { id: "founder", name: "Founder.txt", description: "Read the note", icon: "note" },
  { id: "whiteboard", name: "Whiteboard", description: "Add + arrange notes", icon: "sticky" },
  { id: "browser", name: "Browser", description: "Open AadeshNet", icon: "globe" },
  { id: "contact", name: "Leave a Message", description: "Open message box", icon: "mail" },
  { id: "casefiles", name: "Case Files", description: "Folders + client", icon: "case" },
  { id: "fieldnotes", name: "AI Field Notes", description: "Delhi + India blog", icon: "compass" },
  { id: "learn", name: "Learn", description: "Real YouTube uploads", icon: "book" },
  { id: "achievements", name: "Achievements", description: "Honors & vault", icon: "trophy" },
  { id: "emergency", name: "Emergency", description: "Reach Aadesh now", icon: "alert" },
  { id: "calendar", name: "Calendar", description: "Book a Google Meet", icon: "calendar" },
];

export const dockAppIds = [
  "projects", "results", "systems", "journey", "voice", "founder",
  "whiteboard", "browser", "contact", "casefiles", "learn", "calendar",
];
