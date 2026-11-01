import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "Evaluating Multi-Agent Systems in Production",
    dek: "Why a demo that works once says nothing about an agent system, and how I check that a new version is really better.",
    answer:
      "To evaluate a multi-agent system in production, run the same fixed scenarios against a baseline and a candidate version, score the work (tools, sources, cost, latency) as well as the final answer, keep traces so failures can be replayed, add human review, and let a release gate decide whether the candidate ships.",
    sections: [
      {
        h: "Why does a demo that works once prove nothing?",
        p: [
          "A multi-agent system changes with every prompt, tool, model or context change. Without a fixed set of scenarios, nobody can tell an improvement from a regression.",
          "A demo shows that the system can succeed. Evaluation shows how often it does, and what it costs when it does not.",
        ],
      },
      {
        h: "What does evaluating an agent system actually mean?",
        p: [
          "The useful question is never “does it work?”. It is “is this version better than the previous one, on which scenarios, on which criteria, at what cost, with which errors?”. That is an experiment, not a review meeting.",
          "FORGE, my evaluation lab, is built around that idea. Its central object is the evaluation run: one scenario version, one agent version, one configuration, the execution trace, the evaluations and the scores, frozen into a reproducible manifest. A comparison between two versions is then a comparison between sets of runs, with scores, cost, errors and a confidence level.",
          "FORGE is a public beta, and its results depend on the scenarios you configure. It is the method I want to defend, not a claim that a tool solves evaluation for you.",
        ],
      },
      {
        h: "Which evaluation layers do you need?",
        p: [
          "No single method is enough. Each layer catches a different kind of failure and has a limit that the next layer has to cover. I stack them in this order, from cheapest and most objective to most expensive and most nuanced.",
        ],
        table: {
          head: ["Layer", "What it catches", "Its limit"],
          rows: [
            ["Deterministic rules", "Invalid schema, missing citations, forbidden sources, leaked personal data, wrong tool, cost or latency over budget", "Cannot judge whether an answer is actually good or helpful"],
            ["LLM judges", "Quality, coherence and reasoning against a written rubric, with a justification and evidence linked to the trace", "Judges have their own biases and drift; they need calibration"],
            ["Human review", "Subtle errors, tone, domain correctness, disagreements between judges", "Slow and costly, so it must be targeted at the cases that matter"],
            ["Traces", "Which model call, tool call or retrieval step failed, so a failure can be replayed", "A trace explains a failure but does not tell you whether it matters"],
            ["Hold-out scenarios", "Over-optimisation: a system tuned on public tests failing on new ones", "Only as good as how fresh and representative they are"],
          ],
        },
      },
      {
        h: "How do you compare two versions of an agent system?",
        p: [
          "Pick a baseline and a candidate, run both on the same scenarios, repeat the runs because model outputs vary, and look at deltas per criterion rather than one global score. A single average hides the scenario where the candidate got worse.",
        ],
        list: [
          "Freeze the scenarios and version them, so the test does not move while the agent does.",
          "Run the baseline and the candidate several times each, and compare with paired statistics, not a single run.",
          "Report deltas per criterion with a confidence interval, not only a composite score.",
          "List regressions per scenario, even when the average improves.",
          "End with a recommendation a person can act on: deploy, deploy with caution, do not deploy, or inconclusive.",
        ],
      },
      {
        h: "How do you avoid fooling yourself with your own test set?",
        p: [
          "The biggest risk is not a bad agent, it is a good-looking one. Once a team tunes prompts against a public test set, the scores rise and the real behaviour may not. I separate three kinds of scenarios: public ones for everyday development, private ones whose content and expected result are hidden from the agent, and fresh ones added regularly to detect over-optimisation.",
          "Canary strings help detect contamination, and structured error taxonomies (hallucination, contradiction, wrong tool, data leak, source error) turn a vague “it feels worse” into a countable, reviewable list.",
          "Human calibration closes the loop. If the judges and the reviewers disagree, the first thing to fix is the judge, not the agent. Disagreement between judges is also the best way to prioritise what a human should read.",
        ],
      },
      {
        h: "What does a RAG evaluation look like on a real platform?",
        p: [
          "On the DILA platform (public sector, services of the Prime Minister), the evaluation covered the whole RAG chain, not only the final text. That matters because a fluent answer can hide a retrieval failure. These figures were measured on the DILA platform, not by FORGE.",
        ],
        table: {
          head: ["Metric", "Score", "What it tells you"],
          rows: [
            ["Faithfulness", "0.94", "Whether the answer stays supported by the retrieved passages, rather than invented"],
            ["Answer relevancy", "0.91", "Whether the answer actually addresses the question asked"],
            ["Context precision", "0.89", "Whether the passages retrieved are the useful ones, with little noise"],
            ["Context recall", "0.92", "Whether the passages needed to answer were retrieved at all"],
            ["Scenario coverage", "85%", "Share of priority RAG scenarios the evaluation covers"],
          ],
        },
        list: [
          "Low faithfulness with high recall points at generation: the model had the facts and ignored them.",
          "Low recall points at retrieval: no prompt change will fix an answer whose evidence was never fetched.",
        ],
      },
      {
        h: "Why score cost and latency like quality?",
        p: [
          "An agent that answers well but loops through tools for minutes is not better, it is more expensive. Cost, latency and tokens per step belong in the same scorecard as quality, with weights you set and can explain.",
          "FORGE scores several dimensions, among them quality, coherence, reasoning, safety, robustness, cost, latency and user experience, and each composite score is published with its formula. The rule I hold to is simple: no score without an explanation. Every note must trace back to the criterion, the judge (model, version, prompt), the rule and the trace step concerned.",
          "The DILA programme showed the same logic at platform level, where pipeline optimisation and reuse contributed to a 30% lower cost per AI request. That figure comes from the DILA platform, not from FORGE, but it shows why cost is a quality criterion and not an afterthought for finance.",
        ],
      },
      {
        h: "What should a release gate decide?",
        p: [
          "A release gate turns evaluation into a decision. In practice it runs in continuous integration: if a candidate regresses on a criterion you declared critical, the pipeline stops, and the report shows which scenarios and which trace steps caused it.",
          "The gate also needs a way out. A regression can be accepted, but only with a named owner and a reason, so the decision stays auditable. What the gate learns goes back into the scenarios: every incident found in production becomes a new test.",
          "This is also what makes autonomy possible. When you can show what happens on a fixed set of scenarios, you can allow an agent to do more, and withdraw that permission when the evidence changes.",
        ],
      },
    ],
    take: "Evaluation is the control plane of an agent platform. Without it every release is a bet. With it you can give agents more autonomy, because you can show what happens. I would rather ship fewer versions with a defensible reason than many that nobody can compare.",
    diagram: { nodes: ["Scenario", "Run", "Trace", "Score", "Human review", "Release gate"], caption: "A closed loop: what the release gate learns goes back into the scenarios." },
    results: [{ v: "0.94", l: "RAG faithfulness (DILA)" }, { v: "0.91", l: "answer relevancy (DILA)" }, { v: "0.89", l: "context precision (DILA)" }, { v: "0.92", l: "context recall (DILA)" }, { v: "85%", l: "of priority RAG scenarios covered (DILA)" }],
    faq: [
      {
        q: "How do you evaluate a multi-agent system?",
        a: "Run fixed, versioned scenarios against a baseline and a candidate, score tools, sources, cost and latency as well as the final answer, keep traces to replay failures, add human review for the hard cases, and compare versions with confidence levels rather than one-off impressions.",
      },
      {
        q: "Can an LLM judge replace human review?",
        a: "No. LLM judges scale well and give justifications, but they carry biases and drift. Calibrate them against human-labelled examples, measure how often they agree, and send the cases where judges disagree to a person. Humans stay the reference, judges make that review affordable.",
      },
      {
        q: "What is the difference between evaluating an agent and evaluating a RAG pipeline?",
        a: "A RAG pipeline is judged on retrieval and grounding: faithfulness, answer relevancy, context precision and context recall. An agent adds decisions, so you also score tool choices, sequencing, cost, latency and safety. A multi-agent system needs both, plus traces to see where it went wrong.",
      },
      {
        q: "What is a release gate for AI agents?",
        a: "It is an automated check, usually in continuous integration, that blocks a new agent version when it regresses on criteria you declared critical. It reports which scenarios failed and why, and it allows an accepted regression only with a named owner and a recorded reason.",
      },
      {
        q: "Is FORGE ready for production use?",
        a: "FORGE is a public beta, and its results depend on the scenarios you configure. It is useful to try the method and to compare agent versions on your own scenarios, but it should not be presented as a validated production tool. The DILA metrics in this article were measured on the DILA platform.",
      },
    ],
  },

  fr: {
    title: "Évaluer des systèmes multi-agents en production",
    dek: "Pourquoi une démo qui marche une fois ne dit rien d’un système d’agents, et comment je vérifie qu’une nouvelle version est vraiment meilleure.",
    answer:
      "Pour évaluer un système multi-agents en production, il faut rejouer les mêmes scénarios fixes sur une version de référence et une version candidate, noter le travail (outils, sources, coût, latence) et pas seulement la réponse, conserver des traces pour rejouer les échecs, ajouter une revue humaine et laisser un point de contrôle décider de la mise en production.",
    sections: [
      {
        h: "Pourquoi une démo qui marche une fois ne prouve-t-elle rien ?",
        p: [
          "Un système multi-agents change à chaque modification de prompt, d’outil, de modèle ou de contexte. Sans un jeu fixe de scénarios, personne ne distingue une amélioration d’une régression.",
          "Une démo montre que le système peut réussir. L’évaluation montre à quelle fréquence il réussit, et ce que coûte un échec.",
        ],
      },
      {
        h: "Que veut dire concrètement évaluer un système d’agents ?",
        p: [
          "La bonne question n’est jamais « est-ce que ça marche ? ». C’est « cette version est-elle meilleure que la précédente, sur quels scénarios, selon quels critères, à quel coût, avec quelles erreurs ? ». C’est une expérience, pas une réunion de relecture.",
          "FORGE, mon laboratoire d’évaluation, est construit autour de cette idée. Son objet central est l’exécution d’évaluation : une version de scénario, une version d’agent, une configuration, la trace d’exécution, les évaluations et les scores, figés dans un manifeste reproductible. Comparer deux versions revient alors à comparer deux ensembles d’exécutions, avec scores, coût, erreurs et niveau de confiance.",
          "FORGE est une bêta publique et ses résultats dépendent des scénarios configurés. C’est la méthode que je défends, pas la promesse qu’un outil résout l’évaluation à votre place.",
        ],
      },
      {
        h: "De quelles couches d’évaluation a-t-on besoin ?",
        p: [
          "Aucune méthode ne suffit seule. Chaque couche attrape un type d’échec différent, et sa limite doit être couverte par la suivante. Je les empile de la plus économique et objective à la plus coûteuse et nuancée.",
        ],
        table: {
          head: ["Couche", "Ce qu’elle détecte", "Sa limite"],
          rows: [
            ["Règles déterministes", "Schéma invalide, citations manquantes, sources interdites, fuite de données personnelles, mauvais outil, coût ou latence hors budget", "Ne peut pas juger si une réponse est réellement bonne ou utile"],
            ["Juges LLM", "Qualité, cohérence et raisonnement selon une grille écrite, avec justification et preuves liées à la trace", "Les juges ont leurs biais et dérivent ; ils demandent une calibration"],
            ["Revue humaine", "Erreurs subtiles, ton, exactitude métier, désaccords entre juges", "Lente et coûteuse : il faut la cibler sur les cas qui comptent"],
            ["Traces", "Quel appel de modèle, d’outil ou quelle étape de récupération a échoué, pour rejouer l’échec", "Une trace explique un échec mais ne dit pas s’il est important"],
            ["Scénarios mis de côté", "Sur-optimisation : un système réglé sur des tests publics qui échoue sur de nouveaux", "Valent ce que vaut leur fraîcheur et leur représentativité"],
          ],
        },
      },
      {
        h: "Comment comparer deux versions d’un système d’agents ?",
        p: [
          "On choisit une référence et un candidat, on exécute les deux sur les mêmes scénarios, on répète les exécutions parce que les sorties d’un modèle varient, et on regarde les écarts par critère plutôt qu’un score global. Une moyenne unique cache le scénario où le candidat a empiré.",
        ],
        list: [
          "Figer et versionner les scénarios, pour que le test ne bouge pas pendant que l’agent évolue.",
          "Exécuter la référence et le candidat plusieurs fois chacun, et comparer avec des statistiques appariées, pas sur une seule exécution.",
          "Présenter les écarts par critère avec un intervalle de confiance, pas seulement un score composite.",
          "Lister les régressions par scénario, même quand la moyenne s’améliore.",
          "Terminer par une recommandation exploitable : déployer, déployer avec prudence, ne pas déployer, ou non concluant.",
        ],
      },
      {
        h: "Comment éviter de se tromper soi-même avec son propre jeu de tests ?",
        p: [
          "Le plus grand risque n’est pas un mauvais agent, c’est un agent qui a l’air bon. Dès qu’une équipe règle ses prompts sur un jeu de tests public, les scores montent, et le comportement réel pas forcément. Je distingue trois types de scénarios : publics pour le développement courant, privés dont le contenu et le résultat attendu restent cachés à l’agent, et frais, ajoutés régulièrement pour détecter la sur-optimisation.",
          "Des chaînes canaris aident à détecter la contamination, et une taxonomie d’erreurs (hallucination, contradiction, mauvais outil, fuite de données, erreur de source) transforme un vague « ça semble moins bien » en liste comptable et vérifiable.",
          "La calibration humaine boucle le dispositif. Si les juges et les relecteurs ne sont pas d’accord, il faut d’abord corriger le juge, pas l’agent. Le désaccord entre juges est aussi le meilleur moyen de prioriser ce qu’un humain doit relire.",
        ],
      },
      {
        h: "À quoi ressemble l’évaluation d’un RAG sur une vraie plateforme ?",
        p: [
          "Sur la plateforme de la DILA (secteur public, services du Premier ministre), l’évaluation couvrait toute la chaîne RAG, pas seulement le texte final. C’est important, car une réponse fluide peut cacher un échec de récupération. Ces chiffres ont été mesurés sur la plateforme de la DILA, pas par FORGE.",
        ],
        table: {
          head: ["Métrique", "Score", "Ce qu’elle indique"],
          rows: [
            ["Fidélité", "0,94", "La réponse reste-t-elle appuyée sur les passages récupérés, sans invention"],
            ["Pertinence des réponses", "0,91", "La réponse traite-t-elle bien la question posée"],
            ["Précision du contexte", "0,89", "Les passages récupérés sont-ils les bons, avec peu de bruit"],
            ["Rappel du contexte", "0,92", "Les passages nécessaires pour répondre ont-ils bien été récupérés"],
            ["Couverture des scénarios", "85 %", "Part des scénarios RAG prioritaires couverte par l’évaluation"],
          ],
        },
        list: [
          "Une fidélité faible avec un rappel élevé pointe la génération : le modèle avait les faits et les a ignorés.",
          "Un rappel faible pointe la récupération : aucun changement de prompt ne corrigera une réponse dont les preuves n’ont jamais été trouvées.",
        ],
      },
      {
        h: "Pourquoi noter le coût et la latence comme la qualité ?",
        p: [
          "Un agent qui répond bien mais enchaîne les appels d’outils pendant des minutes n’est pas meilleur, il est plus cher. Le coût, la latence et les tokens par étape appartiennent à la même grille que la qualité, avec des pondérations que l’on choisit et que l’on sait expliquer.",
          "FORGE note plusieurs dimensions, dont la qualité, la cohérence, le raisonnement, la sécurité, la robustesse, le coût, la latence et l’expérience utilisateur, et chaque score composite est accompagné de sa formule. Ma règle est simple : aucun score sans explication. Chaque note doit remonter au critère, au juge (modèle, version, prompt), à la règle et à l’étape de trace concernée.",
          "Le programme DILA a montré la même logique à l’échelle d’une plateforme : l’optimisation des chaînes et la réutilisation ont contribué à un coût par requête d’IA en baisse de 30 %. Ce chiffre vient de la plateforme de la DILA, pas de FORGE, mais il montre pourquoi le coût est un critère de qualité et non un détail pour la finance.",
        ],
      },
      {
        h: "Que doit décider un point de contrôle avant mise en production ?",
        p: [
          "Un point de contrôle transforme l’évaluation en décision. En pratique, il s’exécute en intégration continue : si un candidat régresse sur un critère déclaré critique, le pipeline s’arrête, et le rapport montre quels scénarios et quelles étapes de trace en sont la cause.",
          "Il faut aussi une porte de sortie. Une régression peut être acceptée, mais avec un responsable nommé et une raison, pour que la décision reste auditable. Ce que le point de contrôle apprend retourne dans les scénarios : chaque incident constaté en production devient un nouveau test.",
          "C’est aussi ce qui rend l’autonomie possible. Quand on peut montrer ce qui se passe sur un jeu fixe de scénarios, on peut autoriser un agent à faire davantage, et retirer cette autorisation quand les preuves changent.",
        ],
      },
    ],
    take: "L’évaluation est le plan de contrôle d’une plateforme d’agents. Sans elle, chaque version est un pari. Avec elle, on peut donner plus d’autonomie aux agents, parce qu’on peut montrer ce qui se passe. Je préfère livrer moins de versions, avec une raison défendable, que beaucoup de versions que personne ne sait comparer.",
    diagram: { nodes: ["Scénario", "Exécution", "Trace", "Score", "Revue humaine", "Point de contrôle"], caption: "Une boucle fermée : ce que le point de contrôle apprend retourne dans les scénarios." },
    results: [{ v: "0,94", l: "fidélité du RAG (DILA)" }, { v: "0,91", l: "pertinence des réponses (DILA)" }, { v: "0,89", l: "précision du contexte (DILA)" }, { v: "0,92", l: "rappel du contexte (DILA)" }, { v: "85 %", l: "des scénarios RAG prioritaires couverts (DILA)" }],
    faq: [
      {
        q: "Comment évaluer un système multi-agents ?",
        a: "On rejoue des scénarios fixes et versionnés sur une version de référence et une version candidate, on note les outils, les sources, le coût et la latence en plus de la réponse finale, on garde les traces pour rejouer les échecs, et on ajoute une revue humaine pour les cas difficiles.",
      },
      {
        q: "Un juge LLM peut-il remplacer la revue humaine ?",
        a: "Non. Les juges LLM passent à l’échelle et justifient leurs notes, mais ils ont des biais et dérivent. Il faut les calibrer sur des exemples annotés par des humains, mesurer leur accord, et envoyer à une personne les cas où les juges divergent. L’humain reste la référence.",
      },
      {
        q: "Quelle différence entre évaluer un agent et évaluer un pipeline RAG ?",
        a: "Un pipeline RAG se juge sur la récupération et l’ancrage : fidélité, pertinence des réponses, précision et rappel du contexte. Un agent ajoute des décisions : on note aussi le choix des outils, l’enchaînement, le coût, la latence et la sécurité. Un système multi-agents demande les deux, plus des traces.",
      },
      {
        q: "Qu’est-ce qu’un point de contrôle pour agents IA ?",
        a: "C’est une vérification automatique, le plus souvent en intégration continue, qui bloque une nouvelle version d’agent quand elle régresse sur des critères déclarés critiques. Elle indique quels scénarios échouent et pourquoi, et n’autorise une régression acceptée qu’avec un responsable nommé et une raison consignée.",
      },
      {
        q: "FORGE est-il prêt pour la production ?",
        a: "FORGE est une bêta publique et ses résultats dépendent des scénarios configurés. Il sert à essayer la méthode et à comparer des versions d’agents sur vos propres scénarios, mais il ne doit pas être présenté comme un outil de production validé. Les métriques de la DILA citées ici ont été mesurées sur la plateforme de la DILA.",
      },
    ],
  },

  ar: {
    title: "تقييم الأنظمة متعددة الوكلاء في الإنتاج",
    dek: "لماذا لا يقول عرض ينجح مرة واحدة شيئًا عن نظام وكلاء، وكيف أتحقق من أن إصدارًا جديدًا أفضل فعلًا.",
    answer:
      "لتقييم نظام متعدد الوكلاء في الإنتاج، شغّل السيناريوهات الثابتة نفسها على إصدار مرجعي وإصدار مرشَّح، وقيّم العمل (الأدوات والمصادر والكلفة والزمن) لا الجواب النهائي وحده، واحتفظ بالتتبعات لإعادة تشغيل الإخفاقات، وأضف مراجعة بشرية، ودع بوابة الإصدار تقرر ما إذا كان المرشَّح سيُنشر.",
    sections: [
      {
        h: "لماذا لا يثبت عرض ناجح مرة واحدة شيئًا؟",
        p: [
          "يتغير النظام متعدد الوكلاء مع كل تغيير في التعليمات أو الأدوات أو النموذج أو السياق. وبلا مجموعة ثابتة من السيناريوهات لا يستطيع أحد التمييز بين تحسّن وانحدار.",
          "يُظهر العرض أن النظام قادر على النجاح. أما التقييم فيُظهر كم مرة ينجح فعلًا، وكم يكلّف حين يفشل.",
          "وتزداد المشكلة في الأنظمة متعددة الوكلاء لأن الخطأ ينتقل بين الوكلاء: قد يبدو الجواب النهائي مقنعًا بينما استدعى أحد الوكلاء أداة خاطئة أو اعتمد على مصدر قديم في منتصف المسار. ولا يظهر ذلك إلا إذا قيّمتَ المسار كله لا الجواب الأخير. لذلك أعدّ التتبع جزءًا من التقييم نفسه، وليس أداة تصحيح تُستعمل بعد وقوع المشكلة فقط.",
        ],
      },
      {
        h: "ماذا يعني تقييم نظام وكلاء عمليًا؟",
        p: [
          "السؤال المفيد ليس « هل يعمل؟ » أبدًا، بل « هل هذا الإصدار أفضل من السابق، وعلى أي سيناريوهات، وبأي معايير، وبأي كلفة، ومع أي أخطاء؟ ». هذه تجربة علمية وليست اجتماع مراجعة.",
          "بُني FORGE، مختبر التقييم الذي أطوّره، حول هذه الفكرة. كائنه المركزي هو تشغيل التقييم: نسخة من سيناريو، ونسخة من وكيل، وإعداد، وتتبع التنفيذ، والتقييمات والدرجات، كلها مجمَّدة في بيان قابل لإعادة الإنتاج. وتصبح المقارنة بين إصدارين مقارنة بين مجموعتين من التشغيلات، مع الدرجات والكلفة والأخطاء ومستوى الثقة.",
          "FORGE نسخة تجريبية عامة، وتعتمد نتائجه على السيناريوهات التي تضبطها. هو المنهج الذي أدافع عنه، لا ادعاءً بأن أداة ما تحلّ التقييم نيابةً عنك.",
          "ولهذا السبب يجب أن يكون كل سيناريو موثَّقًا بمدخلاته وسياقه وقيوده والنتيجة المتوقعة ومعاييره، وأن تكون له نسخ متعددة تقيس المتانة: إذا تغيّرت صياغة السؤال قليلًا وانهار الجواب، فهذه معلومة لا يمنحك إياها عرض واحد ناجح. كما ينبغي أن يكون الوكيل نفسه مُصدَّرًا بإصدار ثابت لا يتغير، يشمل النموذج والتعليمات والأدوات وسياق المعرفة وطريقة التنسيق، وإلا فلن تعرف ما الذي تغيّر فعلًا بين تشغيلين.",
        ],
      },
      {
        h: "ما طبقات التقييم التي تحتاجها؟",
        p: [
          "لا تكفي طريقة واحدة. تلتقط كل طبقة نوعًا مختلفًا من الإخفاق، ولها حدّ يجب أن تغطيه الطبقة التالية. أرتّبها من الأرخص والأكثر موضوعية إلى الأغلى والأكثر دقة.",
          "والفكرة العملية هنا أن القواعد الحتمية تعمل على كل تشغيل بلا كلفة تُذكر، فتُصفّي الأخطاء الواضحة مبكرًا. أما المحكّمون فيُستدعَون للأحكام التي تحتاج إلى فهم، وتُحجز المراجعة البشرية للحالات التي يختلف فيها المحكّمون أو يرتفع فيها الخطر. بهذا يبقى الجهد البشري نادرًا حيث يكون أثمن.",
        ],
        table: {
          head: ["الطبقة", "ما تكشفه", "حدّها"],
          rows: [
            ["القواعد الحتمية", "مخطط غير صالح، استشهادات ناقصة، مصادر ممنوعة، تسرّب بيانات شخصية، أداة خاطئة، كلفة أو زمن خارج الميزانية", "لا تستطيع الحكم على كون الجواب جيدًا أو مفيدًا فعلًا"],
            ["محكّمو LLM", "الجودة والاتساق والاستدلال وفق معيار مكتوب، مع تبرير وأدلة مرتبطة بالتتبع", "لهم انحيازاتهم وانحرافهم، ويحتاجون إلى معايرة"],
            ["المراجعة البشرية", "الأخطاء الدقيقة والنبرة والصحة المهنية والخلافات بين المحكّمين", "بطيئة ومكلفة، فيجب توجيهها إلى الحالات المهمة"],
            ["التتبعات", "أي استدعاء نموذج أو أداة أو خطوة استرجاع فشل، لإعادة تشغيل الإخفاق", "يشرح التتبع الإخفاق لكنه لا يقول إن كان مهمًا"],
            ["سيناريوهات محجوزة", "الإفراط في التحسين: نظام ضُبط على اختبارات عامة يفشل أمام اختبارات جديدة", "قيمتها بقدر حداثتها وتمثيلها للواقع"],
          ],
        },
      },
      {
        h: "كيف تقارن بين إصدارين من نظام وكلاء؟",
        p: [
          "اختر مرجعًا ومرشَّحًا، وشغّلهما على السيناريوهات نفسها، وكرّر التشغيل لأن مخرجات النموذج تتفاوت، وانظر إلى الفروق في كل معيار بدل درجة إجمالية واحدة. المتوسط الوحيد يُخفي السيناريو الذي ساء فيه المرشَّح.",
        ],
        list: [
          "ثبّت السيناريوهات وأعطها إصدارات، كي لا يتحرك الاختبار بينما يتغير الوكيل، واحفظ لكل تشغيل بيانًا يوثّق إصدار السيناريو والوكيل والإعداد.",
          "شغّل المرجع والمرشَّح عدة مرات لكل منهما، وقارن بإحصاءات مقترنة لا بتشغيل واحد.",
          "اعرض الفروق لكل معيار مع مجال ثقة، لا درجة مركّبة فقط.",
          "اذكر حالات الانحدار لكل سيناريو، حتى لو تحسّن المتوسط.",
          "اختم بتوصية يمكن العمل بها: انشر، أو انشر بحذر، أو لا تنشر، أو غير حاسم.",
        ],
      },
      {
        h: "كيف تتجنب خداع نفسك بمجموعة اختباراتك؟",
        p: [
          "الخطر الأكبر ليس وكيلًا سيئًا، بل وكيلًا يبدو جيدًا. حين يضبط فريق تعليماته على مجموعة اختبارات عامة ترتفع الدرجات، وقد لا يتحسن السلوك الحقيقي. أميّز بين ثلاثة أنواع من السيناريوهات: عامة للتطوير اليومي، وخاصة يبقى محتواها ونتيجتها المتوقعة مخفيين عن الوكيل، وجديدة تُضاف بانتظام لكشف الإفراط في التحسين.",
          "تساعد السلاسل الكاناري في كشف التلوث، وتحوّل تصنيفات الأخطاء (هلوسة، تناقض، أداة خاطئة، تسرّب بيانات، خطأ في المصدر) عبارة غامضة مثل « يبدو أسوأ » إلى قائمة قابلة للعدّ والمراجعة.",
          "وتُغلق المعايرة البشرية الحلقة. إذا اختلف المحكّمون والمراجعون فأول ما يُصلَح هو المحكّم لا الوكيل. وخلاف المحكّمين هو أيضًا أفضل وسيلة لترتيب ما ينبغي أن يقرأه إنسان.",
        ],
      },
      {
        h: "كيف يبدو تقييم RAG على منصة حقيقية؟",
        p: [
          "في منصة DILA (القطاع العام، خدمات رئيس الوزراء) شمل التقييم سلسلة RAG كاملة وليس النص النهائي وحده. وهذا مهم لأن جوابًا سلسًا قد يُخفي إخفاقًا في الاسترجاع. وقد قيست هذه الأرقام على منصة DILA، لا بواسطة FORGE. وهي تُقرأ معًا لا منفردةً، لأن كل مقياس يجيب عن سؤال مختلف حول سلسلة واحدة.",
        ],
        table: {
          head: ["المقياس", "الدرجة", "ماذا يخبرك"],
          rows: [
            ["الأمانة", "0.94", "هل يبقى الجواب مدعومًا بالمقاطع المسترجعة بلا اختلاق"],
            ["ملاءمة الإجابات", "0.91", "هل يعالج الجواب السؤال المطروح فعلًا"],
            ["دقة السياق", "0.89", "هل المقاطع المسترجعة هي المفيدة، مع قليل من الضجيج"],
            ["استرجاع السياق", "0.92", "هل استُرجعت المقاطع اللازمة للإجابة أصلًا"],
            ["تغطية السيناريوهات", "85%", "نسبة سيناريوهات RAG ذات الأولوية التي يغطيها التقييم"],
          ],
        },
        list: [
          "أمانة منخفضة مع استرجاع مرتفع تشير إلى التوليد: كان النموذج يملك الحقائق وتجاهلها.",
          "دقة منخفضة مع استرجاع مرتفع تعني أن السياق مزدحم: تصل الأدلة إلى النموذج لكنها مدفونة بين مقاطع لا تفيد، فيتشتت الجواب.",
          "استرجاع منخفض يشير إلى مرحلة الاسترجاع: لن يصلح أي تعديل للتعليمات جوابًا لم تُجلب أدلته أصلًا.",
        ],
      },
      {
        h: "لماذا تُقيَّم الكلفة والزمن مثل الجودة؟",
        p: [
          "وكيل يجيب جيدًا لكنه يظل يدور بين الأدوات دقائق طويلة ليس أفضل، بل أغلى. فالكلفة والزمن والرموز في كل خطوة مكانها في بطاقة التقييم نفسها التي تضم الجودة، بأوزان تحددها أنت وتستطيع شرحها.",
          "يقيّم FORGE عدة أبعاد، منها الجودة والاتساق والاستدلال والسلامة والمتانة والكلفة والزمن وتجربة المستخدم، وتُنشر كل درجة مركّبة مع صيغتها. والقاعدة التي ألتزم بها بسيطة: لا درجة بلا تفسير. يجب أن تعود كل علامة إلى المعيار والمحكّم (النموذج والإصدار والتعليمات) والقاعدة وخطوة التتبع المعنية.",
          "وقد أظهر برنامج DILA المنطق نفسه على مستوى المنصة، إذ أسهم تحسين المسارات وإعادة الاستخدام في خفض كلفة كل طلب ذكاء اصطناعي بنسبة 30%. هذا الرقم من منصة DILA وليس من FORGE، لكنه يوضح لماذا الكلفة معيار جودة وليست تفصيلًا يخص المالية وحدها.",
        ],
      },
      {
        h: "ماذا ينبغي أن تقرر بوابة الإصدار؟",
        p: [
          "تحوّل بوابة الإصدار التقييم إلى قرار. عمليًا تعمل ضمن التكامل المستمر: إذا تراجع مرشَّح في معيار أعلنتَه حرجًا يتوقف المسار، ويُظهر التقرير أي السيناريوهات وأي خطوات التتبع تسببت في ذلك.",
          "وتحتاج البوابة إلى مخرج أيضًا. يمكن قبول انحدار، لكن بمسؤول مسمّى وسبب مدوَّن، كي يبقى القرار قابلًا للتدقيق. وما تتعلمه البوابة يعود إلى السيناريوهات: كل حادثة تظهر في الإنتاج تصبح اختبارًا جديدًا.",
          "ولا تُغني البوابة عن التقدير البشري. فهي تمنع المفاجآت الواضحة، أما قرار قبول مفاضلة بين الجودة والكلفة فيبقى قرار فريق يعرف سياقه ومخاطره.",
          "وهذا ما يجعل الاستقلالية ممكنة. حين تستطيع أن تُظهر ما يحدث على مجموعة ثابتة من السيناريوهات، يمكنك أن تسمح للوكيل بفعل المزيد، وأن تسحب هذا الإذن حين تتغير الأدلة.",
        ],
      },
    ],
    take: "التقييم هو مستوى التحكم في منصة الوكلاء. من دونه كل إصدار رهان. ومعه يمكنك منح الوكلاء استقلالية أكبر لأنك تستطيع أن تُظهر ما يحدث. أفضّل أن أنشر إصدارات أقل بسبب يمكن الدفاع عنه، على إصدارات كثيرة لا يعرف أحد كيف يقارن بينها.",
    diagram: { nodes: ["سيناريو", "تشغيل", "تتبع", "درجة", "مراجعة بشرية", "بوابة الإصدار"], caption: "حلقة مغلقة: ما تتعلمه بوابة الإصدار يعود إلى السيناريوهات." },
    results: [{ v: "0.94", l: "أمانة RAG (DILA)" }, { v: "0.91", l: "ملاءمة الإجابات (DILA)" }, { v: "0.89", l: "دقة السياق (DILA)" }, { v: "0.92", l: "استرجاع السياق (DILA)" }, { v: "85%", l: "من سيناريوهات RAG ذات الأولوية مغطاة (DILA)" }],
    faq: [
      {
        q: "كيف يُقيَّم نظام متعدد الوكلاء؟",
        a: "تُشغَّل سيناريوهات ثابتة ذات إصدارات على إصدار مرجعي وآخر مرشَّح، وتُقيَّم الأدوات والمصادر والكلفة والزمن إلى جانب الجواب النهائي، وتُحفَظ التتبعات لإعادة تشغيل الإخفاقات، وتُضاف مراجعة بشرية للحالات الصعبة، وتُقارَن الإصدارات بمستويات ثقة لا بانطباعات عابرة.",
      },
      {
        q: "هل يمكن لمحكّم LLM أن يحل محل المراجعة البشرية؟",
        a: "لا. يتوسع محكّمو LLM بسهولة ويقدّمون تبريرات، لكن لديهم انحيازات وانحرافًا. يجب معايرتهم على أمثلة وسمها بشر، وقياس مدى اتفاقهم، وإرسال الحالات التي يختلفون فيها إلى شخص. يبقى الإنسان المرجع، ويجعل المحكّمون مراجعته ممكنة الكلفة.",
      },
      {
        q: "ما الفرق بين تقييم وكيل وتقييم مسار RAG؟",
        a: "يُحكم على مسار RAG بالاسترجاع والاستناد: الأمانة وملاءمة الإجابات ودقة السياق واسترجاعه. ويضيف الوكيل قرارات، فتُقيَّم أيضًا اختيارات الأدوات والتسلسل والكلفة والزمن والسلامة. ويحتاج النظام متعدد الوكلاء إلى الأمرين، مع تتبعات لمعرفة موضع الخطأ.",
      },
      {
        q: "ما بوابة الإصدار لوكلاء الذكاء الاصطناعي؟",
        a: "هي فحص آلي، عادةً ضمن التكامل المستمر، يمنع نشر إصدار جديد من الوكيل إذا تراجع في معايير أُعلن أنها حرجة. يبيّن أي السيناريوهات فشلت ولماذا، ولا يسمح بانحدار مقبول إلا بمسؤول مسمّى وسبب مدوَّن.",
      },
      {
        q: "هل FORGE جاهز للاستخدام في الإنتاج؟",
        a: "FORGE نسخة تجريبية عامة، وتعتمد نتائجه على السيناريوهات التي تضبطها. يفيد في تجربة المنهج ومقارنة إصدارات الوكلاء على سيناريوهاتك الخاصة، لكن لا ينبغي تقديمه أداةً إنتاجية مُصادَقًا عليها. أما مقاييس DILA المذكورة هنا فقد قيست على منصة DILA.",
      },
    ],
  },
};
