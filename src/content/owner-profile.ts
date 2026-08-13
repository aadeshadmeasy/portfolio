import type { Article, ClientCase, JourneyMilestone, Metric, Project, SocialLink, Testimonial } from "@/lib/types";

export const ownerProfile = {
  identity: {
    fullName: "Aadesh Panwar",
    shortName: "Aadesh",
    osName: "Aadesh OS",
    domain: "aadeshpanwar.com",
    location: "New Delhi & Indore, India",
    timezone: "Asia/Kolkata",
    pronouns: "he/him/his",
    profession: "Entrepreneur · CEO at Admeasy Ai",
    roles: ["Founder", "Agentic AI Builder", "Operator", "CEO"],
    headline: "never dream small!",
    intro: "— Aadesh Panwar",
    positioning:
      "Building Admeasy Ai — an agentic operating system that gives small teams the output of a hundred-person company.",
    portrait: "/assets/avatar-hero.png",
    sprite: "/assets/avatar-hero.png",
  },
  imageGeneration: {
    mode: "codex-native" as const,
    provider: "Cursor GenerateImage",
    model: "native",
    apiKeyEnvironmentVariable: "",
    approvedSourceImages: ["/assets/avatar-hero.png"],
    likenessNotes:
      "Young Indian male entrepreneur, smart casual, confident and approachable.",
    requiredOutputs: ["avatar-hero", "companion-happy", "companion-sad"],
    finalApprovalBy: "Aadesh Panwar",
  },
  conversion: {
    primaryLabel: "Enter the Portfolio",
    primaryUrl: "#projects",
    secondaryLabel: "Book a Strategy Call",
    secondaryUrl: "https://cal.com",
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com",
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/919876543210",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "team@admeasy.in",
    emergencyLabel: "URGENT: Reach Aadesh on WhatsApp",
  },
  company: {
    brand: "Admeasy Ai",
    legalName: "Admeasy Admission Solutions Pvt Ltd",
    tagline: "Your AI workforce is always working.",
    productUrl: "https://enterprise.admeasy.in",
    previousStartup: "Admeasy.in",
  },
  services: [
    {
      id: "agentic-os",
      name: "Agentic AI Operating Systems",
      description: "Multi-department AI agents for marketing, CRM, HR, and product execution.",
    },
    {
      id: "voice-ai",
      name: "Voice AI & Calling Agents",
      description: "Instant lead response, outbound campaigns, and conversational workflows.",
    },
    {
      id: "founder-systems",
      name: "Founder Operating Systems",
      description: "Workflow design, integrations, and proof-driven automation for lean teams.",
    },
  ],
  legal: {
    copyrightOwner: "Admeasy Admission Solutions Pvt Ltd",
    assetLicenses: ["Generated avatar and companion assets approved for portfolio use"],
    metricDisclaimer:
      "Metrics marked client-reported or founder-reported are disclosed at point of display.",
  },
  companion: {
    direction: "premium-playful",
    states: ["idle", "happy", "sad", "excited"],
    positionPersistence: "remember",
    bookingNotificationCopy:
      "Someone just booked a call with Aadesh Panwar. Looks like they do not want their business falling behind on AI.",
    bookingNotificationMode: "demo" as const,
  },
  themes: {
    primary: "#4F46E5",
    accent: "#F59E0B",
    neutral: "#1C1917",
    adjectives: ["premium", "engineered", "warm"],
  },
};

export const metrics: Metric[] = [
  {
    value: "4",
    label: "AI departments in one OS",
    status: "founder-reported",
    source: "Admeasy Ai product architecture",
    public: true,
    lastVerified: "2026-08-13",
  },
  {
    value: "60s",
    label: "target lead response via voice AI",
    status: "founder-reported",
    source: "Admeasy Ai CRM module spec",
    public: true,
    lastVerified: "2026-08-13",
  },
  {
    value: "10",
    label: "founding beta teams",
    status: "illustrative",
    source: "Admeasy Ai beta cohort positioning",
    public: true,
    lastVerified: "2026-08-13",
  },
];

