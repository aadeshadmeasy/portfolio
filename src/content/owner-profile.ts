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
    portrait: "/assets/sprite-aadesh.png",
    sprite: "/assets/sprite-aadesh.png",
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
    primaryLabel: "Open Projects",
    primaryUrl: "#projects",
    secondaryLabel: "Email Aadesh",
    secondaryUrl: "mailto:aadesh.panwar@admeasy.in",
    bookingUrl:
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL ||
      process.env.NEXT_PUBLIC_BOOKING_URL ||
      "",
    whatsappUrl: "",
    email: "aadesh.panwar@admeasy.in",
    linkedin: "https://www.linkedin.com/in/aadesh-panwar/",
    emergencyLabel: "Email Aadesh for urgent business implementation",
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
    year: "2023",
    title: "Class 12 — 96% CBSE Commerce",
    story: "Scored 96% in 12th CBSE from Indore. Opted for rechecking on 94.6%. Sports & commerce foundations.",
    skill: "Discipline & academics",
  },
  {
    year: "2025",
    title: "Mesa School — converted final offer",
    story: "Completed all steps in Mesa School of Business undergrad startup program and received final offer.",
    skill: "Startup building",
  },
  {
    year: "2025",
    title: "SRCC — Asia's No. 1 Commerce College",
    story: "B.Com (Hons) at Shri Ram College of Commerce, University of Delhi. Proud SRCC admit.",
    skill: "Business & law foundations",
  },
  {
    year: "2025",
    title: "Founded Admeasy™",
    story: "Co-Founder & CEO — LinkedIn for school students. Built team, distribution, and product in Indore/Delhi.",
    skill: "Consumer product & growth",
    projectId: "admeasy-in",
  },
  {
    year: "2026",
    title: "Indian Startup School cohort",
    story: "Full-time startup cohort member in Gurugram. Time well spent.",
    skill: "Founder network",
  },
  {
    year: "2026",
    title: "Stealth AI Startup · DPIIT recognised",
    story: "Co-Founder of deep-tech AI startup recognised & approved by Indian Govt. (DPIIT).",
    skill: "Agentic AI architecture",
    projectId: "admeasy-ai",
  },
  {
    year: "2026",
    title: "Srushti Startup Cohort 26'",
    story: "Part-time cohort member at Srushti Degree College, Bengaluru. Got initial funds.",
    skill: "Fundraising",
  },
];

export const socials: SocialLink[] = [
  {
    network: "LinkedIn",
    handle: "aadesh-panwar",
    metric: "Primary profile",
    purpose: "Experience, education, honors & press",
    url: "https://www.linkedin.com/in/aadesh-panwar/",
    status: "active",
  },
  {
    network: "GitHub",
    handle: "@aadeshadmeasy",
    metric: "Code & experiments",
    purpose: "Open source & product builds",
    url: "https://github.com/aadeshadmeasy",
    status: "active",
  },
  {
    network: "Admeasy Ai",
    handle: "enterprise.admeasy.in",
    metric: "Agentic AI platform",
    purpose: "Product workspace",
    url: "https://enterprise.admeasy.in",
    status: "active",
  },
  {
    network: "Admeasy.in",
    handle: "admeasy.in",
    metric: "Previous startup",
    purpose: "Founder history",
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

export const founderTxt = `AADESH PANWAR — FOUNDER.TXT
═══════════════════════════════════════

WHO I AM
Stealth AI founder · Ex Co-Founder & CEO at Admeasy™
SRCC · ISS · MESA converted
As seen in multiple podcasts and articles.

WHAT I BUILD
Agentic AI operating systems — marketing, CRM, HR, and product
departments that execute, not just suggest.

EDUCATION
· B.Com (Hons) — Shri Ram College of Commerce (SRCC), 2025–2028
· Mesa School of Business — startup program, converted final offer
· 12th CBSE Commerce — 96%, Indore

EXPERIENCE
· Co-Founder — Stealth AI Startup (DPIIT recognised), 2026–present
· Co-Founder & CEO — Admeasy™ (LinkedIn for school students), 2025–2026

NEVER DREAM SMALL.

CONTACT
aadesh.panwar@admeasy.in
linkedin.com/in/aadesh-panwar

[ DEMO FILE — UPDATE IN FUTURE RELEASE ]`;

export const achievements = [
  { id: "nit-podcast", title: "Featured in NIT Jaipur Podcast", issuer: "E-Cell MNIT Jaipur", date: "Jan 2026", note: "Teenage Founder, Real Problems: The Admeasy Story" },
  { id: "h9-article", title: "Featured on H9 (BrandX Studio)", issuer: "featurewithhu9.in", date: "Nov 2025", note: "How a Class 12 Student Turned Exam Frustration into Admeasy" },
  { id: "diversified", title: "Featured in US Podcast", issuer: "DIVERSIFIED GAME", date: "Nov 2025", note: "Entrepreneurship journey interview" },
  { id: "foundervoice", title: "Foundervoice India feature", issuer: "Foundervoice India", date: "Oct 2025", note: "Admeasy founding team honoured" },
  { id: "cxowords", title: "CXOWords feature", issuer: "CXOWords", date: "Sep 2025", note: "LinkedIn Page feature" },
  { id: "ey-cert", title: "EY Technology Risk Simulation", issuer: "EY × Forage", date: "Feb 2026", note: "Professional Skepticism, Risk Analysis" },
  { id: "gs-cert", title: "Goldman Sachs Controllers Simulation", issuer: "Goldman Sachs × Forage", date: "Feb 2026", note: "Fund analysis, Financial Risk Management" },
  { id: "srushti", title: "Srushti Startup Cohort 26'", issuer: "Srushti Degree College", date: "Feb 2026", note: "Got initial funds" },
  { id: "iss", title: "Indian Startup School cohort", issuer: "ISS Gurugram", date: "Jan 2026", note: "Full-time startup cohort" },
];

export const learnVideos = [
  { id: "nit", title: "Teenage Founder, Real Problems: The Admeasy Story", channel: "E-cell MNIT Jaipur Podcast", url: "https://www.linkedin.com/in/aadesh-panwar/", type: "Podcast" },
  { id: "diversified", title: "Entrepreneurship Journey Interview", channel: "DIVERSIFIED GAME", url: "https://www.linkedin.com/in/aadesh-panwar/", type: "Podcast" },
  { id: "foundervoice", title: "The Story of the Admeasy Founding Team", channel: "Foundervoice India", url: "https://www.linkedin.com/in/aadesh-panwar/", type: "Video" },
  { id: "h9", title: "Class 12 to Admeasy — Feature Article", channel: "H9 BrandX Studio", url: "https://featurewithhu9.in/", type: "Article" },
];

export const dailyMotivation = [
  "BUILD THE THING YOU KEEP WISHING EXISTED.",
  "NEVER DREAM SMALL — THEN BUILD THE SYSTEM THAT MAKES IT INEVITABLE.",
  "OPERATIONAL CAPACITY BEATS HEADCOUNT WHEN AGENTS REMEMBER AND EXECUTE.",
  "PROOF BEATS PITCH DECKS. SHIP, MEASURE, DISCLOSE.",
  "A FOUNDER'S JOB IS LEVERAGE, NOT HEROICS.",
];

export const musicTracks = [
  {
    id: "chiptune-1",
    title: "Retro Drive",
    artist: "SoundHelix · Demo License",
    src: "/music/chiptune-loop.mp3",
    license: "SoundHelix demo track — replace with owned/licensed music before production",
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
