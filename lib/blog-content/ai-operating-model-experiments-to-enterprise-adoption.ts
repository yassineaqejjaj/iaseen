import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "AI Operating Model: From Experiments to Enterprise Adoption",
    dek: "A practical path from isolated proofs of concept to shared platforms, with the governance that makes reuse possible.",
    answer:
      "An AI operating model is the set of shared platforms, rules, evaluation gates and training that lets an organisation run AI repeatedly instead of once. To move from experiments to adoption, build the platform and its governance together, gate releases on evaluation, and train the people who will use it.",
    sections: [
      {
        h: "Why do AI experiments not scale by themselves?",
        p: [
          "A pilot proves that a model can do something. It does not prove that an organisation can run it. Each isolated project rebuilds ingestion, retrieval, evaluation and security, and ends up with its own quality bar.",
          "On the DILA platform, the shift was to stop building each application independently and to assemble standardised, governed components instead.",
          "The cost of skipping that shift is rarely visible in the first project. It appears at the third or fourth, when the same questions about data access, quality and security have been answered differently by every team and nobody can compare the results.",
        ],
      },
      {
        h: "What does an AI operating model actually contain?",
        p: [
          "I describe it as a few layers that depend on each other. None of them is exotic, but organisations tend to fund the first and skip the rest, which is why so many pilots stay pilots.",
        ],
        list: [
          "A shared platform: document processing, retrieval, orchestration, tool integrations and security that teams assemble rather than rebuild.",
          "Governance defined with the platform: who owns a component, who may change it, what data it may touch and what happens when it fails.",
          "Evaluation gates: a fixed set of scenarios and metrics that a release must pass before it reaches users.",
          "Adoption: training, support and a clear path for a new team to ship its first use case.",
          "Ownership: a named team that runs the platform as a product, with a backlog and users, not as a one-off project.",
        ],
      },
      {
        h: "What changes at each maturity stage?",
        p: [
          "The table below is the way I read an organisation's position. It is a working checklist, not a formal standard, and most organisations sit between two rows.",
        ],
        table: {
          head: ["Stage", "What it looks like", "What changes to reach the next one"],
          rows: [
            ["Experiments", "Isolated proofs of concept, each with its own stack and quality bar", "Identify what several projects rebuild and extract it into shared components"],
            ["Shared platform", "Common ingestion, retrieval, orchestration and security, owned by one team", "Agree who may change what, and write the rules down with the platform"],
            ["Governance", "Policies on data, tools and human approval, applied the same way across projects", "Turn the rules into automated checks instead of review meetings"],
            ["Evaluation gates", "A fixed scenario set and metrics that every release must pass", "Feed production findings back into the scenarios, so the gate keeps learning"],
            ["Adoption", "Trained users, supported teams and a repeatable path to a first use case", "Measure usage and quality, then extend autonomy only where evidence allows"],
          ],
        },
      },
      {
        h: "How do you build the platform and its rules together?",
        p: [
          "Shared document processing, retrieval, evaluation and security capabilities are only reused if teams trust them. That trust comes from governance defined with the platform, not added after it. If rules arrive later, every team has already made its own choices, and the platform becomes one more option rather than the default.",
          "Agentic applications can then build on existing orchestration patterns and tool integrations instead of reinventing them. The DILA programme is a good public example of the payoff: delivery time of a RAG application fell by 60%, from 10 weeks to 4, and 75% of common technical capabilities were reused. The team behind it was nine people, which is the point: a small team can only serve many projects if the components are shared.",
        ],
      },
      {
        h: "What did we measure on the DILA platform?",
        p: [
          "DILA is a public-sector organisation attached to the services of the Prime Minister. The figures below come from the published case study, and I give them as reported, without extrapolating to other contexts.",
        ],
        list: [
          "Content creation became 70% faster.",
          "Delivery time of a RAG application dropped by 60%, from 10 weeks to 4.",
          "75% of common technical capabilities were reused across applications.",
          "Cost per AI request fell by 30%, through optimisation and reuse.",
          "Prototyping implementation time for agentic workflows fell by 50%.",
          "The RAG chain scored 0.94 on faithfulness, 0.91 on answer relevancy, 0.89 on context precision and 0.92 on context recall, with 85% of priority RAG scenarios covered.",
        ],
      },
      {
        h: "Why is adoption a people problem?",
        p: [
          "A platform nobody can use is a cost. Training belongs to the operating model: at Devoteam, the LEAP programme, run by a team of five, trained 1,500+ professionals in generative AI, agentic AI and RAG, and NOVA reached 800 employees across a group of 10,000+ consultants in 25 countries.",
          "I saw the same pattern on the transformation side at Decathlon, where a programme with a budget of €4M and a team of 13 people reported 2.6x productivity gains from augmented teams. The lesson I take from both is that the tooling is rarely the bottleneck. People adopt what they were shown how to use, and what they trust.",
        ],
      },
      {
        h: "What are the most common mistakes when scaling AI?",
        p: [
          "Most failures I see are organisational, not technical. They repeat across sectors, and they are cheap to avoid if you name them early rather than discovering them after the third pilot has stalled.",
        ],
        list: [
          "Funding use cases but not the platform, so every team pays the same setup cost again and again.",
          "Writing governance as a document that nobody can execute, instead of checks that run automatically in the delivery pipeline.",
          "Judging a release on a demo, when only a fixed scenario set shows whether a change is an improvement or a regression.",
          "Treating training as a launch event, when people need support and examples long after the first workshop.",
          "Giving agents wide permissions on day one, instead of letting autonomy grow with the evidence that the checks catch problems.",
        ],
      },
      {
        h: "How do you govern agents that act, not only answer?",
        p: [
          "For agents that act, the same logic applies to control. An agent that can call tools needs limits that are checked every time, not only at design time. TrustRail, a public repository, explores policies, human approvals and signed receipts: for each protected operation it records which agent asked, who authorised it, what limits applied and what evidence supports the outcome. It runs on synthetic sandboxes, so it is a design study, not a production claim.",
          "The agentic-sdlc framework applies the same idea to coding agents, under the name earned autonomy: an agent gets more freedom where automated checks can prove its work, and loses it where they cannot. It is a working framework that has not been validated by an independent study, and I present it as such.",
        ],
      },
    ],
    take: "The operating model is the product. Ownership, evaluation gates and training decide adoption far more than any architecture choice. If I had to fund only one thing first, I would fund the evaluation gate, because it is what lets everyone else trust the platform.",
    diagram: {
      nodes: ["Experiments", "Shared platform", "Governance", "Evaluation gates", "Adoption"],
      caption: "Each step makes the next one cheaper: reuse needs trust, and trust needs rules.",
    },
    results: [
      { v: "−60%", l: "RAG application delivery time, from 10 weeks to 4 (DILA)" },
      { v: "75%", l: "of common technical capabilities reused (DILA)" },
      { v: "−30%", l: "cost per AI request, through optimisation and reuse (DILA)" },
      { v: "1,500+", l: "professionals trained (LEAP)" },
    ],
    faq: [
      {
        q: "What is an AI operating model?",
        a: "It is the combination of shared platforms, governance rules, evaluation gates, ownership and training that lets an organisation deliver AI use cases repeatedly. It answers who builds, who approves, how quality is checked and how people learn to use the result, rather than focusing on a single model or tool.",
      },
      {
        q: "Why do most AI pilots never reach production?",
        a: "Because a pilot proves a capability, not an operating capacity. Teams rebuild ingestion, retrieval, evaluation and security each time, quality varies, and nobody owns the run. Without shared components, governance and a release gate, moving from demo to service stays expensive and risky.",
      },
      {
        q: "Should the platform or the governance come first?",
        a: "Build them together. Governance added after the platform arrives when teams have already made their own choices, so the platform is optional. Rules defined alongside shared components give teams a reason to trust and reuse them, which is where the time and cost savings come from.",
      },
      {
        q: "How do you measure whether an AI operating model works?",
        a: "Look at reuse, delivery time, cost per request and quality scores on a fixed scenario set, then at adoption through trained users and active teams. On the DILA platform, delivery time fell by 60% and 75% of common capabilities were reused. Report such figures with their context.",
      },
      {
        q: "Where do AI agents fit in the operating model?",
        a: "They need the same foundations plus tighter control, because they act. Policies, human approval for risky operations, traceable records and autonomy granted by evidence belong in the operating model from the start. TrustRail and agentic-sdlc explore this in public, as designs and working frameworks rather than validated products.",
      },
    ],
  },
  fr: {
    title: "Modèle opérationnel IA : des expérimentations à l’adoption en entreprise",
    dek: "Un chemin concret des preuves de concept isolées vers des plateformes partagées, avec la gouvernance qui rend la réutilisation possible.",
    answer:
      "Un modèle opérationnel IA regroupe les plateformes partagées, les règles, les contrôles d’évaluation et la formation qui permettent à une organisation d’exploiter l’IA de façon répétable plutôt qu’une seule fois. Pour passer des expérimentations à l’adoption, construisez la plateforme et sa gouvernance ensemble, conditionnez les mises en production à l’évaluation et formez les utilisateurs.",
    sections: [
      {
        h: "Pourquoi les expérimentations IA ne passent-elles pas à l’échelle ?",
        p: [
          "Un pilote prouve qu’un modèle sait faire quelque chose. Il ne prouve pas qu’une organisation sait l’exploiter. Chaque projet isolé reconstruit l’ingestion, la récupération, l’évaluation et la sécurité, et finit avec son propre niveau de qualité.",
          "Sur la plateforme de la DILA, le changement a été d’arrêter de construire chaque application indépendamment pour assembler des composants standardisés et gouvernés.",
        ],
      },
      {
        h: "Que contient concrètement un modèle opérationnel IA ?",
        p: [
          "Je le décris comme un empilement de couches qui dépendent les unes des autres. Aucune n’est exotique, mais les organisations financent souvent la première et sautent les autres, ce qui explique pourquoi tant de pilotes restent des pilotes.",
        ],
        list: [
          "Une plateforme partagée : traitement de documents, récupération, orchestration, intégrations d’outils et sécurité que les équipes assemblent au lieu de les reconstruire.",
          "Une gouvernance définie avec la plateforme : qui est responsable d’un composant, qui peut le modifier, quelles données il peut toucher et ce qui se passe en cas de défaillance.",
          "Des contrôles d’évaluation : un jeu fixe de scénarios et de métriques qu’une version doit réussir avant d’atteindre les utilisateurs.",
          "L’adoption : formation, accompagnement et parcours clair pour qu’une nouvelle équipe livre son premier cas d’usage.",
          "Une responsabilité claire : une équipe identifiée qui exploite la plateforme comme un produit, avec un backlog et des utilisateurs, et non comme un projet ponctuel.",
        ],
      },
      {
        h: "Que change-t-on à chaque étape de maturité ?",
        p: [
          "Le tableau ci-dessous est ma grille de lecture pour situer une organisation. C’est une liste de contrôle de travail, pas une norme, et la plupart des organisations se trouvent entre deux lignes.",
        ],
        table: {
          head: ["Étape", "À quoi elle ressemble", "Ce qui change pour passer à la suivante"],
          rows: [
            ["Expérimentations", "Preuves de concept isolées, chacune avec sa pile technique et son niveau de qualité", "Repérer ce que plusieurs projets reconstruisent et l’extraire en composants partagés"],
            ["Plateforme partagée", "Ingestion, récupération, orchestration et sécurité communes, portées par une seule équipe", "Décider qui peut modifier quoi et écrire les règles en même temps que la plateforme"],
            ["Gouvernance", "Politiques sur les données, les outils et la validation humaine, appliquées de la même façon à tous les projets", "Transformer les règles en contrôles automatisés plutôt qu’en comités de revue"],
            ["Contrôles d’évaluation", "Un jeu fixe de scénarios et de métriques que chaque version doit réussir", "Réinjecter les constats de production dans les scénarios pour que le contrôle continue d’apprendre"],
            ["Adoption", "Utilisateurs formés, équipes accompagnées et parcours répétable vers un premier cas d’usage", "Mesurer l’usage et la qualité, puis étendre l’autonomie uniquement là où les preuves le permettent"],
          ],
        },
      },
      {
        h: "Comment construire la plateforme et ses règles ensemble ?",
        p: [
          "Les capacités partagées de traitement de documents, de récupération, d’évaluation et de sécurité ne sont réutilisées que si les équipes leur font confiance. Cette confiance vient d’une gouvernance définie avec la plateforme, pas ajoutée après. Si les règles arrivent plus tard, chaque équipe a déjà fait ses propres choix et la plateforme devient une option de plus plutôt que la voie par défaut.",
          "Les applications agentiques peuvent alors s’appuyer sur des modèles d’orchestration et des intégrations d’outils existants au lieu de les réinventer. Le programme DILA illustre bien le gain : le délai de livraison d’une application RAG a baissé de 60 %, de 10 semaines à 4, et 75 % des capacités techniques communes ont été réutilisées. L’équipe derrière ce résultat comptait neuf personnes, et c’est le point essentiel : une petite équipe ne peut servir de nombreux projets que si les composants sont partagés.",
        ],
      },
      {
        h: "Quels résultats mesure-t-on sur la plateforme de la DILA ?",
        p: [
          "La DILA est une administration rattachée aux services du Premier ministre. Les chiffres ci-dessous proviennent de l’étude de cas publiée et je les donne tels que rapportés, sans les extrapoler à d’autres contextes.",
        ],
        list: [
          "La création de contenu est devenue 70 % plus rapide.",
          "Le délai de livraison d’une application RAG a baissé de 60 %, de 10 semaines à 4.",
          "75 % des capacités techniques communes ont été réutilisées d’une application à l’autre.",
          "Le coût par requête d’IA a baissé de 30 %, grâce à l’optimisation et à la réutilisation.",
          "Le temps de mise en œuvre de prototypes de workflows agentiques a baissé de 50 %.",
          "La chaîne RAG obtient 0,94 en fidélité, 0,91 en pertinence des réponses, 0,89 en précision du contexte et 0,92 en rappel du contexte, avec 85 % des scénarios RAG prioritaires couverts.",
        ],
      },
      {
        h: "Pourquoi l’adoption est-elle une question de personnes ?",
        p: [
          "Une plateforme que personne ne sait utiliser est un coût. La formation fait partie du modèle opérationnel : chez Devoteam, le programme LEAP, porté par une équipe de cinq personnes, a formé plus de 1 500 professionnels à l’IA générative, à l’IA agentique et au RAG, et NOVA a atteint 800 collaborateurs dans un groupe de plus de 10 000 consultants présents dans 25 pays.",
          "J’ai observé le même schéma côté transformation chez Decathlon, où un programme doté de 4 M€ et mobilisant 13 personnes a rapporté des gains de productivité de 2,6x grâce à des équipes augmentées. J’en retiens que l’outillage est rarement le goulot d’étranglement. Les gens adoptent ce qu’on leur a montré comment utiliser, et ce en quoi ils ont confiance.",
        ],
      },
      {
        h: "Quelles sont les erreurs les plus fréquentes pour passer à l’échelle ?",
        p: [
          "La plupart des échecs que je vois sont organisationnels, pas techniques. Ils se répètent d’un secteur à l’autre et coûtent peu à éviter si on les nomme tôt, plutôt que de les découvrir quand le troisième pilote est à l’arrêt.",
        ],
        list: [
          "Financer des cas d’usage mais pas la plateforme, si bien que chaque équipe paie encore et encore le même coût de démarrage.",
          "Écrire la gouvernance comme un document que personne ne peut exécuter, au lieu de contrôles qui s’exécutent automatiquement dans la chaîne de livraison.",
          "Juger une version sur une démonstration, alors que seul un jeu fixe de scénarios montre si un changement est une amélioration ou une régression.",
          "Traiter la formation comme un événement de lancement, alors que les gens ont besoin d’accompagnement et d’exemples bien après le premier atelier.",
          "Donner des permissions larges aux agents dès le premier jour, au lieu de laisser l’autonomie croître avec la preuve que les contrôles détectent les problèmes.",
        ],
      },
      {
        h: "Comment gouverner des agents qui agissent, et pas seulement répondent ?",
        p: [
          "Pour des agents qui agissent, la même logique s’applique au contrôle. Un agent qui peut appeler des outils a besoin de limites vérifiées à chaque appel, pas seulement à la conception. TrustRail, un dépôt public, explore des politiques, des validations humaines et des reçus signés : pour chaque opération protégée, il enregistre quel agent l’a demandée, qui l’a autorisée, quelles limites s’appliquaient et quelles preuves soutiennent le résultat. Il fonctionne sur des bacs à sable synthétiques, c’est donc une étude de conception et non une affirmation d’usage en production.",
          "Le cadre agentic-sdlc applique la même idée aux agents de code, sous le nom d’autonomie méritée : un agent gagne en liberté là où des contrôles automatisés peuvent prouver son travail, et la perd là où ils ne le peuvent pas. C’est un cadre de travail qui n’a pas été validé par une étude indépendante, et je le présente comme tel.",
        ],
      },
    ],
    take: "Le modèle opérationnel est le produit. Les responsabilités, les points de contrôle d’évaluation et la formation décident de l’adoption bien plus que n’importe quel choix d’architecture. Si je ne devais financer qu’une seule chose en premier, ce serait le contrôle d’évaluation, car c’est lui qui permet à tous les autres de faire confiance à la plateforme.",
    diagram: {
      nodes: ["Expérimentations", "Plateforme partagée", "Gouvernance", "Contrôles d’évaluation", "Adoption"],
      caption: "Chaque étape rend la suivante moins coûteuse : la réutilisation demande de la confiance, et la confiance demande des règles.",
    },
    results: [
      { v: "−60 %", l: "de délai de livraison d’une application RAG, de 10 à 4 semaines (DILA)" },
      { v: "75 %", l: "des capacités techniques communes réutilisées (DILA)" },
      { v: "−30 %", l: "de coût par requête d’IA, grâce à l’optimisation et à la réutilisation (DILA)" },
      { v: "1 500+", l: "professionnels formés (LEAP)" },
    ],
    faq: [
      {
        q: "Qu’est-ce qu’un modèle opérationnel IA ?",
        a: "C’est l’ensemble des plateformes partagées, des règles de gouvernance, des contrôles d’évaluation, des responsabilités et de la formation qui permet à une organisation de livrer des cas d’usage IA de façon répétée. Il répond à qui construit, qui valide, comment la qualité est vérifiée et comment les gens apprennent à utiliser le résultat.",
      },
      {
        q: "Pourquoi la plupart des pilotes IA n’arrivent-ils jamais en production ?",
        a: "Parce qu’un pilote prouve une capacité, pas une aptitude à exploiter. Les équipes reconstruisent à chaque fois l’ingestion, la récupération, l’évaluation et la sécurité, la qualité varie et personne ne porte l’exploitation. Sans composants partagés, gouvernance et contrôle de version, passer de la démo au service reste coûteux et risqué.",
      },
      {
        q: "Faut-il commencer par la plateforme ou par la gouvernance ?",
        a: "Les deux ensemble. Une gouvernance ajoutée après la plateforme arrive quand les équipes ont déjà fait leurs propres choix, et la plateforme devient facultative. Des règles définies avec les composants partagés donnent une raison de leur faire confiance et de les réutiliser, ce qui produit les gains de temps et de coût.",
      },
      {
        q: "Comment mesurer l’efficacité d’un modèle opérationnel IA ?",
        a: "Observez la réutilisation, le délai de livraison, le coût par requête et les scores de qualité sur un jeu fixe de scénarios, puis l’adoption via les utilisateurs formés et les équipes actives. Sur la plateforme de la DILA, le délai a baissé de 60 % et 75 % des capacités communes ont été réutilisées. Donnez toujours le contexte de ces chiffres.",
      },
      {
        q: "Où se placent les agents IA dans le modèle opérationnel ?",
        a: "Ils demandent les mêmes fondations avec un contrôle plus strict, car ils agissent. Politiques, validation humaine des opérations à risque, traçabilité et autonomie accordée sur preuves doivent être prévues dès le départ. TrustRail et agentic-sdlc explorent ce sujet en public, comme des conceptions et des cadres de travail, pas des produits validés.",
      },
    ],
  },
  ar: {
    title: "نموذج تشغيل الذكاء الاصطناعي: من التجارب إلى التبنّي المؤسسي",
    dek: "مسار عملي من إثباتات المفهوم المعزولة إلى منصات مشتركة، مع الحوكمة التي تتيح إعادة الاستخدام.",
    answer:
      "نموذج تشغيل الذكاء الاصطناعي هو مجموعة المنصات المشتركة والقواعد وبوابات التقييم والتدريب التي تمكّن المؤسسة من تشغيل الذكاء الاصطناعي بصورة متكررة لا مرة واحدة. وللانتقال من التجارب إلى التبنّي ابنِ المنصة وحوكمتها معًا، واشترط اجتياز التقييم قبل كل إصدار، ودرّب المستخدمين.",
    sections: [
      {
        h: "لماذا لا تتوسع تجارب الذكاء الاصطناعي من تلقاء نفسها؟",
        p: [
          "يثبت المشروع التجريبي أن نموذجًا قادر على فعل شيء ما، لكنه لا يثبت أن مؤسسة قادرة على تشغيله. فكل مشروع معزول يعيد بناء الاستيعاب والاسترجاع والتقييم والأمن، وينتهي بمعيار جودة خاص به.",
          "في منصة DILA كان التحول بالتوقف عن بناء كل تطبيق على حدة وتجميع مكوّنات موحّدة وخاضعة للحوكمة بدلًا من ذلك.",
          "ونادرًا ما تظهر كلفة تجاهل هذا التحول في المشروع الأول. إنها تظهر في المشروع الثالث أو الرابع، حين تكون كل فرقة قد أجابت عن أسئلة الوصول إلى البيانات والجودة والأمن بطريقة مختلفة، ولا يستطيع أحد مقارنة النتائج.",
        ],
      },
      {
        h: "ما الذي يتضمنه نموذج تشغيل الذكاء الاصطناعي فعليًا؟",
        p: [
          "أصفه بطبقات يعتمد بعضها على بعض، فلا تعمل إحداها جيدًا دون الأخرى. ليست أيٌّ منها غريبة، لكن المؤسسات كثيرًا ما تموّل الأولى وتتجاوز الباقي، وهذا ما يفسر بقاء كثير من المشاريع التجريبية تجريبية، مهما بلغت جودة النموذج المستخدم فيها.",
        ],
        list: [
          "منصة مشتركة: معالجة الوثائق والاسترجاع والتنسيق وتكاملات الأدوات والأمن، تجمّعها الفرق بدل أن تعيد بناءها.",
          "حوكمة تُحدَّد مع المنصة: من يملك المكوّن، ومن يحق له تعديله، وما البيانات التي يجوز له لمسها، وماذا يحدث عند الإخفاق.",
          "بوابات تقييم: مجموعة ثابتة من السيناريوهات والمقاييس يجب أن يجتازها كل إصدار قبل وصوله إلى المستخدمين.",
          "التبنّي: تدريب ودعم ومسار واضح يتيح لفريق جديد تسليم أول حالة استخدام.",
          "الملكية: فريق محدد يدير المنصة كمنتج له قائمة أعمال ومستخدمون، لا كمشروع لمرة واحدة.",
        ],
      },
      {
        h: "ما الذي يتغير في كل مرحلة من مراحل النضج؟",
        p: [
          "الجدول التالي هو الطريقة التي أقرأ بها موقع المؤسسة. هو قائمة تحقق عملية وليس معيارًا رسميًا، وأغلب المؤسسات تقع بين صفّين. والفائدة منه ليست في تصنيف المؤسسة، بل في تحديد الخطوة التالية الأقل كلفة والأكثر أثرًا، وفي الاتفاق عليها بين الفرق التقنية والإدارة.",
        ],
        table: {
          head: ["المرحلة", "كيف تبدو", "ما الذي يتغير للانتقال إلى التي تليها"],
          rows: [
            ["تجارب", "إثباتات مفهوم معزولة، لكلٍّ منها بنيتها ومعيار جودتها", "تحديد ما تعيد عدة مشاريع بناءه واستخراجه في مكوّنات مشتركة"],
            ["منصة مشتركة", "استيعاب واسترجاع وتنسيق وأمن مشتركة يملكها فريق واحد", "الاتفاق على من يعدّل ماذا، وكتابة القواعد مع المنصة"],
            ["حوكمة", "سياسات للبيانات والأدوات والموافقة البشرية تُطبَّق بالطريقة نفسها على كل المشاريع", "تحويل القواعد إلى فحوص آلية بدل اجتماعات المراجعة"],
            ["بوابات التقييم", "مجموعة ثابتة من السيناريوهات والمقاييس يجب أن يجتازها كل إصدار", "إعادة نتائج الإنتاج إلى السيناريوهات كي تستمر البوابة في التعلم"],
            ["تبنٍّ", "مستخدمون مدرَّبون وفرق مدعومة ومسار متكرر نحو أول حالة استخدام", "قياس الاستخدام والجودة، ثم توسيع الاستقلالية حيث تسمح الأدلة فقط"],
          ],
        },
      },
      {
        h: "كيف تبني المنصة وقواعدها معًا؟",
        p: [
          "لا تُعاد استخدام القدرات المشتركة في معالجة الوثائق والاسترجاع والتقييم والأمن إلا إذا وثقت بها الفرق. وتأتي الثقة من حوكمة تُحدَّد مع المنصة لا بعدها. فإذا تأخرت القواعد، تكون كل فرقة قد اتخذت خياراتها، وتصبح المنصة خيارًا إضافيًا لا المسار الافتراضي.",
          "عندئذ تستطيع التطبيقات الوكيلة البناء على أنماط تنسيق وتكاملات أدوات قائمة بدل إعادة اختراعها. ويقدّم برنامج DILA مثالًا عامًا جيدًا على العائد: انخفض زمن تسليم تطبيق RAG بنسبة 60%، من 10 أسابيع إلى 4، وأُعيد استخدام 75% من القدرات التقنية المشتركة. وكان الفريق المنفّذ من تسعة أشخاص، وهذا بيت القصيد: لا يستطيع فريق صغير خدمة مشاريع كثيرة إلا إذا كانت المكوّنات مشتركة. وبهذا تتحول إعادة الاستخدام من شعار إلى قرار تنظيمي له مالك وميزانية وقواعد واضحة.",
        ],
      },
      {
        h: "ماذا قسنا في منصة DILA؟",
        p: [
          "DILA جهة عامة تتبع مصالح رئيس الوزراء. الأرقام التالية مأخوذة من دراسة الحالة المنشورة، وأوردها كما وردت دون تعميمها على سياقات أخرى. ويجدر الانتباه إلى أنها تجمع بين مؤشرات السرعة والكلفة وإعادة الاستخدام ومؤشرات جودة الاسترجاع، فالتسريع وحده لا يكفي إن لم تُقِس الجودة بالصرامة نفسها.",
        ],
        list: [
          "أصبح إنشاء المحتوى أسرع بنسبة 70%.",
          "انخفض زمن تسليم تطبيق RAG بنسبة 60%، من 10 أسابيع إلى 4.",
          "أُعيد استخدام 75% من القدرات التقنية المشتركة بين التطبيقات.",
          "انخفضت كلفة كل طلب ذكاء اصطناعي بنسبة 30% عبر التحسين وإعادة الاستخدام.",
          "انخفض زمن تنفيذ النماذج الأولية لمسارات العمل الوكيلة بنسبة 50%.",
          "سجّلت سلسلة RAG نتيجة 0.94 في الأمانة، و0.91 في ملاءمة الإجابة، و0.89 في دقة السياق، و0.92 في استرجاع السياق، مع تغطية 85% من سيناريوهات RAG ذات الأولوية.",
        ],
      },
      {
        h: "لماذا يُعدّ التبنّي مسألة بشر؟",
        p: [
          "المنصة التي لا يعرف أحد استخدامها كلفة. والتدريب جزء من نموذج التشغيل: في Devoteam درّب برنامج LEAP، الذي يقوده فريق من خمسة أشخاص، أكثر من 1,500 متخصص على الذكاء الاصطناعي التوليدي والوكيل وRAG، ووصلت NOVA إلى 800 موظف في مجموعة تضم أكثر من 10,000 مستشار في 25 دولة.",
          "لاحظت النمط نفسه في جانب التحول لدى Decathlon، حيث أفاد برنامج بميزانية 4 ملايين يورو وفريق من 13 شخصًا بمكاسب إنتاجية قدرها 2.6 ضعف بفضل الفرق المعزَّزة. والدرس الذي أخرج به أن الأدوات نادرًا ما تكون العائق. يتبنّى الناس ما عُرض عليهم كيفية استخدامه وما يثقون به. ولهذا أدرج التدريب والدعم في خطة المنصة منذ البداية، وأعامل المستخدمين الأوائل كشركاء يغذّون قائمة الأعمال بملاحظاتهم.",
        ],
      },
      {
        h: "ما أكثر الأخطاء شيوعًا عند التوسع في الذكاء الاصطناعي؟",
        p: [
          "معظم حالات الإخفاق التي أراها تنظيمية لا تقنية. وهي تتكرر عبر القطاعات، وتجنّبها قليل الكلفة إذا سُمّيت مبكرًا بدل اكتشافها بعد أن يتعثر المشروع التجريبي الثالث وأنصح بمراجعة هذه القائمة مع الفريق قبل إطلاق أي مبادرة جديدة، ثم العودة إليها بعد كل إصدار مهم لمعرفة ما إذا كانت إحدى هذه الأخطاء قد تسللت دون أن يلاحظها أحد، فالتصحيح المبكر أرخص بكثير من إعادة البناء. وهذه المراجعة الدورية نفسها جزء من نموذج التشغيل لا عبء إضافي عليه.",
        ],
        list: [
          "تمويل حالات الاستخدام دون تمويل المنصة، فتدفع كل فرقة كلفة التهيئة نفسها مرة بعد مرة.",
          "كتابة الحوكمة في وثيقة لا يستطيع أحد تنفيذها، بدل فحوص تعمل تلقائيًا داخل مسار التسليم.",
          "الحكم على الإصدار من خلال عرض توضيحي، بينما لا تبيّن مجموعة السيناريوهات الثابتة وحدها هل التغيير تحسّن أم تراجع.",
          "التعامل مع التدريب كحدث إطلاق، بينما يحتاج الناس إلى دعم وأمثلة بعد ورشة العمل الأولى بوقت طويل.",
          "منح الوكلاء صلاحيات واسعة منذ اليوم الأول، بدل ترك الاستقلالية تنمو مع الدليل على أن الفحوص تكشف المشكلات.",
        ],
      },
      {
        h: "كيف تحكم وكلاء يتصرفون ولا يكتفون بالإجابة؟",
        p: [
          "وللوكلاء الذين يتصرفون ينطبق المنطق نفسه على الرقابة. فالوكيل الذي يستطيع استدعاء الأدوات يحتاج إلى حدود تُفحص في كل مرة لا عند التصميم فقط. يستكشف TrustRail، وهو مستودع عام، السياسات والموافقات البشرية والإيصالات الموقّعة: يسجّل لكل عملية محمية أي وكيل طلبها ومن أذن بها وما الحدود المطبقة وما الأدلة التي تدعم النتيجة. ويعمل في بيئات تجريب اصطناعية، فهو دراسة تصميم لا ادعاء استخدام في الإنتاج.",
          "ويطبّق إطار agentic-sdlc الفكرة نفسها على وكلاء البرمجة تحت اسم الاستقلالية المكتسبة: يحصل الوكيل على حرية أكبر حيث تستطيع الفحوص الآلية إثبات عمله، ويفقدها حيث لا تستطيع. وهو إطار عمل لم تتحقق منه دراسة مستقلة، وأقدّمه على هذا الأساس. ولذلك أنصح بقراءة هذه الأعمال بوصفها نقاط انطلاق للنقاش مع الفرق، لا وصفات جاهزة تُطبَّق كما هي.",
        ],
      },
    ],
    take: "نموذج التشغيل هو المنتج. تحدد المسؤوليات وبوابات التقييم والتدريب التبنّي أكثر بكثير من أي خيار معماري. ولو كان عليّ تمويل شيء واحد أولًا لموّلت بوابة التقييم، لأنها ما يتيح للجميع الوثوق بالمنصة، وما يسمح بمنح الوكلاء مزيدًا من الحرية عن اقتناع لا عن تفاؤل.",
    diagram: {
      nodes: ["تجارب", "منصة مشتركة", "حوكمة", "بوابات التقييم", "تبنٍّ"],
      caption: "كل خطوة تجعل التي تليها أقل كلفة: إعادة الاستخدام تحتاج ثقة، والثقة تحتاج قواعد.",
    },
    results: [
      { v: "−60%", l: "من زمن تسليم تطبيق RAG، من 10 أسابيع إلى 4 (DILA)" },
      { v: "75%", l: "من القدرات التقنية المشتركة أُعيد استخدامها (DILA)" },
      { v: "−30%", l: "من كلفة كل طلب ذكاء اصطناعي، عبر التحسين وإعادة الاستخدام (DILA)" },
      { v: "+1,500", l: "متخصص دُرِّبوا (LEAP)" },
    ],
    faq: [
      {
        q: "ما هو نموذج تشغيل الذكاء الاصطناعي؟",
        a: "هو مجموعة المنصات المشتركة وقواعد الحوكمة وبوابات التقييم والملكية والتدريب التي تمكّن المؤسسة من تسليم حالات استخدام الذكاء الاصطناعي بصورة متكررة. وهو يجيب عمّن يبني ومن يوافق وكيف تُفحص الجودة وكيف يتعلم الناس استخدام النتيجة، بدل التركيز على نموذج أو أداة واحدة، ولذلك يبقى صالحًا حتى حين يتغير النموذج المستخدم.",
      },
      {
        q: "لماذا لا تصل معظم المشاريع التجريبية للذكاء الاصطناعي إلى الإنتاج؟",
        a: "لأن المشروع التجريبي يثبت قدرة لا طاقة تشغيلية، وهذان أمران مختلفان. تعيد الفرق في كل مرة بناء الاستيعاب والاسترجاع والتقييم والأمن، فتتفاوت الجودة ولا يملك أحد مسؤولية التشغيل. وبغياب المكوّنات المشتركة والحوكمة وبوابة الإصدار، يبقى الانتقال من العرض إلى الخدمة مكلفًا ومحفوفًا بالمخاطر.",
      },
      {
        q: "هل تأتي المنصة أولًا أم الحوكمة؟",
        a: "ابنهما معًا. فالحوكمة المضافة بعد المنصة تصل بعد أن تكون الفرق قد اتخذت خياراتها، فتصبح المنصة اختيارية. أما القواعد المحددة مع المكوّنات المشتركة فتمنح الفرق سببًا للثقة بها وإعادة استخدامها، ومن هنا تأتي وفورات الوقت والكلفة التي تُقاس لاحقًا في التسليم والتشغيل.",
      },
      {
        q: "كيف يُقاس نجاح نموذج تشغيل الذكاء الاصطناعي؟",
        a: "انظر إلى إعادة الاستخدام وزمن التسليم وكلفة الطلب ودرجات الجودة على مجموعة ثابتة من السيناريوهات، ثم إلى التبنّي عبر المستخدمين المدرَّبين والفرق النشطة. في منصة DILA انخفض الزمن بنسبة 60% وأُعيد استخدام 75% من القدرات المشتركة. اذكر سياق هذه الأرقام دائمًا، ولا تقارن بين مؤسستين دون التحقق من أن الحالات المقارَنة متماثلة فعلًا.",
      },
      {
        q: "أين يقع وكلاء الذكاء الاصطناعي في نموذج التشغيل؟",
        a: "يحتاجون الأسس نفسها مع رقابة أشد لأنهم يتصرفون. ينبغي أن تُدرج السياسات والموافقة البشرية على العمليات الخطرة والتتبّع والاستقلالية الممنوحة بالأدلة منذ البداية. يستكشف TrustRail وagentic-sdlc ذلك علنًا بوصفهما تصاميم وأطر عمل لا منتجات تم التحقق منها، ومن الأفضل تجربتهما في بيئات اصطناعية قبل أي استخدام فعلي.",
      },
    ],
  },
};
