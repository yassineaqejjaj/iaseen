import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "Context Engineering: Beyond Traditional RAG",
    dek: "Retrieval finds text. Context engineering decides what an agent should know, from where, for whom and for how long.",
    answer:
      "Context engineering is the discipline of deciding what an AI agent should know for a given task: which sources, how fresh, how reliable, and whether the reader may see them. Traditional RAG only retrieves the passages closest to a question. Context engineering governs, ranks, budgets and explains the whole context.",
    sections: [
      {
        h: "What is context engineering?",
        p: [
          "Every agent answers from the context it is given. Context engineering is the work of preparing that context deliberately, instead of hoping that a similarity search returns the right passages.",
          "It covers where information comes from, how long it stays valid, who may read it and how much of it fits in the model's window.",
        ],
      },
      {
        h: "How is it different from traditional RAG?",
        p: [
          "Traditional RAG is a good answer to a narrow problem: find text related to a question and let the model write from it. Context engineering starts from a different question: what does this agent need to know to do this task safely?",
          "I am not arguing against retrieval. Hybrid search, sensible chunking and reranking remain the foundation, and the DILA work shows how much careful engineering they deserve. The point is that retrieval is necessary but not sufficient once agents act on behalf of people, over documents that change and carry different levels of confidentiality.",
          "The table compares the two on the dimensions that decide whether an agent can be trusted in an organisation.",
        ],
        table: {
          head: ["Dimension", "Traditional RAG", "Context engineering"],
          rows: [
            ["Freshness", "Whatever was indexed, with no notion of replaced decisions", "Replaced and obsolete items are demoted or excluded"],
            ["Conflicts", "Two contradicting passages are both sent to the model", "Contradictions are detected and arbitrated before assembly"],
            ["Permissions", "Often applied to the index, rarely to each answer", "Checked per reader and per item at assembly time"],
            ["Memory", "Stateless: each question starts from zero", "Governed memory with a lifecycle, versions and an owner"],
            ["Budget", "Top results until the window is full", "An explicit token budget, with selection and compression"],
            ["Traceability", "A list of retrieved chunks", "A reason code for every item kept or excluded, down to the source paragraph"],
            ["Evaluation", "Judged on the final answer", "Judged on the context itself, then on the answer"],
          ],
        },
      },
      {
        h: "Why do agents fail even when retrieval works?",
        p: [
          "In my experience agents rarely fail for lack of a better model. They fail on four situations that similarity search cannot see:",
          "Each of these is a governance problem, not a ranking problem. A better embedding model improves how close a passage is to a question, but it cannot know that a decision was reversed, or that the person asking is an intern. That knowledge lives in the lifecycle of the data and in the access model, so it must be modelled explicitly and applied at assembly time.",
        ],
        list: [
          "A decision was replaced last month, but the old document is still the closest match.",
          "Two versions of a specification disagree, and both reach the prompt.",
          "A constraint, such as an accessibility requirement, sits in a document that was never retrieved.",
          "The reader is not allowed to see a document, yet it was retrieved because it was relevant.",
        ],
      },
      {
        h: "What does a governed memory item look like?",
        p: [
          "ORBIT, the platform I built to explore this, treats decisions, needs, constraints, risks and preferences as memory items rather than loose chunks. Each one carries versions and provenance down to the source paragraph.",
          "The lifecycle is what makes memory governable. An item is not simply stored: it is proposed, reviewed and eventually replaced or forgotten.",
        ],
        table: {
          head: ["State", "Meaning", "Effect on assembled context"],
          rows: [
            ["Proposed", "Extracted from a source, not yet reviewed", "Kept out or flagged until a human reviews it"],
            ["Validated", "Confirmed as a decision, constraint or risk", "Eligible for context, ranked by relevance and freshness"],
            ["Replaced", "A newer item supersedes it", "Excluded, with the reason recorded"],
            ["Obsolete", "No longer true or no longer useful", "Excluded, still visible in history"],
            ["Forgotten", "Deliberately removed", "Never served again"],
          ],
        },
      },
      {
        h: "How is a context assembled for one task?",
        p: [
          "ORBIT assembles context per task, not per question. Sources are first ingested with personal-data detection and redaction, then indexed for hybrid search. At request time the assembly follows a fixed sequence. I care that it stays explainable: when an agent gives a surprising answer, you can open the context it received and read why each item was in or out, instead of guessing from a similarity score.",
        ],
        list: [
          "Understand the intent of the task and who is asking.",
          "Search the memory and the documents, then merge the ranked results.",
          "Apply freshness, resolve conflicts and remove duplicates.",
          "Apply permissions and classification, so a reader never receives what they may not see.",
          "Select within the token budget and compress what remains.",
          "Return the context with a reason code for every item kept or excluded.",
        ],
      },
      {
        h: "How do you measure context quality?",
        p: [
          "A context you cannot measure is a context you cannot improve. ORBIT is designed to record latency, tokens, estimated cost, exclusions by reason and the sources that proved most useful, and to export traces for evaluation. Versioned snapshots let several agents share the same context and compare it over time.",
          "ORBIT is a public beta and is not validated for production use. The results measured on Nova Context are listed on the NOVA page. The figures below come from the DILA platform, which serves the services of the Prime Minister: the retrieval chain was measured at 0.94 faithfulness, 0.91 answer relevancy, 0.89 context precision and 0.92 context recall, with 85% of priority RAG scenarios covered.",
          "The same pipeline work contributed to a 30% lower cost per AI request, and reusable components cut delivery of a RAG application from 10 weeks to 4. Those results come from engineering the chain around the model, which is the same argument as this article.",
        ],
      },
      {
        h: "Can several agents share the same context, and where does this approach stop?",
        p: [
          "Versioned snapshots let agents work from the same assembled context and compare it with a later one, so a disagreement between two agents can be traced to a difference in what they were given. Each snapshot states the classification of what it delivers, and ORBIT is reachable through a REST API and an MCP server.",
          "The approach has limits. Governed memory costs review effort, someone must arbitrate contradictions, and extraction by a language model is optional and needs verification. It also reflects my design choices, exercised on a demonstration project rather than in production, which is why I call ORBIT a public beta.",
        ],
      },
      {
        h: "Where should you start?",
        p: [
          "You do not need a new platform on the first day. The order that has worked for me is to make the problems visible before fixing them.",
        ],
        list: [
          "List the sources an agent relies on and name an owner for each.",
          "Add permissions and classification to the retrieval path, not only to the index.",
          "Track which decisions replace which, even in a simple table.",
          "Log what was kept and what was excluded for every request.",
          "Evaluate the retrieval step separately from the generated answer.",
        ],
      },
    ],
    take: "The next gains in enterprise agents will come from context, not from bigger models. I treat memory as governed data: it needs an owner, a lifecycle and an audit trail, exactly like any other asset a company depends on. If you cannot explain why an item reached the prompt, you do not yet control your agent.",
    diagram: {
      heads: ["Traditional RAG", "Context engineering"],
      nodes: ["Question", "Retrieve top results", "Generate"],
      nodes2: ["Intent", "Select and rank", "Resolve conflicts", "Apply permissions", "Budget tokens", "Explain and trace"],
      caption: "Same goal, different job: retrieval answers a question, context engineering prepares an agent.",
    },
    results: [
      { v: "0.89", l: "context precision (DILA)" },
      { v: "0.92", l: "context recall (DILA)" },
      { v: "−30%", l: "cost per AI request, through pipeline optimisation and reuse (DILA)" },
    ],
    faq: [
      {
        q: "What is context engineering in simple terms?",
        a: "It is the practice of deciding exactly what an AI agent should know before it acts: which sources, how recent, how reliable, and whether the person asking is allowed to see them. It goes beyond retrieval by adding governance, a token budget and an explanation for every choice.",
      },
      {
        q: "Does context engineering replace RAG?",
        a: "No. Retrieval remains one step inside it. Context engineering adds what retrieval lacks: lifecycle for memory, conflict handling, permissions, budgeting and traceability. A system can use excellent RAG and still hand an agent an outdated or forbidden passage.",
      },
      {
        q: "How do you evaluate a RAG or context pipeline?",
        a: "Measure the chain, not only the final text. On the DILA platform we tracked faithfulness, answer relevancy, context precision and context recall, so a failure can be traced to retrieval or to generation. Private and new scenarios help detect over-tuning.",
      },
      {
        q: "Is ORBIT ready for production?",
        a: "No. ORBIT is a public beta and is not validated for production use. It is a working reference for governed memory, provenance, reason codes, permissions and token budgets, and it is a good base to learn from and to adapt with proper review.",
      },
      {
        q: "Where does MCP fit in?",
        a: "MCP is a standard way to connect agents to tools and data. ORBIT offers connectors for tools such as Confluence, Jira and Microsoft 365, and exposes its own MCP server, so any compatible agent can request an assembled, governed context.",
      },
    ],
  },
  fr: {
    title: "Ingénierie du contexte : au-delà du RAG classique",
    dek: "La récupération trouve du texte. L’ingénierie du contexte décide ce qu’un agent doit savoir, d’où, pour qui et pour combien de temps.",
    answer:
      "L’ingénierie du contexte (context engineering) consiste à décider ce qu’un agent IA doit savoir pour une tâche donnée : quelles sources, quelle fraîcheur, quelle fiabilité, et si le lecteur a le droit d’y accéder. Le RAG classique se contente de récupérer les passages proches d’une question ; l’ingénierie du contexte gouverne, classe, budgète et explique l’ensemble.",
    sections: [
      {
        h: "Qu’est-ce que l’ingénierie du contexte ?",
        p: [
          "Un agent répond à partir du contexte qu’on lui fournit. L’ingénierie du contexte, c’est le travail qui consiste à préparer ce contexte volontairement, plutôt que d’espérer qu’une recherche par similarité ramène les bons passages.",
          "Elle couvre l’origine de l’information, sa durée de validité, les personnes qui ont le droit de la lire et la part qui tient dans la fenêtre du modèle.",
        ],
      },
      {
        h: "Quelle différence avec le RAG classique ?",
        p: [
          "Le RAG classique répond bien à un problème étroit : trouver du texte lié à une question et laisser le modèle rédiger à partir de lui. L’ingénierie du contexte part d’une autre question : de quoi cet agent a-t-il besoin pour accomplir cette tâche en sécurité ?",
          "Je ne plaide pas contre la récupération. La recherche hybride, un découpage raisonnable et le reclassement restent le socle, et le travail mené à la DILA montre l’ingénierie soignée qu’ils méritent. Le point est que la récupération est nécessaire mais insuffisante dès que des agents agissent pour le compte de personnes, sur des documents qui changent et n’ont pas le même niveau de confidentialité.",
          "Le tableau compare les deux approches sur les critères qui décident si un agent peut être digne de confiance dans une organisation.",
        ],
        table: {
          head: ["Critère", "RAG classique", "Ingénierie du contexte"],
          rows: [
            ["Fraîcheur", "Ce qui a été indexé, sans notion de décision remplacée", "Les éléments remplacés ou obsolètes sont déclassés ou exclus"],
            ["Conflits", "Deux passages contradictoires partent tous deux au modèle", "Les contradictions sont détectées et arbitrées avant l’assemblage"],
            ["Habilitations", "Souvent appliquées à l’index, rarement à chaque réponse", "Vérifiées par lecteur et par élément au moment de l’assemblage"],
            ["Mémoire", "Sans état : chaque question repart de zéro", "Mémoire gouvernée, avec cycle de vie, versions et responsable"],
            ["Budget", "Les meilleurs résultats jusqu’à remplir la fenêtre", "Un budget de tokens explicite, avec sélection et compression"],
            ["Traçabilité", "Une liste de passages récupérés", "Un code de raison pour chaque élément retenu ou exclu, jusqu’au paragraphe source"],
            ["Évaluation", "Jugée sur la réponse finale", "Jugée sur le contexte lui-même, puis sur la réponse"],
          ],
        },
      },
      {
        h: "Pourquoi les agents échouent-ils même quand la récupération fonctionne ?",
        p: [
          "D’après mon expérience, les agents échouent rarement faute d’un meilleur modèle. Ils échouent dans quatre situations que la recherche par similarité ne voit pas :",
          "Chacune relève de la gouvernance, pas du classement. Un meilleur modèle d’embeddings améliore la proximité d’un passage avec une question, mais il ne peut pas savoir qu’une décision a été annulée, ni que la personne qui demande est un stagiaire. Ce savoir vit dans le cycle de vie des données et dans le modèle d’accès : il faut donc le modéliser explicitement et l’appliquer au moment de l’assemblage.",
        ],
        list: [
          "Une décision a été remplacée le mois dernier, mais l’ancien document reste le plus proche de la question.",
          "Deux versions d’une spécification se contredisent, et les deux arrivent dans le prompt.",
          "Une contrainte, par exemple d’accessibilité, figure dans un document qui n’a jamais été récupéré.",
          "Le lecteur n’a pas le droit de voir un document, mais celui-ci a été récupéré parce qu’il était pertinent.",
        ],
      },
      {
        h: "À quoi ressemble un élément de mémoire gouverné ?",
        p: [
          "ORBIT, la plateforme que j’ai construite pour explorer le sujet, traite les décisions, besoins, contraintes, risques et préférences comme des éléments de mémoire plutôt que comme des fragments isolés. Chacun porte des versions et une provenance jusqu’au paragraphe source.",
          "C’est le cycle de vie qui rend la mémoire gouvernable. Un élément n’est pas simplement stocké : il est proposé, revu, puis remplacé ou oublié.",
        ],
        table: {
          head: ["État", "Signification", "Effet sur le contexte assemblé"],
          rows: [
            ["Proposé", "Extrait d’une source, pas encore revu", "Écarté ou signalé jusqu’à la revue par un humain"],
            ["Validé", "Confirmé comme décision, contrainte ou risque", "Éligible au contexte, classé par pertinence et fraîcheur"],
            ["Remplacé", "Un élément plus récent le supplante", "Exclu, avec la raison enregistrée"],
            ["Obsolète", "N’est plus vrai ou plus utile", "Exclu, reste visible dans l’historique"],
            ["Oublié", "Retiré volontairement", "Plus jamais servi"],
          ],
        },
      },
      {
        h: "Comment assemble-t-on le contexte d’une tâche ?",
        p: [
          "ORBIT assemble le contexte par tâche, et non par question. Les sources sont d’abord ingérées avec détection et caviardage des données personnelles, puis indexées pour une recherche hybride. À la requête, l’assemblage suit une séquence fixe. J’y tiens à l’explicabilité : quand un agent donne une réponse surprenante, on peut ouvrir le contexte qu’il a reçu et lire pourquoi chaque élément y figurait ou non, au lieu de deviner à partir d’un score de similarité.",
        ],
        list: [
          "Comprendre l’intention de la tâche et qui la demande.",
          "Chercher dans la mémoire et les documents, puis fusionner les résultats classés.",
          "Appliquer la fraîcheur, résoudre les conflits et supprimer les doublons.",
          "Appliquer habilitations et classification, pour qu’un lecteur ne reçoive jamais ce qu’il n’a pas le droit de voir.",
          "Sélectionner dans le budget de tokens et compresser le reste.",
          "Renvoyer le contexte avec un code de raison pour chaque élément retenu ou exclu.",
        ],
      },
      {
        h: "Comment mesurer la qualité du contexte ?",
        p: [
          "Un contexte que l’on ne mesure pas est un contexte que l’on ne peut pas améliorer. ORBIT est conçu pour enregistrer la latence, les tokens, le coût estimé, les exclusions par raison et les sources les plus utiles, et pour exporter les traces vers l’évaluation. Des snapshots versionnés permettent à plusieurs agents de partager le même contexte et de le comparer dans le temps.",
          "ORBIT est une bêta publique, non validée pour un usage en production, Les résultats mesurés sur Nova Context sont présentés sur la page NOVA. Les chiffres ci-dessous viennent de la plateforme de la DILA, au service du Premier ministre : la chaîne de récupération a été mesurée à 0,94 de fidélité, 0,91 de pertinence des réponses, 0,89 de précision du contexte et 0,92 de rappel du contexte, avec 85 % des scénarios RAG prioritaires couverts.",
          "Le même travail sur les chaînes a contribué à un coût par requête d’IA en baisse de 30 %, et les composants réutilisables ont ramené la livraison d’une application RAG de 10 semaines à 4. Ces résultats viennent de l’ingénierie de la chaîne autour du modèle, ce qui est exactement l’argument de cet article.",
        ],
      },
      {
        h: "Plusieurs agents peuvent-ils partager le même contexte, et où cette approche s’arrête-t-elle ?",
        p: [
          "Des snapshots versionnés permettent à des agents de travailler sur le même contexte assemblé et de le comparer à un contexte ultérieur : un désaccord entre deux agents se ramène alors à une différence dans ce qu’ils ont reçu. Chaque snapshot indique la classification de ce qu’il livre, et ORBIT est accessible par une API REST et un serveur MCP.",
          "L’approche a ses limites. Une mémoire gouvernée coûte du temps de revue, quelqu’un doit arbitrer les contradictions, et l’extraction par un modèle de langage est optionnelle et doit être vérifiée. Elle reflète aussi mes choix de conception, éprouvés sur un projet de démonstration plutôt qu’en production, d’où le terme de bêta publique pour ORBIT.",
        ],
      },
      {
        h: "Par où commencer ?",
        p: [
          "Inutile d’adopter une nouvelle plateforme dès le premier jour. L’ordre qui a fonctionné pour moi consiste à rendre les problèmes visibles avant de les corriger.",
        ],
        list: [
          "Lister les sources sur lesquelles un agent s’appuie et nommer un responsable pour chacune.",
          "Ajouter habilitations et classification au chemin de récupération, pas seulement à l’index.",
          "Suivre quelles décisions en remplacent d’autres, même dans un simple tableau.",
          "Journaliser ce qui a été retenu et exclu pour chaque requête.",
          "Évaluer l’étape de récupération séparément de la réponse générée.",
        ],
      },
    ],
    take: "Les prochains gains des agents d’entreprise viendront du contexte, pas de modèles plus gros. Je traite la mémoire comme une donnée gouvernée : elle exige un responsable, un cycle de vie et une piste d’audit, comme tout actif dont une entreprise dépend. Si vous ne savez pas expliquer pourquoi un élément est arrivé dans le prompt, vous ne contrôlez pas encore votre agent.",
    diagram: {
      heads: ["RAG classique", "Ingénierie du contexte"],
      nodes: ["Question", "Récupérer les meilleurs résultats", "Générer"],
      nodes2: ["Intention", "Sélectionner et classer", "Résoudre les conflits", "Appliquer les droits", "Budgéter les tokens", "Expliquer et tracer"],
      caption: "Même objectif, autre métier : la récupération répond à une question, l’ingénierie du contexte prépare un agent.",
    },
    results: [
      { v: "0,89", l: "précision du contexte (DILA)" },
      { v: "0,92", l: "rappel du contexte (DILA)" },
      { v: "−30 %", l: "de coût par requête d’IA, grâce à l’optimisation des chaînes et à la réutilisation (DILA)" },
    ],
    faq: [
      {
        q: "Qu’est-ce que l’ingénierie du contexte, en termes simples ?",
        a: "C’est la pratique qui consiste à décider précisément ce qu’un agent IA doit savoir avant d’agir : quelles sources, quelle fraîcheur, quelle fiabilité, et si la personne qui demande a le droit d’y accéder. Elle va plus loin que la récupération en ajoutant gouvernance, budget de tokens et explication de chaque choix.",
      },
      {
        q: "L’ingénierie du contexte remplace-t-elle le RAG ?",
        a: "Non. La récupération y reste une étape. L’ingénierie du contexte ajoute ce qui lui manque : cycle de vie de la mémoire, gestion des conflits, habilitations, budget et traçabilité. Un système peut utiliser un excellent RAG et donner pourtant à un agent un passage périmé ou interdit.",
      },
      {
        q: "Comment évaluer un RAG ou une chaîne de contexte ?",
        a: "Il faut mesurer la chaîne, pas seulement le texte final. Sur la plateforme de la DILA, nous suivions la fidélité, la pertinence des réponses, la précision et le rappel du contexte, afin d’attribuer un échec à la récupération ou à la génération. Des scénarios privés et nouveaux aident à détecter le surapprentissage.",
      },
      {
        q: "ORBIT est-il prêt pour la production ?",
        a: "Non. ORBIT est une bêta publique, non validée pour un usage en production. C’est une référence fonctionnelle pour la mémoire gouvernée, la provenance, les codes de raison, les habilitations et les budgets de tokens, et une bonne base pour apprendre et pour adapter avec une revue sérieuse.",
      },
      {
        q: "Quelle place pour MCP ?",
        a: "MCP est une manière standard de connecter des agents à des outils et à des données. ORBIT propose des connecteurs pour des outils comme Confluence, Jira et Microsoft 365, et expose son propre serveur MCP : tout agent compatible peut ainsi demander un contexte assemblé et gouverné.",
      },
    ],
  },
  ar: {
    title: "هندسة السياق: ما بعد RAG التقليدي",
    dek: "يجد الاسترجاع نصًا. وتقرر هندسة السياق ما ينبغي أن يعرفه الوكيل، ومن أين، ولمن، ولكم من الوقت.",
    answer:
      "هندسة السياق (Context Engineering) هي الممارسة التي تحدد ما ينبغي أن يعرفه وكيل الذكاء الاصطناعي لمهمة بعينها: أي المصادر، وبأي حداثة، وبأي موثوقية، وهل يحق للقارئ الاطلاع عليها. أما RAG التقليدي فيكتفي باسترجاع المقاطع الأقرب إلى السؤال، بينما تضبط هندسة السياق السياق كله وترتّبه وتحدد ميزانيته وتشرحه.",
    sections: [
      {
        h: "ما هي هندسة السياق؟",
        p: [
          "يجيب كل وكيل انطلاقًا من السياق الذي يُعطى له. وهندسة السياق هي العمل على إعداد هذا السياق عن قصد، بدل الأمل في أن يعيد البحث بالتشابه المقاطع الصحيحة.",
          "وهي تشمل مصدر المعلومة ومدة صلاحيتها ومن يحق له قراءتها وما يتسع له منها في نافذة النموذج.",
          "وأهمية هذا التمييز أن كلفة السياق الخاطئ ليست جملة رديئة. ففي المؤسسة قد تكون قرارًا اتُّخذ بناءً على متطلب لم يعد قائمًا، أو رقمًا سريًا عُرض على الشخص الخطأ، أو وكيلًا يناقض زميلًا بثقة. وهذه الأخطاء لا تظهر في العرض التجريبي وتكلّف كثيرًا في التشغيل، ولذلك أعدّ السياق مكونًا يستحق التصميم والمسؤولية والاختبار.",
        ],
      },
      {
        h: "ما الفرق بينها وبين RAG التقليدي؟",
        p: [
          "يقدّم RAG التقليدي جوابًا جيدًا لمشكلة ضيقة: إيجاد نص مرتبط بسؤال وترك النموذج يكتب اعتمادًا عليه. أما هندسة السياق فتنطلق من سؤال مختلف: ماذا يحتاج هذا الوكيل أن يعرف لينجز هذه المهمة بأمان؟",
          "لا أدعو إلى التخلي عن الاسترجاع. فالبحث الهجين والتقطيع المعقول وإعادة الترتيب تبقى هي الأساس، وعمل DILA يبيّن مقدار العناية الهندسية التي تستحقها. لكن الاسترجاع ضروري وغير كافٍ متى صار الوكلاء يعملون نيابة عن أشخاص، على وثائق تتغير وتتفاوت في درجة سريتها.",
          "يقارن الجدول التالي بين النهجين وفق المعايير التي تحدد إمكانية الوثوق بوكيل داخل مؤسسة.",
        ],
        table: {
          head: ["المعيار", "RAG التقليدي", "هندسة السياق"],
          rows: [
            ["الحداثة", "ما فُهرس فقط، دون مفهوم للقرار المُستبدَل", "تُخفَّض رتبة العناصر المُستبدَلة أو القديمة أو تُستبعد"],
            ["التعارضات", "يصل المقطعان المتناقضان معًا إلى النموذج", "تُكتشف التناقضات ويُفصَل فيها قبل التجميع"],
            ["الصلاحيات", "تُطبَّق غالبًا على الفهرس وقلّما على كل إجابة", "تُفحص لكل قارئ ولكل عنصر لحظة التجميع"],
            ["الذاكرة", "بلا حالة: كل سؤال يبدأ من الصفر", "ذاكرة خاضعة للحوكمة بدورة حياة وإصدارات ومسؤول"],
            ["الميزانية", "أفضل النتائج حتى تمتلئ النافذة", "ميزانية رموز صريحة مع انتقاء وضغط"],
            ["قابلية التتبع", "قائمة بالمقاطع المسترجعة", "رمز سبب لكل عنصر محتفَظ به أو مستبعَد، وصولًا إلى فقرة المصدر"],
            ["التقييم", "يُحكم عليه من خلال الإجابة النهائية", "يُحكم على السياق نفسه ثم على الإجابة"],
          ],
        },
      },
      {
        h: "لماذا يفشل الوكلاء حتى عندما ينجح الاسترجاع؟",
        p: [
          "في تجربتي قلّما يفشل الوكلاء لغياب نموذج أفضل. إنهم يفشلون في أربع حالات لا يراها البحث بالتشابه:",
          "وكل حالة منها مشكلة حوكمة لا مشكلة ترتيب. فنموذج تضمين أفضل يحسّن قرب المقطع من السؤال، لكنه لا يعرف أن قرارًا أُلغي، ولا أن السائل متدرّب. هذه المعرفة تقيم في دورة حياة البيانات وفي نموذج الوصول، فيجب نمذجتها صراحةً وتطبيقها لحظة التجميع.",
        ],
        list: [
          "استُبدل قرار في الشهر الماضي، لكن الوثيقة القديمة ما زالت الأقرب إلى السؤال.",
          "تتناقض نسختان من مواصفة، وتصل كلتاهما إلى الموجّه.",
          "قيد ما، مثل متطلب إمكانية الوصول، موجود في وثيقة لم تُسترجع قط.",
          "القارئ غير مخوَّل برؤية وثيقة، ومع ذلك استُرجعت لأنها وثيقة الصلة.",
        ],
      },
      {
        h: "كيف يبدو عنصر الذاكرة الخاضع للحوكمة؟",
        p: [
          "تتعامل ORBIT، المنصة التي بنيتها لاستكشاف هذا الموضوع، مع القرارات والاحتياجات والقيود والمخاطر والتفضيلات بوصفها عناصر ذاكرة لا مقاطع متفرقة. ويحمل كل عنصر إصدارات ومصدرًا موثّقًا حتى فقرة المصدر.",
          "دورة الحياة هي ما يجعل الذاكرة قابلة للحوكمة. فالعنصر لا يُخزَّن فحسب، بل يُقترح ثم يُراجَع ثم يُستبدَل أو يُنسى في النهاية.",
          "وبهذا يصبح سؤال «ما القرار المعمول به اليوم؟» سؤالًا له جواب محدد وموثّق، بدل أن يُستخرج كل مرة من نصوص متناثرة قد يناقض بعضها بعضًا. كما تظل الحالات القديمة محفوظة في السجل، فيمكن الرجوع إلى سبب تغيّر القرار عند المراجعة أو التدقيق.",
        ],
        table: {
          head: ["الحالة", "المعنى", "الأثر في السياق المُجمَّع"],
          rows: [
            ["مقترح", "مستخرج من مصدر ولم يُراجَع بعد", "يُستبعد أو يُشار إليه إلى أن يراجعه إنسان"],
            ["مُصادَق عليه", "مؤكَّد بوصفه قرارًا أو قيدًا أو خطرًا", "مؤهَّل للسياق ومرتَّب بحسب الصلة والحداثة"],
            ["مُستبدَل", "حلّ محله عنصر أحدث", "يُستبعد مع تسجيل السبب"],
            ["قديم", "لم يعد صحيحًا أو مفيدًا", "يُستبعد ويبقى ظاهرًا في السجل"],
            ["منسي", "أُزيل عن قصد", "لا يُقدَّم مرة أخرى"],
          ],
        },
      },
      {
        h: "كيف يُجمَّع السياق لمهمة واحدة؟",
        p: [
          "تجمّع ORBIT السياق لكل مهمة لا لكل سؤال. تُستوعَب المصادر أولًا مع كشف البيانات الشخصية وحجبها، ثم تُفهرس للبحث الهجين. وعند الطلب يتبع التجميع تسلسلًا ثابتًا. وأحرص على أن يبقى قابلًا للشرح: فإذا قدّم الوكيل إجابة مفاجئة أمكنك فتح السياق الذي تلقّاه وقراءة سبب وجود كل عنصر فيه أو استبعاده، بدل التخمين اعتمادًا على درجة تشابه.",
        ],
        list: [
          "فهم نية المهمة وهوية الطالب.",
          "البحث في الذاكرة والوثائق ثم دمج النتائج المرتَّبة.",
          "تطبيق الحداثة وحل التعارضات وإزالة التكرار.",
          "تطبيق الصلاحيات والتصنيف حتى لا يتلقى القارئ ما لا يحق له رؤيته.",
          "الانتقاء ضمن ميزانية الرموز وضغط ما تبقى.",
          "إرجاع السياق مع رمز سبب لكل عنصر محتفَظ به أو مستبعَد.",
        ],
      },
      {
        h: "كيف تُقاس جودة السياق؟",
        p: [
          "السياق الذي لا تقيسه لا يمكنك تحسينه. صُممت ORBIT لتسجّل زمن الاستجابة والرموز والكلفة المقدّرة والاستبعادات حسب السبب والمصادر الأكثر فائدة، ولتصدّر التتبعات للتقييم، فيمكن إعادة تشغيل أي إخفاق وفحصه بدل الاكتفاء بالانطباع. وتتيح اللقطات المُرقَّمة (snapshots) لعدة وكلاء مشاركة السياق نفسه ومقارنته عبر الزمن.",
          "ORBIT نسخة تجريبية عامة وغير مُصادَق عليها للاستخدام في الإنتاج. وتجد النتائج المقيسة لـ Nova Context في صفحة NOVA. أما الأرقام التالية فمصدرها منصة DILA التابعة لمصالح رئيس الوزراء: قيست سلسلة الاسترجاع بأمانة 0.94 وملاءمة إجابات 0.91 ودقة سياق 0.89 واسترجاع سياق 0.92، مع تغطية 85% من سيناريوهات RAG ذات الأولوية.",
          "وأسهم العمل نفسه على المسارات في خفض كلفة كل طلب ذكاء اصطناعي بنسبة 30%، وخفضت المكونات القابلة لإعادة الاستخدام زمن تسليم تطبيق RAG من 10 أسابيع إلى 4. وهذه النتائج مصدرها هندسة السلسلة المحيطة بالنموذج، وهي حجة هذا المقال نفسها. فلم يأتِ التحسن من استبدال النموذج، بل من تقييم كل حلقة في السلسلة وإعادة استخدام المكونات المشتركة وضبط ما يصل فعلًا إلى النموذج.",
        ],
      },
      {
        h: "هل يمكن لعدة وكلاء مشاركة السياق نفسه، وأين يتوقف هذا النهج؟",
        p: [
          "تتيح اللقطات المُرقَّمة لعدة وكلاء العمل من السياق المُجمَّع نفسه ومقارنته بسياق لاحق، فيُردّ أي خلاف بين وكيلين إلى فرق في ما تلقّاه كل منهما. وتذكر كل لقطة تصنيف ما تسلّمه، ويمكن الوصول إلى ORBIT عبر واجهة REST وخادم MCP.",
          "وللنهج حدوده. فالذاكرة الخاضعة للحوكمة تكلّف جهد مراجعة، ولا بد من شخص يفصل في التناقضات، والاستخراج بنموذج لغوي اختياري ويحتاج إلى تحقق. كما أنه يعكس خياراتي التصميمية التي جُرّبت على مشروع تجريبي لا في الإنتاج، ولهذا أصف ORBIT بأنها نسخة تجريبية عامة.",
        ],
      },
      {
        h: "من أين تبدأ؟",
        p: [
          "لا حاجة إلى منصة جديدة من اليوم الأول. والترتيب الذي نفعني هو أن تُظهر المشكلات قبل أن تعالجها. وكل خطوة أدناه تُنجز بأدوات بسيطة، ولا تتطلب قرارًا مسبقًا بشأن المنصة أو النموذج.",
          "ومتى صارت هذه الأسئلة مرئية، تبيّن لك أي مصدر يستحق الحوكمة أولًا، وأي سياق يمكن تركه على حاله بلا ضرر.",
        ],
        list: [
          "أحصِ المصادر التي يعتمد عليها الوكيل وعيّن مسؤولًا لكل مصدر.",
          "أضف الصلاحيات والتصنيف إلى مسار الاسترجاع وليس إلى الفهرس وحده.",
          "تتبّع أي القرارات تحلّ محل أخرى، ولو في جدول بسيط.",
          "سجّل ما احتُفظ به وما استُبعد في كل طلب.",
          "قيّم خطوة الاسترجاع على حدة بمعزل عن الإجابة المولَّدة.",
          "اختر سيناريوهات خاصة وجديدة لاكتشاف الإفراط في التحسين.",
        ],
      },
    ],
    take: "ستأتي المكاسب القادمة لوكلاء المؤسسات من السياق لا من نماذج أكبر. أتعامل مع الذاكرة بوصفها بيانات خاضعة للحوكمة: تحتاج إلى مسؤول ودورة حياة وسجل تدقيق، كأي أصل تعتمد عليه الشركة. وإن لم تستطع تفسير سبب وصول عنصر ما إلى الموجّه، فأنت لا تتحكم بوكيلك بعد.",
    diagram: {
      heads: ["RAG التقليدي", "هندسة السياق"],
      nodes: ["سؤال", "استرجاع أفضل النتائج", "توليد"],
      nodes2: ["نية", "اختيار وترتيب", "حل التعارضات", "تطبيق الصلاحيات", "ميزانية الرموز", "شرح وتتبع"],
      caption: "الهدف نفسه والمهمة مختلفة: الاسترجاع يجيب عن سؤال، وهندسة السياق تُعدّ وكيلًا.",
    },
    results: [
      { v: "0.89", l: "دقة السياق (DILA)" },
      { v: "0.92", l: "استرجاع السياق (DILA)" },
      { v: "−30%", l: "من كلفة كل طلب ذكاء اصطناعي، عبر تحسين المسارات وإعادة الاستخدام (DILA)" },
    ],
    faq: [
      {
        q: "ما هي هندسة السياق بعبارات بسيطة؟",
        a: "هي ممارسة تحديد ما ينبغي أن يعرفه وكيل الذكاء الاصطناعي بدقة قبل أن يتصرف: أي المصادر، وبأي حداثة وموثوقية، وهل يحق لمن يطلب الاطلاع عليها. وهي تتجاوز الاسترجاع بإضافة الحوكمة وميزانية الرموز وشرح كل اختيار، فتصبح كل معلومة في الموجّه قابلة للتبرير والمراجعة عند الحاجة.",
      },
      {
        q: "هل تحل هندسة السياق محل RAG؟",
        a: "لا. يبقى الاسترجاع خطوة ضمنها. وتضيف هندسة السياق ما ينقصه: دورة حياة الذاكرة ومعالجة التعارضات والصلاحيات وضبط الميزانية وقابلية التتبع. فقد يستخدم نظام ما RAG ممتازًا ويسلّم الوكيل مع ذلك مقطعًا قديمًا أو ممنوعًا، ولهذا يُنظر إلى الاثنين على أنهما متكاملان.",
      },
      {
        q: "كيف تُقيَّم سلسلة RAG أو سلسلة السياق؟",
        a: "تُقاس السلسلة كلها لا النص النهائي وحده. في منصة DILA تتبعنا الأمانة وملاءمة الإجابات ودقة السياق واسترجاعه، ليُنسب الإخفاق إلى الاسترجاع أو إلى التوليد. وتساعد السيناريوهات الخاصة والجديدة على كشف الإفراط في التحسين، فالنظام المضبوط على اختبارات عامة قد يفشل أمام اختبارات لم يرها من قبل.",
      },
      {
        q: "هل ORBIT جاهزة للإنتاج؟",
        a: "لا. ORBIT نسخة تجريبية عامة وغير مُصادَق عليها للاستخدام في الإنتاج. وهي مرجع عملي للذاكرة الخاضعة للحوكمة والمصدر الموثّق ورموز الأسباب والصلاحيات وميزانيات الرموز، وأساس جيد للتعلم والتكييف بعد مراجعة جدية. ولا ينبغي اعتماد أي مكسب مقيس لها ما لم يُقَس فعليًا في بيئتك.",
      },
      {
        q: "أين يقع MCP في هذا كله؟",
        a: "MCP طريقة معيارية لربط الوكلاء بالأدوات والبيانات. توفر ORBIT موصلات لأدوات مثل Confluence وJira وMicrosoft 365، وتعرض خادم MCP خاصًا بها، فيستطيع أي وكيل متوافق أن يطلب سياقًا مُجمَّعًا وخاضعًا للحوكمة بدل أن يبحث وحده في كل مصدر على حدة.",
      },
    ],
  },
};
