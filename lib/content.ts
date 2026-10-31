/**
 * Single source of truth. Every claim is linked to a proof.
 * Strings starting with "[" are unvalidated placeholders: the UI never renders them
 * (see `real()`), so nothing unverified is shown as a fact or a metric.
 * Ask My AI answers ONLY from this file.
 */

export const real = (s?: string | null): s is string => !!s && !s.trim().startsWith("[");

export const profile = {
  name: "Yassine Aqejjaj",
  github: "https://github.com/yassineaqejjaj",
  githubUser: "yassineaqejjaj",
  linkedin: "https://www.linkedin.com/in/yassine-aqejjaj/",
  email: "yassine.aqejjaj@devoteam.com",
  cv: "/cv",
};

export const bio = {
  headline: "Leading AI at scale. Building it myself.",
  paragraphs: [
    "I'm an AI leader with 13 years of experience building AI products, shaping enterprise AI operating models and leading cross-functional delivery across defence, public services, retail and financial services. Since 2023 I head the AI Factory at Devoteam, where internal platform development, client delivery and workforce enablement come together.",
    "I started in digital banking in Casablanca, then moved to Paris to work on AI products at Carrefour, Fujitsu and AXA. Along the way I trained in machine learning at Stanford and in AI product management at Duke. Today I lead the NOVA Suite, our agentic platform used by 3,000+ people, and I've trained 1,500+ professionals in generative AI, agentic AI and RAG.",
    "I also build on my own: TrustRail, MedGuard AI, M3aya Santé and the TRAIL Academy learning platform I founded. I share what I learn in four books and on stage, including Google Cloud Summit and AICamp. I focus on agentic AI, responsible deployment and measurable business adoption.",
  ],
  facts: ["Paris, France", "French · Arabic · English", "AI Champion, Devoteam 2024–2026", "Founder, TRAIL Academy"],
};

export type Lens = "lead" | "product" | "tech";
export const LENSES: { id: "all" | Lens; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lead", label: "Leadership" },
  { id: "product", label: "AI Product" },
  { id: "tech", label: "Technical" },
];
export const LENS_TAG: Record<Lens, string> = { lead: "LEADERSHIP", product: "AI PRODUCT", tech: "TECHNICAL" };

export const roles = [
  {
    period: "Aug 2023 – Present", title: "Head of AI Factory", org: "Devoteam", place: "Paris", logo: "devoteam",
    summary: "Directs a portfolio combining AI platform products, applied AI engagements and training initiatives, and leads the AI Factory's agentic platform suite.",
    impact: "€12M+ commercial pipeline · 3,000+ NOVA users across 10,000+ consultants in 25 countries · 1,500+ professionals trained.",
    tags: ["AI Factory", "Agentic AI", "Operating model", "Team leadership", "RAG", "Evaluation"],
    bullets: [
      { lens: "lead", text: "Directed the AI Factory portfolio: platform products, applied AI engagements and training; contributed to a €12M+ commercial pipeline." },
      { lens: "lead", text: "Led a 15-person cross-functional team building NOVA Suite; created LEAP, the internal AI learning programme, with a 5-person team." },
      { lens: "product", text: "NOVA Suite: Nova Agents (agentic application orchestration), Nova Context (targeted context retrieval), Nova Evals / FORGE (evaluation and regression testing)." },
      { lens: "product", text: "Prompt Arena: hands-on prompting practice and skill development through applied exercises." },
      { lens: "tech", text: "Selected engagements on LLMs, RAG, knowledge graphs and multi-agent patterns for enterprise and public-sector clients." },
    ],
  },
  {
    period: "Jan 2023 – Jul 2023", title: "AI Product Lead", org: "AXA", place: "Paris", logo: "axa",
    summary: "Led AI product and delivery coordination in a regulated risk-management environment.",
    impact: "",
    tags: ["AI product", "Regulated environment", "Governance", "Cloud"],
    bullets: [
      { lens: "lead", text: "Coordinated architecture, security, data privacy and compliance stakeholders." },
      { lens: "product", text: "Led AI product and delivery coordination in risk management." },
      { lens: "tech", text: "Supported platform modernisation and governance initiatives, including cloud services and analytics tooling." },
    ],
  },
  {
    period: "Sep 2020 – Dec 2022", title: "AI Lead Product Manager", org: "Fujitsu", place: "Paris", logo: "fujitsu",
    summary: "Owned the roadmap for computer-vision analytics products serving retail and industrial use cases, from prototype validation to customer delivery.",
    impact: "Contributed to the AVA Challenge entry (second place).",
    tags: ["Computer vision", "Product roadmap", "Retail", "Industry"],
    bullets: [
      { lens: "product", text: "Owned the product roadmap, from prototype validation to customer delivery." },
      { lens: "tech", text: "Contributed to the AVA Challenge entry (second place) and computer-vision work for complex security use cases." },
    ],
  },
  {
    period: "Nov 2018 – Aug 2020", title: "AI Product Manager", org: "Carrefour", place: "Paris", logo: "carrefour",
    summary: "Product management across cloud cost optimisation, Build-to-Cloud programmes and a voice-assistant MVP.",
    impact: "",
    tags: ["Cloud cost optimisation", "Build-to-Cloud", "Voice assistant"],
    bullets: [
      { lens: "product", text: "LEA: voice-assistant MVP for shopping lists and recommendations." },
      { lens: "tech", text: "Cloud cost optimisation (OPTIM) and Build-to-Cloud programmes." },
    ],
  },
  {
    period: "Dec 2013 – Oct 2018", title: "AI Product Manager", org: "Banque Populaire", place: "Casablanca, Morocco", logo: "banquepopulaire",
    summary: "Contributed to digital banking and AI initiatives.",
    impact: "",
    tags: ["Digital banking", "Chatbots", "Biometrics", "Onboarding"],
    bullets: [
      { lens: "product", text: "Pocket Bank, biometric experiences, chatbot pilots and digital onboarding." },
    ],
  },
] as { period: string; title: string; org: string; place: string; logo: string; summary: string; impact: string; tags: string[]; bullets: { lens: Lens; text: string }[] }[];

