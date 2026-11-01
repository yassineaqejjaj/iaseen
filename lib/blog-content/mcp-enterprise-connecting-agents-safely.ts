import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "MCP in the Enterprise: Connecting Agents to Confluence, Jira and Microsoft 365 Safely",
    dek: "The Model Context Protocol makes it easy to plug agents into company tools. Doing it safely is a question of permissions, classification and trust in retrieved text.",
    answer:
      "The Model Context Protocol (MCP) is a standard way for AI agents to call tools and read data through one common interface. In an enterprise it is as much a security question as an integration one: permissions, prompt injection, data classification and audit all decide whether a connection is safe.",
    sections: [
      {
        h: "What is the Model Context Protocol?",
        p: [
          "MCP is a standard protocol between an AI agent and the tools it uses. A server exposes capabilities, such as searching a wiki or reading a ticket, and a client inside the agent discovers and calls them. Instead of writing a bespoke integration for every pairing of agent and tool, you write against one protocol.",
        ],
      },
      {
        h: "Why is connecting agents to enterprise tools a security question?",
        p: [
          "An integration question asks whether the agent can reach Confluence. A security question asks what it may read once it gets there, on whose behalf, and what happens to the text it brings back. In a classic integration a person clicks and a service account is audited. With an agent, the tool call is made by a model, often in a loop, from text that may itself have come from a retrieved page.",
          "Four concerns follow, and I treat them as the real scope of any MCP project:",
        ],
        list: [
          "Permissions: the agent should see what the person asking may see, not what the shared token can see.",
          "Prompt injection through retrieved content: a wiki page or a ticket is data, but a model may read instructions inside it.",
          "Data classification: confidential and secret material must not flow to places it should not reach, external models included.",
          "Audit: you must be able to reconstruct what was served, to whom and why.",
        ],
      },
      {
        h: "What are the main risks, and which controls answer them?",
        p: [
          "Most failures I expect in this space are not protocol failures. They come from a service account with broad rights that nobody scoped to the person asking. The table maps each risk to the control I look for when I review a connector.",
        ],
        table: {
          head: ["Risk", "What goes wrong", "Control to look for"],
          rows: [
            ["Over-broad token", "The agent reads everything the connector account can see", "Each item checked against the asking user’s rights at serving time"],
            ["Prompt injection", "A retrieved page contains instructions the model follows", "Detection at ingestion, quarantine, and served content marked as untrusted data"],
            ["Confidential data leaving", "Secret content reaches the wrong reader or an external model", "A classification scale, a ceiling per request, a guard on external model calls"],
            ["Personal data", "Names, emails or bank details reach the prompt", "Detection and redaction at ingestion, redacted text served"],
            ["Arbitrary servers", "An unreviewed MCP server runs with your credentials", "An allow-list of vetted servers, isolated execution, custom servers off by default"],
            ["Stale access", "Rights are withdrawn but derived copies live on", "Revocation events so that consumers invalidate what they derived"],
            ["No trail", "Nobody can say what was served", "An audit log and a reason code for every item"],
          ],
        },
      },
      {
        h: "How does ORBIT connect to Confluence, Jira and Microsoft 365?",
        p: [
          "ORBIT, the context platform I built, has two routes to external tools. Native connectors cover SharePoint and OneDrive, Confluence and Jira. MCP connectors cover Confluence and Jira, Microsoft 365, Google Workspace, Slack, GitHub, Linear, Obsidian and Figma, with a five-step start-up assistant. A worker synchronises connectors on a schedule, every 60 minutes by default.",
          "Both routes feed the same ingestion pipeline. A Confluence page or a Jira ticket goes through personal-data detection, classification and chunking before it can be served to any agent. The design choice I care about is that the agent never talks to Confluence directly: it talks to ORBIT, which holds a synchronised, classified copy.",
          "One limit to state plainly: interactive OAuth sign-in for Microsoft 365, Google and Linear through MCP is on the roadmap and is not delivered.",
        ],
      },
      {
        h: "How does ORBIT keep permissions and classification intact?",
        p: [
          "The rule is stated in one line in the README: content is served only if its classification is at or below the lowest of the user’s clearance, the agent’s clearance and the ceiling set on the request. An agent acts on behalf of a project member. Without that, it reaches only what is open to the whole project.",
          "NOVA, my personal product agent, retrieves ORBIT context as the user, so the same rule applies when a person asks it for a deliverable. These are the mechanisms behind the rule:",
        ],
        list: [
          "A classification scale from C0 (public) to C3 (secret), aligned with the organisation’s policy.",
          "Access lists on documents, chunks and memory. Derived memory inherits the most restrictive list and the highest classification of its sources.",
          "Exclusions for access or classification are logged but redacted for anyone without access: no title, excerpt or identifier. Agents receive counters only.",
          "Personal-data detection at ingestion, and served context always uses the redacted text.",
          "Revocation events, such as document.acl_changed, member.removed and agent.revoked, in the change feed and in signed webhooks, so consumers can invalidate what they derived.",
        ],
      },
      {
        h: "How does ORBIT deal with prompt injection in retrieved content?",
        p: [
          "Prompt injection is the risk that MCP makes most visible, because the agent now reads text written by people it never met. I do not believe a single filter solves it, so ORBIT layers several defences, all visible in its configuration:",
        ],
        list: [
          "At ingestion, each fragment is scored. Above a threshold (0.6 by default) it is quarantined until a project owner releases it. A local classifier is an optional addition.",
          "At serving time, everything handed to agents is tagged as untrusted data, a technique often called spotlighting.",
          "Low-trust sources receive a ranking penalty (0.15 by default), so they surface less often.",
          "A poisoning alert fires when a recent source or an agent proposes an unusual number of items in a time window (8 within 24 hours by default).",
        ],
      },
      {
        h: "What does ORBIT’s own MCP server expose, and how are third-party servers contained?",
        p: [
          "ORBIT is also an MCP server, over streamable HTTP. Each agent holds an API key bound to a project, and only its SHA-256 fingerprint is stored. The server exposes 12 tools, among them get_context, search_sources, expand_source and propose_memory. That last tool creates a proposal that a human must validate, so an agent cannot write straight into trusted memory.",
          "For third-party MCP servers, ORBIT inverts the usual trust. Only preset servers can be launched, from an allow-list, with arguments built on the server side. They run in an isolated environment that holds only that connector’s credentials, with timeouts and caps on the number of items. Connector secrets are encrypted and never displayed again, and the backend images embed pinned versions of Node.js and the MCP servers, so no code is downloaded at runtime. A custom preset exists, but it is disabled by default and reserved for administrators.",
        ],
      },
      {
        h: "Is ORBIT ready for production, and where should you start?",
        p: [
          "No. ORBIT is a public beta and is not validated for production use. Its README says that full production hardening, including single sign-on, multi-factor authentication, chained audit and backups, is still in progress. I have no measured results to quote: what follows describes what the project provides, not what it has achieved. Its demo set contains deliberately fictitious C2 (confidential) and C3 (secret) content, and the README warns never to mix in real data. I repeat that warning.",
          "Whatever tool you choose, this is the order I would follow:",
        ],
        list: [
          "Inventory every MCP server and connector, and name an owner for each.",
          "Replace shared service accounts with access on behalf of the person asking.",
          "Classify content before it reaches an agent, and cap what external models may receive.",
          "Treat all retrieved text as untrusted data, never as instructions.",
          "Allow-list servers and keep custom ones disabled.",
          "Log what was served and why, and test with fictitious data first.",
        ],
      },
    ],
    take: "I think MCP will be judged less on how many tools an agent can reach than on what it is prevented from seeing. My rule is that an agent should never hold more access than the person asking, and that every served item should carry a reason I can read later. ORBIT is my attempt to build that rule into the context layer, and it remains a beta that I would not yet put in front of real confidential data.",
    diagram: {
      heads: ["Direct tool access", "Governed context layer"],
      nodes: ["Agent", "MCP server and tool", "Everything the token can see"],
      nodes2: ["Agent", "Permission check", "Classification and redaction", "Reason code", "Only what the user may see"],
      caption: "Same agent, same tools: the difference is whether the token or the person decides what comes back.",
    },
    results: [
      { v: "800", l: "employees using NOVA at Devoteam, which retrieves ORBIT context as the user" },
      { v: "C0 to C3", l: "classification scale ORBIT applies before serving content (beta design)" },
      { v: "12", l: "tools exposed by ORBIT’s MCP server (what the project provides)" },
      { v: "HMAC-SHA256", l: "signature on ORBIT webhooks, with redacted payloads for C2 and above (beta design)" },
    ],
    faq: [
      {
        q: "What is MCP in simple terms?",
        a: "The Model Context Protocol is a standard that lets an AI agent discover and call external tools and data sources in the same way, whatever the tool. A server exposes capabilities and the agent’s client uses them, so teams avoid writing a custom integration for each agent and tool pair.",
      },
      {
        q: "Is MCP secure by default?",
        a: "No. The protocol standardises how an agent calls a tool, but it does not decide whose permissions apply, how retrieved text is treated or how data is classified. Those controls come from the server, the connector and the layer around them. Review each MCP server like any other dependency that runs with credentials.",
      },
      {
        q: "Can an agent read everything my Confluence or Jira token can see?",
        a: "With direct access through one shared token, usually yes, and that is the central risk. A governed layer checks each item against the asking user’s rights first. ORBIT is designed to do this with access lists and a classification ceiling, although it remains a public beta.",
      },
      {
        q: "How does ORBIT protect against prompt injection?",
        a: "It is designed to layer several defences: scoring and quarantine of suspicious fragments at ingestion, marking served content as untrusted data, a ranking penalty for low-trust sources and a poisoning alert. I have not measured detection quality, so test it against your own content and treat it as defence in depth.",
      },
      {
        q: "Is ORBIT ready for production?",
        a: "No. ORBIT is a public beta and is not validated for production use. The README lists production hardening, such as single sign-on and multi-factor authentication, as work in progress. It is a working reference for governed connectors and context, to learn from and to adapt with proper review.",
      },
    ],
  },
  fr: {
    title: "MCP en entreprise : connecter des agents à Confluence, Jira et Microsoft 365 en toute sécurité",
    dek: "MCP facilite le branchement des agents sur les outils de l’entreprise. Le faire sans risque relève des droits d’accès, de la classification et de la confiance accordée au texte récupéré.",
    answer:
      "Le Model Context Protocol (MCP) est un standard qui permet à des agents IA d’appeler des outils et de lire des données via une interface commune. En entreprise, c’est autant un sujet de sécurité que d’intégration : droits d’accès, injection de prompt, classification des données et audit décident si une connexion est sûre.",
    sections: [
      {
        h: "Qu’est-ce que le Model Context Protocol ?",
        p: [
          "MCP est un protocole standard entre un agent IA et les outils qu’il utilise. Un serveur expose des capacités, comme chercher dans un wiki ou lire un ticket, et un client intégré à l’agent les découvre et les appelle. Plutôt qu’une intégration sur mesure par couple agent et outil, on s’appuie sur un seul protocole.",
        ],
      },
      {
        h: "Pourquoi connecter des agents aux outils de l’entreprise est-il un sujet de sécurité ?",
        p: [
          "Une question d’intégration demande si l’agent peut atteindre Confluence. Une question de sécurité demande ce qu’il a le droit de lire une fois arrivé, pour le compte de qui, et ce que devient le texte qu’il rapporte. Avec un agent, l’appel d’outil est fait par un modèle, souvent en boucle, à partir d’un texte qui peut lui-même provenir d’une page récupérée.",
          "Quatre préoccupations en découlent, et je les considère comme le vrai périmètre de tout projet MCP :",
        ],
        list: [
          "Les droits d’accès : l’agent doit voir ce que la personne qui demande a le droit de voir, pas ce que le jeton partagé peut voir.",
          "L’injection de prompt par le contenu récupéré : une page de wiki ou un ticket sont des données, mais un modèle peut y lire des instructions.",
          "La classification des données : un contenu confidentiel ou secret ne doit pas circuler là où il ne doit pas aller, modèles externes compris.",
          "L’audit : il faut pouvoir reconstituer ce qui a été servi, à qui et pourquoi.",
        ],
      },
      {
        h: "Quels sont les principaux risques et les contrôles correspondants ?",
        p: [
          "La plupart des défaillances que j’anticipe ne sont pas des défaillances du protocole. Elles viennent d’un compte de service aux droits larges, jamais limité à la personne qui demande. Le tableau associe chaque risque au contrôle que je cherche.",
        ],
        table: {
          head: ["Risque", "Ce qui se passe", "Contrôle à rechercher"],
          rows: [
            ["Jeton trop large", "L’agent lit tout ce que le compte du connecteur peut voir", "Chaque élément vérifié selon les droits de l’utilisateur qui demande, au moment de servir"],
            ["Injection de prompt", "Une page récupérée contient des instructions que le modèle suit", "Détection à l’ingestion, quarantaine, contenu servi marqué comme donnée non fiable"],
            ["Fuite de données confidentielles", "Un contenu secret atteint le mauvais lecteur ou un modèle externe", "Une échelle de classification, un plafond par requête, un garde-fou sur les appels à un modèle externe"],
            ["Données personnelles", "Noms, e-mails ou coordonnées bancaires arrivent dans le prompt", "Détection et caviardage à l’ingestion, texte caviardé servi"],
            ["Serveurs arbitraires", "Un serveur MCP non examiné s’exécute avec vos identifiants", "Liste autorisée de serveurs vérifiés, exécution isolée, serveurs personnalisés désactivés par défaut"],
            ["Accès périmé", "Les droits sont retirés mais les copies dérivées survivent", "Événements de révocation pour que les consommateurs invalident ce qu’ils ont dérivé"],
            ["Aucune trace", "Personne ne peut dire ce qui a été servi", "Un journal d’audit et un code de raison pour chaque élément"],
          ],
        },
      },
      {
        h: "Comment ORBIT se connecte-t-il à Confluence, Jira et Microsoft 365 ?",
        p: [
          "ORBIT, la plateforme de contexte que j’ai construite, propose deux voies vers les outils externes. Les connecteurs natifs couvrent SharePoint et OneDrive, Confluence et Jira. Les connecteurs MCP couvrent Confluence et Jira, Microsoft 365, Google Workspace, Slack, GitHub, Linear, Obsidian et Figma, avec un assistant de démarrage en cinq étapes. Un worker les synchronise toutes les 60 minutes par défaut.",
          "Les deux voies alimentent le même pipeline d’ingestion. Chaque page ou ticket passe par la détection des données personnelles, la classification et le découpage avant d’être servi. Le choix qui m’importe : l’agent ne parle jamais directement à Confluence, il parle à ORBIT, qui détient une copie synchronisée et classifiée.",
          "Limite à énoncer : la connexion OAuth interactive pour Microsoft 365, Google et Linear via MCP est sur la feuille de route, pas livrée.",
        ],
      },
      {
        h: "Comment ORBIT préserve-t-il droits d’accès et classification ?",
        p: [
          "La règle tient en une ligne dans le README : un contenu n’est servi que si sa classification est inférieure ou égale au plus bas de l’habilitation de l’utilisateur, de l’habilitation de l’agent et du plafond fixé sur la requête. Un agent agit pour le compte d’un membre du projet ; sans cela, il n’accède qu’à ce qui est ouvert à tout le projet.",
          "NOVA, mon agent produit personnel, récupère le contexte ORBIT en tant que l’utilisateur : la même règle s’applique. Voici les mécanismes :",
        ],
        list: [
          "Une échelle de classification de C0 (public) à C3 (secret), alignée sur la politique de l’organisation.",
          "Des listes d’accès sur les documents, fragments et éléments de mémoire. La mémoire dérivée hérite de la liste la plus restrictive et de la classification la plus haute de ses sources.",
          "Les exclusions pour accès ou classification sont journalisées mais caviardées pour qui n’y a pas accès (ni titre, ni extrait, ni identifiant) ; les agents ne reçoivent que des compteurs.",
          "Une détection des données personnelles à l’ingestion, et le contexte servi utilise toujours le texte caviardé.",
          "Des événements de révocation, comme document.acl_changed, member.removed et agent.revoked, dans le fil des changements et dans les webhooks signés.",
        ],
      },
      {
        h: "Comment ORBIT traite-t-il l’injection de prompt dans le contenu récupéré ?",
        p: [
          "L’injection de prompt est le risque que MCP rend le plus visible : l’agent lit désormais des textes écrits par des inconnus. Je ne crois pas qu’un filtre unique suffise : ORBIT empile plusieurs défenses :",
        ],
        list: [
          "À l’ingestion, chaque fragment reçoit un score. Au-dessus d’un seuil (0,6 par défaut), il est mis en quarantaine jusqu’à libération par un propriétaire.",
          "Au moment de servir, tout ce qui est remis aux agents est balisé comme donnée non fiable.",
          "Les sources de faible confiance subissent une pénalité de classement (0,15 par défaut) et remontent donc moins souvent.",
          "Une alerte d’empoisonnement se déclenche quand une source récente ou un agent propose un nombre inhabituel d’éléments (8 en 24 heures par défaut).",
        ],
      },
      {
        h: "Qu’expose le serveur MCP d’ORBIT, et comment les serveurs tiers sont-ils contenus ?",
        p: [
          "ORBIT est aussi un serveur MCP, en streamable HTTP. Chaque agent détient une clé d’API rattachée à un projet, et seule son empreinte SHA-256 est stockée. Le serveur expose 12 outils, dont get_context, search_sources et propose_memory. Ce dernier crée une proposition qu’un humain doit valider : l’agent n’écrit donc pas directement dans la mémoire de confiance.",
          "Pour les serveurs MCP tiers, ORBIT inverse la confiance habituelle. Seuls les serveurs des préréglages peuvent être lancés, depuis une liste autorisée, avec des arguments construits côté serveur. Ils s’exécutent dans un environnement isolé ne contenant que les identifiants du connecteur, avec délais et plafonds. Les secrets sont chiffrés et jamais réaffichés, et les images du backend embarquent des versions figées de Node.js et des serveurs MCP : aucun code n’est téléchargé à l’exécution. Un préréglage personnalisé existe, mais il est désactivé par défaut et réservé aux administrateurs.",
        ],
      },
      {
        h: "ORBIT est-il prêt pour la production, et par où commencer ?",
        p: [
          "Non. ORBIT est une bêta publique, non validée pour un usage en production. Son README indique que le durcissement complet pour la production, avec authentification unique, authentification multifacteur, audit chaîné et sauvegardes, est encore en cours. Je n’ai aucun résultat mesuré à citer : ce qui précède décrit ce que le projet fournit, pas ses résultats. Son jeu de démonstration contient des contenus volontairement fictifs C2 (confidentiel) et C3 (secret), et le README met en garde : n’y mélangez jamais de vraies données.",
          "Quel que soit l’outil retenu, voici l’ordre que je suivrais :",
        ],
        list: [
          "Inventorier chaque serveur MCP et connecteur, avec un responsable nommé.",
          "Remplacer les comptes de service partagés par un accès pour le compte de la personne.",
          "Classifier le contenu avant l’agent et plafonner ce que les modèles externes reçoivent.",
          "Traiter tout texte récupéré comme une donnée non fiable, jamais comme des instructions.",
          "Autoriser les serveurs par liste et garder les serveurs personnalisés désactivés.",
          "Journaliser ce qui a été servi et pourquoi, et tester d’abord avec des données fictives.",
        ],
      },
    ],
    take: "Je pense que MCP sera jugé moins sur le nombre d’outils qu’un agent peut atteindre que sur ce qu’on l’empêche de voir. Ma règle : un agent n’a jamais plus d’accès que la personne qui demande, et chaque élément servi porte une raison relisible. ORBIT est ma tentative d’inscrire cette règle dans la couche de contexte, et cela reste une bêta que je ne placerais pas encore devant de vraies données confidentielles.",
    diagram: {
      heads: ["Accès direct aux outils", "Couche de contexte gouvernée"],
      nodes: ["Agent", "Serveur MCP et outil", "Tout ce que le jeton peut voir"],
      nodes2: ["Agent", "Contrôle des droits", "Classification et caviardage", "Code de raison", "Uniquement ce que l’utilisateur peut voir"],
      caption: "Même agent, mêmes outils : la différence est de savoir si c’est le jeton ou la personne qui décide de ce qui revient.",
    },
    results: [
      { v: "800", l: "collaborateurs utilisant NOVA chez Devoteam, qui récupère le contexte ORBIT en tant que l’utilisateur" },
      { v: "C0 à C3", l: "échelle de classification qu’ORBIT applique avant de servir un contenu (conception bêta)" },
      { v: "12", l: "outils exposés par le serveur MCP d’ORBIT (ce que fournit le projet)" },
      { v: "HMAC-SHA256", l: "signature des webhooks d’ORBIT, charge utile caviardée dès C2 (conception bêta)" },
    ],
    faq: [
      {
        q: "Qu’est-ce que MCP, en termes simples ?",
        a: "Le Model Context Protocol est un standard qui permet à un agent IA de découvrir et d’appeler des outils et des sources de données de la même façon. Un serveur expose des capacités que le client de l’agent utilise, sans intégration spécifique pour chaque couple agent et outil.",
      },
      {
        q: "MCP est-il sûr par défaut ?",
        a: "Non. Le protocole standardise l’appel d’un outil, mais ne décide ni des droits applicables, ni du traitement du texte récupéré, ni de la classification. Ces contrôles viennent du serveur, du connecteur et de la couche qui les entoure. Examinez chaque serveur MCP comme toute dépendance disposant d’identifiants.",
      },
      {
        q: "Un agent peut-il lire tout ce que mon jeton Confluence ou Jira peut voir ?",
        a: "Avec un accès direct par un jeton partagé, en général oui, et c’est le risque central. Une couche gouvernée vérifie d’abord chaque élément selon les droits de l’utilisateur qui demande. ORBIT est conçu pour le faire avec des listes d’accès et un plafond de classification, mais il reste une bêta publique.",
      },
      {
        q: "Comment ORBIT protège-t-il contre l’injection de prompt ?",
        a: "Il est conçu pour empiler plusieurs défenses : score et quarantaine des fragments suspects à l’ingestion, marquage du contenu servi comme donnée non fiable, pénalité de classement des sources de faible confiance et alerte d’empoisonnement. Je n’ai pas mesuré la qualité de détection : testez-la sur vos propres contenus.",
      },
      {
        q: "ORBIT est-il prêt pour la production ?",
        a: "Non. ORBIT est une bêta publique, non validée pour un usage en production. Le README classe le durcissement pour la production, comme l’authentification unique et multifacteur, parmi les travaux en cours. C’est une référence fonctionnelle, pour apprendre et adapter avec une revue sérieuse.",
      },
    ],
  },
  ar: {
    title: "MCP في المؤسسات: ربط الوكلاء بـ Confluence وJira وMicrosoft 365 بأمان",
    dek: "يسهّل بروتوكول سياق النموذج (MCP) توصيل الوكلاء بأدوات الشركة. وجعل هذا التوصيل آمنًا مسألة صلاحيات وتصنيف وثقة في النصوص المسترجعة.",
    answer:
      "بروتوكول سياق النموذج (MCP) معيار يتيح لوكلاء الذكاء الاصطناعي استدعاء الأدوات وقراءة البيانات عبر واجهة موحدة. وفي المؤسسة هو مسألة أمنية بقدر ما هو مسألة تكامل: فالصلاحيات، وحقن التعليمات عبر المحتوى المسترجع، وتصنيف البيانات، والتدقيق، هي التي تحدد ما إذا كان الربط آمنًا. وتصف هذه المقالة كيف تتعامل معها ORBIT، نسختي التجريبية العامة.",
    sections: [
      {
        h: "ما هو بروتوكول سياق النموذج (MCP)؟",
        p: [
          "MCP بروتوكول معياري بين وكيل الذكاء الاصطناعي والأدوات التي يستخدمها. يعرض الخادم قدرات مثل البحث في ويكي أو قراءة تذكرة، ويكتشفها عميل داخل الوكيل ويستدعيها. وبدل بناء تكامل خاص لكل زوج من وكيل وأداة، يُبنى العمل على بروتوكول واحد.",
        ],
      },
      {
        h: "لماذا يُعدّ ربط الوكلاء بأدوات المؤسسة مسألة أمنية؟",
        p: [
          "سؤال التكامل يسأل: هل يستطيع الوكيل الوصول إلى Confluence؟ أما السؤال الأمني فيسأل: ماذا يحق له أن يقرأ حين يصل، ونيابةً عن من، وماذا يحدث للنص الذي يعيده؟ ففي التكامل التقليدي يضغط شخص على زر ويُدقَّق حساب خدمة. أما مع الوكيل فيصدر الاستدعاء عن نموذج، وغالبًا ضمن حلقة، انطلاقًا من نص قد يكون هو نفسه آتيًا من صفحة مسترجعة.",
          "وتنتج عن ذلك أربعة هواجس أعدّها النطاق الحقيقي لأي مشروع MCP:",
        ],
        list: [
          "الصلاحيات: ينبغي أن يرى الوكيل ما يحق للشخص السائل رؤيته، لا ما يستطيع الرمز المشترك رؤيته.",
          "حقن التعليمات عبر المحتوى المسترجع: صفحة الويكي أو التذكرة بيانات، لكن النموذج قد يقرأ فيها تعليمات.",
          "تصنيف البيانات: يجب ألا يتدفق المحتوى السري أو الحساس إلى أماكن لا ينبغي أن يبلغها، ومنها النماذج الخارجية.",
          "التدقيق: لا بد من القدرة على إعادة بناء ما قُدِّم، ولمن، ولماذا.",
        ],
      },
      {
        h: "ما أبرز المخاطر وما الضوابط المقابلة لها؟",
        p: [
          "معظم الإخفاقات التي أتوقعها في هذا المجال ليست إخفاقات في البروتوكول نفسه. بل تأتي من حساب خدمة واسع الصلاحيات لم يقيّده أحد بالشخص السائل. ويربط الجدول كل خطر بالضابط الذي أبحث عنه عند مراجعة أي موصّل.",
        ],
        table: {
          head: ["الخطر", "ما الذي يحدث", "الضابط المطلوب"],
          rows: [
            ["رمز وصول واسع", "يقرأ الوكيل كل ما يستطيع حساب الموصّل رؤيته", "فحص كل عنصر وفق صلاحيات المستخدم السائل لحظة التقديم"],
            ["حقن التعليمات", "تحتوي صفحة مسترجعة على تعليمات ينفذها النموذج", "كشف عند الاستيعاب، وحجر، ووسم المحتوى المقدَّم بأنه بيانات غير موثوقة"],
            ["تسرب بيانات سرية", "يصل محتوى سري إلى قارئ خاطئ أو إلى نموذج خارجي", "سلم تصنيف، وسقف لكل طلب، وحارس على استدعاءات النماذج الخارجية"],
            ["بيانات شخصية", "تصل أسماء أو بريد إلكتروني أو بيانات مصرفية إلى الموجّه", "كشف وحجب عند الاستيعاب وتقديم النص المحجوب"],
            ["خوادم عشوائية", "يعمل خادم MCP لم تُراجعه بأوراق اعتمادك", "قائمة مسموح بها لخوادم موثقة، وتنفيذ معزول، وتعطيل الخوادم المخصصة افتراضيًا"],
            ["وصول قديم", "تُسحب الصلاحيات لكن النسخ المشتقة تبقى حية", "أحداث إلغاء ليبطل المستهلكون ما اشتقوه"],
            ["غياب الأثر", "لا أحد يستطيع القول ما الذي قُدِّم", "سجل تدقيق ورمز سبب لكل عنصر"],
          ],
        },
      },
      {
        h: "كيف تتصل ORBIT بـ Confluence وJira وMicrosoft 365؟",
        p: [
          "لدى ORBIT، منصة السياق التي بنيتها، طريقان إلى الأدوات الخارجية. تغطي الموصّلات الأصلية SharePoint وOneDrive وConfluence وJira. وتغطي موصّلات MCP كلًّا من Confluence وJira وMicrosoft 365 وGoogle Workspace وSlack وGitHub وLinear وObsidian وFigma، مع مساعد بدء من خمس خطوات. ويزامن عامل (worker) الموصّلات وفق جدول، كل 60 دقيقة افتراضيًا.",
          "ويغذي الطريقان خط الاستيعاب نفسه. فصفحة Confluence أو تذكرة Jira تمر بكشف البيانات الشخصية والتصنيف والتقطيع قبل أن يجوز تقديمها لأي وكيل. والخيار التصميمي الذي أهتم به أن الوكيل لا يخاطب Confluence مباشرة أبدًا، بل يخاطب ORBIT التي تحتفظ بنسخة متزامنة ومصنَّفة.",
          "وهناك حد يجب ذكره بوضوح، حتى لا يُفهم من الموصّلات أكثر مما تقدمه: تسجيل الدخول التفاعلي عبر OAuth لـ Microsoft 365 وGoogle وLinear من خلال MCP مدرج في خارطة الطريق ولم يُنجَز بعد.",
        ],
      },
      {
        h: "كيف تحافظ ORBIT على الصلاحيات والتصنيف؟",
        p: [
          "القاعدة معلنة في سطر واحد في ملف README: لا يُقدَّم المحتوى إلا إذا كان تصنيفه أقل من أدنى قيمة بين تخويل المستخدم وتخويل الوكيل والسقف المحدد في الطلب، أو مساويًا لها. ويعمل الوكيل نيابةً عن عضو في المشروع، وبدون ذلك لا يصل إلا إلى ما هو مفتوح لكل المشروع.",
          "وتسترجع NOVA، وكيل المنتج الشخصي الذي بنيته، سياق ORBIT بصفة المستخدم، فتسري القاعدة نفسها حين يطلب منها شخص مخرجًا. وهذه هي الآليات الكامنة وراء القاعدة كما يصفها README:",
        ],
        list: [
          "سلم تصنيف من C0 (عام) إلى C3 (سري)، متوافق مع سياسة المؤسسة.",
          "قوائم وصول على الوثائق والمقاطع والذاكرة. وترث الذاكرة المشتقة أشد القوائم تقييدًا وأعلى تصنيف بين مصادرها.",
          "تُسجَّل حالات الاستبعاد بسبب الوصول أو التصنيف لكنها تُحجب عمّن لا يملك الوصول: لا عنوان ولا مقتطف ولا معرّف. ولا يتلقى الوكلاء سوى عدّادات، فلا يعرف الوكيل حتى عنوان ما مُنع من رؤيته.",
          "كشف للبيانات الشخصية عند الاستيعاب، ويستخدم السياق المقدَّم دائمًا النص المحجوب.",
          "أحداث إلغاء مثل document.acl_changed وmember.removed وagent.revoked في سجل التغييرات وفي الويب هوك الموقَّعة، ليبطل المستهلكون ما اشتقوه.",
        ],
      },
      {
        h: "كيف تتعامل ORBIT مع حقن التعليمات في المحتوى المسترجع؟",
        p: [
          "حقن التعليمات هو الخطر الذي يجعله MCP أوضح ما يكون، لأن الوكيل صار يقرأ نصوصًا كتبها أشخاص لم يلتقِ بهم قط. ولا أعتقد أن مرشحًا واحدًا يحل المشكلة، ولا أن أي دفاع منها يغني عن غيره، ولذلك تجمع ORBIT عدة دفاعات، وكلها ظاهرة في إعداداتها:",
        ],
        list: [
          "عند الاستيعاب يُمنح كل مقطع درجة. وإذا تجاوزت عتبة (0.6 افتراضيًا) حُجر المقطع إلى أن يفرج عنه مالك المشروع. ويمكن إضافة مصنِّف محلي اختياري.",
          "عند التقديم يُوسم كل ما يُسلَّم للوكلاء بأنه بيانات غير موثوقة، وهي تقنية تُعرف غالبًا باسم spotlighting.",
          "تتلقى المصادر منخفضة الثقة عقوبة في الترتيب (0.15 افتراضيًا)، فتظهر بوتيرة أقل.",
          "ينطلق إنذار تسميم حين يقترح مصدر حديث أو وكيل عددًا غير معتاد من العناصر خلال نافذة زمنية (8 خلال 24 ساعة افتراضيًا).",
        ],
      },
      {
        h: "ماذا يعرض خادم MCP الخاص بـ ORBIT، وكيف تُحتوى الخوادم الخارجية؟",
        p: [
          "ORBIT خادم MCP أيضًا، عبر streamable HTTP. يحمل كل وكيل مفتاح واجهة مرتبطًا بمشروع، ولا يُخزَّن منه سوى بصمة SHA-256. ويعرض الخادم 12 أداة، منها get_context وsearch_sources وexpand_source وpropose_memory. وهذه الأخيرة تنشئ اقتراحًا يجب أن يصادق عليه إنسان، فلا يستطيع الوكيل الكتابة مباشرة في الذاكرة الموثوقة.",
          "أما خوادم MCP الخارجية فتعكس ORBIT فيها الثقة المعتادة. إذ لا يُشغَّل سوى خوادم القوالب المعدّة سلفًا، من قائمة مسموح بها، وبوسائط تُبنى من جهة الخادم. وتعمل في بيئة معزولة لا تحتوي إلا على أوراق اعتماد ذلك الموصّل، مع مهل وسقوف لعدد العناصر. وتُشفَّر أسرار الموصّلات ولا تُعرض مجددًا، وتضمّن صور الخلفية إصدارات مثبّتة من Node.js وخوادم MCP، فلا تُنزَّل أي شيفرة أثناء التشغيل. ويوجد قالب مخصص، لكنه معطّل افتراضيًا ومقصور على المسؤولين.",
        ],
      },
      {
        h: "هل ORBIT جاهزة للإنتاج، ومن أين تبدأ؟",
        p: [
          "لا. ORBIT نسخة تجريبية عامة وغير مُصادَق عليها للاستخدام في الإنتاج. ويذكر ملف README أن التقوية الكاملة للإنتاج، ومنها الدخول الموحد والمصادقة متعددة العوامل والتدقيق المتسلسل والنسخ الاحتياطية، ما تزال قيد التنفيذ. وليست لدي نتائج مقيسة أستشهد بها: فما سبق يصف ما يوفره المشروع لا ما حققه. وتحتوي بيانات العرض التجريبي على محتوى وهمي عن قصد من فئتي C2 (سري) وC3 (بالغ السرية)،ويحذّر README من خلط بيانات حقيقية بها. وأكرر هذا التحذير هنا لأن الخطأ في هذا الأمر مكلف.",
          "وأيًّا كانت الأداة التي تختارها، فهذا هو الترتيب الذي أتبعه، وهو لا يتطلب منصة جديدة منذ اليوم الأول:",
        ],
        list: [
          "أحصِ كل خادم MCP وكل موصّل، وعيّن مسؤولًا لكل منها.",
          "استبدل حسابات الخدمة المشتركة بوصول نيابةً عن الشخص السائل.",
          "صنّف المحتوى قبل أن يبلغ الوكيل، وحدّد ما يجوز أن تتلقاه النماذج الخارجية.",
          "عامل كل نص مسترجع بوصفه بيانات غير موثوقة لا تعليمات.",
          "اعتمد قائمة مسموحًا بها للخوادم وأبقِ المخصصة منها معطلة.",
          "سجّل ما قُدِّم ولماذا، واختبر ببيانات وهمية أولًا.",
        ],
      },
    ],
    take: "أرى أن MCP سيُقيَّم بما يُمنع الوكيل من رؤيته أكثر مما يُقيَّم بعدد الأدوات التي يبلغها. وقاعدتي أن لا يملك الوكيل صلاحية تفوق صلاحية الشخص السائل، وأن يحمل كل عنصر مُقدَّم سببًا أستطيع قراءته لاحقًا. وORBIT محاولتي لإدراج هذه القاعدة في طبقة السياق، وتبقى نسخة تجريبية عامة لا أضعها بعد أمام بيانات سرية حقيقية.",
    diagram: {
      heads: ["وصول مباشر إلى الأدوات", "طبقة سياق خاضعة للحوكمة"],
      nodes: ["وكيل", "خادم MCP وأداة", "كل ما يستطيع الرمز رؤيته"],
      nodes2: ["وكيل", "فحص الصلاحيات", "التصنيف والحجب", "رمز السبب", "فقط ما يحق للمستخدم رؤيته"],
      caption: "الوكيل نفسه والأدوات نفسها: الفرق هو من يقرر ما يعود، الرمز أم الشخص.",
    },
    results: [
      { v: "800", l: "موظف يستخدمون NOVA في Devoteam، وهي تسترجع سياق ORBIT بصفة المستخدم" },
      { v: "C0 إلى C3", l: "سلم التصنيف الذي تطبقه ORBIT قبل تقديم المحتوى (تصميم النسخة التجريبية)" },
      { v: "12", l: "أداة يعرضها خادم MCP في ORBIT (ما يوفره المشروع)" },
      { v: "HMAC-SHA256", l: "توقيع ويب هوك ORBIT، مع حجب الحمولة من التصنيف C2 فصاعدًا (تصميم النسخة التجريبية)" },
    ],
    faq: [
      {
        q: "ما هو MCP بعبارات بسيطة؟",
        a: "بروتوكول سياق النموذج معيار يتيح لوكيل الذكاء الاصطناعي اكتشاف الأدوات ومصادر البيانات الخارجية واستدعاءها بالطريقة نفسها مهما كانت الأداة. يعرض الخادم القدرات ويستخدمها عميل الوكيل، فلا يحتاج الفريق إلى بناء تكامل خاص لكل زوج من وكيل وأداة.",
      },
      {
        q: "هل MCP آمن افتراضيًا؟",
        a: "لا. يوحّد البروتوكول طريقة استدعاء الوكيل للأداة، لكنه لا يحدد أي الصلاحيات تسري، ولا كيفية معاملة النص المسترجع، ولا تصنيف البيانات. وتأتي هذه الضوابط من الخادم والموصّل والطبقة المحيطة بهما. راجع كل خادم MCP كما تراجع أي تبعية تعمل بأوراق اعتماد.",
      },
      {
        q: "هل يستطيع الوكيل قراءة كل ما يستطيع رمز Confluence أو Jira لدي رؤيته؟",
        a: "مع الوصول المباشر برمز مشترك واحد، نعم في الغالب، وهذا هو الخطر المحوري. أما الطبقة الخاضعة للحوكمة فتفحص أولًا كل عنصر وفق صلاحيات المستخدم السائل. وقد صُمّمت ORBIT لذلك بقوائم وصول وسقف تصنيف، لكنها تبقى نسخة تجريبية عامة.",
      },
      {
        q: "كيف تحمي ORBIT من حقن التعليمات؟",
        a: "صُمّمت لتجمع عدة دفاعات: تقييم المقاطع المشبوهة وحجرها عند الاستيعاب، ووسم المحتوى المقدَّم بأنه بيانات غير موثوقة، وعقوبة ترتيب للمصادر منخفضة الثقة، وإنذار تسميم. ولم أقِس جودة الكشف، فاختبرها على محتواك بوصفها دفاعًا متعدد الطبقات.",
      },
      {
        q: "هل ORBIT جاهزة للإنتاج؟",
        a: "لا. ORBIT نسخة تجريبية عامة وغير مُصادَق عليها للاستخدام في الإنتاج. ويصنف README تقوية الإنتاج، كالدخول الموحد والمصادقة متعددة العوامل، ضمن الأعمال الجارية. وهي مرجع عملي لموصّلات وسياق خاضعين للحوكمة، للتعلم منه وتكييفه بعد مراجعة جدية.",
      },
    ],
  },
};
