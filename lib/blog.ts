import type { Locale } from "./i18n";

/**
 * Blog articles. Figures come only from validated content: NOVA adoption and the DILA results already published on the case page.
 * Statements about the open-source projects (NOVA, ORBIT, FORGE...) follow their public READMEs, including their beta status.
 */
export type DiagramKind = "layers" | "steps" | "loop" | "compare";
export type Loc = {
  title: string;
  dek: string;
  sections: { h: string; p: string[] }[];
  take: string;
  diagram: { nodes: string[]; nodes2?: string[]; heads?: [string, string]; caption: string };
  results: { v: string; l: string }[];
};
export type Post = {
  slug: string;
  date: string; // ISO
  minutes: number;
  kind: DiagramKind;
  tags: string[];
  repos: { label: string; url: string }[];
  cases?: string[]; // case-study slugs
  en: Loc; fr: Loc; ar: Loc;
};

const GH = "https://github.com/yassineaqejjaj";

export const posts: Post[] = [
  {
    slug: "building-enterprise-agentic-platforms-nova",
    date: "2026-11-01", minutes: 5, kind: "layers", tags: ["Agentic AI", "Platform", "Governance"],
    repos: [{ label: "NOVA", url: `${GH}/NOVA` }, { label: "ORBIT", url: `${GH}/ORBIT` }, { label: "FORGE", url: `${GH}/FORGE` }],
    en: {
      title: "Building Enterprise Agentic Platforms: Lessons from NOVA",
      dek: "What changed when I stopped building an assistant and started building a team of agents that has to work inside a company.",
      sections: [
        { h: "One agent to talk to, specialists behind it", p: [
          "NOVA is organised in layers. A single orchestrator frames the request, plans, delegates to specialists, supervises the work and assembles the result. Behind it, specialist agents for product, project, design and engineering each master a domain and carry their own versioned skills.",
          "The user never chooses an agent. It sounds like a UX detail, but it is the main adoption decision: people do not want to learn an org chart of bots.",
        ] },
        { h: "Context is a product, not a prompt", p: [
          "Most failures I saw were not model failures. Agents cited a decision that had been replaced, or missed a constraint. So NOVA retrieves its context through ORBIT, as the user, with their permissions, and an answer can say why a source was included.",
          "Treating context as a governed layer made the platform easier to trust and to audit.",
        ] },
        { h: "Evaluation before scale", p: [
          "Each release is benchmarked and regression-tested with FORGE before it reaches more users. Lessons come back as versioned instructions, not as model training: nobody fine-tunes weights here.",
          "A platform used by hundreds of people cannot rely on someone’s impression that it seems better. The three projects are public betas, and I describe their design, not a production guarantee.",
        ] },
      ],
      take: "Enterprise agentic platforms are won on governance and context, not on model choice. If I started again, I would build the evaluation loop first and the agents second.",
      diagram: { nodes: ["You", "Orchestration", "Context · ORBIT", "Specialist agents", "Evaluation · FORGE"], caption: "NOVA acts, ORBIT knows, FORGE learns. Each evaluation feeds back into context and behaviour." },
      results: [{ v: "800", l: "employees use NOVA at Devoteam" }, { v: "15", l: "people in the cross-functional team" }, { v: "10,000+", l: "consultants in the group, in 25 countries" }, { v: "3", l: "bricks: act, know, learn" }],
    },
    fr: {
      title: "Construire des plateformes agentiques d’entreprise : les leçons de NOVA",
      dek: "Ce qui a changé quand j’ai cessé de construire un assistant pour construire une équipe d’agents qui doit travailler dans une entreprise.",
      sections: [
        { h: "Un agent à qui parler, des spécialistes derrière", p: [
          "NOVA est organisé en couches. Un orchestrateur unique cadre la demande, planifie, délègue aux spécialistes, supervise le travail et assemble le résultat. Derrière lui, des agents spécialisés en produit, projet, design et ingénierie maîtrisent chacun un domaine avec leurs compétences versionnées.",
          "L’utilisateur ne choisit jamais un agent. Cela ressemble à un détail d’ergonomie, mais c’est la principale décision d’adoption : personne ne veut apprendre l’organigramme d’une équipe de robots.",
        ] },
        { h: "Le contexte est un produit, pas un prompt", p: [
          "La plupart des échecs que j’ai vus n’étaient pas des échecs du modèle. Les agents citaient une décision remplacée ou ignoraient une contrainte. NOVA récupère donc son contexte via ORBIT, au nom de l’utilisateur et avec ses droits, et une réponse peut dire pourquoi une source a été retenue.",
          "Traiter le contexte comme une couche gouvernée rend la plateforme plus fiable et plus facile à auditer.",
        ] },
        { h: "L’évaluation avant le passage à l’échelle", p: [
          "Chaque version est évaluée et testée en non-régression avec FORGE avant d’atteindre plus d’utilisateurs. Les enseignements reviennent sous forme d’instructions versionnées, pas d’entraînement du modèle : personne ne fait de fine-tuning ici.",
          "Une plateforme utilisée par des centaines de personnes ne peut pas reposer sur l’impression que « ça semble mieux ». Les trois projets sont des bêtas publiques : je décris leur conception, pas une garantie de production.",
        ] },
      ],
      take: "Les plateformes agentiques d’entreprise se gagnent sur la gouvernance et le contexte, pas sur le choix du modèle. Si je recommençais, je construirais d’abord la boucle d’évaluation, ensuite les agents.",
      diagram: { nodes: ["Vous", "Orchestration", "Contexte · ORBIT", "Agents spécialistes", "Évaluation · FORGE"], caption: "NOVA agit, ORBIT sait, FORGE apprend. Chaque évaluation alimente le contexte et le comportement." },
      results: [{ v: "800", l: "collaborateurs utilisent NOVA chez Devoteam" }, { v: "15", l: "personnes dans l’équipe pluridisciplinaire" }, { v: "10 000+", l: "consultants dans le groupe, dans 25 pays" }, { v: "3", l: "briques : agir, savoir, apprendre" }],
    },
    ar: {
      title: "بناء منصات وكيلة للمؤسسات: دروس من NOVA",
      dek: "ما الذي تغيّر حين توقفت عن بناء مساعد وبدأت ببناء فريق من الوكلاء يجب أن يعمل داخل شركة.",
      sections: [
        { h: "وكيل واحد تتحدث إليه ومتخصصون خلفه", p: [
          "تنتظم NOVA في طبقات. منسّق واحد يؤطّر الطلب ويخطط ويفوّض المتخصصين ويشرف على العمل ثم يجمع النتيجة. وخلفه وكلاء متخصصون في المنتج والمشروع والتصميم والهندسة، يتقن كل منهم مجالًا ويحمل مهاراته المُؤرشَفة بالإصدارات.",
          "لا يختار المستخدم وكيلًا أبدًا. يبدو هذا تفصيلًا في تجربة الاستخدام، لكنه القرار الأهم للتبنّي: لا يريد الناس تعلّم هيكل تنظيمي لروبوتات.",
        ] },
        { h: "السياق منتج وليس تعليمة", p: [
          "لم تكن معظم الإخفاقات التي رأيتها إخفاقات في النموذج. كان الوكلاء يستشهدون بقرار جرى استبداله أو يغفلون قيدًا. لذلك تسترجع NOVA سياقها عبر ORBIT، باسم المستخدم وبصلاحياته، ويمكن للإجابة أن تقول لماذا أُدرج مصدر ما.",
          "معاملة السياق كطبقة خاضعة للحوكمة جعلت المنصة أسهل في الوثوق بها وفي التدقيق.",
        ] },
        { h: "التقييم قبل التوسع", p: [
          "يُقيَّم كل إصدار ويُختبر ضد الانحدار عبر FORGE قبل أن يصل إلى مستخدمين أكثر. وتعود الدروس في صورة تعليمات مُؤرشَفة بالإصدارات لا تدريبًا للنموذج: لا أحد يعيد ضبط الأوزان هنا.",
          "لا يمكن لمنصة يستخدمها مئات الأشخاص أن تعتمد على انطباع بأن الأمر يبدو أفضل. المشاريع الثلاثة نسخ تجريبية عامة، وأصف تصميمها لا ضمانًا للإنتاج.",
        ] },
      ],
      take: "تُكسب المنصات الوكيلة للمؤسسات بالحوكمة والسياق لا باختيار النموذج. لو بدأت من جديد لبنيت حلقة التقييم أولًا ثم الوكلاء.",
      diagram: { nodes: ["أنت", "التنسيق", "السياق · ORBIT", "الوكلاء المتخصصون", "التقييم · FORGE"], caption: "NOVA تتصرف وORBIT تعرف وFORGE تتعلم. كل تقييم يغذّي السياق والسلوك." },
      results: [{ v: "800", l: "موظف يستخدمون NOVA في Devoteam" }, { v: "15", l: "شخصًا في الفريق متعدد التخصصات" }, { v: "+10,000", l: "مستشار في المجموعة، في 25 دولة" }, { v: "3", l: "مكوّنات: التصرف والمعرفة والتعلم" }],
    },
  },
  {
    slug: "ai-operating-model-experiments-to-enterprise-adoption",
    date: "2026-11-01", minutes: 5, kind: "steps", tags: ["Operating model", "Governance", "Adoption"],
    repos: [{ label: "agentic-sdlc", url: `${GH}/agentic-sdlc` }, { label: "TrustRail", url: `${GH}/TrustRail` }, { label: "NOVA", url: `${GH}/NOVA` }],
    cases: ["dila-sovereign-ai"],
    en: {
      title: "AI Operating Model: From Experiments to Enterprise Adoption",
      dek: "A practical path from isolated proofs of concept to shared platforms, with the governance that makes reuse possible.",
      sections: [
        { h: "Experiments do not scale by themselves", p: [
          "A pilot proves that a model can do something. It does not prove that an organisation can run it. Each isolated project rebuilds ingestion, retrieval, evaluation and security, and ends up with its own quality bar.",
          "On the DILA platform, the shift was to stop building each application independently and to assemble standardised, governed components instead.",
        ] },
        { h: "Build the platform and its rules together", p: [
          "Shared document processing, retrieval, evaluation and security capabilities are only reused if teams trust them. That trust comes from governance defined with the platform, not added after it.",
          "Agentic applications can then build on existing orchestration patterns and tool integrations instead of reinventing them.",
        ] },
        { h: "Adoption is a people problem", p: [
          "A platform nobody can use is a cost. Training belongs to the operating model: at Devoteam, the LEAP programme trained 1,500+ professionals in generative AI, agentic AI and RAG, and NOVA reached 800 employees.",
          "For agents that act, the same logic applies to control. TrustRail explores policies, human approvals and signed receipts, in synthetic sandboxes, and agentic-sdlc describes earned autonomy for coding agents.",
        ] },
      ],
      take: "The operating model is the product. Ownership, evaluation gates and training decide adoption far more than any architecture choice.",
      diagram: { nodes: ["Experiments", "Shared platform", "Governance", "Evaluation gates", "Adoption"], caption: "Each step makes the next one cheaper: reuse needs trust, and trust needs rules." },
      results: [{ v: "−60%", l: "RAG application delivery time, from 10 weeks to 4 (DILA)" }, { v: "75%", l: "of common technical capabilities reused (DILA)" }, { v: "−30%", l: "cost per AI request, through optimisation and reuse (DILA)" }, { v: "1,500+", l: "professionals trained (LEAP)" }],
    },
    fr: {
      title: "Modèle opérationnel IA : des expérimentations à l’adoption en entreprise",
      dek: "Un chemin concret des preuves de concept isolées vers des plateformes partagées, avec la gouvernance qui rend la réutilisation possible.",
      sections: [
        { h: "Les expérimentations ne passent pas à l’échelle toutes seules", p: [
          "Un pilote prouve qu’un modèle sait faire quelque chose. Il ne prouve pas qu’une organisation sait l’exploiter. Chaque projet isolé reconstruit l’ingestion, la récupération, l’évaluation et la sécurité, et finit avec son propre niveau de qualité.",
          "Sur la plateforme de la DILA, le changement a été d’arrêter de construire chaque application indépendamment pour assembler des composants standardisés et gouvernés.",
        ] },
        { h: "Construire la plateforme et ses règles ensemble", p: [
          "Les capacités partagées de traitement de documents, de récupération, d’évaluation et de sécurité ne sont réutilisées que si les équipes leur font confiance. Cette confiance vient d’une gouvernance définie avec la plateforme, pas ajoutée après.",
          "Les applications agentiques peuvent alors s’appuyer sur des modèles d’orchestration et des intégrations d’outils existants au lieu de les réinventer.",
        ] },
        { h: "L’adoption est une question de personnes", p: [
          "Une plateforme que personne ne sait utiliser est un coût. La formation fait partie du modèle opérationnel : chez Devoteam, le programme LEAP a formé plus de 1 500 professionnels à l’IA générative, à l’IA agentique et au RAG, et NOVA a atteint 800 collaborateurs.",
          "Pour des agents qui agissent, la même logique s’applique au contrôle. TrustRail explore des politiques, des validations humaines et des reçus signés, dans des bacs à sable synthétiques, et agentic-sdlc décrit une autonomie méritée pour les agents de code.",
        ] },
      ],
      take: "Le modèle opérationnel est le produit. Les responsabilités, les points de contrôle d’évaluation et la formation décident de l’adoption bien plus que n’importe quel choix d’architecture.",
      diagram: { nodes: ["Expérimentations", "Plateforme partagée", "Gouvernance", "Contrôles d’évaluation", "Adoption"], caption: "Chaque étape rend la suivante moins coûteuse : la réutilisation demande de la confiance, et la confiance demande des règles." },
      results: [{ v: "−60 %", l: "de délai de livraison d’une application RAG, de 10 à 4 semaines (DILA)" }, { v: "75 %", l: "des capacités techniques communes réutilisées (DILA)" }, { v: "−30 %", l: "de coût par requête d’IA, grâce à l’optimisation et à la réutilisation (DILA)" }, { v: "1 500+", l: "professionnels formés (LEAP)" }],
    },
    ar: {
      title: "نموذج تشغيل الذكاء الاصطناعي: من التجارب إلى التبنّي المؤسسي",
      dek: "مسار عملي من إثباتات المفهوم المعزولة إلى منصات مشتركة، مع الحوكمة التي تتيح إعادة الاستخدام.",
      sections: [
        { h: "التجارب لا تتوسع من تلقاء نفسها", p: [
          "يثبت المشروع التجريبي أن نموذجًا قادر على فعل شيء ما، لكنه لا يثبت أن مؤسسة قادرة على تشغيله. فكل مشروع معزول يعيد بناء الاستيعاب والاسترجاع والتقييم والأمن، وينتهي بمعيار جودة خاص به.",
          "في منصة DILA كان التحول بالتوقف عن بناء كل تطبيق على حدة وتجميع مكوّنات موحّدة وخاضعة للحوكمة بدلًا من ذلك.",
        ] },
        { h: "ابنِ المنصة وقواعدها معًا", p: [
          "لا تُعاد استخدام القدرات المشتركة في معالجة الوثائق والاسترجاع والتقييم والأمن إلا إذا وثقت بها الفرق. وتأتي الثقة من حوكمة تُحدَّد مع المنصة لا بعدها.",
          "عندئذ تستطيع التطبيقات الوكيلة البناء على أنماط تنسيق وتكاملات أدوات قائمة بدل إعادة اختراعها.",
        ] },
        { h: "التبنّي مسألة بشر", p: [
          "المنصة التي لا يعرف أحد استخدامها كلفة. والتدريب جزء من نموذج التشغيل: في Devoteam درّب برنامج LEAP أكثر من 1,500 متخصص على الذكاء الاصطناعي التوليدي والوكيل وRAG، ووصلت NOVA إلى 800 موظف.",
          "وللوكلاء الذين يتصرفون ينطبق المنطق نفسه على الرقابة. يستكشف TrustRail السياسات والموافقات البشرية والإيصالات الموقّعة في بيئات تجريب اصطناعية، ويصف agentic-sdlc استقلالية تُكتسب لوكلاء البرمجة.",
        ] },
      ],
      take: "نموذج التشغيل هو المنتج. تحدد المسؤوليات وبوابات التقييم والتدريب التبنّي أكثر بكثير من أي خيار معماري.",
      diagram: { nodes: ["تجارب", "منصة مشتركة", "حوكمة", "بوابات التقييم", "تبنٍّ"], caption: "كل خطوة تجعل التي تليها أقل كلفة: إعادة الاستخدام تحتاج ثقة، والثقة تحتاج قواعد." },
      results: [{ v: "−60%", l: "من زمن تسليم تطبيق RAG، من 10 أسابيع إلى 4 (DILA)" }, { v: "75%", l: "من القدرات التقنية المشتركة أُعيد استخدامها (DILA)" }, { v: "−30%", l: "من كلفة كل طلب ذكاء اصطناعي، عبر التحسين وإعادة الاستخدام (DILA)" }, { v: "+1,500", l: "متخصص دُرِّبوا (LEAP)" }],
    },
  },
  {
    slug: "evaluating-multi-agent-systems-in-production",
    date: "2026-11-01", minutes: 5, kind: "loop", tags: ["Evaluation", "Multi-agent", "Reliability"],
    repos: [{ label: "FORGE", url: `${GH}/FORGE` }, { label: "NOVA", url: `${GH}/NOVA` }, { label: "MedGuard AI", url: `${GH}/medguard-ai` }],
    cases: ["dila-sovereign-ai"],
    en: {
      title: "Evaluating Multi-Agent Systems in Production",
      dek: "Why a demo that works once says nothing about an agent system, and how I check that a new version is really better.",
      sections: [
        { h: "The question is always: is this version better?", p: [
          "A multi-agent system changes with every prompt, tool, model or context change. Without a fixed set of scenarios, nobody can tell an improvement from a regression.",
          "FORGE treats it as an experiment: the same scenarios, a baseline against a candidate, with scores, cost, errors and a confidence level.",
        ] },
        { h: "Score the work, not only the answer", p: [
          "Deterministic rules (schema, citations, sources, personal data, tools, cost, latency) sit next to judges and human feedback. Traces record each model call, tool call and error, so a failure can be replayed.",
          "Private and fresh scenarios help detect over-optimisation: a system tuned on public tests can fail on new ones. FORGE is a public beta, and its results depend on the scenarios you configure.",
        ] },
        { h: "Measure the retrieval too", p: [
          "On the DILA platform, the evaluation covered the RAG chain, not only the final text: faithfulness 0.94, answer relevancy 0.91, context precision 0.89 and context recall 0.92, with 85% of priority RAG scenarios covered.",
        ] },
      ],
      take: "Evaluation is the control plane of an agent platform. Without it every release is a bet. With it you can give agents more autonomy, because you can show what happens.",
      diagram: { nodes: ["Scenario", "Run", "Trace", "Score", "Human review", "Release gate"], caption: "A closed loop: what the release gate learns goes back into the scenarios." },
      results: [{ v: "0.94", l: "RAG faithfulness (DILA)" }, { v: "0.91", l: "answer relevancy (DILA)" }, { v: "0.89", l: "context precision (DILA)" }, { v: "0.92", l: "context recall (DILA)" }, { v: "85%", l: "of priority RAG scenarios covered (DILA)" }],
    },
    fr: {
      title: "Évaluer des systèmes multi-agents en production",
      dek: "Pourquoi une démo qui marche une fois ne dit rien d’un système d’agents, et comment je vérifie qu’une nouvelle version est vraiment meilleure.",
      sections: [
        { h: "La question est toujours : cette version est-elle meilleure ?", p: [
          "Un système multi-agents change à chaque modification de prompt, d’outil, de modèle ou de contexte. Sans un jeu fixe de scénarios, personne ne distingue une amélioration d’une régression.",
          "FORGE le traite comme une expérience : les mêmes scénarios, une référence contre un candidat, avec scores, coût, erreurs et niveau de confiance.",
        ] },
        { h: "Noter le travail, pas seulement la réponse", p: [
          "Des règles déterministes (schéma, citations, sources, données personnelles, outils, coût, latence) côtoient des juges et des retours humains. Les traces enregistrent chaque appel de modèle, chaque appel d’outil et chaque erreur, ce qui permet de rejouer un échec.",
          "Des scénarios privés et frais aident à détecter la sur-optimisation : un système réglé sur des tests publics peut échouer sur de nouveaux. FORGE est une bêta publique et ses résultats dépendent des scénarios configurés.",
        ] },
        { h: "Mesurer aussi la récupération", p: [
          "Sur la plateforme de la DILA, l’évaluation couvrait la chaîne RAG, pas seulement le texte final : fidélité 0,94, pertinence des réponses 0,91, précision du contexte 0,89 et rappel du contexte 0,92, avec 85 % des scénarios RAG prioritaires couverts.",
        ] },
      ],
      take: "L’évaluation est le plan de contrôle d’une plateforme d’agents. Sans elle, chaque version est un pari. Avec elle, on peut donner plus d’autonomie aux agents, parce qu’on peut montrer ce qui se passe.",
      diagram: { nodes: ["Scénario", "Exécution", "Trace", "Score", "Revue humaine", "Point de contrôle"], caption: "Une boucle fermée : ce que le point de contrôle apprend retourne dans les scénarios." },
      results: [{ v: "0,94", l: "fidélité du RAG (DILA)" }, { v: "0,91", l: "pertinence des réponses (DILA)" }, { v: "0,89", l: "précision du contexte (DILA)" }, { v: "0,92", l: "rappel du contexte (DILA)" }, { v: "85 %", l: "des scénarios RAG prioritaires couverts (DILA)" }],
    },
    ar: {
      title: "تقييم الأنظمة متعددة الوكلاء في الإنتاج",
      dek: "لماذا لا يقول عرض ينجح مرة واحدة شيئًا عن نظام وكلاء، وكيف أتحقق من أن إصدارًا جديدًا أفضل فعلًا.",
      sections: [
        { h: "السؤال دائمًا: هل هذا الإصدار أفضل؟", p: [
          "يتغير النظام متعدد الوكلاء مع كل تغيير في التعليمات أو الأدوات أو النموذج أو السياق. وبلا مجموعة ثابتة من السيناريوهات لا يستطيع أحد التمييز بين تحسّن وانحدار.",
          "يتعامل FORGE معه كتجربة: السيناريوهات نفسها، ومرجع مقابل مرشَّح، مع الدرجات والكلفة والأخطاء ومستوى الثقة.",
        ] },
        { h: "قيّم العمل لا الجواب فقط", p: [
          "تعمل قواعد حتمية (المخطط والاستشهادات والمصادر والبيانات الشخصية والأدوات والكلفة والزمن) إلى جانب محكّمين وملاحظات بشرية. وتسجّل التتبعات كل استدعاء للنموذج والأدوات وكل خطأ، فيمكن إعادة تشغيل الإخفاق.",
          "تساعد السيناريوهات الخاصة والجديدة على كشف الإفراط في التحسين: قد يفشل نظام ضُبط على اختبارات عامة أمام اختبارات جديدة. FORGE نسخة تجريبية عامة وتعتمد نتائجه على السيناريوهات التي تضبطها.",
        ] },
        { h: "قِس الاسترجاع أيضًا", p: [
          "في منصة DILA شمل التقييم سلسلة RAG وليس النص النهائي وحده: أمانة 0.94 وملاءمة الإجابات 0.91 ودقة السياق 0.89 واسترجاع السياق 0.92، مع تغطية 85% من سيناريوهات RAG ذات الأولوية.",
        ] },
      ],
      take: "التقييم هو مستوى التحكم في منصة الوكلاء. من دونه كل إصدار رهان. ومعه يمكنك منح الوكلاء استقلالية أكبر لأنك تستطيع أن تُظهر ما يحدث.",
      diagram: { nodes: ["سيناريو", "تشغيل", "تتبع", "درجة", "مراجعة بشرية", "بوابة الإصدار"], caption: "حلقة مغلقة: ما تتعلمه بوابة الإصدار يعود إلى السيناريوهات." },
      results: [{ v: "0.94", l: "أمانة RAG (DILA)" }, { v: "0.91", l: "ملاءمة الإجابات (DILA)" }, { v: "0.89", l: "دقة السياق (DILA)" }, { v: "0.92", l: "استرجاع السياق (DILA)" }, { v: "85%", l: "من سيناريوهات RAG ذات الأولوية مغطاة (DILA)" }],
    },
  },
  {
    slug: "context-engineering-beyond-traditional-rag",
    date: "2026-11-01", minutes: 5, kind: "compare", tags: ["Context engineering", "RAG", "Memory"],
    repos: [{ label: "ORBIT", url: `${GH}/ORBIT` }, { label: "NOVA", url: `${GH}/NOVA` }, { label: "FORGE", url: `${GH}/FORGE` }],
    cases: ["dila-sovereign-ai"],
    en: {
      title: "Context Engineering: Beyond Traditional RAG",
      dek: "Retrieval finds text. Context engineering decides what an agent should know, from where, for whom and for how long.",
      sections: [
        { h: "Where classic RAG stops", p: [
          "Classic RAG retrieves the passages closest to a question. It does not know that a decision was replaced last month, that two specifications disagree, or that the reader is not allowed to see a document.",
          "Agents fail on exactly those cases, rarely for lack of a better model.",
        ] },
        { h: "What ORBIT adds", p: [
          "Sources are ingested with personal-data detection and redaction. Decisions, constraints and risks become memory items with a lifecycle (proposed, validated, replaced, obsolete) and provenance down to the source paragraph.",
          "Each task gets an assembled context: freshness, conflict resolution, deduplication, permissions and a token budget, with a reason code for every item kept or excluded.",
        ] },
        { h: "Make it measurable", p: [
          "Context quality is measured, not assumed: p95 latency, tokens, estimated cost, exclusions by reason and the most useful sources, exported for evaluation. ORBIT is a public beta, not validated for production use.",
          "On the DILA platform, a measured retrieval chain reached 0.89 context precision and 0.92 context recall, and the pipeline work contributed to a 30% lower cost per request.",
        ] },
      ],
      take: "The next gains in enterprise agents come from context, not from bigger models. Memory should be governed data, with an owner, a lifecycle and an audit trail.",
      diagram: { heads: ["Traditional RAG", "Context engineering"], nodes: ["Question", "Retrieve top results", "Generate"], nodes2: ["Intent", "Select and rank", "Resolve conflicts", "Apply permissions", "Budget tokens", "Explain and trace"], caption: "Same goal, different job: retrieval answers a question, context engineering prepares an agent." },
      results: [{ v: "0.89", l: "context precision (DILA)" }, { v: "0.92", l: "context recall (DILA)" }, { v: "−30%", l: "cost per AI request, through pipeline optimisation and reuse (DILA)" }],
    },
    fr: {
      title: "Ingénierie du contexte : au-delà du RAG classique",
      dek: "La récupération trouve du texte. L’ingénierie du contexte décide ce qu’un agent doit savoir, d’où, pour qui et pour combien de temps.",
      sections: [
        { h: "Là où le RAG classique s’arrête", p: [
          "Le RAG classique récupère les passages les plus proches d’une question. Il ne sait pas qu’une décision a été remplacée le mois dernier, que deux spécifications se contredisent, ou que le lecteur n’a pas le droit de voir un document.",
          "Les agents échouent précisément sur ces cas, rarement faute d’un meilleur modèle.",
        ] },
        { h: "Ce qu’apporte ORBIT", p: [
          "Les sources sont ingérées avec détection et caviardage des données personnelles. Décisions, contraintes et risques deviennent des éléments de mémoire avec un cycle de vie (proposé, validé, remplacé, obsolète) et une provenance jusqu’au paragraphe source.",
          "Chaque tâche reçoit un contexte assemblé : fraîcheur, résolution des conflits, dédoublonnage, habilitations et budget de tokens, avec un code de raison pour chaque élément retenu ou exclu.",
        ] },
        { h: "Le rendre mesurable", p: [
          "La qualité du contexte se mesure, elle ne se suppose pas : latence p95, tokens, coût estimé, exclusions par raison et sources les plus utiles, exportés pour l’évaluation. ORBIT est une bêta publique, non validée pour un usage en production.",
          "Sur la plateforme de la DILA, une chaîne de récupération mesurée a atteint une précision du contexte de 0,89 et un rappel de 0,92, et le travail sur les chaînes a contribué à un coût par requête en baisse de 30 %.",
        ] },
      ],
      take: "Les prochains gains des agents d’entreprise viendront du contexte, pas de modèles plus gros. La mémoire doit être une donnée gouvernée, avec un responsable, un cycle de vie et une piste d’audit.",
      diagram: { heads: ["RAG classique", "Ingénierie du contexte"], nodes: ["Question", "Récupérer les meilleurs résultats", "Générer"], nodes2: ["Intention", "Sélectionner et classer", "Résoudre les conflits", "Appliquer les droits", "Budgéter les tokens", "Expliquer et tracer"], caption: "Même objectif, autre métier : la récupération répond à une question, l’ingénierie du contexte prépare un agent." },
      results: [{ v: "0,89", l: "précision du contexte (DILA)" }, { v: "0,92", l: "rappel du contexte (DILA)" }, { v: "−30 %", l: "de coût par requête d’IA, grâce à l’optimisation des chaînes et à la réutilisation (DILA)" }],
    },
    ar: {
      title: "هندسة السياق: ما بعد RAG التقليدي",
      dek: "يجد الاسترجاع نصًا. وتقرر هندسة السياق ما ينبغي أن يعرفه الوكيل، ومن أين، ولمن، ولكم من الوقت.",
      sections: [
        { h: "أين يتوقف RAG التقليدي", p: [
          "يسترجع RAG التقليدي المقاطع الأقرب إلى السؤال. لكنه لا يعرف أن قرارًا استُبدل الشهر الماضي، أو أن مواصفتين تتناقضان، أو أن القارئ غير مخوَّل برؤية وثيقة.",
          "وبالضبط في هذه الحالات يفشل الوكلاء، وقلّما يكون السبب غياب نموذج أفضل.",
        ] },
        { h: "ما الذي يضيفه ORBIT", p: [
          "تُستوعَب المصادر مع كشف البيانات الشخصية وحجبها. وتصبح القرارات والقيود والمخاطر عناصر ذاكرة بدورة حياة (مقترح، مُصادَق عليه، مُستبدَل، قديم) ومصدر موثّق حتى فقرة المصدر.",
          "تحصل كل مهمة على سياق مُجمَّع: الحداثة وحل التعارضات وإزالة التكرار والصلاحيات وميزانية الرموز، مع رمز سبب لكل عنصر محتفَظ به أو مستبعَد.",
        ] },
        { h: "اجعله قابلًا للقياس", p: [
          "تُقاس جودة السياق ولا تُفترض: زمن الاستجابة p95 والرموز والكلفة المقدّرة والاستبعادات حسب السبب وأكثر المصادر فائدة، وتُصدَّر للتقييم. ORBIT نسخة تجريبية عامة وغير مُصادَق عليها للاستخدام في الإنتاج.",
          "في منصة DILA بلغت سلسلة استرجاع مقيسة دقة سياق 0.89 واسترجاع سياق 0.92، وأسهم العمل على المسارات في خفض كلفة كل طلب بنسبة 30%.",
        ] },
      ],
      take: "ستأتي المكاسب القادمة لوكلاء المؤسسات من السياق لا من نماذج أكبر. ينبغي أن تكون الذاكرة بيانات خاضعة للحوكمة، بمسؤول ودورة حياة وسجل تدقيق.",
      diagram: { heads: ["RAG التقليدي", "هندسة السياق"], nodes: ["سؤال", "استرجاع أفضل النتائج", "توليد"], nodes2: ["نية", "اختيار وترتيب", "حل التعارضات", "تطبيق الصلاحيات", "ميزانية الرموز", "شرح وتتبع"], caption: "الهدف نفسه والمهمة مختلفة: الاسترجاع يجيب عن سؤال، وهندسة السياق تُعدّ وكيلًا." },
      results: [{ v: "0.89", l: "دقة السياق (DILA)" }, { v: "0.92", l: "استرجاع السياق (DILA)" }, { v: "−30%", l: "من كلفة كل طلب ذكاء اصطناعي، عبر تحسين المسارات وإعادة الاستخدام (DILA)" }],
    },
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const loc = (p: Post, l: Locale): Loc => p[l];