export type Step = { label: string; body: string; points: string[]; stats?: { value: string; label: string }[] };
export const STEP_LABELS = ["Context", "Problem", "My role", "Approach", "Solution", "Impact", "Lessons learned"];

export const clients = [
  {
    slug: "thales-data-ai-operating-model", client: "Thales", logo: "thales", sector: "DEFENCE & ENGINEERING",
    title: "Building an AI-Ready Engineering Organization", year: "2026", org: "Thales",
    role: "Head of Data & AI | Organizational Transformation & AI Strategy",
    summary: "From fragmented engineering knowledge to scalable AI capabilities.",
    impact: "", tags: ["AI strategy", "Operating model", "RAG"], sensitive: true,
    focus: "Data & AI leadership",
    steps: [
      { label: "The challenge", body: "In complex defence engineering environments, technical knowledge is distributed across thousands of documents, specifications, requirements, architectural designs and validation reports. Understanding the impact of a change requires connecting information across multiple systems and engineering disciplines.\n\nAt the same time, successfully introducing AI requires more than deploying new technology. It demands new skills, delivery practices, governance and collaboration between Data, AI, IT and engineering teams.", points: [] },
      { label: "My contribution", body: "I led the definition of a Data & AI Target Operating Model designed to align technical capabilities with engineering needs and accelerate AI adoption, heading a 5-person engagement.", points: [] },
      { label: "The approach", body: "", points: [
        "AI Operating Model: Design a six-month transformation roadmap covering organizational structure, competencies, delivery practices and governance.",
        "Cross-functional squads: Structure multidisciplinary teams combining Data Scientists, Data Analysts, Data Engineers, RPA Engineers and business experts.",
        "Engineering Knowledge Assistant: Define an advanced RAG solution to connect engineering documents, retrieve technical knowledge, support requirement traceability and facilitate impact analysis.",
        "AI capability building: Establish learning paths covering Python, APIs, LLMs, RAG, agentic workflows, evaluation and production practices.",
        "[REVIEW] Enterprise ecosystem: Align the technical strategy with the organization's cloud and data ecosystem.",
      ] },
      { label: "Expected impact", body: "The initiative aims to establish a repeatable AI delivery model, strengthen internal autonomy, reduce the effort required to access technical knowledge and create a foundation for future engineering AI applications.", points: [], stats: [{ value: "2", label: "AI use cases supporting the transformation roadmap" }, { value: "6 months", label: "Structured capability-building plan" }] },
      { label: "What I learned", body: "AI transformation starts with people, processes and ownership. Technology delivers value when the organization is equipped to use it.", points: [] },
    ] as Step[],
  },
  {
    slug: "dila-sovereign-ai", client: "DILA · Services du Premier ministre", logo: "pmoffice", sector: "PUBLIC SECTOR",
    title: "Designing a Sovereign Generative AI Platform for Public Administration", year: "2026", org: "DILA, Services du Premier ministre",
    role: "AI Product & Delivery Leadership | Sovereign GenAI (9-person team)",
    summary: "Making institutional knowledge accessible through secure, governed and trustworthy AI.",
    impact: "70% faster content creation.", tags: ["Sovereign AI", "RAG", "Governance"], sensitive: true,
    focus: "Sovereign AI",
    steps: [
      { label: "The challenge", body: "Public institutions manage large volumes of legal, regulatory, administrative and operational knowledge. Making this information accessible through generative AI introduces several critical requirements: confidentiality, data sovereignty, accuracy, traceability and control over AI-generated answers.\n\nConventional AI assistants are not sufficient when organizations need to guarantee where information comes from, who can access it and how answers are produced.", points: [] },
      { label: "My contribution", body: "I led a 9-person team on the product and delivery strategy of a sovereign AI platform, bridging institutional requirements, technical architecture and implementation priorities.", points: [] },
      { label: "The approach", body: "", points: [
        "Sovereign AI architecture: Define a platform approach compatible with strict hosting, security and data-sovereignty requirements, including SecNumCloud considerations.",
        "Advanced RAG: Structure retrieval pipelines to ground AI responses in authoritative institutional documents.",
        "[REVIEW] LLM strategy: Integrate Mistral-based generative AI capabilities into the target architecture.",
        "Trust & governance: Address access controls, information provenance, traceability and responsible AI practices.",
        "Product delivery: Translate complex regulatory and technical constraints into prioritized capabilities and actionable delivery plans.",
        "Evaluation: Incorporate requirements for factual accuracy, relevance and reliability into the solution design.",
      ] },
      { label: "Impact", body: "A foundation for trusted public-sector GenAI. The work supported the design and delivery of an AI platform aligned with public-sector requirements, with particular attention to sovereignty, knowledge retrieval, security and answer traceability.\n\nThe mission illustrates how generative AI can be introduced into highly regulated environments without treating security and governance as secondary concerns.", points: [], stats: [{ value: "70%", label: "Faster content creation" }] },
      { label: "What I learned", body: "In regulated environments, trust is a product requirement, not an optional technical feature.", points: [] },
    ] as Step[],
  },
  {
    slug: "decathlon-ai-transformation", client: "Decathlon", logo: "decathlon", sector: "RETAIL & SPORTS",
    title: "Turning Retail Data into Intelligent Store Operations", year: "2024–2025", org: "Decathlon",
    role: "AI Product Leadership | Data & AI Transformation (13-person team)",
    summary: "Connecting computer vision, data products and generative AI to improve retail decision-making.",
    impact: "2.6× productivity gains from augmented teams.", tags: ["Computer vision", "GenAI", "Analytics"], sensitive: false,
    focus: "Computer vision · GenAI · Analytics",
    steps: [
      { label: "The challenge", body: "Large retail operations generate massive amounts of data across inventory, store operations, product availability, merchandising and customer interactions. Despite this volume, information often remains fragmented across systems and teams.\n\nStore managers need actionable insights, not additional dashboards. Operational teams need to detect stock discrepancies, understand their causes and take timely action. The opportunity was to combine traditional analytics with computer vision and generative AI to make store operations more intelligent.", points: [] },
      { label: "My contribution", body: "I led and coordinated AI product initiatives within a €4M AI transformation programme, connecting business needs, engineering capabilities and delivery teams, with a 13-person team.", points: [] },
      { label: "The approach", body: "", points: [
        "Full Monitored Store: Develop computer vision use cases to monitor store operations and identify relevant events or anomalies through visual data.",
        "Manager Companion: Introduce AI-assisted experiences that help store managers access operational information and make informed decisions.",
        "Stock Discrepancy Intelligence: Use data analysis to identify inventory discrepancies, improve visibility and support operational investigations.",
        "Knowledge Graph & LLM Comparator: Investigate structured knowledge relationships and language-model comparison approaches to improve information access and AI solution choices.",
      ] },
      { label: "Impact", body: "The initiatives contributed to a broader approach to intelligent retail operations, combining several complementary capabilities: greater visibility into store operations and inventory discrepancies, improved access to contextual information for operational teams, a foundation for AI-assisted decision-making at store level and stronger alignment between business workflows, analytics and AI products.", points: [], stats: [{ value: "2.6×", label: "Productivity gains from augmented teams" }, { value: "€4M", label: "AI transformation programme" }] },
      { label: "What I learned", body: "The value of retail AI comes from connecting intelligence directly to operational decisions, not from building isolated models.", points: [] },
    ] as Step[],
  },
  {
    slug: "carrefour-ml-mlops", client: "Carrefour", logo: "carrefour", sector: "RETAIL & SUPPLY CHAIN",
    title: "Scaling Data & AI Products Across Retail Supply Chains", year: "2023–2024", org: "Carrefour",
    role: "AI Product & Analytics Leadership | Supply Chain Optimization (10-person team)",
    summary: "Transforming supply-chain complexity into measurable operational performance.",
    impact: "Reported fill rate up from 65% to 78% (+13 points).", tags: ["Predictive analytics", "Supply chain", "AI product"], sensitive: false,
    focus: "Predictive analytics · AI product management",
    steps: [
      { label: "The challenge", body: "At the scale of a major retail group, even small inefficiencies in supply-chain operations can generate significant operational costs. Demand forecasting, product availability, pallet optimization and inventory management require coordination between large datasets, complex business rules and operational systems.\n\nThe challenge was to turn analytical capabilities into reliable, reusable products capable of delivering measurable improvements.", points: [] },
      { label: "My contribution", body: "I drove AI and analytics initiatives within the Analytics Factory, translating supply-chain requirements into product roadmaps and coordinating delivery across business and technical teams, as lead of a 10-person ML/MLOps engagement.", points: [] },
      { label: "The approach", body: "", points: [
        "One Demand: Develop demand-related analytics capabilities to support forecasting and supply-chain decision-making.",
        "Max Hauteur Palette: Work on pallet-height optimization to improve logistics operations and the use of transport and storage capacity.",
        "Analytics Factory: Structure the delivery of reusable data products and accelerate collaboration across business and engineering teams.",
        "Product leadership: Prioritize use cases through their business value, operational feasibility and expected outcomes.",
        "Continuous improvement: Use operational indicators to guide product iterations and measure value creation.",
      ] },
      { label: "Business impact", body: "Improvement in the reported operational fill-rate indicator, associated with the supply-chain initiatives. This work demonstrated how AI product management can connect analytical systems to measurable operational outcomes at enterprise scale.", points: [], stats: [{ value: "65% → 78%", label: "Reported fill rate, +13 percentage points" }] },
      { label: "What I learned", body: "Successful AI products are measured by the business indicators they improve, not by the complexity of their algorithms.", points: [] },
    ] as Step[],
  },
];

