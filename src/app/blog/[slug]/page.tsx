import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/content/owner-profile";

const CONTENT: Record<string, { body: string[] }> = {
  "agentic-ai-for-founders": {
    body: [
      "Five-person startups compete against companies with five hundred employees. The gap is not talent — it is operational capacity.",
      "Dashboards suggest. Chatbots answer. Neither executes the full loop: capture the lead, call within sixty seconds, assign the task, write the code, publish the post, and report back with proof.",
      "Admeasy Ai treats marketing, CRM, HR, and product as four departments in one agentic operating system. Each department has accountable agents, not decorative widgets.",
      "If you are a founder evaluating agentic AI, ask one question: does this system close a loop you currently run manually at midnight?",
    ],
  },
  "voice-ai-lead-response": {
    body: [
      "Speed-to-lead is not a vanity metric. When a prospect raises their hand, every minute of silence is a vote for your competitor.",
      "Voice AI with rich dossier context — who they are, what they clicked, what constraint they mentioned — changes the first conversation from cold script to informed dialogue.",
      "The economics shift when response time drops from hours to under a minute. Disclose honestly: influenced pipeline is not realized revenue.",
      "Build the calling infrastructure, measure connection rates, and label outcomes as verified, client-reported, or illustrative.",
    ],
  },
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const content = CONTENT[slug];
  if (!article || !content) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <p className="font-mono text-sm text-stone-500">Aadesh Panwar · Admeasy Ai</p>
        <h1 className="mt-2 text-3xl font-bold">{article.title}</h1>
        <p className="mt-2 text-stone-600">{article.description}</p>
        <time className="mt-2 block text-sm text-stone-400" dateTime={article.publishedAt}>
          {article.publishedAt}
        </time>
      </header>
      <div className="prose prose-stone mt-8 max-w-none">
        {content.body.map((p) => (
          <p key={p.slice(0, 24)} className="mb-4 text-lg leading-relaxed text-stone-700">
            {p}
          </p>
        ))}
      </div>
      <Link href="/blog" className="mt-8 inline-block text-indigo-600">
        ← All articles
      </Link>
    </article>
  );
}
