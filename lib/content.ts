/**
 * Single source of truth for the portfolio.
 * Principle: every claim is linked to a proof. Anything not yet validated by the
 * owner is flagged `validated: false` and is never shown as a metric.
 * Ask My AI answers ONLY from this file.
 */

export const profile = {
  name: "Yassine Aqejjaj",
  initials: "YA.",
  tagline: "I don't just lead AI. I build it.",
  roles: ["Head of AI", "Product Builder", "AI Strategist"],
  pitch:
    "From enterprise AI strategy to production-ready agentic systems. Turning ideas into products, teams into builders, and AI into measurable outcomes.",
  stats: [
    { value: "11+", label: "Years of experience" },
    { value: "1,500+", label: "People trained" },
    { value: "AI", label: "Strategy to delivery" },
  ],
  github: "https://github.com/yassineaqejjaj",
  githubUser: "yassineaqejjaj",
  linkedin: "https://www.linkedin.com/in/yassine-aqejjaj/",
  email: "yassine.aqejjaj@devoteam.com",
  cv: "/cv", // print-friendly page; swap for a designed /cv.pdf later
};

export type Pillar = "Lead" | "Deliver" | "Build";
export type Lens = "Leadership" | "AI Product" | "Technical";

export const experiences = [
  {
    id: "head-ai-factory",
    period: "2026 – Present",
    title: "Head of AI Factory",
    org: "Devoteam Creative Tech",
    summary: "Runs the AI Factory: turning AI strategy into repeatable delivery of production systems.",
    lenses: {
      Leadership: ["Defines the AI Factory operating model and delivery organisation", "Builds and coaches multi-disciplinary AI teams"],
      "AI Product": ["Owns the portfolio of AI offers and client-facing products", "Connects client needs to reusable assets"],
      Technical: ["Agentic systems, RAG and evaluation practices", "Industrialisation of AI delivery"],
    },
    tags: ["AI Strategy", "Operating Model", "Agentic AI", "Delivery"],
  },
  {
    id: "thales",
    period: "2026",
    title: "Head of Data & AI · Mission",
    org: "Thales LAS OME",
    summary: "Mission structuring Data & AI capabilities, upskilling and engineering-assistance use cases.",
    lenses: {
      Leadership: ["Structured the Data & AI operating model", "Skills programme for engineering teams"],
      "AI Product": ["Engineering-assistance use cases prioritised and framed"],
      Technical: ["RAG over engineering knowledge"],
    },
    tags: ["Data & AI", "RAG", "Organization"],
    sensitive: true,
  },
  {
    id: "lead-ai-pm",
    period: "2023 – 2026",
    title: "Lead of AI / AI Product Manager",
    org: "Devoteam Creative Tech",
    summary: "Led AI programmes and products for enterprise clients, from discovery to production.",
    lenses: {
      Leadership: ["Led client AI programmes and delivery teams", "Trained teams on AI practices"],
      "AI Product": ["Product management of AI solutions for retail and enterprise clients"],
      Technical: ["Computer vision, GenAI assistants, forecasting products"],
    },
    tags: ["AI Product", "GenAI", "Computer Vision", "Analytics"],
  },
  {
    id: "fujitsu",
    period: "2020 – 2022",
    title: "AI CoE Product Leader",
    org: "Fujitsu",
    summary: "Product leadership within an AI Center of Excellence.",
    lenses: {
      Leadership: ["Contributed to building the AI CoE practice"],
      "AI Product": ["Product leadership of AI offerings"],
      Technical: ["MLOps and AI delivery foundations"],
    },
    tags: ["AI CoE", "Product", "MLOps"],
  },
];

export const caseStudies = [
  {
    slug: "thales-data-ai-operating-model",
    client: "Thales",
    title: "Data & AI Operating Model",
    image: "Defense",
    summary:
      "Structuration des capacités Data & IA, montée en compétences et cas d'usage d'assistance à l'ingénierie.",
    tags: ["AI Strategy", "RAG", "Organization"],
    sensitive: true,
    validated: false,
    story: {
      context: "A large defense and technology group needed to structure its Data & AI capabilities across engineering teams.",
      problem: "Scattered initiatives, uneven skills, no shared operating model for AI.",
      role: "Head of Data & AI (mission).",
      approach: "Capability structuring, skills development, prioritisation of engineering-assistance use cases.",
      solution: "A Data & AI operating model and engineering-assistance use cases built on retrieval-augmented generation.",
      impact: null as string | null,
      lessons: null as string | null,
    },
  },
  {
    slug: "decathlon-intelligent-retail",
    client: "Decathlon",
    title: "Intelligent Retail",
    image: "Retail",
    summary:
      "Computer vision, assistants IA et produits de données pour améliorer les opérations en magasin.",
    tags: ["Computer Vision", "GenAI", "Data Products"],
    sensitive: false,
    validated: false,
    story: {
      context: "In-store operations offering room for AI-driven improvement.",
      problem: "Operational tasks relying on manual observation and fragmented data.",
      role: "AI Product / delivery lead.",
      approach: "Product discovery, computer vision and assistant prototypes, data products.",
      solution: "Computer vision, AI assistants and data products for store operations.",
      impact: null as string | null,
      lessons: null as string | null,
    },
  },
  {
    slug: "carrefour-retail-analytics",
    client: "Carrefour",
    title: "Retail Analytics",
    image: "Analytics",
    summary:
      "Optimisation des opérations, produits de prévision et amélioration de la disponibilité des produits.",
    tags: ["Analytics", "Forecasting", "AI Products"],
    sensitive: false,
    validated: false,
    story: {
      context: "Large-scale retail operations where product availability drives performance.",
      problem: "Availability and operational efficiency depending on forecasts and analytics.",
      role: "AI Product / delivery lead.",
      approach: "Analytics and forecasting products built with business teams.",
      solution: "Forecasting and analytics products to optimise operations and availability.",
      impact: null as string | null,
      lessons: null as string | null,
    },
  },
];

