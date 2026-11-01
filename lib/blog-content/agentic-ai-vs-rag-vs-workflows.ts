import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "Agentic AI vs RAG vs Workflows: How to Choose",
    dek: "A practical guide to picking between a fixed workflow, a RAG assistant and an agent, based on what I saw building platforms for DILA and NOVA.",
    answer:
      "Use a fixed workflow when the steps are known in advance, RAG when the task is answering from knowledge that changes, and an agent only when the path cannot be written beforehand. Pick the least autonomous option that solves the problem, then earn more autonomy through evaluation.",
    sections: [
      {
        h: "What is the difference between agentic AI, RAG and workflows?",
        p: [
          "They answer three different questions. A workflow asks who decides the steps, and the answer is people, in advance. RAG asks where the knowledge comes from, and the answer is a retrieval step over your documents. An agent asks what to do next, and the answer is a model deciding at run time.",
          "Most confusion comes from reading them as rungs of a maturity ladder. They are not. They are tools with different failure modes, and the best one is usually the least autonomous one that works.",
        ],
      },
      {
        h: "How do you define each approach precisely?",
        p: [
          "Vague definitions produce vague architecture, so here are the ones I use with teams. The axis that matters is autonomy: who chooses the path.",
        ],
        list: [
          "Fixed workflow: a sequence of steps written by people. A model may be called inside a step, to classify or draft, but it never chooses the next step. Behaviour is predictable and can be tested step by step.",
          "RAG assistant: a pipeline that retrieves passages from a document collection and asks a model to answer from them, ideally with citations. The path is still fixed. What varies is the knowledge, which is why it fits content that changes.",
          "Single agent: a model that works in a loop, decides which tool to call next, reads the result and decides again until it judges the task done. The path is chosen at run time.",
          "Multi-agent system: several agents with specialised roles, coordinated by an orchestrator that plans, delegates and checks the work. It adds capability, and it adds coordination failures.",
        ],
      },
      {
        h: "How do you choose between a workflow, RAG and an agent?",
        p: [
          "Retrieval is often a component rather than a rival: an agent can call a retrieval tool, and a workflow can contain a RAG step. The table below is my own rule of thumb, not a standard. Read each row as a question to ask before you pick an architecture.",
        ],
        table: {
          head: ["Criterion", "Fixed workflow", "RAG assistant", "Agent (single or multi)"],
          rows: [
            ["Task predictability", "High: steps known in advance", "High: one retrieve-then-answer path", "Low: the path depends on what is found"],
            ["Need for fresh knowledge", "Low, data is passed in as input", "High: answers come from a changing corpus", "Medium to high, usually through retrieval tools"],
            ["Number of steps", "Few or many, but fixed", "Few and fixed", "Many and variable"],
            ["Tool use", "Scripted calls", "Retrieval only", "Dynamic choice of tools"],
            ["Cost of error", "Steps can be gated, so risk is controllable", "Medium: answers can be checked against citations", "Needs approval gates when the cost is high"],
            ["Auditability", "Easiest: the path is the code", "Good: sources are cited", "Hardest: needs recorded traces"],
            ["Evaluation difficulty", "Lowest: test each step", "Moderate: score retrieval and answers separately", "Highest: score paths and outcomes"],
          ],
        },
      },
      {
        h: "What are the rules for where to start?",
        p: [
          "These rules come from a single principle: every step up in autonomy buys flexibility and costs predictability. Pay that price only when the problem demands it.",
        ],
        list: [
          "Start with a workflow if you can draw the steps on a whiteboard. Most business processes can.",
          "Add RAG when the missing ingredient is knowledge, not reasoning. Fix retrieval quality before you touch the model.",
          "Move to a single agent only when the number of branches makes the workflow unmaintainable, or when the next step truly depends on what the previous one returned.",
          "Go multi-agent only when one agent’s context or toolset becomes too large to govern, and when you can evaluate each specialist on its own.",
          "Put a human approval gate before any step that writes to an external system, whatever the approach.",
          "Never raise autonomy without an evaluation showing that the new version beats the previous one on the same scenarios.",
        ],
      },
      {
        h: "What did the DILA platform show about RAG and agentic workflows?",
        p: [
          "On the sovereign AI platform I worked on for DILA, the services of the Prime Minister, the starting problem was duplication. Every AI application had to rebuild document ingestion, embeddings, retrieval, orchestration, security, evaluation and observability. We moved from building each application separately to assembling RAG applications from reusable, governed components.",
          "Agentic workflow prototyping then ran on the same foundations. Agentic applications could build on existing orchestration patterns and tool integrations instead of starting from nothing, and the case page records a 50% reduction in implementation time for prototyping them.",
          "The lesson I draw is architectural. The agent was not a separate stack. It sat on the same governed components as the RAG applications, so autonomy was an addition on a platform and not a new project with its own security and evaluation story.",
        ],
      },
      {
        h: "When is a multi-agent system justified? The NOVA example",
        p: [
          "NOVA is a multi-agent system, and I built it as one for a reason. Its job is to turn an intent into a plan and an editable deliverable, and the path genuinely differs from one request to the next. An orchestrator frames the request, delegates to specialist agents for product, project, design and engineering, and a validation agent checks each deliverable. Context comes from ORBIT with the user’s permissions, and FORGE evaluates the runs.",
          "My own reading is that the autonomy sits only where the path varies. The surrounding parts, such as versioned skills, governed retrieval and structured deliverables, behave much more like workflows and RAG. I would not have justified the orchestration for a task whose steps I could list in advance.",
          "A caution on status. NOVA, ORBIT and FORGE are public repositories in beta, and I describe their design, not a production guarantee. What I can state as a fact is that NOVA Suite is used by 800 employees at Devoteam.",
        ],
      },
      {
        h: "How do you earn autonomy with evaluation?",
        p: [
          "Evaluation is the gate between levels. Before moving from one approach to the next, define scenarios, score the current version and require the more autonomous candidate to beat it on the same cases.",
          "For RAG, DILA used four measures: faithfulness, answer relevancy, context precision and context recall. For agents, the FORGE README describes scenarios, deterministic rules, LLM judges, human review and baseline versus candidate experiments. The principle is the same: a score must trace back to a criterion and a step.",
          "Include the cases where the system must refuse or escalate, not only the ones where it should succeed. And measure cost, because autonomy tends to add model calls. At DILA, pipeline optimisation and reuse brought the cost per AI request down by 30%.",
        ],
      },
      {
        h: "What did I measure and see?",
        p: [
          "These figures come from the DILA case study and concern the platform approach: reusable components, evaluation and governed orchestration. They are not a comparison between workflows, RAG and agents, and I do not have one to offer.",
        ],
        table: {
          head: ["Measure", "Result"],
          rows: [
            ["RAG application delivery time", "-60% (10 weeks to 4)"],
            ["Common technical capabilities reused", "75%"],
            ["Agentic workflow prototyping implementation time", "-50%"],
            ["Cost per AI request", "-30%"],
            ["RAG faithfulness", "0.94"],
            ["Answer relevancy", "0.91"],
            ["Context precision / recall", "0.89 / 0.92"],
            ["Priority RAG scenarios covered by evaluation", "85%"],
          ],
        },
      },
    ],
    take: "I have seen more projects fail from too much autonomy too early than from too little. If I can write the steps down, I build a workflow, and I add retrieval or an agent only when I can show with an evaluation that the simpler option falls short. Autonomy is something a system earns, not something an architecture diagram grants.",
    diagram: { nodes: ["Fixed workflow", "RAG assistant", "Single agent", "Multi-agent system"], caption: "Autonomy rises from left to right, and so does the evaluation burden. Move one step only when the simpler option has been measured and falls short." },
    results: [{ v: "-60%", l: "RAG application delivery time, from 10 weeks to 4" }, { v: "75%", l: "of common technical capabilities reused" }, { v: "-50%", l: "agentic workflow prototyping implementation time" }, { v: "0.94", l: "RAG faithfulness" }, { v: "800", l: "employees use NOVA at Devoteam" }],
    faq: [
      {
        q: "What is the difference between agentic AI and RAG?",
        a: "RAG retrieves passages from your documents and answers from them along a fixed path. An agent decides at run time which tools to call and what to do next. RAG is about where knowledge comes from, agency is about who chooses the path, and an agent can use RAG as one of its tools.",
      },
      {
        q: "When should I use a workflow instead of an AI agent?",
        a: "Use a workflow when you can write the steps in advance, when errors are costly and when you need a clear audit trail. A model can still classify or draft inside a step. If the path never changes, autonomy only adds risk and makes evaluation harder.",
      },
      {
        q: "Is RAG a kind of agent?",
        a: "Not by itself. A basic RAG assistant follows one retrieve-then-answer path that people designed. It becomes agentic when a model decides whether to retrieve, what to retrieve and what to do with the result, in a loop. The boundary is who controls the path.",
      },
      {
        q: "Do I need a multi-agent system?",
        a: "Rarely at the start. Consider it when one agent’s context or toolset is too large to govern and each specialist can be evaluated on its own. NOVA uses an orchestrator with specialist agents because its tasks vary a lot, but a simpler design is usually the better first step.",
      },
      {
        q: "How do I know my system is ready for more autonomy?",
        a: "When an evaluation says so. Define scenarios, including cases where the system should refuse or escalate, score the current version and test the more autonomous candidate against it. If it does not clearly beat the baseline, keep the simpler option and keep human approval on risky steps.",
      },
    ],
  },
  fr: {
    title: "IA agentique, RAG ou workflows : comment choisir",
    dek: "Un guide pratique pour choisir entre un workflow fixe, un assistant RAG et un agent, à partir de ce que j’ai observé en construisant des plateformes pour la DILA et NOVA.",
    answer:
      "Utilisez un workflow fixe quand les étapes sont connues, du RAG pour répondre à partir de connaissances qui évoluent, et un agent seulement quand le chemin ne s’écrit pas d’avance. Choisissez l’option la moins autonome qui résout le problème, puis gagnez de l’autonomie par l’évaluation.",
    sections: [
      {
        h: "Quelle différence entre IA agentique, RAG et workflows ?",
        p: [
          "Ils répondent à trois questions différentes. Un workflow demande qui décide des étapes, et la réponse est : des personnes, à l’avance. Le RAG demande d’où viennent les connaissances, et la réponse est : d’une étape de recherche dans vos documents. Un agent demande quoi faire ensuite, et la réponse est : un modèle qui décide à l’exécution.",
          "La confusion vient surtout de ce qu’on les lit comme les barreaux d’une échelle de maturité. Ce n’est pas le cas. Ce sont des outils avec des modes de défaillance différents, et le meilleur choix est généralement le moins autonome qui fonctionne.",
        ],
      },
      {
        h: "Comment définir précisément chaque approche ?",
        p: [
          "Des définitions floues produisent des architectures floues. Voici celles que j’utilise avec les équipes. L’axe qui compte est l’autonomie : qui choisit le chemin.",
        ],
        list: [
          "Workflow fixe : une suite d’étapes écrite par des personnes. Un modèle peut être appelé dans une étape, pour classer ou rédiger, mais il ne choisit jamais l’étape suivante. Le comportement est prévisible et testable étape par étape.",
          "Assistant RAG : un pipeline qui récupère des passages dans un corpus de documents et demande à un modèle de répondre à partir d’eux, idéalement avec des citations. Le chemin reste fixe. Ce qui varie, c’est la connaissance, d’où son intérêt pour les contenus qui changent.",
          "Agent unique : un modèle qui travaille en boucle, décide quel outil appeler, lit le résultat et décide à nouveau jusqu’à estimer la tâche terminée. Le chemin est choisi à l’exécution.",
          "Système multi-agents : plusieurs agents aux rôles spécialisés, coordonnés par un orchestrateur qui planifie, délègue et contrôle le travail. Il ajoute de la capacité, et il ajoute des défaillances de coordination.",
        ],
      },
      {
        h: "Comment choisir entre workflow, RAG et agent ?",
        p: [
          "La recherche documentaire est souvent un composant plutôt qu’un concurrent : un agent peut appeler un outil de recherche, et un workflow peut contenir une étape RAG. Le tableau ci-dessous est ma règle empirique, pas une norme. Lisez chaque ligne comme une question à se poser avant de choisir une architecture.",
        ],
        table: {
          head: ["Critère", "Workflow fixe", "Assistant RAG", "Agent (unique ou multiple)"],
          rows: [
            ["Prévisibilité de la tâche", "Élevée : étapes connues d’avance", "Élevée : un seul chemin recherche puis réponse", "Faible : le chemin dépend de ce qui est trouvé"],
            ["Besoin de connaissances à jour", "Faible, les données arrivent en entrée", "Élevé : les réponses viennent d’un corpus qui évolue", "Moyen à élevé, en général via des outils de recherche"],
            ["Nombre d’étapes", "Peu ou beaucoup, mais fixes", "Peu et fixes", "Nombreuses et variables"],
            ["Usage d’outils", "Appels scriptés", "Recherche uniquement", "Choix dynamique des outils"],
            ["Coût d’une erreur", "Les étapes peuvent être verrouillées, le risque se maîtrise", "Moyen : les réponses se vérifient dans les citations", "Exige des validations humaines quand le coût est élevé"],
            ["Auditabilité", "La plus simple : le chemin, c’est le code", "Bonne : les sources sont citées", "La plus difficile : exige des traces enregistrées"],
            ["Difficulté d’évaluation", "La plus faible : on teste chaque étape", "Moyenne : on note séparément la recherche et la réponse", "La plus forte : on note les chemins et les résultats"],
          ],
        },
      },
      {
        h: "Quelles règles appliquer pour bien démarrer ?",
        p: [
          "Ces règles découlent d’un principe : chaque palier d’autonomie apporte de la souplesse et coûte de la prévisibilité. Ne payez ce prix que si le problème l’exige.",
        ],
        list: [
          "Commencez par un workflow si vous pouvez dessiner les étapes sur un tableau blanc. C’est le cas de la plupart des processus métier.",
          "Ajoutez du RAG quand l’ingrédient manquant est la connaissance, pas le raisonnement. Améliorez la qualité de la recherche avant de toucher au modèle.",
          "Passez à un agent unique seulement quand le nombre de branches rend le workflow impossible à maintenir, ou quand l’étape suivante dépend vraiment du résultat de la précédente.",
          "N’allez vers le multi-agents que lorsque le contexte ou les outils d’un seul agent deviennent trop vastes à gouverner, et que vous pouvez évaluer chaque spécialiste séparément.",
          "Placez une validation humaine avant toute étape qui écrit dans un système externe, quelle que soit l’approche.",
          "N’augmentez jamais l’autonomie sans une évaluation montrant que la nouvelle version fait mieux que la précédente sur les mêmes scénarios.",
        ],
      },
      {
        h: "Que m’a appris la plateforme DILA sur le RAG et les workflows agentiques ?",
        p: [
          "Sur la plateforme d’IA souveraine à laquelle j’ai contribué pour la DILA, les services du Premier ministre, le problème de départ était la duplication. Chaque application d’IA devait reconstruire l’ingestion de documents, les embeddings, la recherche, l’orchestration, la sécurité, l’évaluation et l’observabilité. Nous sommes passés d’applications construites une à une à des applications RAG assemblées à partir de composants réutilisables et gouvernés.",
          "Le prototypage de workflows agentiques s’est ensuite appuyé sur les mêmes fondations. Les applications agentiques pouvaient s’appuyer sur des schémas d’orchestration et des intégrations d’outils existants au lieu de repartir de zéro, et la page du cas client mentionne une réduction de 50 % du temps de mise en œuvre pour les prototyper.",
          "La leçon que j’en tire est architecturale. L’agent n’était pas une pile séparée. Il reposait sur les mêmes composants gouvernés que les applications RAG, si bien que l’autonomie était un ajout sur une plateforme, et non un nouveau projet avec sa propre histoire de sécurité et d’évaluation.",
        ],
      },
      {
        h: "Quand un système multi-agents se justifie-t-il ? L’exemple de NOVA",
        p: [
          "NOVA est un système multi-agents, et je l’ai conçu ainsi pour une raison. Sa mission est de transformer une intention en plan et en livrable modifiable, et le chemin diffère réellement d’une demande à l’autre. Un orchestrateur cadre la demande, délègue à des agents spécialisés en produit, projet, design et ingénierie, et un agent de validation contrôle chaque livrable. Le contexte vient d’ORBIT avec les droits de l’utilisateur, et FORGE évalue les exécutions.",
          "Ma lecture personnelle est que l’autonomie se concentre là où le chemin varie. Les parties qui l’entourent, comme les compétences versionnées, la recherche gouvernée et les livrables structurés, ressemblent beaucoup plus à des workflows et à du RAG.",
          "Un mot de prudence sur le statut. NOVA, ORBIT et FORGE sont des dépôts publics en bêta, et je décris leur conception, pas une garantie de production. Ce que je peux affirmer comme un fait, c’est que NOVA Suite est utilisé par 800 collaborateurs chez Devoteam.",
        ],
      },
      {
        h: "Comment gagner de l’autonomie grâce à l’évaluation ?",
        p: [
          "L’évaluation est la porte entre les paliers. Avant de passer d’une approche à la suivante, définissez des scénarios, notez la version actuelle et exigez que le candidat plus autonome la batte sur les mêmes cas.",
          "Pour le RAG, la DILA a utilisé quatre mesures : fidélité (faithfulness), pertinence des réponses, précision du contexte et rappel du contexte. Pour les agents, le README de FORGE décrit des scénarios, des règles déterministes, des juges LLM, une évaluation humaine et des expériences de référence contre candidat. Le principe est identique : un score doit remonter à un critère et à une étape.",
          "Incluez les cas où le système doit refuser ou escalader, pas seulement ceux où il doit réussir. Et mesurez le coût, car l’autonomie tend à multiplier les appels au modèle. À la DILA, l’optimisation des pipelines et la réutilisation ont réduit de 30 % le coût par requête d’IA.",
        ],
      },
      {
        h: "Qu’ai-je mesuré et observé ?",
        p: [
          "Ces chiffres viennent de l’étude de cas DILA et concernent l’approche de plateforme : composants réutilisables, évaluation et orchestration gouvernée. Ils ne comparent pas workflows, RAG et agents, et je n’ai pas de comparaison de ce type à proposer.",
        ],
        table: {
          head: ["Mesure", "Résultat"],
          rows: [
            ["Délai de livraison d’une application RAG", "-60 % (de 10 à 4 semaines)"],
            ["Capacités techniques communes réutilisées", "75 %"],
            ["Temps de mise en œuvre du prototypage de workflows agentiques", "-50 %"],
            ["Coût par requête d’IA", "-30 %"],
            ["Fidélité du RAG (faithfulness)", "0,94"],
            ["Pertinence des réponses", "0,91"],
            ["Précision / rappel du contexte", "0,89 / 0,92"],
            ["Scénarios RAG prioritaires couverts par l’évaluation", "85 %"],
          ],
        },
      },
    ],
    take: "J’ai vu plus de projets échouer par trop d’autonomie trop tôt que par trop peu. Si je peux écrire les étapes, je construis un workflow, et je n’ajoute de la recherche ou un agent que si une évaluation montre que l’option plus simple ne suffit pas. L’autonomie, un système la gagne, aucun schéma d’architecture ne l’accorde.",
    diagram: { nodes: ["Workflow fixe", "Assistant RAG", "Agent unique", "Système multi-agents"], caption: "L’autonomie augmente de gauche à droite, et la charge d’évaluation avec elle. Ne montez d’un cran que si l’option plus simple a été mesurée et ne suffit pas." },
    results: [{ v: "-60 %", l: "délai de livraison d’une application RAG, de 10 à 4 semaines" }, { v: "75 %", l: "des capacités techniques communes réutilisées" }, { v: "-50 %", l: "temps de mise en œuvre du prototypage de workflows agentiques" }, { v: "0,94", l: "fidélité du RAG" }, { v: "800", l: "collaborateurs utilisent NOVA chez Devoteam" }],
    faq: [
      {
        q: "Quelle est la différence entre IA agentique et RAG ?",
        a: "Le RAG récupère des passages dans vos documents et répond à partir d’eux selon un chemin fixe. Un agent décide à l’exécution quels outils appeler et quoi faire ensuite. Le RAG porte sur l’origine des connaissances, l’agentivité sur qui choisit le chemin, et un agent peut utiliser le RAG comme l’un de ses outils.",
      },
      {
        q: "Quand utiliser un workflow plutôt qu’un agent IA ?",
        a: "Utilisez un workflow quand vous pouvez écrire les étapes à l’avance, quand les erreurs coûtent cher et quand une piste d’audit claire est nécessaire. Un modèle peut quand même classer ou rédiger dans une étape. Si le chemin ne change jamais, l’autonomie n’ajoute que du risque et complique l’évaluation.",
      },
      {
        q: "Le RAG est-il une forme d’agent ?",
        a: "Pas en soi. Un assistant RAG de base suit un unique chemin recherche puis réponse, conçu par des personnes. Il devient agentique quand un modèle décide s’il faut chercher, quoi chercher et que faire du résultat, en boucle. La frontière, c’est qui contrôle le chemin.",
      },
      {
        q: "Ai-je besoin d’un système multi-agents ?",
        a: "Rarement au départ. Envisagez-le quand le contexte ou les outils d’un agent sont trop vastes à gouverner et que chaque spécialiste peut être évalué séparément. NOVA utilise un orchestrateur et des agents spécialisés parce que ses tâches varient beaucoup, mais une conception plus simple est souvent un meilleur premier pas.",
      },
      {
        q: "Comment savoir si mon système est prêt pour plus d’autonomie ?",
        a: "Quand une évaluation le dit. Définissez des scénarios, y compris des cas où le système doit refuser ou escalader, notez la version actuelle et testez le candidat plus autonome contre elle. S’il ne la bat pas nettement, gardez l’option simple et la validation humaine sur les étapes risquées.",
      },
    ],
  },
  ar: {
    title: "الذكاء الاصطناعي الوكيل أم RAG أم سير العمل: كيف تختار",
    dek: "دليل عملي للاختيار بين سير عمل ثابت ومساعد RAG ووكيل، استنادًا إلى ما رأيته أثناء بناء منصات لـ DILA وNOVA.",
    answer:
      "استخدم سير عمل ثابتًا حين تكون الخطوات معروفة سلفًا، واستخدم RAG حين تكون المهمة الإجابة انطلاقًا من معرفة متغيّرة، ولا تلجأ إلى وكيل إلا حين يتعذر كتابة المسار مسبقًا. اختر الخيار الأقل استقلالية الذي يحل المشكلة، ثم اكسب مزيدًا من الاستقلالية عبر التقييم.",
    sections: [
      {
        h: "ما الفرق بين الذكاء الاصطناعي الوكيل وRAG وسير العمل؟",
        p: [
          "تجيب هذه المقاربات الثلاث عن أسئلة مختلفة. يسأل سير العمل: من يقرر الخطوات؟ والجواب: أشخاص، مسبقًا. ويسأل RAG: من أين تأتي المعرفة؟ والجواب: من خطوة استرجاع في وثائقك. ويسأل الوكيل: ماذا نفعل بعد ذلك؟ والجواب: نموذج يقرر أثناء التشغيل.",
          "ينشأ أغلب الالتباس من قراءتها كدرجات في سلّم نضج. وليست كذلك. إنها أدوات لها أنماط إخفاق مختلفة، وأفضلها في العادة هو الأقل استقلالية بين ما ينجح.",
          "ولهذا أبدأ كل نقاش مع الفرق بسؤال بسيط: هل نستطيع كتابة الخطوات اليوم؟ فإن كان الجواب نعم فنحن في منطقة سير العمل، وإن كانت المعرفة هي الناقصة فنحن في منطقة RAG، ولا يبدأ الحديث عن الوكلاء إلا بعد ذلك.",
        ],
      },
      {
        h: "كيف نعرّف كل مقاربة تعريفًا دقيقًا؟",
        p: [
          "التعريفات الغامضة تنتج هندسة غامضة، وهذه التعريفات التي أستخدمها مع الفرق. المحور الحاسم هو الاستقلالية: من يختار المسار.",
        ],
        list: [
          "سير العمل الثابت: تسلسل خطوات يكتبه أشخاص. قد يُستدعى نموذج داخل خطوة للتصنيف أو للصياغة، لكنه لا يختار الخطوة التالية أبدًا. السلوك متوقّع ويمكن اختباره خطوة بخطوة.",
          "مساعد RAG: خط معالجة يسترجع مقاطع من مجموعة وثائق ويطلب من نموذج أن يجيب انطلاقًا منها، ويفضّل مع استشهادات. يبقى المسار ثابتًا. والمتغيّر هو المعرفة، ولذلك يناسب المحتوى المتجدد.",
          "وكيل منفرد: نموذج يعمل في حلقة، يقرر أي أداة يستدعي، ويقرأ النتيجة ثم يقرر من جديد حتى يرى أن المهمة اكتملت. يُختار المسار أثناء التشغيل.",
          "نظام متعدد الوكلاء: عدة وكلاء بأدوار متخصصة ينسّقهم منسّق يخطط ويفوّض ويراجع العمل. يضيف قدرة، ويضيف أيضًا إخفاقات في التنسيق.",
        ],
      },
      {
        h: "كيف نختار بين سير العمل وRAG والوكيل؟",
        p: [
          "كثيرًا ما يكون الاسترجاع مكوّنًا لا منافسًا: يستطيع الوكيل أن يستدعي أداة استرجاع، ويستطيع سير العمل أن يتضمن خطوة RAG. والجدول التالي قاعدة تقريبية من عندي وليس معيارًا. اقرأ كل صف على أنه سؤال تطرحه قبل اختيار الهندسة.",
        ],
        table: {
          head: ["المعيار", "سير عمل ثابت", "مساعد RAG", "وكيل (منفرد أو متعدد)"],
          rows: [
            ["إمكانية توقّع المهمة", "عالية: الخطوات معروفة سلفًا", "عالية: مسار واحد استرجاع ثم إجابة", "منخفضة: المسار يتوقف على ما يُعثر عليه"],
            ["الحاجة إلى معرفة حديثة", "منخفضة، فالبيانات تُمرَّر مدخلًا", "عالية: الإجابات من مجموعة متغيّرة", "متوسطة إلى عالية، غالبًا عبر أدوات استرجاع"],
            ["عدد الخطوات", "قليل أو كثير لكنه ثابت", "قليل وثابت", "كثير ومتغيّر"],
            ["استخدام الأدوات", "استدعاءات مكتوبة سلفًا", "استرجاع فقط", "اختيار ديناميكي للأدوات"],
            ["كلفة الخطأ", "يمكن إحكام الخطوات فيسهل ضبط المخاطر", "متوسطة: يمكن التحقق من الإجابات عبر الاستشهادات", "تتطلب موافقات بشرية حين تكون الكلفة عالية"],
            ["قابلية التدقيق", "الأسهل: المسار هو الشيفرة", "جيدة: المصادر مُستشهَد بها", "الأصعب: تتطلب آثارًا مسجّلة"],
            ["صعوبة التقييم", "الأدنى: نختبر كل خطوة", "متوسطة: نقيّم الاسترجاع والإجابة على حدة", "الأعلى: نقيّم المسارات والنتائج"],
          ],
        },
      },
      {
        h: "ما القواعد التي أنصح بها للبداية؟",
        p: [
          "تنبع هذه القواعد من مبدأ واحد: كل درجة إضافية من الاستقلالية تمنحك مرونة وتكلّفك قابلية التوقع. لا تدفع هذا الثمن إلا إذا فرضته المشكلة، ولا تعتمد في قرارك على حماسة الفريق للتقنية الأحدث.",
        ],
        list: [
          "ابدأ بسير عمل إن استطعت رسم الخطوات على سبورة. وهذا ممكن في أغلب العمليات المهنية.",
          "أضف RAG حين يكون الناقص هو المعرفة لا الاستدلال. وحسّن جودة الاسترجاع قبل أن تمسّ النموذج.",
          "انتقل إلى وكيل منفرد فقط حين يجعل عدد الفروع سير العمل غير قابل للصيانة، أو حين تتوقف الخطوة التالية فعلًا على ما أعادته السابقة.",
          "اتجه إلى تعدد الوكلاء فقط حين يصبح سياق وكيل واحد أو أدواته أكبر من أن تُحكَم حوكمته، وحين تستطيع تقييم كل متخصص على حدة.",
          "ضع موافقة بشرية قبل كل خطوة تكتب في نظام خارجي، أيًّا كانت المقاربة.",
          "لا ترفع الاستقلالية دون تقييم يبيّن أن الإصدار الجديد يتفوق على السابق في السيناريوهات نفسها.",
        ],
      },
      {
        h: "ماذا علّمتني منصة DILA عن RAG وسير العمل الوكيل؟",
        p: [
          "في منصة الذكاء الاصطناعي السيادي التي عملت عليها لصالح DILA، أي خدمات رئيس الوزراء، كانت المشكلة الأولى هي التكرار. فكل تطبيق ذكاء اصطناعي كان عليه أن يعيد بناء استيعاب الوثائق والتضمينات والاسترجاع والتنسيق والأمن والتقييم والمراقبة. وانتقلنا من بناء كل تطبيق على حدة إلى تجميع تطبيقات RAG من مكوّنات قابلة لإعادة الاستخدام وخاضعة للحوكمة.",
          "ثم جرت نمذجة سير العمل الوكيل على الأسس نفسها. استطاعت التطبيقات الوكيلة البناء على أنماط تنسيق وتكاملات أدوات قائمة بدل الانطلاق من الصفر، وتسجّل صفحة دراسة الحالة انخفاضًا بنسبة 50% في زمن التنفيذ لنمذجتها.",
          "الدرس الذي أستخلصه هندسي. لم يكن الوكيل مكدّسًا منفصلًا. بل استند إلى المكوّنات الخاضعة للحوكمة نفسها التي تستند إليها تطبيقات RAG، فكانت الاستقلالية إضافة على منصة لا مشروعًا جديدًا بقصة أمن وتقييم خاصة به.",
          "وهذا يفسّر لماذا أعتقد أن سؤال الاختيار بين المقاربات لا ينفصل عن سؤال المنصة: فحين تكون المكوّنات المشتركة جاهزة، يصبح الانتقال من مساعد RAG إلى تجربة وكيلة قرارًا قابلًا للقياس والتراجع، لا مغامرة تبدأ من الصفر.",
        ],
      },
      {
        h: "متى يكون النظام متعدد الوكلاء مبرَّرًا؟ مثال NOVA",
        p: [
          "NOVA نظام متعدد الوكلاء، وبنيته على هذا النحو لسبب. مهمته تحويل النية إلى خطة ومُخرَج قابل للتعديل، والمسار يختلف فعلًا من طلب إلى آخر. يؤطّر منسّق الطلب ويفوّض وكلاء متخصصين في المنتج والمشروع والتصميم والهندسة، ويتحقق وكيل تدقيق من كل مُخرَج. ويأتي السياق من ORBIT بصلاحيات المستخدم، ويقيّم FORGE عمليات التنفيذ.",
          "قراءتي الشخصية أن الاستقلالية تتركز حيث يتغيّر المسار. أما الأجزاء المحيطة، كالمهارات المُؤرشَفة بالإصدارات والاسترجاع الخاضع للحوكمة والمُخرَجات المنظّمة، فهي أقرب بكثير إلى سير العمل وRAG. ولم أكن لأبرّر هذا التنسيق لمهمة أستطيع سرد خطواتها سلفًا. هذا ما أعنيه بأن الوكلاء ليسوا هدفًا بل وسيلة تُستعمل حيث يعجز المسار الثابت.",
          "وتنبيه بشأن الحالة. NOVA وORBIT وFORGE مستودعات عامة في طور تجريبي، وأصف تصميمها لا ضمانًا للإنتاج. وما أستطيع تأكيده كحقيقة هو أن NOVA Suite يستخدمها 800 موظف في Devoteam.",
        ],
      },
      {
        h: "كيف نكسب الاستقلالية عبر التقييم؟",
        p: [
          "التقييم هو البوابة بين المستويات. قبل الانتقال من مقاربة إلى التي تليها، حدّد سيناريوهات وقيّم الإصدار الحالي واشترط أن يتفوق عليه المرشّح الأكثر استقلالية في الحالات نفسها.",
          "في RAG استخدمت DILA أربعة مقاييس: الأمانة (faithfulness) وملاءمة الإجابة ودقة السياق واسترجاع السياق. وفي الوكلاء يصف الملف التعريفي لـ FORGE سيناريوهات وقواعد حتمية وقضاة من النماذج اللغوية ومراجعة بشرية وتجارب مقارنة بين خط أساس ومرشّح. والمبدأ واحد: يجب أن تعود الدرجة إلى معيار وإلى خطوة.",
          "أدرج الحالات التي يجب أن يرفض فيها النظام أو يصعّد الأمر، لا الحالات التي ينبغي أن ينجح فيها فقط. وقِس الكلفة، لأن الاستقلالية تميل إلى زيادة استدعاءات النموذج. وفي DILA أدى تحسين خطوط المعالجة وإعادة الاستخدام إلى خفض كلفة الطلب الواحد إلى الذكاء الاصطناعي بنسبة 30%.",
          "وأخيرًا، احتفظ بالإصدار السابق قابلًا للاستعادة. فإذا لم يثبت المرشّح الأكثر استقلالية تفوقه فعليًّا، فالرجوع إلى الخيار الأبسط ليس تراجعًا بل قرار هندسي سليم يحمي المستخدمين ويحفظ الثقة بالمنصة.",
        ],
      },
      {
        h: "ماذا قسته وماذا رأيت؟",
        p: [
          "تأتي هذه الأرقام من دراسة حالة DILA وتخص مقاربة المنصة: مكوّنات قابلة لإعادة الاستخدام وتقييم وتنسيق خاضع للحوكمة. وهي ليست مقارنة بين سير العمل وRAG والوكلاء، وليست لديّ مقارنة كهذه لأقدّمها.",
        ],
        table: {
          head: ["المقياس", "النتيجة"],
          rows: [
            ["زمن تسليم تطبيق RAG", "-60% (من 10 أسابيع إلى 4)"],
            ["القدرات التقنية المشتركة المُعاد استخدامها", "75%"],
            ["زمن تنفيذ نمذجة سير العمل الوكيل", "-50%"],
            ["كلفة الطلب الواحد إلى الذكاء الاصطناعي", "-30%"],
            ["أمانة RAG (faithfulness)", "0.94"],
            ["ملاءمة الإجابات", "0.91"],
            ["دقة السياق / استرجاعه", "0.89 / 0.92"],
            ["سيناريوهات RAG ذات الأولوية التي يغطيها التقييم", "85%"],
          ],
        },
      },
    ],
    take: "رأيت مشاريع تفشل بسبب استقلالية مفرطة مبكرة أكثر مما تفشل بسبب قلّتها. فإن استطعت كتابة الخطوات بنيت سير عمل، ولا أضيف الاسترجاع أو الوكيل إلا إذا أثبت التقييم أن الخيار الأبسط لا يكفي. الاستقلالية يكسبها النظام، ولا يمنحها مخطط هندسي.",
    diagram: { nodes: ["سير عمل ثابت", "مساعد RAG", "وكيل منفرد", "نظام متعدد الوكلاء"], caption: "تزداد الاستقلالية من اليمين إلى اليسار وتزداد معها أعباء التقييم. لا ترتقِ درجة إلا بعد قياس الخيار الأبسط وثبوت قصوره." },
    results: [{ v: "-60%", l: "زمن تسليم تطبيق RAG، من 10 أسابيع إلى 4" }, { v: "75%", l: "من القدرات التقنية المشتركة أُعيد استخدامها" }, { v: "-50%", l: "زمن تنفيذ نمذجة سير العمل الوكيل" }, { v: "0.94", l: "أمانة RAG" }, { v: "800", l: "موظف يستخدمون NOVA في Devoteam" }],
    faq: [
      {
        q: "ما الفرق بين الذكاء الاصطناعي الوكيل وRAG؟",
        a: "يسترجع RAG مقاطع من وثائقك ويجيب انطلاقًا منها عبر مسار ثابت. أما الوكيل فيقرر أثناء التشغيل أي الأدوات يستدعي وماذا يفعل بعد ذلك. يتعلق RAG بمصدر المعرفة، وتتعلق الوكالة بمن يختار المسار، ويمكن للوكيل أن يستخدم RAG أداةً من أدواته.",
      },
      {
        q: "متى أستخدم سير عمل بدل وكيل ذكاء اصطناعي؟",
        a: "استخدم سير العمل حين تستطيع كتابة الخطوات سلفًا، وحين تكون الأخطاء مكلفة، وحين تحتاج إلى أثر تدقيق واضح. ويمكن للنموذج مع ذلك أن يصنّف أو يصوغ داخل خطوة. وإن كان المسار لا يتغير أبدًا فالاستقلالية لا تضيف إلا مخاطر وتعقّد التقييم.",
      },
      {
        q: "هل RAG نوع من الوكلاء؟",
        a: "ليس بحد ذاته. يتبع مساعد RAG الأساسي مسارًا واحدًا هو استرجاع ثم إجابة، صمّمه أشخاص. ويصبح وكيليًّا حين يقرر نموذج هل يسترجع وماذا يسترجع وماذا يفعل بالنتيجة، ضمن حلقة. والحد الفاصل هو من يتحكم بالمسار.",
      },
      {
        q: "هل أحتاج إلى نظام متعدد الوكلاء؟",
        a: "نادرًا في البداية. فكّر فيه حين يكون سياق وكيل واحد أو أدواته أكبر من أن تُحكَم حوكمته ويمكن تقييم كل متخصص على حدة. تستخدم NOVA منسّقًا ووكلاء متخصصين لأن مهامها شديدة التنوع، لكن التصميم الأبسط غالبًا ما يكون أفضل خطوة أولى.",
      },
      {
        q: "كيف أعرف أن نظامي جاهز لمزيد من الاستقلالية؟",
        a: "حين يقول التقييم ذلك. حدّد سيناريوهات تشمل حالات يجب أن يرفض فيها النظام أو يصعّد، وقيّم الإصدار الحالي، ثم اختبر المرشّح الأكثر استقلالية في مقابله. فإن لم يتفوق بوضوح فأبقِ على الخيار الأبسط وأبقِ الموافقة البشرية على الخطوات الخطرة.",
      },
    ],
  },
};