export const projects: Project[] = [
  {
    id: "admeasy-ai",
    name: "Admeasy Ai",
    client: "Admeasy Admission Solutions Pvt Ltd",
    category: "Agentic AI Platform",
    dates: "2024 — Present",
    role: "Founder & CEO",
    problem:
      "Small teams drown in operations — marketing, sales, HR, and product loops still need a hundred-person company's capacity.",
    intervention:
      "Built a four-department agentic OS: Marketing, CRM, HRM, and Product AI with voice calling, MCP integrations, and autonomous execution.",
    outcome:
      "Private beta with founding cohort; voice AI, coding agents, and connector hub shipping in production.",
    outcomeStatus: "founder-reported",
    url: "https://enterprise.admeasy.in",
    repository: "https://github.com/aadeshadmeasy",
    image: "/assets/case-admeasy-ai.svg",
    stack: ["Next.js", "FastAPI", "Supabase", "LangGraph", "Twilio", "E2B"],
    services: ["Agentic OS", "Voice AI", "Product AI"],
    featured: true,
  },
  {
    id: "admeasy-in",
    name: "Admeasy.in",
    client: "Self",
    category: "EdTech · Admissions",
    dates: "2019 — 2024",
    role: "Founder & ex-CEO",
    problem:
      "Students and parents struggled to navigate college admissions with fragmented guidance and opaque processes.",
    intervention:
      "Built an admissions guidance platform connecting students with counselors, content, and application workflows.",
    outcome:
      "Scaled a consumer admissions brand; operational lessons directly informed the pivot to agentic AI infrastructure.",
    outcomeStatus: "founder-reported",
    url: "https://admeasy.in",
    repository: "",
    image: "/assets/case-admeasy-in.svg",
    stack: ["React", "Node.js", "PostgreSQL"],
    services: ["Product", "Operations"],
    featured: true,
  },
  {
    id: "voice-calling-engine",
    name: "Voice Calling Engine",
    client: "Admeasy Ai",
    category: "Voice AI",
    dates: "2025 — Present",
    role: "Builder",
    problem: "Inbound leads cool off when response takes hours instead of seconds.",
    intervention:
      "Shipped autonomous outbound/inbound voice agents with dossier context, campaign workers, and webhook ingestion.",
    outcome: "Sub-minute lead response target in production CRM flows.",
    outcomeStatus: "founder-reported",
    url: "https://enterprise.admeasy.in",
    repository: "",
    image: "/assets/case-voice.svg",
    stack: ["Twilio", "Vobiz", "Python", "LangGraph"],
    services: ["Voice AI"],
    featured: true,
  },
  {
    id: "product-coding-agent",
    name: "Product Coding Agent",
    client: "Admeasy Ai",
    category: "Developer AI",
    dates: "2025 — Present",
    role: "Builder",
    problem: "Founders need code shipped without hiring a full product team overnight.",
    intervention:
      "E2B sandbox execution, Anthropic tool loops, NDJSON streaming, and optional GitHub PR creation.",
    outcome: "Live coding agent with Monaco editor and task persistence in Supabase.",
    outcomeStatus: "founder-reported",
    url: "https://enterprise.admeasy.in",
    repository: "",
    image: "/assets/case-coding-agent.svg",
    stack: ["E2B", "Anthropic", "Monaco", "Supabase"],
    services: ["Product AI"],
    featured: true,
  },
  {
    id: "mcp-hub",
    name: "MCP Connector Hub",
    client: "Admeasy Ai",
    category: "Integrations",
    dates: "2025 — Present",
    role: "Architect",
    problem: "AI agents are useless if they cannot act across the tools a team already uses.",
    intervention:
      "Hosted MCP server, Composio connectors, and workspace-scoped tool registry for external agents.",
    outcome: "Streamable HTTP MCP endpoint for Cursor, Claude, and custom clients.",
    outcomeStatus: "founder-reported",
    url: "https://api-enterprise.admeasy.in/mcp/v1/",
    repository: "",
    image: "/assets/case-mcp.svg",
    stack: ["MCP", "FastAPI", "Composio"],
    services: ["Integrations"],
    featured: false,
  },
  {
    id: "portfolio-os",
    name: "Personal AI OS Portfolio",
    client: "Self",
    category: "Portfolio",
    dates: "2026",
    role: "Designer & Builder",
    problem: "Conventional portfolios fail to show how a systems builder actually thinks.",
    intervention:
      "Built an interactive desktop OS with apps, proof vault, journey, and contact flows in Next.js.",
    outcome: "This site — a living proof of product taste and execution.",
    outcomeStatus: "founder-reported",
    url: "https://github.com/aadeshadmeasy/portfolio",
    repository: "https://github.com/aadeshadmeasy/portfolio",
    image: "/assets/case-portfolio.svg",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    services: ["Product", "Design"],
    featured: false,
  },
];

export const clientCases: ClientCase[] = [
  {
    id: "beta-cohort",
    client: "Founding beta teams",
    challenge: "Five-person startups need enterprise-grade operational loops without enterprise headcount.",
    delivered: "Four-department agentic OS with voice, connectors, and accountable task execution.",
    metric: "10-team founding cohort",
    metricStatus: "illustrative",
    narrative:
      "Early teams use Admeasy Ai to run marketing digests, lead calling, task accountability, and product agents from one workspace.",
    image: "/assets/case-admeasy-ai.svg",
    url: "https://enterprise.admeasy.in",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "vision-demo",
    title: "Why agentic AI matters for founders",
    client: "Product vision",
    duration: "2:00",
    embedUrl: "",
    thumbnail: "/assets/avatar-hero.png",
    context:
      "Illustrative placeholder — replace with approved client testimonial embed before launch.",
    externalUrl: "https://enterprise.admeasy.in",
  },
];