export const flagshipProjects = [
  {
    slug: "nova",
    name: "NOVA Suite",
    kind: "Agentic AI Platform",
    tags: ["Agents", "Context", "Evals"],
    flagship: true,
    pitch: "An agentic AI platform: agents, context engineering and evaluation working together.",
    repo: "nova",
    skills: ["agentic-ai", "context-engineering", "evaluation"],
  },
  {
    slug: "m3aya-sante",
    name: "M3aya Santé",
    kind: "Healthcare AI Platform",
    tags: ["Patient journey", "AI assistance"],
    flagship: false,
    pitch: "A healthcare AI platform supporting the patient journey with AI assistance.",
    repo: null,
    skills: ["agentic-ai", "product"],
  },
  {
    slug: "trail-academy",
    name: "TRAIL Academy",
    kind: "AI Education Platform",
    tags: ["Learning", "Upskilling", "Leadership"],
    flagship: false,
    pitch: "An AI education platform for learning, upskilling and leadership.",
    repo: "trustrail",
    skills: ["teaching", "product"],
  },
  {
    slug: "nova-evals",
    name: "Nova Evals",
    kind: "AI Quality & Evaluation",
    tags: ["Testing", "Metrics", "Improvement"],
    flagship: false,
    pitch: "Evaluation tooling: testing, metrics and continuous improvement of AI systems.",
    repo: null,
    skills: ["evaluation", "agentic-ai"],
  },
];

export const skills = [
  { id: "ai-strategy", pillar: "Lead" as Pillar, name: "AI Strategy", proof: ["Thales Data & AI Operating Model"], links: ["/work/thales-data-ai-operating-model"] },
  { id: "operating-model", pillar: "Lead" as Pillar, name: "Operating Model & Governance", proof: ["Head of AI Factory", "Thales mission"], links: ["/experience", "/work/thales-data-ai-operating-model"] },
  { id: "transformation", pillar: "Lead" as Pillar, name: "Transformation & Upskilling", proof: ["1,500+ people trained", "TRAIL Academy"], links: ["/insights", "/lab"] },
  { id: "product", pillar: "Deliver" as Pillar, name: "AI Product Management", proof: ["Lead of AI / AI Product Manager", "Decathlon", "Carrefour"], links: ["/experience", "/work/decathlon-intelligent-retail", "/work/carrefour-retail-analytics"] },
  { id: "delivery", pillar: "Deliver" as Pillar, name: "Enterprise Delivery & MLOps", proof: ["Fujitsu AI CoE", "Devoteam AI Factory"], links: ["/experience"] },
  { id: "agentic-ai", pillar: "Build" as Pillar, name: "Agentic AI", proof: ["NOVA Suite", "M3aya Santé"], links: ["/lab"] },
  { id: "context-engineering", pillar: "Build" as Pillar, name: "RAG & Context Engineering", proof: ["NOVA Suite", "Thales engineering assistance"], links: ["/lab", "/work/thales-data-ai-operating-model"] },
  { id: "evaluation", pillar: "Build" as Pillar, name: "Evaluation", proof: ["Nova Evals"], links: ["/lab"] },
];

export const books = [
  { title: "Symbiose : La Collaboration Augmentée", url: "https://www.amazon.fr/Symbiose-Collaboration-Augmentée-Yassine-Aqejjaj-ebook/dp/B0G48PY7S5", note: "Book on augmented human–AI collaboration and the future of work" },
  { title: "Leading with AI: Embracing the Future of Education", url: "https://www.amazon.fr/dp/B0CN5PG7LT", note: "AI leadership in education" },
  { title: "Leading with AI: The Blueprint for AI-Enhanced Healthcare", url: "https://www.amazon.fr/Leading-AI-Blueprint-AI-Enhanced-Healthcare/dp/B0CVB848M6", note: "AI leadership in healthcare" },
  { title: "The Artificial Candidate: Generative AI and the Future of US Election", url: "https://www.amazon.fr/Artificial-Candidate-Generative-Future-Election/dp/B0CN69XBKW", note: "Generative AI and the future of US elections" },
];

export const insights = {
  Ideas: books.map((b) => ({ title: b.title, desc: b.note, url: b.url, kind: "Book" })),
  "On Stage": [{ title: "Podcast appearance", desc: "Conversation on YouTube", url: "https://youtu.be/6Ip6mfupjso", kind: "Podcast" }],
  Teaching: [
    { title: "TRAIL Academy", desc: "AI education platform for upskilling and leadership", url: "/lab", kind: "Platform" },
    { title: "1,500+ people trained", desc: "AI training programmes", url: "/experience", kind: "Programme" },
  ],
};

export const roadmap = [
  { phase: "Phase 1 · Personal Brand", desc: "Home, interactive CV, experience, flagship projects, contact and PDF.", done: true },
  { phase: "Phase 2 · Portfolio", desc: "Client case studies, product pages, filters, GitHub sync and demos.", done: true },
  { phase: "Phase 3 · AI Experience", desc: "Ask My AI, skill-based search and project recommendations.", done: true },
];