const GH = profile.github;
export const products = [
  { name: "NOVA Suite", category: "AGENTIC", status: "3,000+ users", desc: "The AI Factory's agentic platform suite: Nova Agents orchestrate applications, Nova Context retrieves targeted context, Nova Evals / FORGE test and evaluate.", stack: "15-person team", url: GH + "/NOVA", cta: "GitHub" },
  { name: "Nova Context", category: "AGENTIC", status: "Active", desc: "Governed context and memory engine for AI agents and multi-agent workflows.", stack: "Python", url: GH + "/ORBIT", cta: "GitHub" },
  { name: "Nova Evals · FORGE", category: "AGENTIC", status: "Active", desc: "Evaluation and regression testing: benchmarks and improves agents.", stack: "Python", url: GH + "/FORGE", cta: "GitHub" },
  { name: "TrustRail", category: "AGENTIC", status: "2026", desc: "AI-agent control gateway: limits, delegation, human approval and signed receipts, with TS/Python SDKs and an MCP adapter.", stack: "TypeScript · Python", url: "https://trustrail-mu.vercel.app", cta: "Live" },
  { name: "TRAIL Academy", category: "EDUCATION", status: "Founder", desc: "E-learning platform for professionals: 18 practice-oriented modules (70% hands-on) on generative AI, agentic AI, RAG, context engineering and AI leadership.", stack: "trailacademy.fr", url: "https://trailacademy.fr", cta: "Visit" },
  { name: "LEAP", category: "EDUCATION", status: "1,500+ trained", desc: "Internal AI learning programme in GenAI, agentic AI, RAG and AI strategy, led with a 5-person team.", stack: "Devoteam", url: "#expertise", cta: "Proof" },
  { name: "M3aya Santé", category: "HEALTH", status: "2026", desc: "Patient-journey coordination platform for healthcare facilities in Morocco (FR/AR): 9 integrated care pathways, AI agents under human supervision.", stack: "Web", url: "https://carepilot-maroc.vercel.app", cta: "Live" },
  { name: "MedGuard AI", category: "HEALTH", status: "Open source", desc: "Healthcare AI evaluation and QA platform: test campaigns, local LLM judge, human review, release gating and audit trails.", stack: "Open source", url: GH + "/medguard-ai", cta: "GitHub" },
  { name: "SimuLearn", category: "HEALTH", status: "MVP", desc: "Healthcare training MVP with human-in-the-loop agents, RAG and voice simulation.", stack: "", url: GH, cta: "GitHub" },
  { name: "ClassMind", category: "EDUCATION", status: "MVP", desc: "Education MVP with human-in-the-loop agents and RAG.", stack: "", url: GH, cta: "GitHub" },
  { name: "Fencing Intelligence", category: "SPORT", status: "Beta", desc: "Usable beta built from architecture through deployment with AI-assisted coding: video analysis for épée, foil and sabre.", stack: "Python", url: GH + "/fencing-intelligence", cta: "GitHub" },
  { name: "Prompt Arena", category: "EDUCATION", status: "AI Factory", desc: "Hands-on prompting practice, experimentation and skill development through applied exercises.", stack: "Devoteam", url: "#expertise", cta: "Proof" },
];
export const FILTERS: { id: string; label: string }[] = [
  { id: "All", label: "All" }, { id: "AGENTIC", label: "Agentic AI" }, { id: "HEALTH", label: "HealthTech" },
  { id: "EDUCATION", label: "Education" }, { id: "SPORT", label: "Sport & data" },
];

