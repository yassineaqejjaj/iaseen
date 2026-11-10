import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "LangGraph, CrewAI, OpenAI, Google, Microsoft, Claude: which agentic orchestration framework should you choose?",
    dek: "Six frameworks, six ways to orchestrate agents. What really sets them apart, when to pick which, and the pitfalls that show up in production whatever the logo.",
    answer: "An agentic orchestration framework decides who does what, in which order, and with what shared state across several model and tool calls. The six most used follow four logics: the graph (LangGraph), role-based teams (CrewAI), the enterprise workflow (Microsoft Agent Framework, Google ADK) and the agent loop with delegation (OpenAI Agents SDK, Claude Agent SDK). The right choice depends on the control you need, not on popularity.",
    figure: {
      alt: "IASEEN infographic: 6 agentic orchestration frameworks. For each one, its orchestration type, a diagram of the flow and its ideal use: LangGraph (graph, stateful workflows), CrewAI (role-based, agent teams), Microsoft Agent Framework (enterprise workflows), OpenAI Agents SDK (handoff and agent-as-tool, delegation), Google ADK (agents and workflows, multi-agent applications), Claude Agent SDK (agent loop, tool-heavy tasks).",
      caption: "The six approaches at a glance (click to open full size). The diagrams are simplified: they show each framework’s orchestration logic, not all of its features. The image labels are in French.",
    },
    sections: [
      {
        h: "What does an orchestration framework actually do?",
        p: [
          "A single agent is a model in a loop, with tools. As soon as the work goes beyond one loop, three questions need an answer: who decides the next step (the code or the model), where state lives between two steps, and how a human takes back control. That is exactly what an orchestration framework settles.",
          "The six frameworks in the infographic answer the first question differently, and it is the most important one. At one end, the developer draws the path and the model only fills in the boxes. At the other, the model chooses its own tools and delegations, and the code only sets limits. Every shade exists in between.",
        ],
      },
      {
        h: "What are the six main approaches?",
        p: [
          "LangGraph: the stateful graph. You describe the application as a graph: nodes (a model call, a tool, a function) linked by edges, some of them conditional. A typed state flows from node to node and can be saved at every step (checkpoint), which lets you resume an interrupted run, replay a past state or pause the graph for human approval. It is the option that gives the most explicit control, at the cost of a bit more code.",
          "CrewAI: the team of roles. You define agents by their role, goal and background, then the tasks you give them. The crew runs them in sequence or under the coordination of a manager agent. The mental model is very readable for business teams: you describe a team the way you would describe an organisation. For the parts that must stay deterministic, CrewAI also offers event-driven Flows.",
          "Microsoft Agent Framework: the enterprise workflow. It is the successor to Semantic Kernel and AutoGen, released as version 1.0 in April 2026 for .NET and Python. It clearly separates the agent (a model that calls tools) from the workflow: a typed graph that chains agents and functions, with branches, parallelism, checkpoints and human approval. It carries over the orchestration patterns from AutoGen (sequential, concurrent, handoff, group chat, Magentic-One) and connects to several model providers, to MCP and to A2A.",
          "OpenAI Agents SDK: delegation. The SDK rests on few primitives: agents, tools, handoffs (one agent passes the conversation to a more specialised agent) and agents used as tools (one agent calls another and keeps control). On top come guardrails on inputs and outputs, sessions for conversation memory and built-in tracing. It is the lightest approach for triage followed by a transfer to the right specialist.",
          "Google ADK: agents and workflows, in a hierarchy. The Agent Development Kit combines model-driven agents with deterministic workflow agents: sequential, parallel and loop. You nest them in a tree, under a root agent. ADK is optimised for Gemini and Google Cloud but stays open to other models, and it supports the A2A protocol so agents can talk across systems.",
          "Claude Agent SDK: the tool-equipped agent loop. The SDK exposes the loop that runs Claude Code: the model gathers context, acts with tools (files, commands, MCP servers), verifies the result and starts again until the task is done. Orchestration goes through subagents, which work in their own context and only return their result, and through hooks that can block a tool call before it runs. It is built for long, tool-heavy tasks where you cannot draw the path in advance.",
        ],
      },
      {
        h: "Which one should you choose, depending on your situation?",
        p: [
          "The table below is my own reading, not a benchmark. It compares what matters when you decide.",
        ],
        table: {
          head: ["Framework", "Who decides the next step", "Strength", "I would pick it if…", "Watch out for"],
          rows: [
            [
              "LangGraph",
              "The code (graph), the model inside nodes",
              "State, resumption, human approval",
              "The process is long, with loops and retries",
              "More code to write and maintain",
            ],
            [
              "CrewAI",
              "The model, within a frame of roles",
              "Readability, fast prototyping",
              "The work looks like a team of specialists",
              "Less predictable behaviour in hierarchical mode",
            ],
            [
              "Microsoft Agent Framework",
              "The code (workflow), the model inside agents",
              ".NET/Azure integration, ready-made orchestration patterns",
              "The company already runs on the Microsoft ecosystem",
              "Recent framework: follow its changes",
            ],
            [
              "OpenAI Agents SDK",
              "The model (handoffs, agents as tools)",
              "Simplicity, built-in tracing",
              "Triage then transfer to the right specialist",
              "Delegation logic to bound and test",
            ],
            [
              "Google ADK",
              "Mixed: deterministic workflows + agents",
              "Agent hierarchies, A2A",
              "Several agents to compose, on Google Cloud",
              "Keep deterministic and non-deterministic parts clearly apart",
            ],
            [
              "Claude Agent SDK",
              "The model (agent loop)",
              "Open-ended tasks, tools, subagents",
              "The task is long and the path unpredictable",
              "Cost and run time to cap",
            ],
          ],
        },
      },
      {
        h: "Which rules help you decide?",
        p: ["Three simple rules spare me most bad choices:"],
        list: [
          "If you can draw the process, draw it. A graph or a workflow (LangGraph, Microsoft Agent Framework, ADK workflows) is easier to test, to audit and to get signed off by the business.",
          "If the path depends on what the agent discovers, let the model drive, but inside a box. That is the territory of the agent loop and delegation (Claude Agent SDK, OpenAI Agents SDK), with limits on steps, cost and tools.",
          "Choose first the ecosystem your teams know how to run. An average framework run well beats an excellent framework nobody can debug at 2 a.m.",
        ],
      },
      {
        h: "Which pitfalls show up in production?",
        p: [
          "The choice of framework rarely makes a project fail. What gets stuck is the same set of topics, whatever the logo.",
          "State. An agent that works for several minutes, or waits for approval, must be able to stop and resume without starting over. Check where state is stored, whether it survives a restart and who can read it. The checkpoints in LangGraph or Microsoft Agent Framework answer this question; in a freer approach, it is up to you.",
          "Human in the loop. “A human approves” is not a specification. You have to decide which actions require approval (sending, paying, deleting, publishing), who approves, within what time, and what happens without an answer. Design these stop points from the start: adding them afterwards often forces you to rework the whole orchestration.",
          "Observability. Without a trace of every model and tool call, a multi-agent system becomes a black box. Require from day one a trace per run: prompts, tools called, arguments, results, duration and cost. All the SDKs offer some form of tracing, but check that it exports to your own tools (OpenTelemetry, for instance) rather than staying with a vendor.",
          "Cost. Every extra agent, every reflection loop, every delegation adds model calls. Set step and token budgets per run, measure the cost per successful task, and alert on extreme runs. An agent that loops does not only cost time.",
          "Dependency and sovereignty. Three of the six frameworks come from model providers, two from cloud vendors. They all work best with their home ecosystem, even when they accept other models. Ask three questions before committing: can you change model without rewriting the orchestration? Where are traces and state hosted? What happens if a hosted feature disappears or changes price? For sensitive data, keep the business logic (tools, rules, prompts) in your own code, and treat the framework as a replaceable layer.",
        ],
      },
      {
        h: "Where should you start?",
        p: [
          "My advice stays the same whatever the framework: start with a single agent, with two or three tools and tracing. Measure where it fails. Only add a second agent, a graph or a delegation when a measured limit calls for it. Most enterprise use cases do not need six agents talking to each other: they need a clear process, a reliable agent and a human in the right place.",
        ],
      },
    ],
    take: "Framework comparisons age fast: all six projects change every month, and their features converge. What does not age is the starting question: who decides the next step, the code or the model? Answer it for each step of your process, and the choice of framework becomes almost obvious. Then invest in what will survive a change of framework: your tools, your approval rules, your evaluation sets and your traces.",
    cta: {
      text: "Torn between two approaches for a specific use case? I offer a free 30-minute diagnostic: we look at your process, your data constraints and your teams, and choose the right level of orchestration, no more, no less.",
      label: "Book a slot",
    },
    diagram: {
      nodes: ["Graph", "Roles", "Workflow", "Delegation", "Hierarchy", "Loop"],
      nodes2: ["LangGraph", "CrewAI", "Microsoft Agent Framework", "OpenAI Agents SDK", "Google ADK", "Claude Agent SDK"],
      heads: ["Logic", "Framework"],
      caption: "Six frameworks, four logics: who decides the next step, the code or the model?",
    },
    results: [
      {
        v: "6",
        l: "frameworks compared",
      },
      {
        v: "4",
        l: "orchestration logics: graph, roles, workflow, loop",
      },
      {
        v: "5",
        l: "production pitfalls: state, human, observability, cost, dependency",
      },
      {
        v: "1",
        l: "agent to start with, before any orchestration",
      },
    ],
    faq: [
      {
        q: "What is agentic orchestration?",
        a: "It is how you coordinate several model calls, tools and agents to carry out a task: who acts, in which order, with what shared state, and where a human steps in.",
      },
      {
        q: "Do you need a framework to build an agent?",
        a: "No. A simple agent can be written with a model’s API and a few functions. A framework becomes useful when you have to manage state, resumption, several agents or human approvals.",
      },
      {
        q: "What is the difference between a handoff and an agent used as a tool?",
        a: "With a handoff, one agent passes the conversation to another, which takes over. With an agent as a tool, the main agent calls another agent for a subtask, gets the result back and keeps control.",
      },
      {
        q: "Graph or agent loop: how do you decide?",
        a: "If you can draw the steps, prefer a graph or a workflow: it is more predictable and easier to audit. If the path depends on what the agent discovers along the way, an agent loop bounded by limits on steps, cost and tools fits better.",
      },
      {
        q: "Can you switch framework later?",
        a: "Yes, if you planned for it: keep your tools, prompts and business rules in your own code, and export your traces in a standard format. The framework should only be a replaceable orchestration layer.",
      },
    ],
  },
  fr: {
    title: "LangGraph, CrewAI, OpenAI, Google, Microsoft, Claude : quel framework d’orchestration agentique choisir ?",
    dek: "Six frameworks, six façons d’orchestrer des agents. Ce qui les distingue vraiment, quand choisir lequel, et les pièges qui apparaissent en production, quel que soit le logo.",
    answer: "Un framework d’orchestration agentique décide qui fait quoi, dans quel ordre, et avec quel état partagé entre plusieurs appels de modèle et d’outils. Les six plus utilisés suivent quatre logiques : le graphe (LangGraph), les équipes de rôles (CrewAI), le workflow d’entreprise (Microsoft Agent Framework, Google ADK) et la boucle d’agent avec délégation (OpenAI Agents SDK, Claude Agent SDK). Le bon choix dépend du contrôle exigé, pas de la popularité.",
    figure: {
      alt: "Infographie IASEEN : 6 frameworks d’orchestration agentique. Pour chacun, son type d’orchestration, un schéma du flux et son usage idéal : LangGraph (graphe, workflows avec état), CrewAI (par rôles, équipes d’agents), Microsoft Agent Framework (workflows d’entreprise), OpenAI Agents SDK (handoff et agent-outil, délégation), Google ADK (agents et workflows, applications multi-agents), Claude Agent SDK (boucle d’agent, tâches riches en outils).",
      caption: "Les six approches en un coup d’œil. Les schémas sont simplifiés : ils montrent la logique d’orchestration de chaque framework, pas toutes ses fonctionnalités.",
    },
    sections: [
      {
        h: "Que fait vraiment un framework d’orchestration ?",
        p: [
          "Un agent seul, c’est un modèle dans une boucle, avec des outils. Dès que le travail dépasse une boucle, il faut répondre à trois questions : qui décide de l’étape suivante (le code ou le modèle), où vit l’état entre deux étapes, et comment un humain reprend la main. C’est exactement ce que règle un framework d’orchestration.",
          "Les six frameworks de l’infographie répondent différemment à la première question, et c’est la plus importante. À un bout, le développeur dessine le chemin et le modèle ne fait que remplir les cases. À l’autre, le modèle choisit lui-même ses outils et ses délégations, et le code se contente de fixer des limites. Entre les deux, toutes les nuances existent.",
        ],
      },
      {
        h: "Quelles sont les six grandes approches ?",
        p: [
          "LangGraph : le graphe avec état. On décrit l’application comme un graphe : des nœuds (un appel de modèle, un outil, une fonction) reliés par des arêtes, dont certaines sont conditionnelles. Un état typé circule de nœud en nœud et peut être sauvegardé à chaque étape (checkpoint), ce qui permet de reprendre une exécution interrompue, de rejouer un état passé ou de mettre le graphe en pause pour une validation humaine. C’est l’option qui donne le plus de contrôle explicite, au prix d’un peu plus de code.",
          "CrewAI : l’équipe de rôles. On définit des agents par leur rôle, leur objectif et leur contexte, puis des tâches qu’on leur confie. L’équipe (« crew ») les exécute en séquence ou sous la coordination d’un agent manager. Le modèle mental est très lisible pour les métiers : on décrit une équipe comme on décrirait une organisation. Pour les parties qui doivent rester déterministes, CrewAI propose aussi des « Flows », pilotés par événements.",
          "Microsoft Agent Framework : le workflow d’entreprise. C’est le successeur de Semantic Kernel et d’AutoGen, publié en version 1.0 en avril 2026 pour .NET et Python. Il distingue clairement l’agent (un modèle qui appelle des outils) et le workflow : un graphe typé qui enchaîne agents et fonctions, avec branches, parallélisme, checkpoints et approbation humaine. Il reprend les schémas d’orchestration issus d’AutoGen (séquentiel, concurrent, handoff, group chat, Magentic-One) et se connecte à plusieurs fournisseurs de modèles, à MCP et à A2A.",
          "OpenAI Agents SDK : la délégation. Le SDK repose sur peu de primitives : des agents, des outils, des « handoffs » (un agent transfère la conversation à un agent plus spécialisé) et des agents utilisés comme outils (un agent en appelle un autre et garde la main). S’y ajoutent des garde-fous sur les entrées et sorties, des sessions pour la mémoire de conversation et un traçage intégré. C’est l’approche la plus légère pour un tri suivi d’un transfert vers le bon spécialiste.",
          "Google ADK : agents et workflows, en hiérarchie. L’Agent Development Kit combine des agents pilotés par le modèle et des agents « workflow » déterministes : séquentiel, parallèle et boucle. On les emboîte en arbre, sous un agent racine. ADK est optimisé pour Gemini et Google Cloud, mais il reste ouvert à d’autres modèles, et il prend en charge le protocole A2A pour faire dialoguer des agents entre systèmes.",
          "Claude Agent SDK : la boucle d’agent outillée. Le SDK expose la boucle qui fait tourner Claude Code : le modèle collecte du contexte, agit avec des outils (fichiers, commandes, serveurs MCP), vérifie le résultat et recommence jusqu’à ce que la tâche soit terminée. L’orchestration passe par des sous-agents, qui travaillent dans leur propre contexte et ne renvoient que leur résultat, et par des hooks qui peuvent bloquer un appel d’outil avant son exécution. Il est taillé pour les tâches longues, riches en outils, où l’on ne peut pas dessiner le chemin à l’avance.",
        ],
      },
      {
        h: "Lequel choisir, selon votre situation ?",
        p: [
          "Le tableau ci-dessous est ma propre lecture, pas un benchmark. Il compare ce qui compte au moment de décider.",
        ],
        table: {
          head: ["Framework", "Qui décide de l’étape suivante", "Point fort", "Je le choisirais si…", "À surveiller"],
          rows: [
            [
              "LangGraph",
              "Le code (graphe), le modèle dans les nœuds",
              "État, reprise, validation humaine",
              "Le processus est long, avec boucles et reprises",
              "Plus de code à écrire et à maintenir",
            ],
            [
              "CrewAI",
              "Le modèle, dans un cadre de rôles",
              "Lisibilité, prototypage rapide",
              "Le travail ressemble à une équipe de spécialistes",
              "Comportement moins prévisible en mode hiérarchique",
            ],
            [
              "Microsoft Agent Framework",
              "Le code (workflow), le modèle dans les agents",
              "Intégration .NET/Azure, schémas d’orchestration prêts",
              "L’entreprise est déjà sur l’écosystème Microsoft",
              "Framework récent : suivre les évolutions",
            ],
            [
              "OpenAI Agents SDK",
              "Le modèle (handoffs, agents-outils)",
              "Simplicité, traçage intégré",
              "Un tri puis un transfert vers le bon spécialiste",
              "Logique de délégation à borner et à tester",
            ],
            [
              "Google ADK",
              "Mixte : workflows déterministes + agents",
              "Hiérarchies d’agents, A2A",
              "Plusieurs agents à composer, sur Google Cloud",
              "Bien séparer ce qui est déterministe de ce qui ne l’est pas",
            ],
            [
              "Claude Agent SDK",
              "Le modèle (boucle d’agent)",
              "Tâches ouvertes, outils, sous-agents",
              "La tâche est longue et le chemin imprévisible",
              "Coût et durée d’exécution à plafonner",
            ],
          ],
        },
      },
      {
        h: "Quelles règles appliquer pour trancher ?",
        p: ["Trois règles simples m’évitent la plupart des mauvais choix :"],
        list: [
          "Si vous pouvez dessiner le processus, dessinez-le. Un graphe ou un workflow (LangGraph, Microsoft Agent Framework, les workflows d’ADK) est plus facile à tester, à auditer et à faire valider par un métier.",
          "Si le chemin dépend de ce que l’agent découvre, laissez le modèle piloter, mais dans une boîte. C’est le terrain de la boucle d’agent et de la délégation (Claude Agent SDK, OpenAI Agents SDK), avec des limites d’étapes, de coût et d’outils.",
          "Choisissez d’abord l’écosystème que vos équipes savent exploiter. Un framework moyen bien exploité vaut mieux qu’un excellent framework que personne ne sait déboguer à 2 h du matin.",
        ],
      },
      {
        h: "Quels pièges apparaissent en production ?",
        p: [
          "Le choix du framework est rarement ce qui fait échouer un projet. Ce qui coince, ce sont les mêmes sujets, quel que soit le logo.",
          "L’état. Un agent qui travaille plusieurs minutes, ou qui attend une validation, doit pouvoir s’interrompre et reprendre sans tout recommencer. Vérifiez où l’état est stocké, s’il survit à un redémarrage et qui peut le lire. Les checkpoints de LangGraph ou de Microsoft Agent Framework répondent à cette question ; dans une approche plus libre, c’est à vous de la traiter.",
          "L’humain dans la boucle. « Un humain valide » n’est pas une spécification. Il faut décider quelles actions exigent une approbation (envoyer, payer, supprimer, publier), qui approuve, dans quel délai, et ce qui se passe sans réponse. Concevez ces points d’arrêt dès le départ : les ajouter après coup oblige souvent à revoir toute l’orchestration.",
          "L’observabilité. Sans trace de chaque appel de modèle et d’outil, un système multi-agents devient une boîte noire. Exigez dès le premier jour une trace par exécution : prompts, outils appelés, arguments, résultats, durée et coût. Les SDK proposent tous une forme de traçage, mais vérifiez qu’elle s’exporte vers vos propres outils (OpenTelemetry, par exemple) plutôt que de rester chez un fournisseur.",
          "Le coût. Chaque agent supplémentaire, chaque boucle de réflexion, chaque délégation ajoute des appels de modèle. Fixez des budgets d’étapes et de jetons par exécution, mesurez le coût par tâche réussie, et alertez sur les exécutions extrêmes. Un agent qui boucle ne coûte pas seulement du temps.",
          "La dépendance et la souveraineté. Trois des six frameworks viennent de fournisseurs de modèles, deux d’éditeurs cloud. Ils fonctionnent tous mieux avec leur écosystème d’origine, même quand ils acceptent d’autres modèles. Posez-vous trois questions avant de vous engager : peut-on changer de modèle sans réécrire l’orchestration ? Où sont hébergés les traces et l’état ? Que se passe-t-il si une fonctionnalité hébergée disparaît ou change de prix ? Pour les données sensibles, isolez la logique métier (outils, règles, prompts) dans votre propre code, et traitez le framework comme une couche remplaçable.",
        ],
      },
      {
        h: "Par où commencer ?",
        p: [
          "Mon conseil reste le même, quel que soit le framework : commencez par un seul agent, avec deux ou trois outils et du traçage. Mesurez où il échoue. N’ajoutez un deuxième agent, un graphe ou une délégation que lorsqu’une limite mesurée l’exige. La plupart des cas d’usage en entreprise n’ont pas besoin de six agents qui discutent entre eux : ils ont besoin d’un processus clair, d’un agent fiable et d’un humain au bon endroit.",
        ],
      },
    ],
    take: "Les comparatifs de frameworks vieillissent vite : les six projets évoluent tous les mois, et leurs fonctionnalités convergent. Ce qui ne vieillit pas, c’est la question de départ : qui décide de l’étape suivante, le code ou le modèle ? Répondez-y pour chaque étape de votre processus, et le choix du framework devient presque évident. Ensuite, investissez dans ce qui survivra à un changement de framework : vos outils, vos règles d’approbation, vos jeux d’évaluation et vos traces.",
    cta: {
      text: "Vous hésitez entre deux approches pour un cas d’usage précis ? Je vous propose un diagnostic gratuit de 30 minutes : on regarde votre processus, vos contraintes de données et vos équipes, et on choisit le niveau d’orchestration juste, ni plus ni moins.",
      label: "Prendre rendez-vous",
    },
    diagram: {
      nodes: ["Graphe", "Rôles", "Workflow", "Délégation", "Hiérarchie", "Boucle"],
      nodes2: ["LangGraph", "CrewAI", "Microsoft Agent Framework", "OpenAI Agents SDK", "Google ADK", "Claude Agent SDK"],
      heads: ["Logique", "Framework"],
      caption: "Six frameworks, quatre logiques : qui décide de l’étape suivante, le code ou le modèle ?",
    },
    results: [
      {
        v: "6",
        l: "frameworks comparés",
      },
      {
        v: "4",
        l: "logiques d’orchestration : graphe, rôles, workflow, boucle",
      },
      {
        v: "5",
        l: "pièges de production : état, humain, observabilité, coût, dépendance",
      },
      {
        v: "1",
        l: "agent pour commencer, avant toute orchestration",
      },
    ],
    faq: [
      {
        q: "Qu’est-ce que l’orchestration agentique ?",
        a: "C’est la façon dont on coordonne plusieurs appels de modèle, outils et agents pour réaliser une tâche : qui agit, dans quel ordre, avec quel état partagé, et où un humain intervient.",
      },
      {
        q: "Faut-il un framework pour construire un agent ?",
        a: "Non. Un agent simple peut s’écrire avec l’API d’un modèle et quelques fonctions. Un framework devient utile quand il faut gérer l’état, les reprises, plusieurs agents ou des validations humaines.",
      },
      {
        q: "Quelle différence entre un handoff et un agent utilisé comme outil ?",
        a: "Avec un handoff, un agent transfère la conversation à un autre, qui prend la suite. Avec un agent-outil, l’agent principal appelle un autre agent pour une sous-tâche, récupère le résultat et garde la main.",
      },
      {
        q: "Graphe ou boucle d’agent : comment trancher ?",
        a: "Si vous savez dessiner les étapes, préférez un graphe ou un workflow : il est plus prévisible et plus facile à auditer. Si le chemin dépend de ce que l’agent découvre en route, une boucle d’agent bornée par des limites d’étapes, de coût et d’outils est plus adaptée.",
      },
      {
        q: "Peut-on changer de framework plus tard ?",
        a: "Oui, si vous l’avez prévu : gardez vos outils, vos prompts et vos règles métier dans votre propre code, et exportez vos traces dans un format standard. Le framework ne doit être qu’une couche d’orchestration remplaçable.",
      },
    ],
  },
  ar: {
    title: "LangGraph وCrewAI وOpenAI وGoogle وMicrosoft وClaude: أي إطار لتنسيق الوكلاء تختار؟",
    dek: "ستة أطر عمل، وست طرق لتنسيق الوكلاء. ما الذي يميزها فعلًا، ومتى تختار كل واحد منها، والفخاخ التي تظهر في الإنتاج أيًّا كان الشعار.",
    answer: "إطار تنسيق الوكلاء يحدد من يفعل ماذا، وبأي ترتيب، وبأي حالة مشتركة عبر عدة استدعاءات للنموذج والأدوات. وتتبع الأطر الستة الأكثر استخدامًا أربع منطقيات: الرسم البياني (LangGraph)، وفرق الأدوار (CrewAI)، وسير العمل المؤسسي (Microsoft Agent Framework وGoogle ADK)، وحلقة الوكيل مع التفويض (OpenAI Agents SDK وClaude Agent SDK). والاختيار الصحيح يتوقف على مستوى التحكم المطلوب، لا على الشهرة.",
    figure: {
      alt: "إنفوغرافيك IASEEN: ستة أطر لتنسيق الوكلاء. لكل إطار نوع التنسيق ومخطط لتدفقه واستخدامه الأمثل: LangGraph (رسم بياني، سير عمل بحالة)، وCrewAI (أدوار، فرق وكلاء)، وMicrosoft Agent Framework (سير عمل مؤسسي)، وOpenAI Agents SDK (تسليم ووكيل كأداة، تفويض)، وGoogle ADK (وكلاء وسير عمل، تطبيقات متعددة الوكلاء)، وClaude Agent SDK (حلقة الوكيل، مهام كثيفة الأدوات).",
      caption: "المقاربات الست في نظرة واحدة (انقر لفتحها بالحجم الكامل). المخططات مبسطة: تعرض منطق التنسيق في كل إطار لا كل ميزاته. نصوص الصورة بالفرنسية.",
    },
    sections: [
      {
        h: "ماذا يفعل إطار التنسيق فعلًا؟",
        p: [
          "الوكيل الواحد نموذج في حلقة ومعه أدوات. وما إن يتجاوز العمل حلقة واحدة حتى تُطرح ثلاثة أسئلة: من يقرر الخطوة التالية (الكود أم النموذج)، وأين تعيش الحالة بين خطوتين، وكيف يستعيد الإنسان زمام الأمور. وهذا بالضبط ما يحسمه إطار التنسيق.",
          "تجيب الأطر الست في الإنفوغرافيك عن السؤال الأول بطرق مختلفة، وهو أهم الأسئلة. ففي طرف، يرسم المطوّر المسار ولا يفعل النموذج سوى ملء الخانات. وفي الطرف الآخر، يختار النموذج أدواته وتفويضاته بنفسه، ولا يضع الكود إلا الحدود. وبين الطرفين كل الدرجات ممكنة.",
        ],
      },
      {
        h: "ما المقاربات الست الرئيسية؟",
        p: [
          "LangGraph: الرسم البياني ذو الحالة. تصف التطبيق كرسم بياني: عُقد (استدعاء نموذج أو أداة أو دالة) تربطها حواف، بعضها شرطي. وتنتقل حالة محددة النوع من عقدة إلى أخرى ويمكن حفظها عند كل خطوة (نقطة حفظ)، ما يتيح استئناف تنفيذ متوقف، أو إعادة تشغيل حالة سابقة، أو إيقاف الرسم مؤقتًا لموافقة بشرية. إنه الخيار الذي يمنح أكبر قدر من التحكم الصريح، مقابل قدر أكبر قليلًا من الكود.",
          "CrewAI: فريق الأدوار. تعرّف الوكلاء بدورهم وهدفهم وخلفيتهم، ثم المهام التي توكلها إليهم. وينفذها الفريق بالتتابع أو بتنسيق وكيل مدير. والنموذج الذهني سهل القراءة جدًا لفرق الأعمال: تصف فريقًا كما تصف مؤسسة. وللأجزاء التي يجب أن تبقى حتمية، يقدم CrewAI أيضًا «Flows» تقودها الأحداث.",
          "Microsoft Agent Framework: سير العمل المؤسسي. هو خليفة Semantic Kernel وAutoGen، وصدر بالإصدار 1.0 في أبريل 2026 لـ .NET وPython. ويفصل بوضوح بين الوكيل (نموذج يستدعي أدوات) وسير العمل: رسم بياني محدد النوع يربط الوكلاء والدوال، مع تفرعات وتوازٍ ونقاط حفظ وموافقة بشرية. ويستعيد أنماط التنسيق الموروثة من AutoGen (تتابعي، متزامن، تسليم، محادثة جماعية، Magentic-One) ويتصل بعدة مزودي نماذج وبـ MCP وA2A.",
          "OpenAI Agents SDK: التفويض. تقوم الحزمة على عدد قليل من المكونات الأساسية: وكلاء وأدوات و«تسليمات» (handoffs) ينقل فيها وكيل المحادثة إلى وكيل أكثر تخصصًا، ووكلاء يُستخدمون كأدوات (يستدعي وكيل وكيلًا آخر ويحتفظ بالقيادة). وتضاف إليها ضوابط على المدخلات والمخرجات، وجلسات لذاكرة المحادثة، وتتبّع مدمج. إنها أخف مقاربة لفرز الطلب ثم تحويله إلى المتخصص المناسب.",
          "Google ADK: وكلاء وسير عمل في تسلسل هرمي. يجمع Agent Development Kit بين وكلاء يقودهم النموذج ووكلاء «سير عمل» حتميين: تتابعي ومتوازٍ وحلقة. وتُدمج هذه الوكلاء في شجرة تحت وكيل جذر. وADK محسّن لـ Gemini وGoogle Cloud لكنه يبقى منفتحًا على نماذج أخرى، ويدعم بروتوكول A2A ليتحاور الوكلاء عبر الأنظمة.",
          "Claude Agent SDK: حلقة الوكيل المزودة بالأدوات. تكشف الحزمة الحلقة التي يعمل بها Claude Code: يجمع النموذج السياق، ثم يتصرف بالأدوات (ملفات، أوامر، خوادم MCP)، ثم يتحقق من النتيجة ويعيد الكرّة حتى تنتهي المهمة. ويمر التنسيق عبر وكلاء فرعيين يعمل كل منهم في سياقه الخاص ولا يعيد إلا نتيجته، وعبر خطافات (hooks) يمكنها منع استدعاء أداة قبل تنفيذه. وهي مصممة للمهام الطويلة الكثيفة الأدوات التي لا يمكن رسم مسارها مسبقًا.",
        ],
      },
      {
        h: "أيها تختار بحسب وضعك؟",
        p: ["الجدول أدناه قراءتي الخاصة، وليس مقارنة معيارية. وهو يقارن ما يهم عند اتخاذ القرار."],
        table: {
          head: ["الإطار", "من يقرر الخطوة التالية", "نقطة القوة", "أختاره إذا…", "ما يجب مراقبته"],
          rows: [
            [
              "LangGraph",
              "الكود (الرسم البياني)، والنموذج داخل العقد",
              "الحالة والاستئناف والموافقة البشرية",
              "كانت العملية طويلة وفيها حلقات وإعادة محاولات",
              "كود أكثر للكتابة والصيانة",
            ],
            [
              "CrewAI",
              "النموذج، ضمن إطار من الأدوار",
              "سهولة القراءة والنمذجة السريعة",
              "كان العمل يشبه فريقًا من المتخصصين",
              "سلوك أقل قابلية للتنبؤ في الوضع الهرمي",
            ],
            [
              "Microsoft Agent Framework",
              "الكود (سير العمل)، والنموذج داخل الوكلاء",
              "تكامل .NET/Azure وأنماط تنسيق جاهزة",
              "كانت المؤسسة تعتمد أصلًا منظومة Microsoft",
              "إطار حديث: تابع تطوراته",
            ],
            [
              "OpenAI Agents SDK",
              "النموذج (التسليمات والوكلاء كأدوات)",
              "البساطة والتتبّع المدمج",
              "أردت فرز الطلب ثم تحويله إلى المتخصص المناسب",
              "منطق تفويض يجب تقييده واختباره",
            ],
            [
              "Google ADK",
              "مختلط: سير عمل حتمي + وكلاء",
              "تسلسلات هرمية للوكلاء وA2A",
              "كان لديك عدة وكلاء لتركيبهم على Google Cloud",
              "الفصل الواضح بين الحتمي وغير الحتمي",
            ],
            [
              "Claude Agent SDK",
              "النموذج (حلقة الوكيل)",
              "المهام المفتوحة والأدوات والوكلاء الفرعيون",
              "كانت المهمة طويلة والمسار غير متوقع",
              "وضع سقف للتكلفة ومدة التنفيذ",
            ],
          ],
        },
      },
      {
        h: "ما القواعد التي تساعد على الحسم؟",
        p: ["ثلاث قواعد بسيطة تجنبني معظم الخيارات السيئة:"],
        list: [
          "إن كنت تستطيع رسم العملية، فارسمها. فالرسم البياني أو سير العمل (LangGraph وMicrosoft Agent Framework وسير عمل ADK) أسهل في الاختبار والتدقيق والحصول على موافقة فرق الأعمال.",
          "إن كان المسار يتوقف على ما يكتشفه الوكيل، فدع النموذج يقود، لكن داخل صندوق. هذا ميدان حلقة الوكيل والتفويض (Claude Agent SDK وOpenAI Agents SDK)، مع حدود للخطوات والتكلفة والأدوات.",
          "اختر أولًا المنظومة التي تعرف فرقك تشغيلها. فإطار متوسط يُشغَّل جيدًا خير من إطار ممتاز لا يعرف أحد تصحيح أخطائه في الثانية فجرًا.",
        ],
      },
      {
        h: "ما الفخاخ التي تظهر في الإنتاج؟",
        p: [
          "نادرًا ما يكون اختيار الإطار سبب فشل المشروع. فما يتعثر هو المواضيع نفسها أيًّا كان الشعار.",
          "الحالة. الوكيل الذي يعمل عدة دقائق، أو ينتظر موافقة، يجب أن يستطيع التوقف والاستئناف دون البدء من الصفر. تحقق من مكان تخزين الحالة، وهل تصمد بعد إعادة التشغيل، ومن يستطيع قراءتها. نقاط الحفظ في LangGraph أو Microsoft Agent Framework تجيب عن هذا السؤال؛ أما في مقاربة أكثر حرية فالأمر متروك لك.",
          "الإنسان في الحلقة. عبارة «إنسان يوافق» ليست مواصفات. يجب أن تقرر أي الإجراءات تتطلب موافقة (الإرسال، الدفع، الحذف، النشر)، ومن يوافق، وفي أي مهلة، وماذا يحدث إن لم يأتِ رد. صمّم نقاط التوقف هذه منذ البداية، فإضافتها لاحقًا تفرض غالبًا مراجعة التنسيق كله.",
          "قابلية المراقبة. من دون أثر لكل استدعاء للنموذج والأدوات، يتحول النظام متعدد الوكلاء إلى صندوق أسود. اشترط منذ اليوم الأول أثرًا لكل تنفيذ: التعليمات، والأدوات المستدعاة، والمعاملات، والنتائج، والمدة، والتكلفة. كل الحزم تقدم شكلًا من التتبّع، لكن تأكد من أنه يُصدَّر إلى أدواتك الخاصة (OpenTelemetry مثلًا) بدل أن يبقى عند مزود واحد.",
          "التكلفة. كل وكيل إضافي، وكل حلقة مراجعة، وكل تفويض يضيف استدعاءات للنموذج. حدد ميزانيات للخطوات والرموز لكل تنفيذ، وقِس التكلفة لكل مهمة ناجحة، ونبّه على التنفيذات المتطرفة. فالوكيل الذي يدور في حلقة لا يكلّف وقتًا فقط.",
          "التبعية والسيادة. ثلاثة من الأطر الستة تأتي من مزودي نماذج، واثنان من مزودي سحابة. وكلها تعمل أفضل مع منظومتها الأصلية حتى حين تقبل نماذج أخرى. اطرح ثلاثة أسئلة قبل الالتزام: هل يمكن تغيير النموذج دون إعادة كتابة التنسيق؟ أين تُستضاف الآثار والحالة؟ ماذا يحدث إن اختفت ميزة مستضافة أو تغيّر سعرها؟ وللبيانات الحساسة، أبقِ منطق الأعمال (الأدوات والقواعد والتعليمات) في كودك الخاص، وتعامل مع الإطار كطبقة قابلة للاستبدال.",
        ],
      },
      {
        h: "من أين تبدأ؟",
        p: [
          "نصيحتي واحدة أيًّا كان الإطار: ابدأ بوكيل واحد، مع أداتين أو ثلاث وتتبّع. قِس أين يفشل. ولا تضف وكيلًا ثانيًا أو رسمًا بيانيًا أو تفويضًا إلا حين يفرضه حدّ مقيس. فمعظم حالات الاستخدام في المؤسسات لا تحتاج إلى ستة وكلاء يتحاورون فيما بينهم، بل إلى عملية واضحة ووكيل موثوق وإنسان في المكان المناسب.",
        ],
      },
    ],
    take: "مقارنات الأطر تشيخ بسرعة: المشاريع الستة تتطور كل شهر، وميزاتها تتقارب. أما ما لا يشيخ فهو سؤال البداية: من يقرر الخطوة التالية، الكود أم النموذج؟ أجب عنه لكل خطوة من عمليتك، فيصبح اختيار الإطار شبه بديهي. ثم استثمر فيما سيصمد بعد تغيير الإطار: أدواتك، وقواعد الموافقة، ومجموعات التقييم، والآثار.",
    cta: {
      text: "مترددون بين مقاربتين لحالة استخدام محددة؟ أقترح عليكم تشخيصًا مجانيًا مدته 30 دقيقة: ننظر في عمليتكم وقيود بياناتكم وفرقكم، ونختار مستوى التنسيق المناسب، لا أكثر ولا أقل.",
      label: "احجز موعدًا",
    },
    diagram: {
      nodes: ["رسم بياني", "أدوار", "سير عمل", "تفويض", "تسلسل هرمي", "حلقة"],
      nodes2: ["LangGraph", "CrewAI", "Microsoft Agent Framework", "OpenAI Agents SDK", "Google ADK", "Claude Agent SDK"],
      heads: ["المنطق", "الإطار"],
      caption: "ستة أطر وأربع منطقيات: من يقرر الخطوة التالية، الكود أم النموذج؟",
    },
    results: [
      {
        v: "6",
        l: "أطر عمل تمت مقارنتها",
      },
      {
        v: "4",
        l: "منطقيات تنسيق: رسم بياني، أدوار، سير عمل، حلقة",
      },
      {
        v: "5",
        l: "فخاخ إنتاج: الحالة، الإنسان، المراقبة، التكلفة، التبعية",
      },
      {
        v: "1",
        l: "وكيل واحد للبداية قبل أي تنسيق",
      },
    ],
    faq: [
      {
        q: "ما تنسيق الوكلاء؟",
        a: "هو طريقة تنسيق عدة استدعاءات للنموذج والأدوات والوكلاء لإنجاز مهمة: من يتصرف، وبأي ترتيب، وبأي حالة مشتركة، وأين يتدخل الإنسان.",
      },
      {
        q: "هل يلزم إطار عمل لبناء وكيل؟",
        a: "لا. يمكن كتابة وكيل بسيط بواجهة برمجة نموذج وبضع دوال. ويصبح الإطار مفيدًا حين يجب إدارة الحالة أو الاستئناف أو عدة وكلاء أو موافقات بشرية.",
      },
      {
        q: "ما الفرق بين التسليم والوكيل المستخدم كأداة؟",
        a: "في التسليم، ينقل وكيل المحادثة إلى وكيل آخر يكمل المهمة. وفي الوكيل كأداة، يستدعي الوكيل الرئيسي وكيلًا آخر لمهمة فرعية، ويستعيد النتيجة ويحتفظ بالقيادة.",
      },
      {
        q: "رسم بياني أم حلقة وكيل: كيف تحسم؟",
        a: "إن كنت تستطيع رسم الخطوات، ففضّل رسمًا بيانيًا أو سير عمل: فهو أكثر قابلية للتنبؤ وأسهل في التدقيق. وإن كان المسار يتوقف على ما يكتشفه الوكيل في الطريق، فحلقة وكيل مقيدة بحدود للخطوات والتكلفة والأدوات أنسب.",
      },
      {
        q: "هل يمكن تغيير الإطار لاحقًا؟",
        a: "نعم، إن خططت لذلك: أبقِ أدواتك وتعليماتك وقواعد أعمالك في كودك الخاص، وصدّر آثارك بصيغة معيارية. فالإطار يجب ألا يكون إلا طبقة تنسيق قابلة للاستبدال.",
      },
    ],
  },
};
