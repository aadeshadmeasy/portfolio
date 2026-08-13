import Link from "next/link";
import { articles } from "@/content/owner-profile";

export function FieldNotesApp() {
  return (
    <div className="space-y-4">
      <p className="window-kicker">AI FIELD NOTES / BLOG.APP</p>
      <h2 className="window-headline">
        Delhi + India <em>perspective.</em>
      </h2>
      <p className="text-sm">Crawlable articles for founders building agentic systems.</p>
      <ul className="space-y-3">
        {articles.map((a) => (
          <li key={a.slug} className="retro-panel p-3">
            <Link href={`/blog/${a.slug}`} className="font-bold hover:underline" target="_blank">
              {a.title}
            </Link>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{a.description}</p>
          </li>
        ))}
      </ul>
      <Link href="/blog" className="retro-btn inline-block" target="_blank">
        OPEN FULL LIBRARY ↗
      </Link>
    </div>
  );
}