export const proof: Record<string, { kind: string; label: string }[]> = {
  "AI Strategy": [{ kind: "ROLE", label: "Head of AI Factory, Devoteam" }, { kind: "MISSION", label: "Thales: Data & AI operating model" }, { kind: "BOOK", label: "Leading with AI" }],
  "Operating Model": [{ kind: "MISSION", label: "Thales LAS OME" }, { kind: "ROLE", label: "AI Factory set-up" }, { kind: "ROLE", label: "Fujitsu AI CoE" }],
  Governance: [{ kind: "PRODUCT", label: "Nova Evals / FORGE: governance & evaluation" }, { kind: "PRODUCT", label: "Nova Context: governed context" }, { kind: "MISSION", label: "Thales: Data & AI governance" }],
  Transformation: [{ kind: "TEACHING", label: "1,500+ people trained" }, { kind: "PRODUCT", label: "TRAIL Academy" }, { kind: "BOOK", label: "Symbiose" }],
  "AI Products": [{ kind: "MISSION", label: "Decathlon: intelligent retail" }, { kind: "MISSION", label: "Carrefour: retail analytics" }, { kind: "ROLE", label: "AI Product Manager, Devoteam" }],
  Teams: [{ kind: "ROLE", label: "AI Factory teams" }, { kind: "ROLE", label: "Lead of AI, Devoteam" }, { kind: "TEACHING", label: "Teams into builders" }],
  MLOps: [{ kind: "MISSION", label: "Carrefour: forecasting in production" }, { kind: "PRODUCT", label: "Nova Evals / FORGE: regression testing" }],
  "Enterprise Delivery": [{ kind: "MISSION", label: "Thales" }, { kind: "MISSION", label: "Decathlon" }, { kind: "MISSION", label: "Carrefour" }],
  "AI Agents": [{ kind: "PRODUCT", label: "NOVA: multi-agent orchestration" }, { kind: "PRODUCT", label: "NOVA Suite: Nova Agents" }, { kind: "PRODUCT", label: "CarePilot" }],
  RAG: [{ kind: "MISSION", label: "Thales: engineering assistants" }, { kind: "PRODUCT", label: "Nova Context: context engine" }, { kind: "PRODUCT", label: "Ask My AI (this site)" }],
  "Context Engineering": [{ kind: "PRODUCT", label: "Nova Context" }, { kind: "PRODUCT", label: "NOVA memory" }],
  Evaluation: [{ kind: "PRODUCT", label: "Nova Evals / FORGE" }, { kind: "PRODUCT", label: "MedGuard AI" }],
};
export const pillars = [
  { name: "Lead", line: "Vision, organisation, value", skills: ["AI Strategy", "Operating Model", "Governance", "Transformation"] },
  { name: "Deliver", line: "AI in production, at scale", skills: ["AI Products", "Teams", "MLOps", "Enterprise Delivery"] },
  { name: "Build", line: "Hands-on, shipped code", skills: ["AI Agents", "RAG", "Context Engineering", "Evaluation"] },
];

