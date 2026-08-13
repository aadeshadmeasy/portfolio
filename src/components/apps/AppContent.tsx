"use client";

import Link from "next/link";
import {
  achievements,
  articles,
  clientCases,
  founderTxt,
  journey,
  learnVideos,
  metrics,
  ownerProfile,
  projects,
  socials,
  systemsLoop,
} from "@/content/owner-profile";
import { statusLabel } from "@/lib/utils";
import { ContactApp } from "@/components/apps/ContactApp";
import { WhiteboardApp } from "@/components/apps/WhiteboardApp";
import { BrowserApp } from "@/components/apps/BrowserApp";
import { CalendarApp } from "@/components/apps/CalendarApp";
import { CaseFilesApp } from "@/components/apps/CaseFilesApp";
import { FieldNotesApp } from "@/components/apps/FieldNotesApp";

export function AppContent({ appId }: { appId: string }) {
  switch (appId) {
    case "projects":
      return <ProjectsApp />;
    case "results":
      return <ResultsApp />;
    case "systems":
      return <SystemsApp />;
    case "proof":
      return <ProofApp />;
    case "journey":
      return <JourneyApp />;
    case "achievements":
      return <AchievementsApp />;
    case "learn":
      return <LearnApp />;
    case "emergency":
      return <EmergencyApp />;
    case "socials":
      return <SocialsApp />;
    case "founder":
      return <FounderApp />;
    case "whiteboard":
      return <WhiteboardApp />;
    case "browser":
      return <BrowserApp />;
    case "casefiles":
      return <CaseFilesApp />;
    case "fieldnotes":
      return <FieldNotesApp />;
    case "contact":
      return <ContactApp />;
    case "calendar":
      return <CalendarApp />;
    case "voice":
      return <VoiceApp />;
    default:
      return <p>Application not found.</p>;
  }
}

function ProjectsApp() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-bold">Projects — Main Drive</h2>
        <p className="text-[var(--text-secondary)]">
          Selected builds from {ownerProfile.company.brand} and founder history.
        </p>
      </header>
      <ProjectList items={featured} title="Featured case files" />
      <ProjectList items={other} title="More experiments & infrastructure" />
    </div>
  );
}

