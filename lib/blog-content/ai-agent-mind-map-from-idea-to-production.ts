import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "The AI Agent Mind Map: From Idea to Production",
    dek: "One page that shows every decision between an agent idea and an agent in production: reasoning, memory, tools, orchestration, stack and safety, with the failure modes each one invites.",
    answer:
      "An AI agent is a model running in a loop: perceive, plan, act, observe, reflect, respond. Taking it to production means making eight decisions around that loop: reasoning pattern, memory, agent type, framework, tools, orchestration, build stack, and operations and safety. This map lays them out, with the failure modes each one invites.",
    figure: {
      alt: "Mind map titled AI Agent Mind Map: From Idea to Production. The AI Agent sits in the centre, with branches for planning and reflection, memory, agent types, build stack, frameworks, tools and protocols, orchestration, and operations and safety, plus the agent loop and a table of failure modes and fixes.",
      caption: "The map in one view (click to open it full size). Product names are examples of each category, not recommendations: the lesson is the decisions, not the logos. Labels on the image are in English.",
    },
    sections: [
      {
        h: "What is an AI agent, and what does this map cover?",
        p: [
          "An agent is a language model placed in a loop and given tools. Instead of answering once, it reads a goal, decides what to do, calls a tool, looks at the result and decides again, until it judges the task done or a rule stops it. That loop is the bottom row of the map. Everything else is a decision you make around it.",
          "The map answers the two questions every team asks: where do we start, and what are we forgetting? The centre is the agent. Around it sit eight branches, each one a family of choices. Reading clockwise from the top left: reasoning patterns, memory, agent types, build stack, operations and safety, orchestration, tools and protocols, and frameworks. At the very bottom, a table pairs five common failures with the fix that works.",
        ],
      },
      {
        h: "What happens inside the agent loop?",
        p: [
          "The loop has six stages, and each can fail in its own way. Naming them is useful because it tells you where to put a log line, a limit or a test.",
        ],
        list: [
          "Perceive: read the goal and the context. Failure here is a missing or oversized context.",
          "Plan: choose the next step. Failure here is a plan that does not fit the tools you gave it.",
          "Act: call a tool or an API. Failure here is the wrong tool or the wrong arguments.",
          "Observe: read the result. Failure here is trusting a result that was empty, wrong or hostile.",
          "Reflect: ask whether the goal is met or whether to retry. Failure here is looping without progress.",
          "Respond: answer the user. Failure here is an answer that sounds finished when the work is not.",
        ],
      },
      {
        h: "Which reasoning pattern should you choose?",
        p: [
          "The map splits reasoning in two. Planning covers ReAct, Plan-and-Execute and Tree of Thoughts. Reflection covers Reflexion, Self-Critique, a separate verifier model, and Retry with Feedback.",
          "My rule of thumb is to start with the simplest pattern that works and add structure only when a failure demands it. ReAct, where the model alternates between thinking and acting, is enough for many tasks. Plan-and-Execute earns its place on long tasks, because writing the whole plan first makes drift visible. Tree of Thoughts is rarely worth its cost outside hard search problems.",
          "Reflection is where teams often overspend. Asking a model to critique its own answer costs tokens and often agrees with itself. For anything with consequences I prefer a check that does not share the generator's blind spots: a verifier model, a rule, or a test.",
        ],
      },
      {
        h: "What kinds of memory does an agent need?",
        p: [
          "The map lists six, and they answer different questions. It helps to ask what the agent must remember and for how long before choosing a store.",
        ],
        list: [
          "Short-term memory is the context window: the current task, nothing more.",
          "Long-term memory sits in a vector store, for knowledge worth retrieving later.",
          "Episodic memory records past runs, so the agent can learn from what happened.",
          "Semantic memory holds stable facts about users and the domain.",
          "Procedural memory holds skills: how to do something, reusable across tasks.",
          "Shared memory lets several agents read and write the same state.",
        ],
      },
      {
        h: "Why does memory need governance, not just storage?",
        p: [
          "Most memory problems are not storage problems. They are trust problems: where did this fact come from, is it still true, and who is allowed to see it? A memory that cannot answer those questions will eventually put a stale or private fact into a prompt.",
          "That is the idea behind ORBIT, the governed context and memory engine I build: context should be traceable and time-aware, especially across long-running and multi-agent work. Whatever store you choose, store provenance and a date next to the content, and decide in advance what may be forgotten.",
        ],
      },
      {
        h: "Which type of agent are you building?",
        p: [
          "The map names three: coding agents, research agents and computer-use agents. They differ less in intelligence than in how much damage a wrong action can do. A research agent reads. A coding agent writes files and runs commands. A computer-use agent clicks around real applications, which is the widest action surface of the three.",
          "Choose the type first, because it sets how much sandboxing, review and approval you need later. I wrote about the coding-agent case in my article on earned autonomy: autonomy should be granted step by step, as evidence builds up.",
        ],
      },
      {
        h: "Open-source framework, vendor SDK or low-code?",
        p: [
          "Frameworks are the branch with the most logos, so it is the easiest to get lost in. Think in three families: open-source frameworks such as LangGraph, CrewAI and AutoGen; vendor SDKs from model providers and cloud platforms; and low-code builders such as n8n, Dify, Flowise and Langflow. The table below is my own simplification, not a benchmark.",
        ],
        table: {
          head: ["Criterion", "Open-source framework", "Vendor SDK", "Low-code builder"],
          rows: [
            ["Control over behaviour", "High: you own the graph", "Medium: you follow the vendor's model", "Low to medium: you configure blocks"],
            ["Speed to a first prototype", "Medium", "High, when you already use that vendor", "Highest"],
            ["Switching cost", "Medium: code is yours, patterns are shared", "High: concepts and tracing are vendor specific", "High: flows live in the tool"],
            ["Who can build", "Engineers", "Engineers", "Engineers and technical business users"],
            ["Best fit", "Custom, long-lived platforms", "Teams standardised on one provider", "Internal automations and quick experiments"],
          ],
        },
      },
      {
        h: "How do tools and protocols connect an agent to the world?",
        p: [
          "An agent is only as capable as the tools it can call. The map groups them as function or tool calling, code execution, web search and browsing, and two protocols: MCP, which standardises how an agent reaches tools and data, and A2A, which standardises how agents talk to one another.",
          "Two practical points. First, a tool description is part of your prompt: clear names and strict schemas prevent a whole class of wrong calls. Second, code execution and browsing belong in a sandbox, never on the machine that holds your secrets. Protocols reduce integration work, but they do not decide what an agent is allowed to do. That is a policy question, and it needs its own layer.",
        ],
      },
      {
        h: "How do you orchestrate several agents?",
        p: [
          "The map shows three patterns: a supervisor that delegates to workers, handoffs where one agent passes the task to another, and parallel fan-out where several agents work at once and results are merged.",
          "My advice is the same as for any distributed system: do not split a problem across agents until one agent has clearly failed at it. Each extra agent adds coordination, cost and new ways to fail. When the split is justified, a supervisor is the easiest pattern to reason about and to trace.",
        ],
      },
      {
        h: "What goes into the build stack?",
        p: [
          "The stack branch lists six layers: models (Claude, GPT, Gemini, Llama, Qwen), vector stores (Pinecone, Qdrant, Weaviate, pgvector), memory layers (Mem0, Zep, Letta), code sandboxes (E2B, Daytona, Modal), browser tools (Browserbase, Browser Use) and an agent runtime (cloud agent platforms, or Kubernetes if you run your own).",
          "Two choices deserve care. Keep the model behind an interface, so changing provider is a configuration change and not a rewrite. And treat the runtime as a product decision: it decides how you deploy, scale, isolate and observe agents.",
        ],
      },
      {
        h: "How do you operate an agent safely?",
        p: [
          "The operations branch has four layers, and teams often build them in the wrong order. They start with guardrails and add evaluation late. I would reverse that.",
        ],
        list: [
          "Observability: traces of every step and tool call, with tools such as LangSmith, Langfuse, Arize Phoenix and OpenTelemetry. You cannot fix what you cannot replay.",
          "Evaluation: a fixed set of tasks scored automatically, with tools such as DeepEval, Ragas and Promptfoo, or an LLM used as judge. This is what lets you change a prompt without fear.",
          "Guardrails: input and output checks, such as NeMo Guardrails, Llama Guard, Guardrails AI and PII redaction.",
          "Security: least privilege, defence against prompt injection, audit logs and a secrets vault. This layer decides what the agent may do, however well it behaves.",
        ],
      },
      {
        h: "Which failure modes should you plan for?",
        p: [
          "The table at the bottom of the map pairs five failures with a fix. I added a third column, because a fix only helps if you notice the failure early.",
        ],
        table: {
          head: ["Failure mode", "Fix from the map", "How to catch it early"],
          rows: [
            ["Infinite loops", "Max steps and a stop rule", "Alert on runs that reach the step limit"],
            ["Wrong tool calls", "Clear tool names and schemas", "Track the tool-call error rate in traces"],
            ["Context overflow", "Summarise and trim history", "Log tokens per step and watch the trend"],
            ["Runaway cost", "Token and step budgets", "Cost per run, with an alert on outliers"],
            ["Prompt injection", "Treat tool output as data, never as instructions", "Include injection cases in the evaluation set"],
          ],
        },
      },
      {
        h: "In what order would I build it?",
        p: [
          "The map shows the whole territory. It does not tell you the order, and order is where projects are won. This is the sequence I would follow today.",
        ],
        list: [
          "Write the task and the stop rule first: what is done, and when must the agent give up.",
          "Build one agent with two or three tools and tracing from day one.",
          "Create the evaluation set before adding features, so every change is measured.",
          "Add memory only when a measured failure needs it, and give it provenance.",
          "Add guardrails, permissions and approvals in proportion to the action surface.",
          "Add orchestration last, and only when a single agent has clearly hit its limit.",
        ],
      },
    ],
    take: "The most useful part of this map is its bottom edge, not its centre. Most agent projects do not stall on choosing a framework. They stall on the unglamorous branches: evaluation, guardrails and cost. That is why, in the platforms I build, acting, context and evaluation are separate systems (NOVA, ORBIT and FORGE), and why a control layer such as TrustRail sits between an agent and the actions it can take. Read the failure table as a specification, not a checklist: every row should have an owner, a metric and a limit before the first user arrives.",
    diagram: { nodes: ["Perceive", "Plan", "Act", "Observe", "Reflect", "Respond"], caption: "The agent loop: each stage can fail differently, so each deserves its own trace, limit and test. A stop rule closes the loop." },
    results: [
      { v: "8", l: "decisions around the loop, from reasoning to operations" },
      { v: "6", l: "stages in the agent loop" },
      { v: "4", l: "operations layers: observability, evaluation, guardrails, security" },
      { v: "5", l: "recurring failure modes, each paired with a fix" },
    ],
    faq: [
      {
        q: "What is an AI agent?",
        a: "An AI agent is a language model run in a loop with access to tools. It reads a goal, decides what to do, calls a tool, observes the result and repeats until the task is done or a stop rule ends the run.",
      },
      {
        q: "What are the stages of the agent loop?",
        a: "Perceive, plan, act, observe, reflect and respond. If the task is not done, the agent loops again. Each stage can fail differently, so each should have its own logging, limits and tests.",
      },
      {
        q: "What is the difference between MCP and A2A?",
        a: "MCP standardises how an agent connects to tools and data. A2A standardises how agents communicate with each other. Neither decides what an agent is allowed to do: that needs a separate policy and permission layer.",
      },
      {
        q: "How do you stop an AI agent from looping forever?",
        a: "Set a maximum number of steps and an explicit stop rule, add token and cost budgets, and alert on runs that hit the limit. Reflection should be checked by something that does not share the generator's blind spots.",
      },
      {
        q: "Should you start with a multi-agent system?",
        a: "No. Start with one agent and a few tools, measure where it fails, and split into several agents only when a single agent has clearly reached its limit. Every extra agent adds coordination cost and new failure modes.",
      },
    ],
  },
  fr: {
    title: "La carte mentale de l’agent IA : de l’idée à la production",
    dek: "Une page qui montre toutes les décisions entre une idée d’agent et un agent en production : raisonnement, mémoire, outils, orchestration, stack et sécurité, avec les modes de défaillance que chacune appelle.",
    answer:
      "Un agent IA est un modèle qui tourne en boucle : percevoir, planifier, agir, observer, réfléchir, répondre. L’amener en production demande huit décisions autour de cette boucle : schéma de raisonnement, mémoire, type d’agent, framework, outils, orchestration, stack de construction, exploitation et sécurité. Cette carte les expose, avec les défaillances que chacune invite.",
    figure: {
      alt: "Carte mentale intitulée AI Agent Mind Map : From Idea to Production. L’agent IA est au centre, avec des branches pour la planification et la réflexion, la mémoire, les types d’agents, la stack de construction, les frameworks, les outils et protocoles, l’orchestration, l’exploitation et la sécurité, ainsi que la boucle de l’agent et un tableau des défaillances et de leurs remèdes.",
      caption: "La carte en un coup d’œil (cliquez pour l’ouvrir en grand). Les noms de produits sont des exemples de chaque catégorie, pas des recommandations : ce sont les décisions qui comptent, pas les logos. Les libellés de l’image sont en anglais.",
    },
    sections: [
      {
        h: "Qu’est-ce qu’un agent IA, et que couvre cette carte ?",
        p: [
          "Un agent est un modèle de langage placé dans une boucle et doté d’outils. Au lieu de répondre une seule fois, il lit un objectif, décide quoi faire, appelle un outil, regarde le résultat et décide à nouveau, jusqu’à juger la tâche terminée ou qu’une règle l’arrête. Cette boucle est la rangée du bas de la carte. Tout le reste est une décision à prendre autour d’elle.",
          "Cette carte répond aux deux questions que toute équipe se pose : par où commencer, et qu’oublie-t-on ? Au centre, l’agent. Autour de lui, huit branches, chacune une famille de choix. En partant du haut à gauche : schémas de raisonnement, mémoire, types d’agents, stack de construction, exploitation et sécurité, orchestration, outils et protocoles, frameworks. Tout en bas, un tableau associe cinq défaillances courantes au remède qui fonctionne.",
        ],
      },
      {
        h: "Que se passe-t-il dans la boucle de l’agent ?",
        p: [
          "La boucle compte six étapes, et chacune peut échouer à sa manière. Les nommer est utile, car cela indique où placer une ligne de journal, une limite ou un test.",
        ],
        list: [
          "Percevoir : lire l’objectif et le contexte. L’échec ici, c’est un contexte manquant ou démesuré.",
          "Planifier : choisir l’étape suivante. L’échec ici, c’est un plan qui ne correspond pas aux outils fournis.",
          "Agir : appeler un outil ou une API. L’échec ici, c’est le mauvais outil ou les mauvais arguments.",
          "Observer : lire le résultat. L’échec ici, c’est faire confiance à un résultat vide, faux ou hostile.",
          "Réfléchir : se demander si l’objectif est atteint ou s’il faut réessayer. L’échec ici, c’est boucler sans progrès.",
          "Répondre : répondre à l’utilisateur. L’échec ici, c’est une réponse qui semble finie alors que le travail ne l’est pas.",
        ],
      },
      {
        h: "Quel schéma de raisonnement choisir ?",
        p: [
          "La carte sépare le raisonnement en deux. La planification regroupe ReAct, Plan-and-Execute et Tree of Thoughts. La réflexion regroupe Reflexion, l’auto-critique, un modèle vérificateur distinct, et le réessai avec retour d’information.",
          "Ma règle empirique : commencer par le schéma le plus simple qui fonctionne, et n’ajouter de la structure que lorsqu’une défaillance l’exige. ReAct, où le modèle alterne réflexion et action, suffit pour beaucoup de tâches. Plan-and-Execute mérite sa place sur les tâches longues, car écrire tout le plan d’abord rend la dérive visible. Tree of Thoughts vaut rarement son coût en dehors des problèmes de recherche difficiles.",
          "C’est sur la réflexion que les équipes dépensent souvent trop. Demander à un modèle de critiquer sa propre réponse coûte des jetons et il tombe souvent d’accord avec lui-même. Pour tout ce qui a des conséquences, je préfère un contrôle qui ne partage pas les angles morts du générateur : un modèle vérificateur, une règle ou un test.",
        ],
      },
      {
        h: "De quels types de mémoire un agent a-t-il besoin ?",
        p: [
          "La carte en liste six, et elles répondent à des questions différentes. Mieux vaut se demander ce que l’agent doit retenir, et pour combien de temps, avant de choisir un stockage.",
        ],
        list: [
          "La mémoire à court terme est la fenêtre de contexte : la tâche en cours, rien de plus.",
          "La mémoire à long terme réside dans une base vectorielle, pour les connaissances à retrouver plus tard.",
          "La mémoire épisodique enregistre les exécutions passées, pour que l’agent apprenne de ce qui s’est produit.",
          "La mémoire sémantique conserve des faits stables sur les utilisateurs et le domaine.",
          "La mémoire procédurale conserve des compétences : comment faire quelque chose, réutilisable d’une tâche à l’autre.",
          "La mémoire partagée permet à plusieurs agents de lire et d’écrire le même état.",
        ],
      },
      {
        h: "Pourquoi la mémoire demande-t-elle de la gouvernance, pas seulement du stockage ?",
        p: [
          "La plupart des problèmes de mémoire ne sont pas des problèmes de stockage. Ce sont des problèmes de confiance : d’où vient ce fait, est-il toujours vrai, et qui a le droit de le voir ? Une mémoire qui ne sait pas répondre finira par glisser dans un prompt un fait périmé ou privé.",
          "C’est l’idée d’ORBIT, le moteur de contexte et de mémoire gouverné que je construis : le contexte doit être traçable et daté, surtout dans les travaux longs et multi-agents. Quel que soit le stockage choisi, conservez la provenance et une date à côté du contenu, et décidez à l’avance ce qui peut être oublié.",
        ],
      },
      {
        h: "Quel type d’agent construisez-vous ?",
        p: [
          "La carte en nomme trois : agents de code, agents de recherche et agents d’usage d’ordinateur. Ils diffèrent moins par l’intelligence que par les dégâts qu’une mauvaise action peut causer. Un agent de recherche lit. Un agent de code écrit des fichiers et lance des commandes. Un agent d’usage d’ordinateur clique dans de vraies applications, ce qui représente la plus large surface d’action des trois.",
          "Choisissez d’abord le type, car il fixe le niveau de cloisonnement, de relecture et d’approbation dont vous aurez besoin ensuite. J’ai abordé le cas des agents de code dans mon article sur l’autonomie méritée : l’autonomie doit être accordée pas à pas, à mesure que les preuves s’accumulent.",
        ],
      },
      {
        h: "Framework open source, SDK d’éditeur ou low-code ?",
        p: [
          "Les frameworks sont la branche qui compte le plus de logos, donc la plus facile pour s’y perdre. Pensez en trois familles : les frameworks open source comme LangGraph, CrewAI et AutoGen ; les SDK d’éditeurs, venant des fournisseurs de modèles et des plateformes cloud ; et les outils low-code comme n8n, Dify, Flowise et Langflow. Le tableau ci-dessous est ma propre simplification, pas un benchmark.",
        ],
        table: {
          head: ["Critère", "Framework open source", "SDK d’éditeur", "Outil low-code"],
          rows: [
            ["Contrôle du comportement", "Élevé : vous possédez le graphe", "Moyen : vous suivez le modèle de l’éditeur", "Faible à moyen : vous configurez des blocs"],
            ["Rapidité du premier prototype", "Moyenne", "Élevée, si vous utilisez déjà cet éditeur", "La plus élevée"],
            ["Coût de changement", "Moyen : le code est à vous, les schémas se retrouvent ailleurs", "Élevé : concepts et traçage propres à l’éditeur", "Élevé : les flux vivent dans l’outil"],
            ["Qui peut construire", "Ingénieurs", "Ingénieurs", "Ingénieurs et métiers techniques"],
            ["Meilleur usage", "Plateformes sur mesure et durables", "Équipes standardisées sur un fournisseur", "Automatisations internes et essais rapides"],
          ],
        },
      },
      {
        h: "Comment les outils et protocoles relient-ils un agent au monde ?",
        p: [
          "Un agent n’est capable que des outils qu’il peut appeler. La carte les regroupe en appel de fonctions ou d’outils, exécution de code, recherche et navigation web, et deux protocoles : MCP, qui standardise la façon dont un agent accède aux outils et aux données, et A2A, qui standardise la façon dont les agents se parlent.",
          "Deux points pratiques. D’abord, une description d’outil fait partie de votre prompt : des noms clairs et des schémas stricts préviennent toute une classe de mauvais appels. Ensuite, l’exécution de code et la navigation doivent se faire dans un bac à sable, jamais sur la machine qui détient vos secrets. Les protocoles réduisent le travail d’intégration, mais ne décident pas de ce qu’un agent a le droit de faire. C’est une question de politique, qui demande sa propre couche.",
        ],
      },
      {
        h: "Comment orchestrer plusieurs agents ?",
        p: [
          "La carte montre trois schémas : un superviseur qui délègue à des exécutants, des passages de relais où un agent confie la tâche à un autre, et un éventail parallèle où plusieurs agents travaillent en même temps avant que les résultats soient fusionnés.",
          "Mon conseil est celui de tout système distribué : ne répartissez pas un problème entre plusieurs agents tant qu’un seul agent n’y a pas clairement échoué. Chaque agent supplémentaire ajoute de la coordination, du coût et de nouvelles façons d’échouer. Quand la répartition se justifie, un superviseur est le schéma le plus simple à raisonner et à tracer.",
        ],
      },
      {
        h: "Que contient la stack de construction ?",
        p: [
          "La branche stack liste six couches : les modèles (Claude, GPT, Gemini, Llama, Qwen), les bases vectorielles (Pinecone, Qdrant, Weaviate, pgvector), les couches de mémoire (Mem0, Zep, Letta), les bacs à sable de code (E2B, Daytona, Modal), les outils de navigation (Browserbase, Browser Use) et un runtime d’agent (plateformes d’agents cloud, ou Kubernetes si vous l’exploitez vous-même).",
          "Deux choix méritent du soin. Gardez le modèle derrière une interface, pour que changer de fournisseur soit un changement de configuration et non une réécriture. Et traitez le runtime comme une décision produit : il détermine comment vous déployez, dimensionnez, isolez et observez vos agents.",
        ],
      },
      {
        h: "Comment exploiter un agent en sécurité ?",
        p: [
          "La branche exploitation compte quatre couches, et les équipes les construisent parfois dans le mauvais ordre. Elles commencent par les garde-fous et ajoutent l’évaluation tard. Je ferais l’inverse.",
        ],
        list: [
          "Observabilité : des traces de chaque étape et de chaque appel d’outil, avec des outils comme LangSmith, Langfuse, Arize Phoenix et OpenTelemetry. On ne corrige pas ce qu’on ne peut pas rejouer.",
          "Évaluation : un jeu fixe de tâches noté automatiquement, avec des outils comme DeepEval, Ragas et Promptfoo, ou un LLM utilisé comme juge. C’est ce qui permet de changer un prompt sans crainte.",
          "Garde-fous : des contrôles en entrée et en sortie, comme NeMo Guardrails, Llama Guard, Guardrails AI et le masquage des données personnelles.",
          "Sécurité : moindre privilège, défense contre l’injection de prompt, journaux d’audit et coffre à secrets. Cette couche décide de ce que l’agent peut faire, quelle que soit sa bonne conduite.",
        ],
      },
      {
        h: "Quels modes de défaillance faut-il anticiper ?",
        p: [
          "Le tableau en bas de la carte associe cinq défaillances à un remède. J’ai ajouté une troisième colonne, car un remède n’aide que si l’on remarque la défaillance tôt.",
        ],
        table: {
          head: ["Mode de défaillance", "Remède de la carte", "Comment le détecter tôt"],
          rows: [
            ["Boucles infinies", "Nombre maximal d’étapes et règle d’arrêt", "Alerter sur les exécutions qui atteignent la limite"],
            ["Mauvais appels d’outils", "Noms d’outils et schémas clairs", "Suivre le taux d’erreur d’appel d’outil dans les traces"],
            ["Débordement du contexte", "Résumer et réduire l’historique", "Journaliser les jetons par étape et suivre la tendance"],
            ["Coût qui s’emballe", "Budgets de jetons et d’étapes", "Coût par exécution, avec alerte sur les valeurs extrêmes"],
            ["Injection de prompt", "Traiter la sortie d’un outil comme une donnée, jamais comme une instruction", "Inclure des cas d’injection dans le jeu d’évaluation"],
          ],
        },
      },
      {
        h: "Dans quel ordre le construire ?",
        p: [
          "La carte montre tout le territoire. Elle n’indique pas l’ordre, et c’est l’ordre qui fait gagner les projets. Voici la séquence que je suivrais aujourd’hui.",
        ],
        list: [
          "Écrire d’abord la tâche et la règle d’arrêt : ce qui est terminé, et quand l’agent doit abandonner.",
          "Construire un agent avec deux ou trois outils et du traçage dès le premier jour.",
          "Créer le jeu d’évaluation avant d’ajouter des fonctionnalités, pour mesurer chaque changement.",
          "Ajouter de la mémoire seulement quand une défaillance mesurée l’exige, avec sa provenance.",
          "Ajouter garde-fous, permissions et approbations en proportion de la surface d’action.",
          "Ajouter l’orchestration en dernier, et seulement quand un agent seul a clairement atteint sa limite.",
        ],
      },
    ],
    take: "La partie la plus utile de cette carte est son bord inférieur, pas son centre. La plupart des projets d’agents ne calent pas sur le choix d’un framework. Ils calent sur les branches ingrates : l’évaluation, les garde-fous et le coût. C’est pourquoi, dans les plateformes que je construis, l’action, le contexte et l’évaluation sont des systèmes distincts (NOVA, ORBIT et FORGE), et pourquoi une couche de contrôle comme TrustRail se place entre un agent et les actions qu’il peut mener. Lisez le tableau des défaillances comme une spécification, pas comme une liste de contrôle : chaque ligne doit avoir un responsable, une métrique et une limite avant l’arrivée du premier utilisateur.",
    diagram: { nodes: ["Percevoir", "Planifier", "Agir", "Observer", "Réfléchir", "Répondre"], caption: "La boucle de l’agent : chaque étape peut échouer différemment, donc chacune mérite sa trace, sa limite et son test. Une règle d’arrêt ferme la boucle." },
    results: [
      { v: "8", l: "décisions autour de la boucle, du raisonnement à l’exploitation" },
      { v: "6", l: "étapes dans la boucle de l’agent" },
      { v: "4", l: "couches d’exploitation : observabilité, évaluation, garde-fous, sécurité" },
      { v: "5", l: "modes de défaillance récurrents, chacun associé à un remède" },
    ],
    faq: [
      {
        q: "Qu’est-ce qu’un agent IA ?",
        a: "Un agent IA est un modèle de langage exécuté en boucle avec accès à des outils. Il lit un objectif, décide quoi faire, appelle un outil, observe le résultat et recommence jusqu’à ce que la tâche soit terminée ou qu’une règle d’arrêt mette fin à l’exécution.",
      },
      {
        q: "Quelles sont les étapes de la boucle de l’agent ?",
        a: "Percevoir, planifier, agir, observer, réfléchir et répondre. Si la tâche n’est pas terminée, l’agent reboucle. Chaque étape peut échouer différemment, donc chacune doit avoir sa journalisation, ses limites et ses tests.",
      },
      {
        q: "Quelle différence entre MCP et A2A ?",
        a: "MCP standardise la façon dont un agent se connecte aux outils et aux données. A2A standardise la communication entre agents. Aucun ne décide de ce qu’un agent a le droit de faire : cela demande une couche de politique et de permissions distincte.",
      },
      {
        q: "Comment empêcher un agent IA de boucler indéfiniment ?",
        a: "Fixez un nombre maximal d’étapes et une règle d’arrêt explicite, ajoutez des budgets de jetons et de coût, et alertez sur les exécutions qui atteignent la limite. La réflexion doit être contrôlée par quelque chose qui ne partage pas les angles morts du générateur.",
      },
      {
        q: "Faut-il commencer par un système multi-agents ?",
        a: "Non. Commencez par un agent et quelques outils, mesurez où il échoue, et ne passez à plusieurs agents que lorsqu’un agent seul a clairement atteint sa limite. Chaque agent supplémentaire ajoute du coût de coordination et de nouveaux modes de défaillance.",
      },
    ],
  },
  ar: {
    title: "الخريطة الذهنية لوكيل الذكاء الاصطناعي: من الفكرة إلى الإنتاج",
    dek: "صفحة واحدة تعرض كل القرارات بين فكرة وكيل ووكيل في الإنتاج: الاستدلال والذاكرة والأدوات والتنسيق والمنصة والأمان، مع أنماط الفشل التي يستدعيها كل قرار.",
    answer:
      "وكيل الذكاء الاصطناعي نموذج يعمل في حلقة: يدرك ثم يخطط ثم ينفذ ثم يراقب ثم يراجع ثم يجيب. وإيصاله إلى الإنتاج يتطلب ثمانية قرارات حول هذه الحلقة: نمط الاستدلال، والذاكرة، ونوع الوكيل، وإطار العمل، والأدوات، والتنسيق، ومنصة البناء، والتشغيل والأمان. وتعرضها هذه الخريطة مع أنماط الفشل التي يستدعيها كل قرار.",
    figure: {
      alt: "خريطة ذهنية بعنوان AI Agent Mind Map: From Idea to Production. يقع وكيل الذكاء الاصطناعي في المركز، وحوله فروع للتخطيط والمراجعة والذاكرة وأنواع الوكلاء ومنصة البناء وأطر العمل والأدوات والبروتوكولات والتنسيق والتشغيل والأمان، إضافة إلى حلقة الوكيل وجدول لأنماط الفشل وحلولها.",
      caption: "الخريطة في نظرة واحدة (انقر لفتحها بالحجم الكامل). أسماء المنتجات أمثلة على كل فئة وليست توصيات: المهم هو القرارات لا الشعارات. نصوص الصورة بالإنجليزية.",
    },
    sections: [
      {
        h: "ما وكيل الذكاء الاصطناعي، وماذا تغطي هذه الخريطة؟",
        p: [
          "الوكيل نموذج لغوي وُضع في حلقة وزُوّد بأدوات. فبدل أن يجيب مرة واحدة، يقرأ هدفًا ويقرر ما يفعل، ويستدعي أداة، وينظر في النتيجة ثم يقرر من جديد، حتى يرى أن المهمة انتهت أو توقفه قاعدة ما. هذه الحلقة هي الصف السفلي من الخريطة، وكل ما عداها قرار يُتخذ حولها.",
          "تجيب الخريطة عن السؤالين اللذين تطرحهما كل فرقة: من أين نبدأ، وماذا ننسى؟ في المركز الوكيل، وحوله ثمانية فروع، كل فرع عائلة من الخيارات: أنماط الاستدلال، والذاكرة، وأنواع الوكلاء، ومنصة البناء، والتشغيل والأمان، والتنسيق، والأدوات والبروتوكولات، وأطر العمل. وفي أسفل الخريطة جدول يقرن خمسة أنواع شائعة من الفشل بالحل الذي ينجح.",
        ],
      },
      {
        h: "ماذا يحدث داخل حلقة الوكيل؟",
        p: [
          "للحلقة ست مراحل، وقد تفشل كل مرحلة بطريقتها. وتسميتها مفيدة لأنها تدلّ على موضع سطر السجل أو الحد أو الاختبار.",
        ],
        list: [
          "الإدراك: قراءة الهدف والسياق. الفشل هنا سياق ناقص أو ضخم أكثر من اللازم.",
          "التخطيط: اختيار الخطوة التالية. الفشل هنا خطة لا تناسب الأدوات المتاحة.",
          "التنفيذ: استدعاء أداة أو واجهة برمجية. الفشل هنا أداة خاطئة أو معاملات خاطئة.",
          "المراقبة: قراءة النتيجة. الفشل هنا الوثوق بنتيجة فارغة أو خاطئة أو معادية.",
          "المراجعة: سؤال هل تحقق الهدف أم يجب إعادة المحاولة. الفشل هنا الدوران بلا تقدم.",
          "الإجابة: الرد على المستخدم. الفشل هنا إجابة تبدو مكتملة والعمل غير مكتمل.",
        ],
      },
      {
        h: "أي نمط استدلال تختار؟",
        p: [
          "تقسم الخريطة الاستدلال إلى قسمين. التخطيط يشمل ReAct وPlan-and-Execute وTree of Thoughts. والمراجعة تشمل Reflexion والنقد الذاتي ونموذجًا مدقّقًا مستقلًا وإعادة المحاولة مع التغذية الراجعة.",
          "قاعدتي العملية أن تبدأ بأبسط نمط ينجح، ولا تضيف بنية إلا عندما يفرضها فشل. يكفي ReAct، حيث يتناوب النموذج بين التفكير والتنفيذ، لكثير من المهام. ويستحق Plan-and-Execute مكانه في المهام الطويلة، لأن كتابة الخطة كاملة أولًا تجعل الانحراف مرئيًا. أما Tree of Thoughts فنادرًا ما يستحق كلفته خارج مسائل البحث الصعبة.",
          "وفي المراجعة كثيرًا ما تبالغ الفرق في الإنفاق. فطلب نقد النموذج لإجابته يكلّف رموزًا، وكثيرًا ما يوافق نفسه. وفي كل ما له عواقب أفضّل فحصًا لا يشترك مع المولّد في نقاطه العمياء: نموذج مدقّق أو قاعدة أو اختبار.",
        ],
      },
      {
        h: "ما أنواع الذاكرة التي يحتاجها الوكيل؟",
        p: [
          "تعدّد الخريطة ستة أنواع، وكل نوع يجيب عن سؤال مختلف. من المفيد أن تسأل عمّا يجب أن يتذكره الوكيل ولكم من الوقت قبل اختيار مخزن.",
        ],
        list: [
          "الذاكرة قصيرة المدى هي نافذة السياق: المهمة الحالية فقط.",
          "الذاكرة طويلة المدى في مخزن متجهات، للمعارف التي يستحق استرجاعها لاحقًا.",
          "الذاكرة العرضية تسجّل التشغيلات السابقة ليتعلم الوكيل مما حدث.",
          "الذاكرة الدلالية تحفظ حقائق ثابتة عن المستخدمين والمجال.",
          "الذاكرة الإجرائية تحفظ المهارات: كيف تنجز شيئًا، وتُعاد استخدامها بين المهام.",
          "الذاكرة المشتركة تتيح لعدة وكلاء قراءة الحالة نفسها وكتابتها.",
        ],
      },
      {
        h: "لماذا تحتاج الذاكرة إلى حوكمة لا إلى تخزين فقط؟",
        p: [
          "معظم مشكلات الذاكرة ليست مشكلات تخزين، بل مشكلات ثقة: من أين جاءت هذه الحقيقة، وهل ما زالت صحيحة، ومن يحق له رؤيتها؟ والذاكرة التي لا تجيب عن هذه الأسئلة ستضع يومًا حقيقة قديمة أو خاصة في تعليمات الموجّه.",
          "وهذه فكرة ORBIT، محرك السياق والذاكرة الخاضع للحوكمة الذي أبنيه: ينبغي أن يكون السياق قابلًا للتتبع ومؤرَّخًا، خصوصًا في الأعمال الطويلة ومتعددة الوكلاء. وأيًا كان المخزن، احفظ المصدر وتاريخًا بجانب المحتوى، وقرّر مسبقًا ما يجوز نسيانه.",
        ],
      },
      {
        h: "أي نوع من الوكلاء تبني؟",
        p: [
          "تسمّي الخريطة ثلاثة: وكلاء البرمجة ووكلاء البحث ووكلاء استخدام الحاسوب. وهم يختلفون في حجم الضرر الذي قد يسببه فعل خاطئ أكثر مما يختلفون في الذكاء. وكيل البحث يقرأ. ووكيل البرمجة يكتب ملفات وينفذ أوامر. ووكيل استخدام الحاسوب ينقر داخل تطبيقات حقيقية، وهذا أوسع سطح فعل بين الثلاثة.",
          "اختر النوع أولًا، فهو يحدد قدر العزل والمراجعة والموافقة الذي ستحتاجه لاحقًا. وقد تناولت حالة وكلاء البرمجة في مقالتي عن الاستقلالية المكتسبة: تُمنح الاستقلالية خطوة بخطوة مع تراكم الأدلة.",
        ],
      },
      {
        h: "إطار مفتوح المصدر أم حزمة مزوّد أم منخفض الكود؟",
        p: [
          "أطر العمل هي الفرع الأكثر شعارات، وهو الأسهل للتيه فيه. فكّر في ثلاث عائلات: أطر مفتوحة المصدر مثل LangGraph وCrewAI وAutoGen، وحزم تطوير من مزوّدي النماذج والمنصات السحابية، وأدوات منخفضة الكود مثل n8n وDify وFlowise وLangflow. والجدول أدناه تبسيط مني وليس مقياسًا معياريًا.",
        ],
        table: {
          head: ["المعيار", "إطار مفتوح المصدر", "حزمة مزوّد", "أداة منخفضة الكود"],
          rows: [
            ["التحكم في السلوك", "عالٍ: أنت تملك المخطط", "متوسط: تتبع نموذج المزوّد", "منخفض إلى متوسط: تضبط كتلًا جاهزة"],
            ["سرعة أول نموذج أولي", "متوسطة", "عالية إن كنت تستخدم المزوّد أصلًا", "الأعلى"],
            ["كلفة التحول", "متوسطة: الشيفرة لك والأنماط مشتركة", "عالية: المفاهيم والتتبع خاصة بالمزوّد", "عالية: التدفقات تعيش داخل الأداة"],
            ["من يستطيع البناء", "المهندسون", "المهندسون", "المهندسون والمستخدمون التقنيون من الأعمال"],
            ["الأنسب", "منصات مخصصة طويلة العمر", "فرق موحّدة على مزوّد واحد", "أتمتة داخلية وتجارب سريعة"],
          ],
        },
      },
      {
        h: "كيف تربط الأدوات والبروتوكولات الوكيل بالعالم؟",
        p: [
          "قدرة الوكيل بقدر الأدوات التي يستطيع استدعاءها. وتجمعها الخريطة في استدعاء الدوال أو الأدوات، وتنفيذ الشيفرة، والبحث والتصفح على الويب، وبروتوكولين: MCP الذي يوحّد طريقة وصول الوكيل إلى الأدوات والبيانات، وA2A الذي يوحّد طريقة حديث الوكلاء بعضهم مع بعض.",
          "نقطتان عمليتان. الأولى أن وصف الأداة جزء من تعليماتك: الأسماء الواضحة والمخططات الصارمة تمنع فئة كاملة من الاستدعاءات الخاطئة. والثانية أن تنفيذ الشيفرة والتصفح مكانهما بيئة معزولة، لا الجهاز الذي يحمل أسرارك. البروتوكولات تقلل عمل التكامل لكنها لا تقرر ما يحق للوكيل فعله. تلك مسألة سياسة، وتحتاج طبقتها الخاصة.",
        ],
      },
      {
        h: "كيف تنسّق عدة وكلاء؟",
        p: [
          "تعرض الخريطة ثلاثة أنماط: مشرف يفوّض عمالًا، وتسليمات يمرّر فيها وكيل المهمة إلى آخر، وتوزيع متوازٍ يعمل فيه عدة وكلاء في آن واحد ثم تُدمج النتائج.",
          "نصيحتي كما في أي نظام موزّع: لا توزّع مشكلة على عدة وكلاء قبل أن يفشل وكيل واحد فيها بوضوح. كل وكيل إضافي يضيف تنسيقًا وكلفة وطرقًا جديدة للفشل. وعندما يكون التوزيع مبررًا، يظل المشرف أسهل الأنماط في الفهم والتتبع.",
        ],
      },
      {
        h: "ماذا تتضمن منصة البناء؟",
        p: [
          "يسرد فرع المنصة ست طبقات: النماذج (Claude وGPT وGemini وLlama وQwen)، ومخازن المتجهات (Pinecone وQdrant وWeaviate وpgvector)، وطبقات الذاكرة (Mem0 وZep وLetta)، وبيئات تنفيذ الشيفرة المعزولة (E2B وDaytona وModal)، وأدوات التصفح (Browserbase وBrowser Use)، وبيئة تشغيل الوكيل (منصات وكلاء سحابية، أو Kubernetes إن شغّلتها بنفسك).",
          "خياران يستحقان العناية. أبقِ النموذج خلف واجهة، ليكون تغيير المزوّد تغيير إعداد لا إعادة كتابة. وعامل بيئة التشغيل كقرار منتج: هي التي تحدد كيف تنشر وكلاءك وتوسّعهم وتعزلهم وتراقبهم.",
        ],
      },
      {
        h: "كيف تشغّل وكيلًا بأمان؟",
        p: [
          "لفرع التشغيل أربع طبقات، وقد تبنيها الفرق أحيانًا بترتيب خاطئ: تبدأ بالحواجز الوقائية وتضيف التقييم متأخرة. وأنا أعكس ذلك.",
        ],
        list: [
          "المراقبة: تتبّع كل خطوة وكل استدعاء أداة، بأدوات مثل LangSmith وLangfuse وArize Phoenix وOpenTelemetry. لا تصلح ما لا تستطيع إعادة تشغيله.",
          "التقييم: مجموعة ثابتة من المهام تُقيَّم آليًا، بأدوات مثل DeepEval وRagas وPromptfoo، أو نموذج لغوي يعمل حكمًا. وبه تغيّر تعليمات الموجّه دون خوف.",
          "الحواجز الوقائية: فحوص على المدخلات والمخرجات، مثل NeMo Guardrails وLlama Guard وGuardrails AI وحجب البيانات الشخصية.",
          "الأمان: أقل الصلاحيات، والدفاع ضد حقن التعليمات، وسجلات التدقيق، وخزنة أسرار. وهذه الطبقة تحدد ما يجوز للوكيل فعله مهما حسن سلوكه.",
        ],
      },
      {
        h: "ما أنماط الفشل التي ينبغي توقعها؟",
        p: [
          "يقرن الجدول في أسفل الخريطة خمسة أنواع من الفشل بحل لكل منها. وأضفت عمودًا ثالثًا، لأن الحل لا ينفع إلا إذا لاحظت الفشل مبكرًا.",
        ],
        table: {
          head: ["نمط الفشل", "الحل في الخريطة", "كيف تكتشفه مبكرًا"],
          rows: [
            ["حلقات لا نهائية", "حد أقصى للخطوات وقاعدة إيقاف", "تنبيه عند التشغيلات التي تبلغ حد الخطوات"],
            ["استدعاءات أدوات خاطئة", "أسماء أدوات ومخططات واضحة", "تتبّع معدل أخطاء استدعاء الأدوات في المسارات"],
            ["فيض السياق", "تلخيص السجل وتقليصه", "تسجيل الرموز في كل خطوة ومراقبة الاتجاه"],
            ["كلفة منفلتة", "ميزانيات للرموز والخطوات", "كلفة كل تشغيل مع تنبيه على القيم الشاذة"],
            ["حقن التعليمات", "اعتبار مخرجات الأدوات بيانات لا تعليمات", "إدراج حالات الحقن في مجموعة التقييم"],
          ],
        },
      },
      {
        h: "بأي ترتيب أبنيه؟",
        p: [
          "تعرض الخريطة الميدان كله، لكنها لا تذكر الترتيب، وبالترتيب تُكسب المشاريع. وهذا التسلسل الذي أتبعه اليوم.",
        ],
        list: [
          "اكتب المهمة وقاعدة الإيقاف أولًا: ما الذي يعني الانتهاء، ومتى يجب أن يتوقف الوكيل.",
          "ابنِ وكيلًا واحدًا بأداتين أو ثلاث مع التتبع من اليوم الأول.",
          "أنشئ مجموعة التقييم قبل إضافة الميزات، ليُقاس كل تغيير.",
          "أضف الذاكرة فقط عندما يتطلبها فشل مقاس، وأعطها مصدرًا موثقًا.",
          "أضف الحواجز والصلاحيات والموافقات بما يتناسب مع سطح الفعل.",
          "أضف التنسيق أخيرًا، وفقط عندما يبلغ وكيل واحد حدّه بوضوح.",
        ],
      },
    ],
    take: "أنفع جزء في هذه الخريطة هو حافتها السفلى لا مركزها. معظم مشاريع الوكلاء لا تتعثر عند اختيار إطار عمل، بل عند الفروع الأقل بريقًا: التقييم والحواجز الوقائية والكلفة. ولهذا تكون في المنصات التي أبنيها عملية التنفيذ والسياق والتقييم أنظمة منفصلة (NOVA وORBIT وFORGE)، وتقع طبقة تحكم مثل TrustRail بين الوكيل والأفعال التي يستطيع تنفيذها. اقرأ جدول الفشل كمواصفة لا كقائمة فحص: يجب أن يكون لكل صف مسؤول ومقياس وحد قبل وصول أول مستخدم.",
    diagram: { nodes: ["الإدراك", "التخطيط", "التنفيذ", "المراقبة", "المراجعة", "الإجابة"], caption: "حلقة الوكيل: قد تفشل كل مرحلة بطريقة مختلفة، فتستحق كل مرحلة تتبعها وحدها واختبارها. وقاعدة الإيقاف تغلق الحلقة." },
    results: [
      { v: "8", l: "قرارات حول الحلقة، من الاستدلال إلى التشغيل" },
      { v: "6", l: "مراحل في حلقة الوكيل" },
      { v: "4", l: "طبقات تشغيل: المراقبة والتقييم والحواجز والأمان" },
      { v: "5", l: "أنماط فشل متكررة، لكل منها حل" },
    ],
    faq: [
      {
        q: "ما وكيل الذكاء الاصطناعي؟",
        a: "وكيل الذكاء الاصطناعي نموذج لغوي يعمل في حلقة مع إمكانية الوصول إلى أدوات. يقرأ هدفًا ويقرر ما يفعل ويستدعي أداة ويراقب النتيجة ثم يكرر حتى تنتهي المهمة أو تُنهي قاعدة إيقاف التشغيل.",
      },
      {
        q: "ما مراحل حلقة الوكيل؟",
        a: "الإدراك والتخطيط والتنفيذ والمراقبة والمراجعة والإجابة. وإن لم تنتهِ المهمة يعيد الوكيل الحلقة. وقد تفشل كل مرحلة بطريقة مختلفة، لذا يجب أن يكون لكل مرحلة تسجيلها وحدودها واختباراتها.",
      },
      {
        q: "ما الفرق بين MCP وA2A؟",
        a: "يوحّد MCP طريقة اتصال الوكيل بالأدوات والبيانات، ويوحّد A2A التواصل بين الوكلاء. ولا يقرر أيٌّ منهما ما يحق للوكيل فعله: وهذا يحتاج إلى طبقة سياسات وصلاحيات منفصلة.",
      },
      {
        q: "كيف تمنع وكيل ذكاء اصطناعي من الدوران إلى ما لا نهاية؟",
        a: "حدّد حدًا أقصى للخطوات وقاعدة إيقاف صريحة، وأضف ميزانيات للرموز والكلفة، ونبّه على التشغيلات التي تبلغ الحد. ويجب أن تُفحص المراجعة بما لا يشترك مع المولّد في نقاطه العمياء.",
      },
      {
        q: "هل ينبغي البدء بنظام متعدد الوكلاء؟",
        a: "لا. ابدأ بوكيل واحد وبضع أدوات، وقِس أين يفشل، ولا تنتقل إلى عدة وكلاء إلا عندما يبلغ وكيل واحد حدّه بوضوح. كل وكيل إضافي يضيف كلفة تنسيق وأنماط فشل جديدة.",
      },
    ],
  },
};
