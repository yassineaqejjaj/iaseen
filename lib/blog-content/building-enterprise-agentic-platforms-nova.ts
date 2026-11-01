import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "Building Enterprise Agentic Platforms: Lessons from NOVA",
    dek: "What changed when I stopped building an assistant and started building a team of agents that has to work inside a company.",
    answer:
      "An enterprise agentic platform is a system where one orchestrator plans work, delegates it to specialist agents, grounds every step in governed company context and evaluates the result before it scales. NOVA, ORBIT and FORGE split these jobs into three bricks: act, know and learn.",
    sections: [
      {
        h: "What is an enterprise agentic platform?",
        p: [
          "It is not a chatbot with plug-ins. It is a layered system that turns an intent into a plan, runs versioned skills through specialist agents and delivers a reviewable result. NOVA is my attempt at it, rolled out to 800 employees at Devoteam.",
          "I use three questions to test any platform that claims to be agentic. Who is responsible for context? Who decides what an agent may do on its own? Who proves that a new version is better than the previous one? If the answers are the prompt, the model and the demo, it is an assistant with ambitions, not a platform. The rest of this article follows these three questions, which map to the bricks act, know and learn.",
        ],
      },
      {
        h: "Why one orchestrator instead of a menu of agents?",
        p: [
          "NOVA is organised in layers. A single orchestrator frames the request, plans, delegates to specialists, supervises the work and assembles the result. Behind it, specialist agents for product, project, design and engineering each master a domain and carry their own versioned skills. A research agent brings context, and a validation agent checks each deliverable before it reaches the user.",
          "The user never chooses an agent. It sounds like a UX detail, but it is the main adoption decision: people do not want to learn an org chart of bots. They want to state what they are trying to achieve and receive work they can edit.",
          "The output matters as much as the routing. The public NOVA repository describes deliverables as structured, versioned and editable artifacts with citations, not as chat messages someone must copy somewhere else. That is what makes the result reviewable by a human, and review is where trust is built.",
        ],
      },
      {
        h: "Why is context a product and not a prompt?",
        p: [
          "Most failures I saw were not model failures. Agents cited a decision that had been replaced, mixed two versions of a specification, ignored a constraint or, worse, exposed a document to someone who should never have seen it. A better model does not fix any of these.",
          "So NOVA retrieves its context through ORBIT, as the user, with their permissions, and an answer can say why a source was included or excluded. Treating context as a governed layer made the platform easier to trust and to audit. According to the public README, ORBIT works on these points:",
          "The practical consequence is a different way of debugging. When an answer is wrong, I no longer start by rewriting the prompt. I look at which sources were retrieved, which were excluded and why. More often than not, the fix is a stale document, a missing permission or an unresolved contradiction between two sources, and none of those are visible from the prompt.",
        ],
        list: [
          "Ingestion of team sources with detection and redaction of personal data.",
          "A living memory of decisions, constraints and risks, with a lifecycle (proposed, validated, replaced, obsolete, forgotten) and provenance.",
          "Permissions and data classification applied before anything reaches an agent.",
          "An explainable reason code for each item kept in or left out of a context.",
          "Connectors to the tools teams already use, including MCP connectors.",
        ],
      },
      {
        h: "How do NOVA, ORBIT and FORGE divide the work?",
        p: [
          "I kept the three responsibilities apart on purpose, because mixing them is how platforms become impossible to reason about. NOVA never duplicates ORBIT or FORGE: it asks ORBIT for context and is evaluated by FORGE through an adapter.",
        ],
        table: {
          head: ["Brick", "Role", "What it owns", "What it does not do"],
          rows: [
            ["NOVA", "Act", "Intent, planning, skills, execution, artifacts", "It does not store company memory or score itself"],
            ["ORBIT", "Know", "Context, memory, permissions, citations", "It does not evaluate the agents"],
            ["FORGE", "Learn", "Traces, evaluation, regressions, experiments", "It does not change NOVA’s behaviour by itself"],
          ],
        },
      },
      {
        h: "Why evaluate before scaling?",
        p: [
          "A platform used by hundreds of people cannot rely on someone’s impression that it seems better. Each release is benchmarked and regression-tested with FORGE before it reaches more users. The FORGE README describes scenarios, deterministic rules, LLM judges, human review and baseline versus candidate experiments, with scores that always trace back to a criterion and a step of the execution.",
          "I would rather say this plainly: a score without an explanation is a rumour. If an evaluation cannot show which criterion and which step produced a number, nobody can act on it.",
          "I also learned to keep the evaluation set honest. The FORGE README describes public, private and fresh scenarios, so that a team cannot quietly optimise for the tests it can see. That is the part of evaluation most teams skip, and it is the part that protects you from a flattering benchmark.",
        ],
      },
      {
        h: "Who actually learns in a platform that learns?",
        p: [
          "“FORGE learns” is a shorthand, and it can mislead. Nobody trains model weights in this setup. FORGE produces evidence. NOVA distils that evidence into short lessons, which are versioned instructions, and deploys them through a proof gate, a canary and an approval, with the option to roll back. ORBIT keeps the governed learnings that NOVA later retrieves as context.",
          "This separation matters for a large company. Instructions can be reviewed, diffed and reverted. Weights cannot, at least not by the people who own the business process.",
        ],
      },
      {
        h: "How do you keep autonomy under control?",
        p: [
          "Autonomy is a dial, not a switch. The NOVA engineering capability, which specifies, codes, tests and opens pull requests, offers a guided mode where a human validates the plan and the merge, and an autopilot mode that goes further on its own. The controls I consider non-negotiable are these:",
        ],
        list: [
          "Human approval gates at the steps that touch external systems.",
          "Recorded provenance, so a user can ask why an element was included.",
          "An autonomy policy and a tool registry, so agents only use what they are allowed to use.",
          "Proposed versions instead of silent updates when a cited source changes.",
          "Replay of a finished run without writing to external systems, to compare cost, time and context.",
        ],
      },
      {
        h: "What did I measure and see?",
        p: [
          "I need to be careful here. NOVA, ORBIT and FORGE are public betas, and I describe their design, not a production guarantee. The figures I can stand behind come from the platform work around them.",
          "At Devoteam, NOVA reached 800 employees through a cross-functional team of 15 people, inside a group of 10,000+ consultants in 25 countries. On the DILA public-sector platform, the same discipline of shared components and evaluation produced the results below.",
        ],
        table: {
          head: ["Measure", "Result"],
          rows: [
            ["RAG application delivery time", "-60% (10 weeks to 4)"],
            ["Common technical capabilities reused", "75%"],
            ["Cost per AI request", "-30%"],
            ["RAG faithfulness", "0.94"],
            ["Answer relevancy", "0.91"],
            ["Context precision / recall", "0.89 / 0.92"],
            ["Priority RAG scenarios covered", "85%"],
          ],
        },
      },
    ],
    take: "Enterprise agentic platforms are won on governance and context, not on model choice. If I started again, I would build the evaluation loop first and the agents second. And I would never let adoption depend on users learning which agent to call.",
    diagram: { nodes: ["You", "Orchestration", "Context · ORBIT", "Specialist agents", "Evaluation · FORGE"], caption: "NOVA acts, ORBIT knows, FORGE learns. Each evaluation feeds back into context and behaviour." },
    results: [{ v: "800", l: "employees use NOVA at Devoteam" }, { v: "15", l: "people in the cross-functional team" }, { v: "10,000+", l: "consultants in the group, in 25 countries" }, { v: "3", l: "bricks: act, know, learn" }],
    faq: [
      {
        q: "What is the difference between an AI assistant and an agentic platform?",
        a: "An assistant answers a prompt in a chat. An agentic platform plans a task, delegates it to specialist agents, grounds each step in permissioned company context, hands back an editable deliverable and measures its own quality over time. The difference is governance and evaluation, not the model.",
      },
      {
        q: "Why should users not choose which agent to call?",
        a: "Because it forces them to learn an org chart of bots. In NOVA, one orchestrator interprets the intent and routes the work. The user states a goal, and the platform picks the specialists and skills. In my experience this is the biggest driver of adoption.",
      },
      {
        q: "Does FORGE fine-tune the models?",
        a: "No. According to the NOVA documentation, nobody trains model weights. FORGE evaluates executions and produces evidence. NOVA turns it into versioned lessons, deployed through a proof gate, a canary and an approval, and reversible. ORBIT stores the governed learnings.",
      },
      {
        q: "Are NOVA, ORBIT and FORGE ready for production?",
        a: "They are public betas. The repositories describe the design and a verification path, and the READMEs ask readers to verify deployment status before relying on them. What I can state as a fact is that NOVA Suite is used by 800 employees at Devoteam.",
      },
      {
        q: "Where should a company start with an agentic platform?",
        a: "Start with the evaluation loop and governed context, then add agents. Define who owns each brick, how a result is scored and how permissions reach the agent. Adding more agents on top of ungoverned context only multiplies the failures you already have.",
      },
    ],
  },
  fr: {
    title: "Construire des plateformes agentiques d’entreprise : les leçons de NOVA",
    dek: "Ce qui a changé quand j’ai cessé de construire un assistant pour construire une équipe d’agents qui doit travailler dans une entreprise.",
    answer:
      "Une plateforme agentique d’entreprise est un système où un orchestrateur planifie le travail, le délègue à des agents spécialisés, ancre chaque étape dans un contexte d’entreprise gouverné et évalue le résultat avant le passage à l’échelle. NOVA, ORBIT et FORGE séparent ces rôles en trois briques : agir, savoir, apprendre.",
    sections: [
      {
        h: "Qu’est-ce qu’une plateforme agentique d’entreprise ?",
        p: [
          "Ce n’est pas un chatbot avec des plug-ins. C’est un système en couches qui transforme une intention en plan, exécute des compétences versionnées par des agents spécialisés et livre un résultat relisable. NOVA est ma tentative, déployée auprès de 800 collaborateurs chez Devoteam.",
          "J’utilise trois questions pour tester toute plateforme qui se dit agentique. Qui est responsable du contexte ? Qui décide de ce qu’un agent peut faire seul ? Qui prouve qu’une nouvelle version est meilleure que la précédente ? Si les réponses sont le prompt, le modèle et la démo, c’est un assistant avec de l’ambition, pas une plateforme. La suite de l’article suit ces trois questions, qui correspondent aux briques agir, savoir et apprendre.",
        ],
      },
      {
        h: "Pourquoi un orchestrateur unique plutôt qu’un menu d’agents ?",
        p: [
          "NOVA est organisé en couches. Un orchestrateur unique cadre la demande, planifie, délègue aux spécialistes, supervise le travail et assemble le résultat. Derrière lui, des agents spécialisés en produit, projet, design et ingénierie maîtrisent chacun un domaine avec leurs compétences versionnées. Un agent de recherche apporte le contexte, et un agent de validation contrôle chaque livrable avant qu’il n’atteigne l’utilisateur.",
          "L’utilisateur ne choisit jamais un agent. Cela ressemble à un détail d’ergonomie, mais c’est la principale décision d’adoption : personne ne veut apprendre l’organigramme d’une équipe de robots. Les gens veulent dire ce qu’ils cherchent à accomplir et recevoir un travail qu’ils peuvent modifier.",
          "Le résultat compte autant que le routage. Le dépôt public de NOVA décrit des livrables sous forme d’artefacts structurés, versionnés et modifiables, avec citations, et non de messages de chat à recopier ailleurs. C’est ce qui rend le résultat relisable par un humain, et la relecture est le moment où la confiance se construit.",
        ],
      },
      {
        h: "Pourquoi le contexte est-il un produit et non un prompt ?",
        p: [
          "La plupart des échecs que j’ai vus n’étaient pas des échecs du modèle. Des agents citaient une décision remplacée, mélangeaient deux versions d’une spécification, ignoraient une contrainte ou, pire, exposaient un document à quelqu’un qui n’aurait jamais dû le voir. Un meilleur modèle ne corrige rien de tout cela.",
          "NOVA récupère donc son contexte via ORBIT, au nom de l’utilisateur et avec ses droits, et une réponse peut dire pourquoi une source a été retenue ou écartée. Traiter le contexte comme une couche gouvernée rend la plateforme plus fiable et plus facile à auditer. D’après le README public, ORBIT travaille sur ces points :",
          "La conséquence pratique, c’est une autre façon de déboguer. Quand une réponse est fausse, je ne commence plus par réécrire le prompt. Je regarde quelles sources ont été récupérées, lesquelles ont été écartées et pourquoi. Le plus souvent, la correction est un document périmé, une habilitation manquante ou une contradiction non résolue entre deux sources, et rien de tout cela n’est visible depuis le prompt.",
        ],
        list: [
          "Ingestion des sources de l’équipe avec détection et caviardage des données personnelles.",
          "Une mémoire vivante des décisions, contraintes et risques, avec un cycle de vie (proposé, validé, remplacé, obsolète, oublié) et une provenance.",
          "Habilitations et classification des données appliquées avant que quoi que ce soit n’atteigne un agent.",
          "Un code de raison explicable pour chaque élément retenu ou écarté d’un contexte.",
          "Des connecteurs vers les outils que les équipes utilisent déjà, dont des connecteurs MCP.",
        ],
      },
      {
        h: "Comment NOVA, ORBIT et FORGE se répartissent-ils le travail ?",
        p: [
          "J’ai séparé volontairement les trois responsabilités, car les mélanger est ce qui rend une plateforme impossible à raisonner. NOVA ne duplique jamais ORBIT ni FORGE : il demande son contexte à ORBIT et il est évalué par FORGE via un adaptateur.",
        ],
        table: {
          head: ["Brique", "Rôle", "Ce qu’elle porte", "Ce qu’elle ne fait pas"],
          rows: [
            ["NOVA", "Agir", "Intention, planification, compétences, exécution, artefacts", "Ne stocke pas la mémoire de l’entreprise et ne se note pas lui-même"],
            ["ORBIT", "Savoir", "Contexte, mémoire, habilitations, citations", "N’évalue pas les agents"],
            ["FORGE", "Apprendre", "Traces, évaluation, régressions, expériences", "Ne modifie pas le comportement de NOVA par lui-même"],
          ],
        },
      },
      {
        h: "Pourquoi évaluer avant de passer à l’échelle ?",
        p: [
          "Une plateforme utilisée par des centaines de personnes ne peut pas reposer sur l’impression que « ça semble mieux ». Chaque version est évaluée et testée en non-régression avec FORGE avant d’atteindre plus d’utilisateurs. Le README de FORGE décrit des scénarios, des règles déterministes, des juges LLM, une évaluation humaine et des expériences de référence contre candidat, avec des scores qui remontent toujours à un critère et à une étape de l’exécution.",
          "Je préfère le dire clairement : un score sans explication est une rumeur. Si une évaluation ne peut pas montrer quel critère et quelle étape ont produit un chiffre, personne ne peut agir dessus.",
          "J’ai aussi appris à garder le jeu d’évaluation honnête. Le README de FORGE décrit des scénarios publics, privés et frais, pour qu’une équipe ne puisse pas optimiser discrètement les tests qu’elle voit. C’est la partie de l’évaluation que la plupart des équipes sautent, et c’est celle qui protège d’un benchmark flatteur.",
        ],
      },
      {
        h: "Qui apprend vraiment dans une plateforme qui apprend ?",
        p: [
          "« FORGE apprend » est un raccourci, et il peut induire en erreur. Personne n’entraîne les poids d’un modèle dans ce dispositif. FORGE produit des preuves. NOVA les distille en courtes leçons, c’est-à-dire des instructions versionnées, et les déploie via une porte de preuve, un canari et une approbation, avec possibilité de retour arrière. ORBIT conserve les apprentissages gouvernés que NOVA récupère ensuite comme contexte.",
          "Cette séparation compte dans une grande entreprise. Des instructions peuvent être relues, comparées et annulées. Des poids ne le peuvent pas, du moins pas par ceux qui portent le processus métier.",
        ],
      },
      {
        h: "Comment garder l’autonomie sous contrôle ?",
        p: [
          "L’autonomie est un curseur, pas un interrupteur. La capacité d’ingénierie de NOVA, qui spécifie, code, teste et ouvre des pull requests, propose un mode guidé où un humain valide le plan et la fusion, et un mode autopilote qui va plus loin seul. Voici les contrôles que je considère non négociables :",
        ],
        list: [
          "Des validations humaines aux étapes qui touchent des systèmes externes.",
          "Une provenance enregistrée, pour qu’un utilisateur puisse demander pourquoi un élément a été retenu.",
          "Une politique d’autonomie et un registre d’outils, pour que les agents n’utilisent que ce qui leur est permis.",
          "Des versions proposées plutôt que des mises à jour silencieuses quand une source citée change.",
          "Le rejeu d’une exécution terminée sans écriture vers des systèmes externes, pour comparer coût, durée et contexte.",
        ],
      },
      {
        h: "Qu’ai-je mesuré et observé ?",
        p: [
          "Je dois être prudent ici. NOVA, ORBIT et FORGE sont des bêtas publiques, et je décris leur conception, pas une garantie de production. Les chiffres que je peux assumer viennent du travail de plateforme qui les entoure.",
          "Chez Devoteam, NOVA a atteint 800 collaborateurs grâce à une équipe pluridisciplinaire de 15 personnes, au sein d’un groupe de plus de 10 000 consultants dans 25 pays. Sur la plateforme DILA du secteur public, la même discipline de composants partagés et d’évaluation a produit les résultats ci-dessous.",
        ],
        table: {
          head: ["Mesure", "Résultat"],
          rows: [
            ["Délai de livraison d’une application RAG", "-60 % (de 10 à 4 semaines)"],
            ["Capacités techniques communes réutilisées", "75 %"],
            ["Coût par requête d’IA", "-30 %"],
            ["Fidélité du RAG (faithfulness)", "0,94"],
            ["Pertinence des réponses", "0,91"],
            ["Précision / rappel du contexte", "0,89 / 0,92"],
            ["Scénarios RAG prioritaires couverts", "85 %"],
          ],
        },
      },
    ],
    take: "Les plateformes agentiques d’entreprise se gagnent sur la gouvernance et le contexte, pas sur le choix du modèle. Si je recommençais, je construirais d’abord la boucle d’évaluation, ensuite les agents. Et je ne laisserais jamais l’adoption dépendre du fait que les utilisateurs apprennent quel agent appeler.",
    diagram: { nodes: ["Vous", "Orchestration", "Contexte · ORBIT", "Agents spécialistes", "Évaluation · FORGE"], caption: "NOVA agit, ORBIT sait, FORGE apprend. Chaque évaluation alimente le contexte et le comportement." },
    results: [{ v: "800", l: "collaborateurs utilisent NOVA chez Devoteam" }, { v: "15", l: "personnes dans l’équipe pluridisciplinaire" }, { v: "10 000+", l: "consultants dans le groupe, dans 25 pays" }, { v: "3", l: "briques : agir, savoir, apprendre" }],
    faq: [
      {
        q: "Quelle différence entre un assistant IA et une plateforme agentique ?",
        a: "Un assistant répond à un prompt dans un chat. Une plateforme agentique planifie une tâche, la délègue à des agents spécialisés, ancre chaque étape dans un contexte d’entreprise soumis aux habilitations, rend un livrable modifiable et mesure sa propre qualité dans le temps. La différence tient à la gouvernance et à l’évaluation, pas au modèle.",
      },
      {
        q: "Pourquoi l’utilisateur ne doit-il pas choisir l’agent à appeler ?",
        a: "Parce que cela l’oblige à apprendre l’organigramme d’une équipe de robots. Dans NOVA, un orchestrateur unique interprète l’intention et route le travail. L’utilisateur formule un objectif, la plateforme choisit les spécialistes et les compétences. D’après mon expérience, c’est le premier levier d’adoption.",
      },
      {
        q: "FORGE fait-il du fine-tuning des modèles ?",
        a: "Non. D’après la documentation de NOVA, personne n’entraîne les poids d’un modèle. FORGE évalue les exécutions et produit des preuves. NOVA les transforme en leçons versionnées, déployées via une porte de preuve, un canari et une approbation, et réversibles. ORBIT conserve les apprentissages gouvernés.",
      },
      {
        q: "NOVA, ORBIT et FORGE sont-ils prêts pour la production ?",
        a: "Ce sont des bêtas publiques. Les dépôts décrivent la conception et un parcours de vérification, et les README demandent de vérifier l’état du déploiement avant de s’y fier. Ce que je peux affirmer comme un fait, c’est que NOVA Suite est utilisé par 800 collaborateurs chez Devoteam.",
      },
      {
        q: "Par où commencer pour une plateforme agentique en entreprise ?",
        a: "Commencez par la boucle d’évaluation et un contexte gouverné, puis ajoutez des agents. Définissez qui porte chaque brique, comment un résultat est noté et comment les habilitations atteignent l’agent. Empiler des agents sur un contexte non gouverné ne fait que multiplier les échecs existants.",
      },
    ],
  },
  ar: {
    title: "بناء منصات وكيلة للمؤسسات: دروس من NOVA",
    dek: "ما الذي تغيّر حين توقفت عن بناء مساعد وبدأت ببناء فريق من الوكلاء يجب أن يعمل داخل شركة.",
    answer:
      "المنصة الوكيلة للمؤسسات هي نظام يخطط فيه منسّق واحد للعمل ويفوّضه إلى وكلاء متخصصين، ويُرسّخ كل خطوة في سياق مؤسسي خاضع للحوكمة، ويقيّم النتيجة قبل التوسع. وتفصل NOVA وORBIT وFORGE هذه الأدوار في ثلاثة مكوّنات هي التصرف والمعرفة والتعلم، بحيث تبقى لكل مكوّن مسؤولية واضحة.",
    sections: [
      {
        h: "ما المقصود بالمنصة الوكيلة للمؤسسات؟",
        p: [
          "ليست روبوت محادثة مزوّدًا بإضافات. إنها نظام متعدد الطبقات يحوّل النية إلى خطة، ويشغّل مهارات مُؤرشَفة بالإصدارات عبر وكلاء متخصصين، ويسلّم نتيجة قابلة للمراجعة. NOVA هي محاولتي في ذلك، وقد وصلت إلى 800 موظف في Devoteam.",
          "أختبر أي منصة تدّعي أنها وكيلة بثلاثة أسئلة. من المسؤول عن السياق؟ ومن يقرر ما يجوز للوكيل أن يفعله بمفرده؟ ومن يثبت أن الإصدار الجديد أفضل من سابقه؟ فإذا كانت الإجابات هي التعليمة والنموذج والعرض التجريبي، فنحن أمام مساعد طموح لا أمام منصة. ويتبع بقية المقال هذه الأسئلة الثلاثة، وهي تقابل المكوّنات التصرف والمعرفة والتعلم، وسأعرض كل مكوّن بما يلزم من التفصيل العملي الذي واجهته أثناء العمل.",
        ],
      },
      {
        h: "لماذا منسّق واحد بدل قائمة من الوكلاء؟",
        p: [
          "تنتظم NOVA في طبقات. منسّق واحد يؤطّر الطلب ويخطط ويفوّض المتخصصين ويشرف على العمل ثم يجمع النتيجة. وخلفه وكلاء متخصصون في المنتج والمشروع والتصميم والهندسة، يتقن كل منهم مجالًا ويحمل مهاراته المُؤرشَفة بالإصدارات. ويجلب وكيل بحث السياق، ويتحقق وكيل تدقيق من كل مُخرَج قبل أن يصل إلى المستخدم.",
          "لا يختار المستخدم وكيلًا أبدًا. يبدو هذا تفصيلًا في تجربة الاستخدام، لكنه القرار الأهم للتبنّي: لا يريد الناس تعلّم هيكل تنظيمي لروبوتات. يريدون أن يذكروا ما يسعون إلى إنجازه وأن يتلقوا عملًا يمكنهم تعديله.",
          "المُخرَج لا يقل أهمية عن التوجيه. يصف مستودع NOVA العام المصدر المُخرَجات بأنها عناصر منظّمة ومُؤرشَفة بالإصدارات وقابلة للتحرير مع استشهادات، لا رسائل محادثة يجب نسخها إلى مكان آخر. وهذا ما يجعل النتيجة قابلة للمراجعة البشرية، والمراجعة هي اللحظة التي تُبنى فيها الثقة.",
          "ومن هنا أرى أن جودة المنصة لا تُقاس بذكاء إجابة واحدة، بل بقدرة الفريق على فحص ما أُنتج وتصحيحه وإعادة استخدامه. فالمُخرَج القابل للتحرير والمُؤرشَف بالإصدارات يتيح مقارنة النسخ ومعرفة ما تغيّر ولماذا، وهذا ما يجعل العمل المشترك بين الإنسان والوكلاء ممكنًا في بيئة مؤسسية تتطلب المساءلة.",
        ],
      },
      {
        h: "لماذا يُعدّ السياق منتجًا وليس تعليمة؟",
        p: [
          "لم تكن معظم الإخفاقات التي رأيتها إخفاقات في النموذج. كان الوكلاء يستشهدون بقرار جرى استبداله، أو يخلطون بين نسختين من مواصفة، أو يغفلون قيدًا، أو يكشفون وثيقة لمن لا يجوز له الاطلاع عليها. ولا يعالج نموذج أفضل أيًّا من ذلك.",
          "لذلك تسترجع NOVA سياقها عبر ORBIT، باسم المستخدم وبصلاحياته، ويمكن للإجابة أن تقول لماذا أُدرج مصدر ما أو استُبعد. ومعاملة السياق كطبقة خاضعة للحوكمة جعلت المنصة أسهل في الوثوق بها وفي التدقيق. وبحسب الملف التعريفي العام، تعمل ORBIT على النقاط التالية:",
          "والنتيجة العملية أن طريقة تصحيح الأخطاء تتغير. حين تكون الإجابة خاطئة لم أعد أبدأ بإعادة كتابة التعليمة. أنظر أولًا في المصادر التي استُرجعت والمصادر التي استُبعدت وسبب ذلك. وفي أغلب الأحيان يكون الحل وثيقة متقادمة أو صلاحية ناقصة أو تناقضًا لم يُحسم بين مصدرين، وليس شيء من ذلك ظاهرًا من التعليمة نفسها. وهكذا ينتقل النقاش داخل الفريق من الذوق الشخصي في صياغة التعليمات إلى وقائع قابلة للفحص والتتبّع والتصحيح.",
        ],
        list: [
          "استيعاب مصادر الفريق مع اكتشاف البيانات الشخصية وحجبها.",
          "ذاكرة حيّة للقرارات والقيود والمخاطر، لها دورة حياة (مقترحة، معتمدة، مستبدلة، متقادمة، منسية) وأصل موثّق.",
          "تطبيق الصلاحيات وتصنيف البيانات قبل أن يصل أي شيء إلى وكيل.",
          "رمز سبب قابل للتفسير لكل عنصر أُبقي عليه أو استُبعد من السياق.",
          "موصّلات إلى الأدوات التي تستخدمها الفرق أصلًا، ومنها موصّلات MCP.",
        ],
      },
      {
        h: "كيف توزّع NOVA وORBIT وFORGE العمل بينها؟",
        p: [
          "فصلت المسؤوليات الثلاث عمدًا، لأن خلطها هو ما يجعل المنصة عصيّة على الفهم. لا تكرّر NOVA عمل ORBIT ولا FORGE: فهي تطلب السياق من ORBIT، ويقيّمها FORGE عبر محوّل.",
        ],
        table: {
          head: ["المكوّن", "الدور", "ما يتولاه", "ما لا يفعله"],
          rows: [
            ["NOVA", "التصرف", "النية والتخطيط والمهارات والتنفيذ والمُخرَجات", "لا يخزّن ذاكرة المؤسسة ولا يقيّم نفسه"],
            ["ORBIT", "المعرفة", "السياق والذاكرة والصلاحيات والاستشهادات", "لا يقيّم الوكلاء"],
            ["FORGE", "التعلم", "الآثار والتقييم والانحدارات والتجارب", "لا يغيّر سلوك NOVA بنفسه"],
          ],
        },
      },
      {
        h: "لماذا يجب التقييم قبل التوسع؟",
        p: [
          "لا يمكن لمنصة يستخدمها مئات الأشخاص أن تعتمد على انطباع بأن الأمر يبدو أفضل. يُقيَّم كل إصدار ويُختبر ضد الانحدار عبر FORGE قبل أن يصل إلى مستخدمين أكثر. يصف الملف التعريفي لـ FORGE سيناريوهات وقواعد حتمية وقضاة من النماذج اللغوية ومراجعة بشرية وتجارب مقارنة بين خط أساس ومرشّح، مع درجات تعود دائمًا إلى معيار وإلى خطوة من التنفيذ.",
          "أفضّل قولها صراحة: الدرجة بلا تفسير مجرد إشاعة. إن لم يستطع التقييم أن يبيّن أي معيار وأي خطوة أنتجا رقمًا ما، فلا يستطيع أحد أن يبني عليه قرارًا.",
          "وتعلمت أيضًا أن أُبقي مجموعة التقييم نزيهة. يصف الملف التعريفي لـ FORGE سيناريوهات عامة وخاصة وحديثة، حتى لا يستطيع فريق أن يحسّن أداءه بهدوء للاختبارات التي يراها فقط. وهذا هو الجزء الذي تتخطاه معظم الفرق في التقييم، وهو الجزء الذي يحميك من معيار مقارنة مجامل.",
          "وأنصح كل فريق بأن يسأل قبل كل إطلاق: ما الذي قد يسوء، وكيف سنعرف ذلك، ومن سيتخذ القرار عندئذ؟ فإذا غابت الإجابة عن أحد هذه الأسئلة فالمنصة لم تنضج بعد لتوسيع نطاق استخدامها، مهما بدا العرض التجريبي مقنعًا أمام الإدارة.",
        ],
      },
      {
        h: "من الذي يتعلم فعلًا في منصة تتعلم؟",
        p: [
          "عبارة «FORGE يتعلم» اختصار قد يضلّل. لا أحد يدرّب أوزان النموذج في هذا النظام. يُنتج FORGE أدلة. وتقطّرها NOVA إلى دروس قصيرة، أي تعليمات مُؤرشَفة بالإصدارات، وتنشرها عبر بوابة إثبات ونشر تجريبي محدود وموافقة، مع إمكانية التراجع. وتحتفظ ORBIT بالمعارف المكتسبة الخاضعة للحوكمة التي تسترجعها NOVA لاحقًا كسياق.",
          "هذا الفصل مهم في شركة كبيرة. يمكن مراجعة التعليمات ومقارنتها والتراجع عنها. أما الأوزان فلا، على الأقل ليس على يد أصحاب العملية المهنية.",
          "وبهذا المعنى فإن التعلم في منصة مؤسسية هو انضباط في إدارة التغيير أكثر منه سحرًا تقنيًا: دليل يُجمع، ثم درس يُصاغ، ثم اختبار يُجرى، ثم موافقة تُمنح، ثم أثر يُراقَب، مع بقاء الباب مفتوحًا للتراجع في أي لحظة.",
        ],
      },
      {
        h: "كيف نُبقي الاستقلالية تحت السيطرة؟",
        p: [
          "الاستقلالية مقبض متدرّج وليست مفتاحًا ثنائيًا. تتيح قدرة الهندسة في NOVA، التي تحدد المواصفات وتكتب الشيفرة وتختبرها وتفتح طلبات الدمج، وضعًا موجَّهًا يصادق فيه إنسان على الخطة وعلى الدمج، ووضع طيار آلي يمضي أبعد بمفرده. وهذه الضوابط التي أعدّها غير قابلة للتفاوض:",
        ],
        list: [
          "موافقات بشرية عند الخطوات التي تمسّ أنظمة خارجية.",
          "أصل موثّق للمعلومات، حتى يتمكن المستخدم من سؤال: لماذا أُدرج هذا العنصر؟",
          "سياسة استقلالية وسجل أدوات، كي لا يستخدم الوكلاء إلا ما يُسمح لهم به.",
          "إصدارات مقترحة بدل التحديثات الصامتة عندما يتغيّر مصدر مُستشهَد به.",
          "إعادة تشغيل عملية منتهية دون الكتابة في أنظمة خارجية، لمقارنة الكلفة والزمن والسياق.",
        ],
      },
      {
        h: "ماذا قسته وماذا رأيت؟",
        p: [
          "يجب أن أكون حذرًا هنا. NOVA وORBIT وFORGE نسخ تجريبية عامة، وأصف تصميمها لا ضمانًا للإنتاج. الأرقام التي أستطيع الدفاع عنها تأتي من عمل المنصات المحيط بها.",
          "في Devoteam وصلت NOVA إلى 800 موظف بفضل فريق متعدد التخصصات من 15 شخصًا، داخل مجموعة تضم أكثر من 10,000 مستشار في 25 دولة. وعلى منصة DILA في القطاع العام، أنتج الانضباط نفسه، من مكوّنات مشتركة وتقييم، النتائج الواردة أدناه.",
          "ولا أنسب هذه الأرقام إلى أداة بعينها. فهي ثمرة تضافر المكوّنات المشتركة والحوكمة والتقييم والتدريب، وهي تشرح لماذا أقول إن المنصة تُبنى مع قواعدها لا قبلها ولا بعدها.",
        ],
        table: {
          head: ["المقياس", "النتيجة"],
          rows: [
            ["زمن تسليم تطبيق RAG", "-60% (من 10 أسابيع إلى 4)"],
            ["القدرات التقنية المشتركة المُعاد استخدامها", "75%"],
            ["كلفة الطلب الواحد إلى الذكاء الاصطناعي", "-30%"],
            ["أمانة RAG (faithfulness)", "0.94"],
            ["ملاءمة الإجابات", "0.91"],
            ["دقة السياق / استرجاعه", "0.89 / 0.92"],
            ["سيناريوهات RAG ذات الأولوية المغطاة", "85%"],
          ],
        },
      },
    ],
    take: "تُكسب المنصات الوكيلة للمؤسسات بالحوكمة والسياق لا باختيار النموذج. لو بدأت من جديد لبنيت حلقة التقييم أولًا ثم الوكلاء. ولما تركت التبنّي يتوقف على أن يتعلم المستخدمون أي وكيل ينادون.",
    diagram: { nodes: ["أنت", "التنسيق", "السياق · ORBIT", "الوكلاء المتخصصون", "التقييم · FORGE"], caption: "NOVA تتصرف وORBIT تعرف وFORGE تتعلم. كل تقييم يغذّي السياق والسلوك." },
    results: [{ v: "800", l: "موظف يستخدمون NOVA في Devoteam" }, { v: "15", l: "شخصًا في الفريق متعدد التخصصات" }, { v: "+10,000", l: "مستشار في المجموعة، في 25 دولة" }, { v: "3", l: "مكوّنات: التصرف والمعرفة والتعلم" }],
    faq: [
      {
        q: "ما الفرق بين المساعد الذكي والمنصة الوكيلة؟",
        a: "يجيب المساعد عن تعليمة داخل محادثة. أما المنصة الوكيلة فتخطط للمهمة وتفوّضها إلى وكلاء متخصصين، وتُرسّخ كل خطوة في سياق مؤسسي خاضع للصلاحيات، وتسلّم مُخرَجًا قابلًا للتعديل، وتقيس جودتها بمرور الوقت. الفرق في الحوكمة والتقييم لا في النموذج.",
      },
      {
        q: "لماذا لا ينبغي للمستخدم أن يختار الوكيل الذي ينادونه؟",
        a: "لأن ذلك يُلزمه بتعلّم هيكل تنظيمي لروبوتات. في NOVA يفسّر منسّق واحد النية ويوجّه العمل. يصوغ المستخدم هدفًا، وتختار المنصة المتخصصين والمهارات. وفي تجربتي هذا أقوى محرّك للتبنّي، لأنه يزيل عن الناس عبء فهم بنية داخلية لا تعنيهم.",
      },
      {
        q: "هل يعيد FORGE ضبط النماذج؟",
        a: "لا. بحسب وثائق NOVA، لا أحد يدرّب أوزان النموذج. يقيّم FORGE عمليات التنفيذ وينتج أدلة. وتحوّلها NOVA إلى دروس مُؤرشَفة بالإصدارات، تُنشر عبر بوابة إثبات ونشر تجريبي محدود وموافقة، ويمكن التراجع عنها. وتحتفظ ORBIT بالمعارف المكتسبة الخاضعة للحوكمة.",
      },
      {
        q: "هل NOVA وORBIT وFORGE جاهزة للإنتاج؟",
        a: "إنها نسخ تجريبية عامة. تصف المستودعات التصميم ومسارًا للتحقق، وتطلب الملفات التعريفية التحقق من حالة النشر قبل الاعتماد عليها. وما أستطيع تأكيده كحقيقة هو أن NOVA Suite يستخدمها 800 موظف في Devoteam.",
      },
      {
        q: "من أين تبدأ الشركة عند بناء منصة وكيلة؟",
        a: "ابدأ بحلقة التقييم وبسياق خاضع للحوكمة، ثم أضف الوكلاء. حدّد من يملك كل مكوّن، وكيف تُقيَّم النتيجة، وكيف تصل الصلاحيات إلى الوكيل. إضافة وكلاء فوق سياق غير محكوم لا تفعل سوى مضاعفة الإخفاقات القائمة، أما الأساس السليم فهو التقييم والصلاحيات والمسؤولية الواضحة.",
      },
    ],
  },
};