function ProjectList({ items, title }: { items: typeof projects; title: string }) {
  return (
    <section>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((p) => (
          <article
            key={p.id}
            className="rounded-lg border p-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h4 className="text-lg font-semibold">{p.name}</h4>
                <p className="text-sm text-[var(--text-muted)]">
                  {p.category} · {p.dates} · {p.role}
                </p>
              </div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium text-[var(--accent)]"
                >
                  Live →
                </a>
              )}
            </div>
            <p className="mt-2 text-sm">
              <strong>Problem:</strong> {p.problem}
            </p>
            <p className="mt-1 text-sm">
              <strong>Build:</strong> {p.intervention}
            </p>
            <p className="mt-1 text-sm">
              <strong>Outcome:</strong> {p.outcome}{" "}
              <span className="text-xs text-[var(--text-muted)]">
                ({statusLabel(p.outcomeStatus)})
              </span>
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-black/5 px-2 py-0.5 font-mono text-xs dark:bg-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResultsApp() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Results</h2>
      <p className="text-[var(--text-secondary)]">
        Client and product outcomes — not vanity metrics about the owner.
      </p>
      {clientCases.map((c) => (
        <article key={c.id} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-lg font-semibold">{c.client}</h3>
          <p className="mt-2 text-2xl font-bold text-[var(--accent)]">{c.metric}</p>
          <p className="text-xs text-[var(--text-muted)]">{statusLabel(c.metricStatus)}</p>
          <p className="mt-2 text-sm">{c.narrative}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{c.delivered}</p>
        </article>
      ))}
      <section className="mt-6">
        <h3 className="mb-2 font-semibold">Platform metrics</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
              <p className="text-2xl font-bold">{m.value}</p>
              <p className="text-sm">{m.label}</p>
              <p className="text-xs text-[var(--text-muted)]">{statusLabel(m.status)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SystemsApp() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Systems</h2>
      <p className="text-[var(--text-secondary)]">How Aadesh designs agentic operating loops.</p>
      <ol className="space-y-4">
        {systemsLoop.map((step, i) => (
          <li key={step.step} className="rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
            <p className="font-mono text-xs text-[var(--accent)]">0{i + 1}</p>
            <h3 className="text-lg font-semibold">{step.step}</h3>
            <p className="mt-1 text-sm">{step.purpose}</p>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium">Artifact</dt>
                <dd className="text-[var(--text-secondary)]">{step.artifact}</dd>
              </div>
              <div>
                <dt className="font-medium">Validation gate</dt>
                <dd className="text-[var(--text-secondary)]">{step.gate}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-medium">Common failure</dt>
                <dd className="text-[var(--text-secondary)]">{step.failure}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProofApp() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">PROOF.EXE</h2>
      <p className="text-sm">Podcasts, press features &amp; public proof.</p>
      {learnVideos.map((v) => (
        <article key={v.id} className="retro-panel p-3">
          <p className="text-xs uppercase text-[var(--accent-warm)]">{v.type} · DEMO</p>
          <h3 className="font-bold">{v.title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{v.channel}</p>
          <a href={v.url} target="_blank" rel="noreferrer noopener" className="retro-btn mt-2 inline-block text-sm">
            OPEN LINK
          </a>
        </article>
      ))}
    </div>
  );
}

function JourneyApp() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Journey</h2>
      <ol className="relative space-y-6 border-l-2 pl-6" style={{ borderColor: "var(--border)" }}>
        {journey.map((m) => (
          <li key={m.year + m.title} className="relative">
            <span
              className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <p className="font-mono text-sm text-[var(--accent)]">{m.year}</p>
            <h3 className="text-lg font-semibold">{m.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{m.story}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Upgrade: {m.skill}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SocialsApp() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Socials</h2>
      {socials.map((s) => (
        <a
          key={s.network}
          href={s.url}
          target="_blank"
          rel="noreferrer noopener"
          className="block rounded-lg border p-4 hover:bg-black/5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex justify-between gap-2">
            <h3 className="font-semibold">{s.network}</h3>
            <span className="text-sm text-[var(--accent)]">{s.handle}</span>
          </div>
          <p className="text-sm text-[var(--text-muted)]">{s.purpose}</p>
        </a>
      ))}
    </div>
  );
}

function FounderApp() {
  return (
    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{founderTxt}</pre>
  );
}

function AchievementsApp() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">ACHIEVEMENTS.VAULT</h2>
      <p className="text-sm text-[var(--text-muted)]">[ DEMO DATA — update in future release ]</p>
      {achievements.map((a) => (
        <article key={a.id} className="retro-panel p-3">
          <p className="text-xs text-[var(--accent)]">{a.date}</p>
          <h3 className="font-bold">{a.title}</h3>
          <p className="text-sm">{a.issuer}</p>
          <p className="text-sm text-[var(--text-muted)]">{a.note}</p>
        </article>
      ))}
    </div>
  );
}

function LearnApp() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">LEARN.LIB</h2>
      <p className="text-sm text-[var(--text-muted)]">Podcasts, articles &amp; knowledge library.</p>
      {learnVideos.map((v) => (
        <article key={v.id} className="retro-panel p-3">
          <span className="retro-panel inline-block px-2 py-0.5 text-xs">{v.type}</span>
          <h3 className="mt-1 font-bold">{v.title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{v.channel}</p>
          <a href={v.url} target="_blank" rel="noreferrer noopener" className="retro-btn mt-2 inline-block text-sm">
            WATCH / READ
          </a>
        </article>
      ))}
    </div>
  );
}

function EmergencyApp() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[var(--accent-warm)]">⚠ EMERGENCY.SYS</h2>
      <p className="text-sm">
        <strong>URGENT BUSINESS IMPLEMENTATION</strong> — not medical or public emergency services.
      </p>
      <div className="retro-panel border-4 border-[var(--accent-warm)] p-4">
        <p className="font-bold">REACH AADESH NOW</p>
        <p className="mt-2 text-sm">For time-sensitive founder or operator requests only.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={`mailto:${ownerProfile.conversion.email}`} className="retro-btn retro-btn-primary">
            EMAIL
          </a>
          <a
            href={ownerProfile.conversion.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="retro-btn"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </div>
  );
}

function VoiceApp() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">AI Voice Agent</h2>
      <p className="text-sm text-[var(--text-secondary)]">
        Demonstrations of Admeasy Ai voice calling infrastructure. No API keys are exposed in this
        client — configure embeds via environment variables.
      </p>
      <div className="rounded-lg border border-dashed p-6 text-center" style={{ borderColor: "var(--border)" }}>
        <p className="font-medium">Voice agent offline</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Set <code>NEXT_PUBLIC_VOICE_AGENT_EMBED_URL</code> to enable a third-party demo embed.
        </p>
        <a
          href={ownerProfile.company.productUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-block text-sm font-medium text-[var(--accent)]"
        >
          Explore Admeasy Ai →
        </a>
      </div>
    </div>
  );
}

export function ArticlesIndex() {
  return (
    <ul className="space-y-2">
      {articles.map((a) => (
        <li key={a.slug}>
          <Link href={`/blog/${a.slug}`} className="text-[var(--accent)] hover:underline">
            {a.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
