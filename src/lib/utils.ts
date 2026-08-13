export function statusLabel(status: string): string {
  switch (status) {
    case "verified":
      return "Verified";
    case "client-reported":
      return "Client-reported";
    case "founder-reported":
      return "Founder-reported";
    case "estimated":
      return "Estimated";
    case "illustrative":
      return "Illustrative";
    default:
      return status;
  }
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const t = text.toLowerCase();
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length || t.includes(q);
}
