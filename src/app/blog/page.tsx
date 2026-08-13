import Link from "next/link";
import { articles } from "@/content/owner-profile";

export const metadata = {
  title: "AI Field Notes",
  description: "Articles by Aadesh Panwar on agentic AI and founder systems.",
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">AI Field Notes</h1>
      <p className="mt-2 text-stone-600">By Aadesh Panwar · Admeasy Ai</p>
      <ul className="mt-8 space-y-6">
        {articles.map((a) => (
          <li key={a.slug} className="border-b border-stone-200 pb-6">
            <Link href={`/blog/${a.slug}`} className="text-xl font-semibold text-indigo-600 hover:underline">
              {a.title}
            </Link>
            <p className="mt-2 text-stone-600">{a.description}</p>
            <p className="mt-1 text-sm text-stone-400">
              Published {a.publishedAt}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/" className="mt-8 inline-block text-indigo-600">
        ← Back to Aadesh OS
      </Link>
    </main>
  );
}