const AMZ = "https://www.amazon.fr/dp/";
export const books = [
  { short: "Symbiose", title: "Symbiose: La Collaboration Augmentée", theme: "Humans and AI working together.", url: AMZ + "B0G48PY7S5", cover: "#0B1020", coverSub: "#9AABD6" },
  { short: "Leading with AI", title: "Leading with AI: The Blueprint for AI-Enhanced Healthcare", theme: "AI leadership in healthcare.", url: AMZ + "B0CVB848M6", cover: "#2A45B0", coverSub: "#C9D4FF" },
  { short: "Artificial Candidate", title: "The Artificial Candidate: Generative AI and the Future of US Election", theme: "GenAI and democracy.", url: AMZ + "B0CN69XBKW", cover: "#18243A", coverSub: "#9AABD6" },
  { short: "Leading with AI", title: "Leading with AI: Embracing the Future of Education", theme: "AI leadership in education.", url: AMZ + "B0CN5PG7LT", cover: "#3B4660", coverSub: "#C3CCE3" },
];

export const stage = [
  { kind: "TALK", title: "Decathlon Digital & Devoteam - IA & Expérience Client en Magasin : l\u2019approche augmentée de Decathlon", source: "HUB Institute · Watch on YouTube", url: "https://www.youtube.com/watch?v=bRayefGqcsA&t=123s" },
  { kind: "PODCAST", title: "شنو كيوقع ملي واحد يقرر يبدل حياتو كاملة؟", source: "Podcast Wamda · Watch on YouTube", url: "https://youtu.be/6Ip6mfupjso" },
];