export const journey: JourneyMilestone[] = [
  {
    year: "2019",
    title: "Founded Admeasy.in",
    story: "Started in college admissions — learned distribution, trust, and operational grind firsthand.",
    skill: "Consumer product & growth",
    projectId: "admeasy-in",
  },
  {
    year: "2023",
    title: "Operator ceiling",
    story:
      "Realized hiring alone cannot fix founder exhaustion — the gap is operational capacity, not talent.",
    skill: "Systems thinking",
  },
  {
    year: "2024",
    title: "Pivot to Admeasy Ai",
    story:
      "Registered Admeasy Admission Solutions Pvt Ltd and began building an agentic AI workforce OS.",
    skill: "Agentic architecture",
    projectId: "admeasy-ai",
  },
  {
    year: "2025",
    title: "Voice + Product agents ship",
    story: "Calling engine, coding agent, and MCP hub moved from slides to production infrastructure.",
    skill: "Execution at depth",
    projectId: "voice-calling-engine",
  },
  {
    year: "2026",
    title: "Founding cohort & public proof",
    story: "Opened beta for lean teams; this portfolio OS documents the builder behind the product.",
    skill: "Proof-driven storytelling",
    projectId: "portfolio-os",
  },
];

export const socials: SocialLink[] = [
  {
    network: "GitHub",
    handle: "@aadeshadmeasy",
    metric: "Open source & product builds",
    purpose: "Code, experiments, and portfolio",
    url: "https://github.com/aadeshadmeasy",
    status: "active",
  },
  {
    network: "Product",
    handle: "enterprise.admeasy.in",
    metric: "Admeasy Ai workspace",
    purpose: "Agentic AI platform",
    url: "https://enterprise.admeasy.in",
    status: "active",
  },
  {
    network: "Previous startup",
    handle: "admeasy.in",
    metric: "Admissions platform",
    purpose: "Founder history & brand continuity",
    url: "https://admeasy.in",
    status: "active",
  },
];

export const articles: Article[] = [
  {
    slug: "agentic-ai-for-founders",
    title: "Why founders need an agentic operating system, not another dashboard",
    description:
      "Aadesh Panwar on closing the operational capacity gap for five-person startups.",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
  },
  {
    slug: "voice-ai-lead-response",
    title: "Sixty-second lead response changes the economics of inside sales",
    description:
      "How voice agents and dossier context compress time-to-first-conversation.",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-13",
  },
];

export const founderTxt = `WHO I AM
Aadesh Panwar — founder and CEO of Admeasy Ai (Admeasy Admission Solutions Pvt Ltd).
Previously built and led Admeasy.in in college admissions.

WHAT I BUILD
Agentic operating systems: marketing, CRM, HR, and product departments that execute — not just suggest.

WHY I CARE
A five-person startup should ship like a hundred-person company. The gap is not talent. It is operational capacity.

HOW I WORK
Find leverage → lock the system → build the sharp edge → integrate the workflow → prove and hand off.

EXPLORING
MCP-native tool ecosystems, voice-first CRM, and compounding workspace memory for lean teams.

WHO I WANT TO WORK WITH
Founders, operators, and teams ready to replace manual loops with accountable AI systems.

NON-NEGOTIABLES
Honest proof. No fake metrics. No vanity dashboards. Systems that actually run.

CONTACT
team@admeasy.in · Book via the Calendar app`;

export const dailyMotivation = [
  "Never dream small — then build the system that makes the dream inevitable.",
  "Operational capacity beats headcount when agents remember and execute.",
  "A founder's job is leverage, not heroics.",
  "Proof beats pitch decks. Ship, measure, disclose.",
  "The sharp edge is the integration — not the slide.",
];

export const musicTracks = [
  {
    id: "focus-1",
    title: "Focus Loop",
    artist: "Aadesh OS · Demo Track",
    src: "",
    license: "Placeholder — add licensed tracks before launch",
  },
];

export const systemsLoop = [
  {
    step: "Find the leverage",
    purpose: "Identify the bottleneck worth automating.",
    owner: "Founder + operator workshop",
    client: "Share real workflows and failure points",
    artifact: "Leverage map",
    gate: "One loop with measurable before/after",
    failure: "Automating busywork that does not move revenue",
  },
  {
    step: "Lock the system",
    purpose: "Define inputs, outputs, and accountability.",
    owner: "Architecture + SOP design",
    client: "Approve scope and data boundaries",
    artifact: "System spec",
    gate: "Signed-off workflow diagram",
    failure: "Fuzzy ownership between human and agent",
  },
  {
    step: "Build the sharp edge",
    purpose: "Ship the minimum agent that executes.",
    owner: "Engineering + agent design",
    client: "UAT on real data samples",
    artifact: "Working agent",
    gate: "Successful end-to-end run",
    failure: "Demo-only paths that break in production",
  },
  {
    step: "Integrate the workflow",
    purpose: "Wire tools, webhooks, and human handoffs.",
    owner: "Integrations + MCP connectors",
    client: "Provide API access and test accounts",
    artifact: "Connected workspace",
    gate: "Live traffic on one production loop",
    failure: "Twelve SaaS tools that still do not talk",
  },
  {
    step: "Prove and hand off",
    purpose: "Measure, disclose, and train the team.",
    owner: "Reporting + documentation",
    client: "Review metrics and runbooks",
    artifact: "Proof pack",
    gate: "Client-reported or verified outcome logged",
    failure: "Shipping without a disclosure label",
  },
];
