import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "Earned Autonomy: Governing AI Coding Agents Across the SDLC",
    dek: "Instead of one global setting, review everything or trust the agent, grant autonomy per stage and per risk level, and only where automated checks can prove the work.",
    answer:
      "Earned autonomy means an AI coding agent gets freedom only where automated checks can prove its work, and loses it where they cannot. Autonomy is set per lifecycle stage and per risk level, every stage leaves an artifact, and a named human stays accountable for intent, architecture and each release.",
    sections: [
      {
        h: "What does earned autonomy mean for AI coding agents?",
        p: [
          "The idea fits in one sentence: an agent earns autonomy where automated checks can prove its work, and loses it where they cannot. Autonomy is not a setting you choose once. It is a status the agent holds for a given kind of work, and evidence decides whether it keeps it.",
        ],
      },
      {
        h: "Why is one global setting the wrong approach?",
        p: [
          "Most teams pick a single position. Either a human reviews everything, which does not survive the volume an agent can produce, or the agent is trusted everywhere, which works until the first change nobody understood reaches production. Both are global answers to a question that varies by task.",
          "A documentation tweak and a change to how personal data is stored do not carry the same risk, and a well-tested module and a brand-new domain do not offer the same safety net. The agentic-sdlc framework, a working framework I maintain, sets autonomy per stage and per risk level, and ties each level to the evidence required to grant it. It rests on three commitments:",
        ],
        list: [
          "Accountability stays human: a named person owns intent, architecture and each release decision.",
          "Autonomy is granted by evidence: more autonomy needs more automated verification, not more optimism.",
          "Every stage leaves an artifact: if it is not written down, tested or recorded, it did not happen.",
        ],
      },
      {
        h: "What are the autonomy levels, and what does the human still own?",
        p: [
          "The framework defines four levels, from L0 to L3. The table below follows its own definitions. Autonomy is set per stage, never above L1 on data or actions you cannot undo, and it drops one level after any incident.",
        ],
        table: {
          head: ["Level", "The agent may", "A human must", "Typical use"],
          rows: [
            ["L0 Suggest", "Propose options, drafts and plans", "Decide and write the change", "Architecture, security design, anything irreversible"],
            ["L1 Assist", "Write code in small steps inside a session", "Review every diff before it is kept", "New domains, regulated or sensitive data"],
            ["L2 Delegate", "Complete a scoped task and open a pull request", "Review the pull request and pass the gates", "Well-tested modules, refactors, UI work"],
            ["L3 Supervise", "Complete, verify and merge to a non-production branch", "Audit samples and approve the release", "Low-risk, fully covered, reversible changes"],
          ],
        },
      },
      {
        h: "How does the framework structure accountability across the lifecycle?",
        p: [
          "The levels say how much the agent may do. The stage contracts say what must exist before work moves on. Each of the eight stages has an exit criterion and a proof, so accountability is attached to an artifact rather than to a conversation.",
        ],
        list: [
          "Intent: problem, users, testable acceptance criteria and non-goals, recorded in a SPEC.md.",
          "Architecture: boundaries, data flow, risks and decisions, recorded as decision records.",
          "Agent build: a small change against the spec, with tests alongside, delivered as a pull request.",
          "Human review: the diff is understood, and security and data handling are checked against a checklist.",
          "Verify: tests, evals and regression checks pass, shown by CI and an eval report.",
          "Release gate: criteria met, limits documented and rollback known, in a release record.",
          "Deploy: a versioned, reproducible release, shown by the pipeline log.",
          "Measure: usage, quality, cost and incidents recorded, with post-mortems.",
        ],
      },
      {
        h: "How does NOVA's Engineering feature apply it?",
        p: [
          "NOVA is my personal product agent, a public beta repository with no licence, and used by 800 employees at Devoteam. Its Engineering feature takes an intent or a GitHub issue and turns it into a specification, a design, code, tests, a pull request, a review, CI repairs and a merge, behind approval gates.",
          "It offers two modes. In Guided mode, a human validates the plan and the merge. In Autopilot, NOVA goes on its own up to the merge. In earned-autonomy terms, that is the difference between keeping the human at two decision points and removing them. My own reading is that Autopilot should be a promotion a project has earned, not a default, and that the framework's rule about irreversible data and actions applies to it fully.",
          "The framework's README places NOVA at stages 1 to 4, orchestrating plans, approvals and deliverables. It relies on ORBIT for governed context, FORGE for evaluation at stages 5 and 6, and TrustRail for controlling what agents may do. NOVA, ORBIT, FORGE and TrustRail are public betas, and I make no claim of production validation for them.",
        ],
      },
      {
        h: "What should you measure before raising autonomy?",
        p: [
          "Evidence is the currency, so decide what counts before you promote anything. The framework suggests a short cycle: set a starting level per stage, defaulting to L1, run for two weeks, measure, then promote or demote a stage. Its metrics are defined in the repository and are marked not yet measured until they are, and I keep that label.",
          "Beyond that, the following checks are my own suggestions, not framework requirements. I would not raise a level without answers to these:",
        ],
        list: [
          "How often review found a problem the automated checks had missed, because that gap is the real limit of autonomy.",
          "Whether the tests exercise behaviour or only the arithmetic of the code, since an agent can write tests that pass without proving anything.",
          "Whether the real stack was run end to end, not just the unit tests.",
          "How large each change was, and whether reviewers could still understand it.",
          "What an incident cost and whether the level dropped when it should have.",
        ],
      },
      {
        h: "What are the failure modes to plan for?",
        p: [
          "The framework lists agent-specific risks on top of classic SDLC risks: scope drift, tests written to pass, invented dependencies, leaked secrets, runaway cost, unreviewed volume and context rot. Three of them are, in my experience, the ones that quietly defeat governance.",
        ],
        list: [
          "Review fatigue: when an agent produces more diffs than people can read, review becomes a click. The remedy is smaller changes and a lower level, not a longer checklist.",
          "Unowned agent output: code nobody accepted responsibility for. The first commitment answers it, because a named person owns each release decision.",
          "Silent scope creep: the agent does a little more than the spec asked, and nobody notices because the tests still pass. A written spec with non-goals is the control.",
        ],
      },
      {
        h: "Is it open source, and has it been validated?",
        p: [
          "agentic-sdlc is a framework, version 0.1, under the MIT licence. It is the only project of mine that I call open source. It was distilled from building NOVA, ORBIT, FORGE, TrustRail and several prototypes, and its README states that it has not been validated by an independent study.",
          "Its case studies are drafts reconstructed from public commit histories. One pattern they report is that the defects that cost most were found by executing the real thing, not by the test suite. That is a reason to treat the framework's levels and thresholds as judgment calls to adjust to your own risk, and to read my numbers as a starting point, not a standard.",
        ],
      },
    ],
    take: "I do not believe in trusting an agent or distrusting it in general. I believe in asking, for this stage and this risk, what evidence would make me comfortable letting go of the review. The most useful artifact in my repositories has often been the list of what was never run, and I would rather promote an agent slowly than explain an incident quickly.",
    diagram: {
      nodes: ["L0 Suggest", "L1 Assist", "L2 Delegate", "L3 Supervise"],
      caption: "Autonomy rises one level at a time, and only as far as automated evidence supports it.",
    },
    results: [
      { v: "4", l: "autonomy levels in the framework, from L0 Suggest to L3 Supervise" },
      { v: "8", l: "lifecycle stages, each with an exit criterion and a proof" },
      { v: "MIT", l: "licence of agentic-sdlc, a v0.1 working framework" },
      { v: "800", l: "employees using NOVA at Devoteam" },
    ],
    faq: [
      {
        q: "What is earned autonomy for AI coding agents?",
        a: "It is a governance principle: an agent gets more freedom where automated checks can prove its work, and loses it where they cannot. Autonomy is set per stage and per risk level, tied to the evidence needed to grant it, while a named human stays accountable for intent, architecture and releases.",
      },
      {
        q: "What are the autonomy levels in agentic-sdlc?",
        a: "There are four: L0 Suggest, L1 Assist, L2 Delegate and L3 Supervise. They run from the agent proposing drafts to the agent merging into a non-production branch. Autonomy never exceeds L1 on irreversible data or actions, and it drops one level after any incident.",
      },
      {
        q: "What is the difference between Guided and Autopilot in NOVA?",
        a: "In Guided mode, a human validates the plan and the merge. In Autopilot, NOVA goes on its own up to the merge. Both belong to NOVA's Engineering feature, which turns an intent or an issue into a spec, code, tests, a pull request and CI fixes.",
      },
      {
        q: "Is agentic-sdlc open source and validated?",
        a: "It is released under the MIT licence, so it can be called open source. It is a working framework at version 0.1, and its README says it has not been validated by an independent study. Its metrics are marked not yet measured until they are, so treat the levels as judgment calls.",
      },
      {
        q: "When should a team lower an agent's autonomy?",
        a: "The framework says autonomy drops one level after any incident, and never exceeds L1 on data or actions you cannot undo. I would add that review fatigue or growing unreviewed volume is also a signal to step back, since it means the human check no longer carries real evidence.",
      },
    ],
  },
  fr: {
    title: "Autonomie méritée : gouverner les agents de code IA tout au long du cycle de développement",
    dek: "Au lieu d’un réglage unique, tout relire ou faire confiance à l’agent, accordez l’autonomie par étape et par niveau de risque, et seulement là où des contrôles automatisés peuvent prouver le travail.",
    answer:
      "L’autonomie méritée signifie qu’un agent de code IA gagne en liberté là où des contrôles automatisés prouvent son travail, et la perd sinon. Elle se règle par étape et par niveau de risque, chaque étape laisse une trace écrite, et un humain nommé reste responsable de l’intention, de l’architecture et des mises en production.",
    sections: [
      {
        h: "Qu’est-ce que l’autonomie méritée pour un agent de code IA ?",
        p: [
          "L’idée tient en une phrase : un agent mérite son autonomie là où des contrôles automatisés peuvent prouver son travail, et la perd là où ils ne le peuvent pas. L’autonomie n’est pas un réglage choisi une fois pour toutes. C’est un statut que l’agent détient pour un type de travail donné, et ce sont les preuves qui décident s’il le garde.",
        ],
      },
      {
        h: "Pourquoi un réglage unique est-il une mauvaise approche ?",
        p: [
          "La plupart des équipes choisissent une position unique. Soit un humain relit tout, ce qui ne résiste pas au volume qu’un agent peut produire, soit l’agent est cru partout, ce qui fonctionne jusqu’au premier changement que personne n’a compris et qui atteint la production.",
          "Une retouche de documentation et un changement sur le stockage de données personnelles ne portent pas le même risque, et un module bien testé n’offre pas le même filet de sécurité qu’un domaine tout neuf. Le cadre agentic-sdlc, un cadre de travail que je maintiens, règle l’autonomie par étape et par niveau de risque, et relie chaque niveau aux preuves nécessaires pour l’accorder. Il repose sur trois engagements :",
        ],
        list: [
          "La responsabilité reste humaine : une personne nommée porte l’intention, l’architecture et chaque décision de mise en production.",
          "L’autonomie est accordée sur preuves : plus d’autonomie demande plus de vérification automatisée, pas plus d’optimisme.",
          "Chaque étape laisse un artefact : ce qui n’est pas écrit, testé ou enregistré n’a pas eu lieu.",
        ],
      },
      {
        h: "Quels sont les niveaux d’autonomie, et que garde l’humain ?",
        p: [
          "Le cadre définit quatre niveaux, de L0 à L3. Le tableau ci-dessous suit ses propres définitions. L’autonomie se règle par étape, ne dépasse jamais L1 sur des données ou des actions irréversibles, et baisse d’un niveau après tout incident.",
        ],
        table: {
          head: ["Niveau", "L’agent peut", "L’humain doit", "Usage typique"],
          rows: [
            ["L0 Suggérer", "Proposer des options, des brouillons et des plans", "Décider et écrire le changement", "Architecture, conception sécurité, tout ce qui est irréversible"],
            ["L1 Assister", "Écrire du code par petites étapes dans une session", "Relire chaque diff avant de le conserver", "Nouveaux domaines, données réglementées ou sensibles"],
            ["L2 Déléguer", "Terminer une tâche cadrée et ouvrir une pull request", "Relire la pull request et faire passer les points de contrôle", "Modules bien testés, refactorisations, interface"],
            ["L3 Superviser", "Terminer, vérifier et fusionner vers une branche hors production", "Auditer des échantillons et approuver la mise en production", "Changements à faible risque, entièrement couverts et réversibles"],
          ],
        },
      },
      {
        h: "Comment le cadre structure-t-il la responsabilité sur tout le cycle de vie ?",
        p: [
          "Les niveaux disent ce que l’agent peut faire. Les contrats d’étape disent ce qui doit exister avant d’avancer. Chacune des huit étapes a un critère de sortie et une preuve : la responsabilité est donc rattachée à un artefact plutôt qu’à une conversation.",
        ],
        list: [
          "Intention : problème, utilisateurs, critères d’acceptation testables et non-objectifs, consignés dans un SPEC.md.",
          "Architecture : frontières, flux de données, risques et décisions, consignés dans des fiches de décision.",
          "Construction par l’agent : un petit changement conforme à la spécification, avec ses tests, livré sous forme de pull request.",
          "Revue humaine : le diff est compris, la sécurité et le traitement des données sont vérifiés avec une liste de contrôle.",
          "Vérification : tests, évaluations et contrôles de non-régression réussis, attestés par la CI et un rapport d’évaluation.",
          "Point de contrôle de mise en production : critères remplis, limites documentées et retour arrière connu, dans une fiche de release.",
          "Déploiement : une version versionnée et reproductible, attestée par le journal du pipeline.",
          "Mesure : usage, qualité, coût et incidents enregistrés, avec des retours d’expérience.",
        ],
      },
      {
        h: "Comment la fonction Engineering de NOVA applique-t-elle ce cadre ?",
        p: [
          "NOVA est mon agent produit personnel, un dépôt public en bêta sans licence, utilisé par 800 collaborateurs chez Devoteam. Sa fonction Engineering prend une intention ou une issue GitHub et la transforme en spécification, conception, code, tests, pull request, revue, réparations de CI et fusion, derrière des points d’approbation.",
          "Elle propose deux modes. En mode Guidé, un humain valide le plan et la fusion. En mode Autopilot, NOVA va seul jusqu’à la fusion. En termes d’autonomie méritée, c’est la différence entre garder l’humain à deux points de décision et le retirer. Ma lecture personnelle : l’Autopilot devrait être une promotion qu’un projet a méritée, pas un réglage par défaut, et la règle du cadre sur les données et actions irréversibles s’y applique pleinement.",
          "Le README du cadre place NOVA aux étapes 1 à 4, pour orchestrer plans, approbations et livrables. Il s’appuie sur ORBIT pour un contexte gouverné, sur FORGE pour l’évaluation aux étapes 5 et 6, et sur TrustRail pour contrôler ce que les agents peuvent faire. NOVA, ORBIT, FORGE et TrustRail sont des bêtas publiques, et je ne revendique aucune validation en production.",
        ],
      },
      {
        h: "Que faut-il mesurer avant d’augmenter l’autonomie ?",
        p: [
          "La preuve est la monnaie, donc décidez de ce qui compte avant de promouvoir quoi que ce soit. Le cadre suggère un cycle court : fixer un niveau de départ par étape, L1 par défaut, travailler deux semaines, mesurer, puis promouvoir ou rétrograder une étape. Ses métriques sont définies dans le dépôt et marquées non encore mesurées tant qu’elles ne le sont pas, et je garde cette mention.",
          "Au-delà, les vérifications suivantes sont mes propres suggestions, pas des exigences du cadre. Je n’augmenterais pas un niveau sans réponse à ces questions :",
        ],
        list: [
          "À quelle fréquence la revue a trouvé un problème que les contrôles automatisés avaient manqué, car cet écart est la vraie limite de l’autonomie.",
          "Si les tests vérifient un comportement ou seulement l’arithmétique du code, puisqu’un agent peut écrire des tests qui passent sans rien prouver.",
          "Si la pile réelle a été exécutée de bout en bout, pas seulement les tests unitaires.",
          "Quelle était la taille de chaque changement, et si les relecteurs pouvaient encore le comprendre.",
          "Ce qu’un incident a coûté et si le niveau a bien baissé quand il le fallait.",
        ],
      },
      {
        h: "Quels modes d’échec faut-il anticiper ?",
        p: [
          "Le cadre recense des risques propres aux agents en plus des risques classiques : dérive du périmètre, tests écrits pour passer, dépendances inventées, secrets divulgués, coûts qui s’emballent, volume non relu et dégradation du contexte. Trois d’entre eux sont, selon mon expérience, ceux qui font échouer la gouvernance en silence.",
        ],
        list: [
          "La fatigue de relecture : quand l’agent produit plus de diffs que les gens ne peuvent en lire, la revue devient un clic. Le remède est de réduire la taille des changements et le niveau, pas d’allonger la liste de contrôle.",
          "La production d’agent sans propriétaire : du code dont personne n’a accepté la responsabilité. Le premier engagement y répond, car une personne nommée porte chaque décision de mise en production.",
          "La dérive silencieuse du périmètre : l’agent fait un peu plus que la spécification, et personne ne le voit puisque les tests passent. Une spécification écrite avec des non-objectifs est le contrôle.",
        ],
      },
      {
        h: "Est-ce open source, et le cadre a-t-il été validé ?",
        p: [
          "agentic-sdlc est un cadre de travail en version 0.1, sous licence MIT. C’est le seul de mes projets que je qualifie d’open source. Il est issu de la construction de NOVA, ORBIT, FORGE, TrustRail et de plusieurs prototypes, et son README précise qu’il n’a pas été validé par une étude indépendante.",
          "Ses études de cas sont des brouillons reconstruits à partir d’historiques de commits publics. L’un des constats est que les défauts les plus coûteux ont été trouvés en exécutant le système réel, pas grâce à la suite de tests. C’est une raison de traiter les niveaux et seuils du cadre comme des jugements à adapter à votre propre risque.",
        ],
      },
    ],
    take: "Je ne crois ni à la confiance ni à la défiance générales envers un agent. Je crois à une question simple : pour cette étape et ce risque, quelle preuve me permettrait de lâcher la relecture ? L’artefact le plus utile de mes dépôts a souvent été la liste de ce qui n’avait jamais été exécuté, et je préfère promouvoir un agent lentement qu’expliquer un incident vite.",
    diagram: {
      nodes: ["L0 Suggérer", "L1 Assister", "L2 Déléguer", "L3 Superviser"],
      caption: "L’autonomie monte d’un niveau à la fois, et seulement aussi loin que les preuves automatisées le permettent.",
    },
    results: [
      { v: "4", l: "niveaux d’autonomie dans le cadre, de L0 Suggérer à L3 Superviser" },
      { v: "8", l: "étapes du cycle de vie, chacune avec un critère de sortie et une preuve" },
      { v: "MIT", l: "licence d’agentic-sdlc, un cadre de travail en version 0.1" },
      { v: "800", l: "collaborateurs utilisant NOVA chez Devoteam" },
    ],
    faq: [
      {
        q: "Qu’est-ce que l’autonomie méritée pour les agents de code IA ?",
        a: "C’est un principe de gouvernance : un agent gagne en liberté là où des contrôles automatisés prouvent son travail, et la perd là où ils ne le peuvent pas. L’autonomie se règle par étape et par niveau de risque, selon les preuves exigées, tandis qu’un humain nommé reste responsable de l’intention, de l’architecture et des mises en production.",
      },
      {
        q: "Quels sont les niveaux d’autonomie d’agentic-sdlc ?",
        a: "Il y en a quatre : L0 Suggérer, L1 Assister, L2 Déléguer et L3 Superviser. Ils vont de l’agent qui propose des brouillons à l’agent qui fusionne vers une branche hors production. L’autonomie ne dépasse jamais L1 sur des données ou actions irréversibles, et baisse d’un niveau après tout incident.",
      },
      {
        q: "Quelle différence entre Guidé et Autopilot dans NOVA ?",
        a: "En mode Guidé, un humain valide le plan et la fusion. En mode Autopilot, NOVA va seul jusqu’à la fusion. Les deux relèvent de la fonction Engineering de NOVA, qui transforme une intention ou une issue en spécification, code, tests, pull request et corrections de CI.",
      },
      {
        q: "agentic-sdlc est-il open source et validé ?",
        a: "Il est publié sous licence MIT, on peut donc le qualifier d’open source. C’est un cadre de travail en version 0.1, et son README indique qu’il n’a pas été validé par une étude indépendante. Ses métriques sont marquées non encore mesurées tant qu’elles ne le sont pas : les niveaux restent des jugements.",
      },
      {
        q: "Quand une équipe doit-elle réduire l’autonomie d’un agent ?",
        a: "Le cadre prévoit de baisser d’un niveau après tout incident, et de ne jamais dépasser L1 sur des données ou actions irréversibles. J’ajouterais que la fatigue de relecture ou un volume non relu croissant est aussi un signal de recul, car le contrôle humain ne porte alors plus de preuve réelle.",
      },
    ],
  },
  ar: {
    title: "الاستقلالية المكتسبة: حوكمة وكلاء البرمجة بالذكاء الاصطناعي عبر دورة تطوير البرمجيات",
    dek: "بدل إعداد واحد شامل، إما مراجعة كل شيء أو الوثوق بالوكيل، امنح الاستقلالية لكل مرحلة ولكل مستوى مخاطر، وفقط حيث تستطيع الفحوص الآلية إثبات العمل.",
    answer:
      "الاستقلالية المكتسبة تعني أن وكيل البرمجة بالذكاء الاصطناعي ينال حرية أكبر حيث تستطيع الفحوص الآلية إثبات عمله، ويفقدها حيث لا تستطيع. تُضبط الاستقلالية لكل مرحلة من الدورة ولكل مستوى مخاطر، وتترك كل مرحلة أثرًا مكتوبًا، ويبقى إنسان محدد مسؤولًا عن الغاية والبنية وكل قرار إصدار.",
    sections: [
      {
        h: "ما المقصود بالاستقلالية المكتسبة لوكلاء البرمجة بالذكاء الاصطناعي؟",
        p: [
          "تُختصر الفكرة في جملة واحدة: يكتسب الوكيل استقلاليته حيث تستطيع الفحوص الآلية إثبات عمله، ويفقدها حيث لا تستطيع. الاستقلالية ليست إعدادًا يُختار مرة واحدة، بل هي وضع يحمله الوكيل لنوع معين من العمل، وتقرر الأدلة ما إذا كان سيحتفظ به.",
        ],
      },
      {
        h: "لماذا يُعدّ الإعداد الواحد الشامل نهجًا خاطئًا؟",
        p: [
          "تختار أغلب الفرق موقفًا واحدًا. فإما أن يراجع إنسان كل شيء، وهذا لا يصمد أمام حجم ما يستطيع الوكيل إنتاجه، وإما يُوثَق بالوكيل في كل مكان، وهذا ينجح إلى أن يصل إلى الإنتاج أول تغيير لم يفهمه أحد. وكلاهما جواب شامل عن سؤال يتغير بحسب المهمة، ولذلك يفشل الأول عند الحجم، ويفشل الثاني عند أول خطأ مكلف لم يلحظه أحد.",
          "تعديل بسيط في التوثيق وتغيير في طريقة تخزين البيانات الشخصية لا يحملان الخطر نفسه، ووحدة مختبرة جيدًا لا توفر شبكة الأمان نفسها التي يوفرها مجال جديد كليًا. يضبط إطار agentic-sdlc، وهو إطار عمل أشرف عليه، الاستقلالية لكل مرحلة ولكل مستوى مخاطر، ويربط كل مستوى بالأدلة اللازمة لمنحه. ويقوم على ثلاثة التزامات:",
        ],
        list: [
          "تبقى المسؤولية بشرية: شخص محدد يملك الغاية والبنية وكل قرار إصدار.",
          "تُمنح الاستقلالية بالأدلة: مزيد من الاستقلالية يحتاج مزيدًا من التحقق الآلي لا مزيدًا من التفاؤل.",
          "كل مرحلة تترك أثرًا مكتوبًا: ما لم يُكتب أو يُختبر أو يُسجَّل فكأنه لم يحدث.",
        ],
      },
      {
        h: "ما مستويات الاستقلالية، وما الذي يظل بيد الإنسان؟",
        p: [
          "يحدد الإطار أربعة مستويات من L0 إلى L3، ويتبع الجدول أدناه تعريفاته الخاصة. تُضبط الاستقلالية لكل مرحلة، ولا تتجاوز L1 أبدًا في البيانات أو الإجراءات التي لا يمكن التراجع عنها، وتنخفض مستوى واحدًا بعد أي حادثة.",
        ],
        table: {
          head: ["المستوى", "يجوز للوكيل", "يجب على الإنسان", "الاستخدام المعتاد"],
          rows: [
            ["L0 اقتراح", "اقتراح خيارات ومسودات وخطط", "أن يقرر ويكتب التغيير", "البنية المعمارية وتصميم الأمن وكل ما لا رجعة فيه"],
            ["L1 مساعدة", "كتابة الشيفرة بخطوات صغيرة داخل جلسة", "أن يراجع كل تغيير قبل اعتماده", "مجالات جديدة وبيانات منظمة أو حساسة"],
            ["L2 تفويض", "إنجاز مهمة محددة النطاق وفتح طلب دمج", "أن يراجع طلب الدمج ويُمرر بوابات الفحص", "وحدات مختبرة جيدًا وإعادة هيكلة وواجهات"],
            ["L3 إشراف", "الإنجاز والتحقق والدمج في فرع غير إنتاجي", "أن يدقق عينات ويوافق على الإصدار", "تغييرات منخفضة الخطر مغطاة بالكامل وقابلة للتراجع"],
          ],
        },
      },
      {
        h: "كيف يبني الإطار المسؤولية عبر دورة حياة البرمجيات؟",
        p: [
          "تحدد المستويات ما يجوز للوكيل فعله، وتحدد عقود المراحل ما يجب أن يوجد قبل المتابعة. لكل مرحلة من المراحل الثماني معيار خروج ودليل، فترتبط المسؤولية بأثر مكتوب لا بمحادثة عابرة. وبهذا يستطيع أي مراجع أن يسأل عند أي مرحلة: ما الدليل الموجود الآن، ومن يملكه، وما الذي يمنع الانتقال إلى المرحلة التالية إن غاب هذا الدليل؟ وهذه الأسئلة الثلاثة هي ما يجعل الحوكمة قابلة للتنفيذ لا مجرد وثيقة.",
        ],
        list: [
          "الغاية: المشكلة والمستخدمون ومعايير قبول قابلة للاختبار وما هو خارج النطاق، مدوّنة في ملف SPEC.md.",
          "البنية: الحدود وتدفق البيانات والمخاطر والقرارات، مدوّنة في سجلات قرار.",
          "بناء الوكيل: تغيير صغير وفق المواصفة مع اختباراته، يُسلَّم في طلب دمج.",
          "المراجعة البشرية: فهم التغيير والتحقق من الأمن ومعالجة البيانات بقائمة تحقق.",
          "التحقق: نجاح الاختبارات والتقييمات وفحوص الانحدار، يثبتها التكامل المستمر وتقرير التقييم.",
          "بوابة الإصدار: استيفاء المعايير وتوثيق الحدود ومعرفة طريقة التراجع، في سجل إصدار.",
          "النشر: إصدار موسوم النسخة وقابل لإعادة الإنتاج، يثبته سجل خط النشر.",
          "القياس: تسجيل الاستخدام والجودة والكلفة والحوادث، مع مراجعات ما بعد الحادثة.",
        ],
      },
      {
        h: "كيف تطبّق ميزة Engineering في NOVA هذا الإطار؟",
        p: [
          "NOVA هو وكيل المنتج الشخصي الذي أبنيه، وهو مستودع عام في نسخة تجريبية عامة بلا ترخيص، ويستخدمه 800 موظف في Devoteam. تأخذ ميزة Engineering فيه نية أو قضية على GitHub وتحوّلها إلى مواصفة وتصميم وشيفرة واختبارات وطلب دمج ومراجعة وإصلاحات للتكامل المستمر ثم دمج، خلف بوابات موافقة.",
          "وهي تقدم وضعين. في الوضع الموجَّه (Guided) يعتمد إنسان الخطة والدمج. وفي الوضع Autopilot يمضي NOVA وحده حتى الدمج. وبلغة الاستقلالية المكتسبة، هذا هو الفرق بين إبقاء الإنسان عند نقطتي قرار وإزالته منهما. قراءتي الشخصية أن Autopilot ينبغي أن يكون ترقية استحقها المشروع لا إعدادًا افتراضيًا، وأن قاعدة الإطار بشأن البيانات والإجراءات التي لا رجعة فيها تنطبق عليه بالكامل. وبعبارة أخرى، لا يعني وجود الوضع الآلي أن على كل فريق استخدامه، بل يعني أن على كل فريق أن يقرر متى يستحق مشروعه هذه الحرية، وأن يملك الأدلة التي تبرر ذلك القرار أمام من يسأل.",
          "يضع ملف README الخاص بالإطار NOVA في المراحل من 1 إلى 4، منسقًا الخطط والموافقات والمخرجات. ويعتمد على ORBIT لسياق خاضع للحوكمة، وعلى FORGE للتقييم في المرحلتين 5 و6، وعلى TrustRail لضبط ما يجوز للوكلاء فعله. وNOVA وORBIT وFORGE وTrustRail نسخ تجريبية عامة، ولا أدّعي أنها اعتُمدت في الإنتاج.",
        ],
      },
      {
        h: "ماذا ينبغي قياسه قبل رفع مستوى الاستقلالية؟",
        p: [
          "الدليل هو العملة، لذا حدد ما يُحتسب قبل أن تُرقّي أي شيء. يقترح الإطار دورة قصيرة: ضبط مستوى انطلاق لكل مرحلة، وهو L1 افتراضيًا، والعمل أسبوعين، ثم القياس، ثم ترقية المرحلة أو خفضها. مقاييسه معرَّفة في المستودع وموسومة بأنها لم تُقَس بعد إلى أن تُقاس، وأحافظ على هذا الوسم.",
          "وما عدا ذلك فالفحوص التالية اقتراحات مني لا متطلبات في الإطار. لن أرفع مستوى دون إجابات عن هذه الأسئلة، وسأدوّن الإجابات في سجل الإصدار حتى يستطيع من يأتي بعدي أن يفهم لماذا مُنحت الاستقلالية:",
        ],
        list: [
          "كم مرة وجدت المراجعة مشكلة فاتت الفحوص الآلية، لأن هذه الفجوة هي الحد الحقيقي للاستقلالية.",
          "هل تختبر الاختبارات سلوكًا فعليًا أم حسابات الشيفرة فقط، لأن الوكيل قد يكتب اختبارات تنجح دون أن تثبت شيئًا.",
          "هل شُغّلت البنية الحقيقية من البداية إلى النهاية، لا الاختبارات الوحدوية وحدها.",
          "ما حجم كل تغيير، وهل ما زال المراجعون قادرين على فهمه.",
          "ما كلفة الحادثة، وهل انخفض المستوى حين كان ينبغي أن ينخفض.",
        ],
      },
      {
        h: "ما أنماط الإخفاق التي ينبغي التحسب لها؟",
        p: [
          "يسرد الإطار مخاطر خاصة بالوكلاء فوق مخاطر دورة التطوير التقليدية: انحراف النطاق، واختبارات تُكتب لتنجح، وتبعيات مختلقة، وأسرار مسرّبة، وكلفة منفلتة، وحجم غير مراجَع، وتدهور السياق. وثلاثة منها هي، بحسب تجربتي، ما يُفشل الحوكمة بصمت.",
        ],
        list: [
          "إرهاق المراجعة: حين ينتج الوكيل تغييرات أكثر مما يستطيع الناس قراءته تتحول المراجعة إلى نقرة. والعلاج تصغير التغييرات وخفض المستوى لا إطالة قائمة التحقق.",
          "مخرجات وكيل بلا مالك: شيفرة لم يتحمل أحد مسؤوليتها. يجيب الالتزام الأول عن ذلك، لأن شخصًا محددًا يملك كل قرار إصدار.",
          "اتساع النطاق الصامت: يفعل الوكيل أكثر قليلًا مما طلبته المواصفة، ولا يلاحظ أحد لأن الاختبارات ما زالت تنجح. والضبط هنا مواصفة مكتوبة تتضمن ما هو خارج النطاق.",
        ],
      },
      {
        h: "هل هو مفتوح المصدر، وهل جرى التحقق منه؟",
        p: [
          "agentic-sdlc إطار عمل بالإصدار 0.1 تحت رخصة MIT، وهو المشروع الوحيد من مشاريعي الذي أصفه بأنه مفتوح المصدر. استُخلص من بناء NOVA وORBIT وFORGE وTrustRail ونماذج أولية عدة، وينص ملف README على أنه لم تتحقق منه دراسة مستقلة.",
          "دراسات الحالة فيه مسودات أُعيد بناؤها من سجلات التزامات عامة. ومن الأنماط التي ترصدها أن العيوب الأعلى كلفة اكتُشفت بتشغيل النظام الحقيقي لا بمجموعة الاختبارات. ولهذا أرى أن المستويات والعتبات أحكام تقديرية تُعدَّل بحسب مخاطرك أنت.",
          "ويقرّ الإطار نفسه بحدوده: فهو يستهدف الفرق الصغيرة والمطورين المنفردين أولًا، وتحتاج المؤسسات الكبيرة إلى أدوار وطبقات تدقيق فوقه، وهو لا يقول إلا القليل عن اختيار النماذج أو صياغة التعليمات لأنها تتغير أسرع من أن تُثبَّت. وأرحّب بتقارير ميدانية عن المواضع التي أخفق فيها مستوى أو بوابة.",
        ],
      },
    ],
    take: "لا أؤمن بالثقة العامة بالوكيل ولا بعدم الثقة به. أؤمن بسؤال واحد: ما الدليل الذي يجعلني مطمئنًا لترك المراجعة في هذه المرحلة وعند هذا الخطر؟ وكثيرًا ما كان أنفع أثر في مستودعاتي قائمة ما لم يُشغَّل قط، وأفضّل ترقية الوكيل ببطء على شرح حادثة بسرعة. فالاستقلالية في نظري مسؤولية تُمنح بعد إثبات، لا مكافأة تُمنح بعد إعجاب.",
    diagram: {
      nodes: ["L0 اقتراح", "L1 مساعدة", "L2 تفويض", "L3 إشراف"],
      caption: "ترتفع الاستقلالية مستوى واحدًا في كل مرة، وبقدر ما تدعمه الأدلة الآلية فقط.",
    },
    results: [
      { v: "4", l: "مستويات استقلالية في الإطار، من L0 اقتراح إلى L3 إشراف" },
      { v: "8", l: "مراحل في دورة الحياة، لكل منها معيار خروج ودليل" },
      { v: "MIT", l: "رخصة agentic-sdlc، وهو إطار عمل بالإصدار 0.1" },
      { v: "800", l: "موظف يستخدمون NOVA في Devoteam" },
    ],
    faq: [
      {
        q: "ما الاستقلالية المكتسبة لوكلاء البرمجة بالذكاء الاصطناعي؟",
        a: "هي مبدأ حوكمة: ينال الوكيل حرية أكبر حيث تثبت الفحوص الآلية عمله، ويفقدها حيث لا تستطيع. تُضبط الاستقلالية لكل مرحلة ولكل مستوى مخاطر وفق الأدلة المطلوبة، ويبقى إنسان محدد مسؤولًا عن الغاية والبنية والإصدارات.",
      },
      {
        q: "ما مستويات الاستقلالية في agentic-sdlc؟",
        a: "هي أربعة: L0 اقتراح، وL1 مساعدة، وL2 تفويض، وL3 إشراف. تمتد من اقتراح الوكيل مسودات إلى دمجه في فرع غير إنتاجي. ولا تتجاوز الاستقلالية L1 في البيانات أو الإجراءات التي لا رجعة فيها، وتنخفض مستوى واحدًا بعد أي حادثة.",
      },
      {
        q: "ما الفرق بين الوضع الموجَّه وAutopilot في NOVA؟",
        a: "في الوضع الموجَّه يعتمد إنسان الخطة والدمج. وفي Autopilot يمضي NOVA وحده حتى الدمج. وكلاهما ضمن ميزة Engineering في NOVA، التي تحوّل نية أو قضية إلى مواصفة وشيفرة واختبارات وطلب دمج وإصلاحات للتكامل المستمر.",
      },
      {
        q: "هل agentic-sdlc مفتوح المصدر وهل تم التحقق منه؟",
        a: "نُشر تحت رخصة MIT، فيصح وصفه بأنه مفتوح المصدر. وهو إطار عمل بالإصدار 0.1، وينص ملف README على أنه لم تتحقق منه دراسة مستقلة. ومقاييسه موسومة بأنها لم تُقَس بعد إلى أن تُقاس، فالمستويات أحكام تقديرية.",
      },
      {
        q: "متى ينبغي للفريق خفض استقلالية الوكيل؟",
        a: "يقضي الإطار بخفض مستوى واحد بعد أي حادثة، وبعدم تجاوز L1 في البيانات أو الإجراءات التي لا رجعة فيها. وأضيف أن إرهاق المراجعة أو تزايد الحجم غير المراجَع إشارة أيضًا إلى التراجع، لأن الفحص البشري حينئذ لم يعد يحمل دليلًا حقيقيًا.",
      },
    ],
  },
};