export const qa: { q: string; a: string; aud?: string; sources: { label: string; href: string }[] }[] = [
  { q: "What enterprise AI programmes has he led?", aud: "Recruiter",
    a: "Yassine has been Head of AI Factory at Devoteam since August 2023. Engagements he led include an AI operating model for Thales (5 people), a sovereign generative AI platform for DILA, the services of the Prime Minister (9 people, 70% faster content creation), a €4M AI transformation programme at Decathlon (13 people, 2.6× productivity gains from augmented teams) and an ML/MLOps engagement at Carrefour (10 people).",
    sources: [{ label: "Experience", href: "#experience" }, { label: "Client Work", href: "#client-work" }] },
  { q: "Show his agentic AI products", aud: "Builder",
    a: "NOVA Suite is the AI Factory's agentic platform, built by a 15-person team and used by 3,000+ people across 10,000+ consultants in 25 countries: Nova Agents orchestrate applications, Nova Context retrieves targeted context and Nova Evals / FORGE evaluate results. He also built TrustRail, an AI-agent control gateway, and MedGuard AI, an open-source healthcare AI evaluation platform.",
    sources: [{ label: "AI Lab", href: "#ai-lab" }, { label: "GitHub", href: GH }] },
  { q: "What makes his profile suitable for a VP AI role?", aud: "Recruiter",
    a: "Three proofs in one profile: he sets AI strategy and operating models, delivers AI in production for large enterprises, and builds agentic platforms himself. 13 years of experience, a €12M+ commercial pipeline, 3,000+ NOVA users and 1,500+ professionals trained.",
    sources: [{ label: "Expertise", href: "#expertise" }, { label: "Experience", href: "#experience" }] },
  { q: "Which client results can he share?", aud: "Client",
    a: "Public figures from his CV: 2.6× productivity gains from augmented teams on a €4M AI transformation programme at Decathlon, and 70% faster content creation on a sovereign AI platform for DILA, the services of the Prime Minister. Other results are shared on request, with client approval.",
    sources: [{ label: "Client Work", href: "#client-work" }] },
  { q: "What has he built himself?", aud: "Builder",
    a: "NOVA Suite (Nova Agents, Nova Context, Nova Evals / FORGE), TrustRail (an AI-agent control gateway), MedGuard AI (an open-source healthcare AI evaluation platform), M3aya Santé (a patient-journey platform for healthcare facilities in Morocco) and the TRAIL Academy learning platform he founded.",
    sources: [{ label: "AI Lab", href: "#ai-lab" }, { label: "GitHub", href: GH }] },
  { q: "What has he written?",
    a: "Four books: Symbiose on human–AI collaboration, Leading with AI on healthcare and on education, and The Artificial Candidate on generative AI and US elections.",
    sources: [{ label: "Insights", href: "#insights" }] },
];
