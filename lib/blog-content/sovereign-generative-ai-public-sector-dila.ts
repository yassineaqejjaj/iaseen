import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "Sovereign Generative AI for the Public Sector: Lessons from DILA",
    dek: "What “sovereign” means for a public body deploying generative AI, and how a reusable platform, systematic evaluation and governance by design changed delivery at DILA.",
    answer:
      "Sovereign generative AI lets a public body use language models while keeping control over its data, hosting, security and traceability. The DILA experience shows that the practical route is a reusable platform, not isolated projects: shared components, built-in governance and systematic evaluation made delivery faster and quality easier to prove.",
    sections: [
      {
        h: "What does sovereign generative AI mean for a public body?",
        p: [
          "In a public-service context, sovereign means the institution stays in control of where its data lives, who can access it, how the system is secured and how every answer can be traced back to a source. It is a statement about control and accountability, not about nationality of technology.",
          "At DILA, which belongs to the services of the Prime Minister, these requirements shaped the platform from the first day rather than being added at the end.",
        ],
      },
      {
        h: "Why is generative AI harder to deploy in the public sector?",
        p: [
          "Public institutions need to deploy generative AI while meeting strict requirements for data sovereignty, security, traceability and regulatory compliance. Those requirements apply to every application, which is exactly where the trouble starts.",
          "When each application is built on its own, document ingestion, embeddings, retrieval, orchestration, security controls, evaluation and observability are rebuilt for every project. The duplication is expensive, but the larger risk is inconsistency: each copy of the security layer is a separate thing to audit, and each project ends up with its own idea of what good quality means.",
          "This is why I argue that the question for a public body is rarely which model to choose. It is how to avoid solving the same compliance problem a fifth time.",
          "There is also a human cost. Teams that rebuild the same plumbing for every project spend their time on infrastructure instead of on the service the citizen will actually use, and the people who must approve each system face a different design every time.",
        ],
      },
      {
        h: "What was the challenge DILA set out to solve?",
        p: [
          "The objective was to move beyond isolated proofs of concept and to establish a sovereign, reusable AI foundation capable of accelerating production-ready RAG and agentic applications. RAG, retrieval-augmented generation, means the model answers from the institution’s own documents rather than from memory alone.",
          "My contribution was to lead a team of 9 people on the product and delivery approach of the platform, with a strong focus on modular architecture, component reuse and scalable AI delivery. I describe my own role only as far as the case study does: the platform is the work of the whole team.",
        ],
      },
      {
        h: "How does a platform approach change the way AI is delivered?",
        p: [
          "The shift was from building each application independently to assembling standardised, governed AI components. The approach combined several elements, each of which answers a duplicated cost named above.",
        ],
        list: [
          "A sovereign architecture compatible with strict hosting, security and data-sovereignty requirements, including SecNumCloud considerations.",
          "Reusable building blocks: document ingestion, chunking, embeddings, hybrid retrieval, reranking, prompt management and LLM integration.",
          "Agentic orchestration: reusable workflows for tool calling, multi-step reasoning and agent-based task execution.",
          "A RAG factory: document-based assistants created from configurable retrieval pipelines rather than project-specific implementations.",
          "An evaluation framework that measures RAG quality systematically.",
          "Governance by design: access management, traceability, auditability and sovereignty requirements embedded in the components themselves.",
          "Repeatable implementation patterns that cut development effort and improve consistency across projects.",
        ],
      },
      {
        h: "How do sovereignty requirements translate into platform features?",
        p: [
          "The table below is my reading of how each requirement named in the case maps to a platform behaviour. It is a framing for discussion, not a description of the internal design, which I do not detail here.",
        ],
        table: {
          head: ["Requirement", "What it asks of an AI system", "How a shared platform helps"],
          rows: [
            ["Data sovereignty", "Control over where data is processed and who can reach it", "One approved foundation instead of many separate hosting decisions"],
            ["Security", "Consistent protection across every application", "Security controls built once into reusable components, then inherited"],
            ["Traceability", "Every answer can be linked to its sources and its path", "Traceability embedded in shared retrieval and orchestration steps"],
            ["Auditability", "A reviewer can reconstruct what happened and who had access", "Access management and records handled at platform level, not per project"],
            ["Regulatory compliance", "Evidence that rules were applied, not only written", "Governance by design, so each new application starts compliant"],
          ],
        },
      },
      {
        h: "How was the quality of the answers evaluated?",
        p: [
          "A public body cannot ship an assistant on the strength of a good demonstration. The platform introduced systematic RAG quality measurements, which gave every application the same yardstick.",
          "Four measures are worth knowing, because they are the ones people search for. Faithfulness asks whether the answer is supported by the retrieved documents. Answer relevancy asks whether it addresses the question. Context precision asks whether the retrieved passages were the right ones, and context recall asks whether the right passages were found at all.",
          "The reported scores were 0.94 for faithfulness, 0.91 for answer relevancy, 0.89 for context precision and 0.92 for context recall. Evaluation covered 85% of priority RAG scenarios. I give these figures as reported for that platform, not as a benchmark for other contexts.",
          "What matters for a public service is less any single score than the discipline behind it. When the same four measures are applied to every assistant, a change can be judged as an improvement or a regression, and a reviewer can ask for evidence instead of trusting a presentation.",
        ],
      },
      {
        h: "What did the platform change in practice?",
        p: [
          "New RAG applications could reuse shared document processing, retrieval, evaluation and security capabilities, and agentic applications could build on existing orchestration patterns and tool integrations. This reduced duplicated engineering work, accelerated experimentation and established a more consistent approach to quality and governance. The reported results:",
        ],
        list: [
          "Content creation became 70% faster.",
          "RAG application delivery time fell by 60%, from 10 weeks to 4.",
          "75% of common technical capabilities were reused.",
          "Cost per AI request fell by 30%, through pipeline optimisation and reuse.",
          "Implementation time for prototyping agentic workflows fell by 50%.",
        ],
      },
      {
        h: "What can other public bodies learn from DILA?",
        p: [
          "The case page states the lesson plainly: the value of an enterprise AI platform is not only the intelligence it provides, but how quickly and reliably it lets an organisation build its next application. These are the points I would carry to another public body, and none of them depends on a particular model or supplier.",
        ],
        list: [
          "Treat RAG pipelines, agentic workflows, evaluation and governance as platform capabilities, not as features of one project.",
          "Write sovereignty and security requirements into the reusable components, so compliance is inherited rather than repeated.",
          "Agree the quality measures before the first release, and keep the same measures for every application.",
          "Measure the platform by how quickly the next application can be built, not by how impressive the first one looks.",
          "Keep the team small and the components shared: a team of 9 can only serve several applications if they do not each start from scratch.",
        ],
      },
    ],
    take: "After 13 years building AI products, my view is that sovereignty is an engineering property, not a procurement label: it exists only if requirements are built into components that every project inherits. The most useful thing the DILA work showed me is that governance and speed are not opposites, because a shared, governed platform was what made delivery faster.",
    diagram: {
      nodes: ["Public-service use cases", "Reusable AI components", "Evaluation and governance", "Sovereign foundation"],
      caption: "Use cases sit on reusable components, which are checked by evaluation and governance, all on a foundation that meets sovereignty requirements.",
    },
    results: [
      { v: "70%", l: "faster content creation (DILA)" },
      { v: "−60%", l: "RAG application delivery time, from 10 weeks to 4 (DILA)" },
      { v: "75%", l: "of common technical capabilities reused (DILA)" },
      { v: "0.94", l: "RAG faithfulness, with 85% of priority scenarios covered (DILA)" },
    ],
    faq: [
      {
        q: "What is sovereign generative AI?",
        a: "It is generative AI deployed so that an institution keeps control over its data, hosting, security and traceability. For a public body this means meeting strict requirements for data sovereignty, security, traceability and regulatory compliance, rather than relying on an arrangement it cannot audit or explain to citizens.",
      },
      {
        q: "Why do public institutions need a platform rather than separate AI projects?",
        a: "Because separate projects rebuild ingestion, retrieval, security, evaluation and observability each time, which duplicates cost and multiplies what must be audited. A shared platform builds those capabilities once, applies governance by design and lets each new application inherit them.",
      },
      {
        q: "How can you evaluate a RAG system in a public service?",
        a: "Use fixed, systematic measures: faithfulness, answer relevancy, context precision and context recall, applied to a defined set of priority scenarios. On the DILA platform the scores were 0.94, 0.91, 0.89 and 0.92, with 85% of priority RAG scenarios covered.",
      },
      {
        q: "What results did the DILA platform deliver?",
        a: "Content creation became 70% faster, RAG application delivery time fell by 60% from 10 weeks to 4, and 75% of common technical capabilities were reused. Cost per AI request fell by 30% and agentic prototyping time by 50%.",
      },
      {
        q: "What is the main lesson for other public bodies?",
        a: "Treat RAG pipelines, agentic workflows, evaluation and governance as reusable platform capabilities. Sovereign AI then becomes a scalable engineering model rather than a collection of disconnected experiments, and the next application is faster and more reliable to build than the last.",
      },
    ],
  },
  fr: {
    title: "IA générative souveraine pour l’administration : les leçons de la DILA",
    dek: "Ce que « souveraine » signifie pour une administration qui déploie l’IA générative, et comment une plateforme réutilisable, une évaluation systématique et une gouvernance dès la conception ont changé la livraison à la DILA.",
    answer:
      "Une IA générative souveraine permet à une administration d’utiliser des modèles de langage tout en gardant la maîtrise de ses données, de l’hébergement, de la sécurité et de la traçabilité. L’expérience de la DILA montre que la voie pratique est une plateforme réutilisable : composants partagés, gouvernance intégrée et évaluation systématique accélèrent la livraison et rendent la qualité démontrable.",
    sections: [
      {
        h: "Que signifie une IA générative souveraine pour une administration ?",
        p: [
          "Dans le contexte du service public, souveraine veut dire que l’institution garde la maîtrise de l’endroit où vivent ses données, de qui peut y accéder, de la façon dont le système est sécurisé et de la possibilité de remonter de chaque réponse à sa source. C’est une question de contrôle et de responsabilité, pas de nationalité d’une technologie.",
          "À la DILA, qui relève des services du Premier ministre, ces exigences ont façonné la plateforme dès le premier jour au lieu d’être ajoutées à la fin.",
        ],
      },
      {
        h: "Pourquoi l’IA générative est-elle plus difficile à déployer dans le secteur public ?",
        p: [
          "Les institutions publiques doivent déployer l’IA générative tout en respectant des exigences strictes de souveraineté des données, de sécurité, de traçabilité et de conformité réglementaire. Ces exigences s’appliquent à chaque application, et c’est précisément là que les difficultés commencent.",
          "Quand chaque application est construite isolément, l’ingestion de documents, les embeddings, la récupération, l’orchestration, les contrôles de sécurité, l’évaluation et l’observabilité sont reconstruits pour chaque projet. La duplication coûte cher, mais le risque principal est l’incohérence : chaque copie de la couche de sécurité est un objet distinct à auditer, et chaque projet finit avec sa propre idée de la qualité.",
          "C’est pourquoi je soutiens que la question pour une administration est rarement de choisir un modèle. Elle est d’éviter de résoudre une cinquième fois le même problème de conformité.",
        ],
      },
      {
        h: "Quel défi la DILA cherchait-elle à relever ?",
        p: [
          "L’objectif était de dépasser les preuves de concept isolées et d’établir un socle d’IA souverain et réutilisable, capable d’accélérer le développement d’applications RAG et agentiques prêtes pour la production. Le RAG, ou génération augmentée par récupération, consiste à faire répondre le modèle à partir des documents de l’institution plutôt que de sa seule mémoire.",
          "Ma contribution a été de diriger une équipe de 9 personnes sur l’approche produit et de livraison de la plateforme, avec un accent fort sur l’architecture modulaire, la réutilisation des composants et une livraison d’IA qui passe à l’échelle. Je ne décris mon rôle que dans la mesure où l’étude de cas le fait : la plateforme est le travail de toute l’équipe.",
        ],
      },
      {
        h: "En quoi une approche par plateforme change-t-elle la livraison de l’IA ?",
        p: [
          "Le changement a consisté à passer de la construction indépendante de chaque application à l’assemblage de composants d’IA standardisés et gouvernés. L’approche combinait plusieurs éléments, dont chacun répond à l’un des coûts dupliqués évoqués plus haut.",
        ],
        list: [
          "Une architecture souveraine compatible avec des exigences strictes d’hébergement, de sécurité et de souveraineté des données, notamment SecNumCloud.",
          "Des briques réutilisables : ingestion de documents, découpage, embeddings, récupération hybride, reranking, gestion des prompts et intégration des LLM.",
          "Une orchestration agentique : des workflows réutilisables pour l’appel d’outils, le raisonnement en plusieurs étapes et l’exécution de tâches par des agents.",
          "Une usine à RAG : des assistants documentaires créés à partir de chaînes de récupération configurables plutôt que d’implémentations propres à chaque projet.",
          "Un cadre d’évaluation qui mesure la qualité du RAG de façon systématique.",
          "Une gouvernance dès la conception : gestion des accès, traçabilité, auditabilité et exigences de souveraineté intégrées aux composants eux-mêmes.",
          "Des modèles d’implémentation reproductibles qui réduisent l’effort de développement et améliorent la cohérence entre projets.",
        ],
      },
      {
        h: "Comment les exigences de souveraineté se traduisent-elles en fonctions de plateforme ?",
        p: [
          "Le tableau ci-dessous est ma lecture de la façon dont chaque exigence citée dans l’étude de cas se traduit en comportement de plateforme. C’est un cadre de discussion, pas une description de la conception interne, que je ne détaille pas ici.",
        ],
        table: {
          head: ["Exigence", "Ce qu’elle demande à un système d’IA", "Ce qu’apporte une plateforme partagée"],
          rows: [
            ["Souveraineté des données", "Maîtriser où les données sont traitées et qui peut y accéder", "Un socle approuvé unique plutôt que de multiples décisions d’hébergement"],
            ["Sécurité", "Une protection homogène sur toutes les applications", "Des contrôles de sécurité construits une fois dans des composants réutilisables, puis hérités"],
            ["Traçabilité", "Pouvoir relier chaque réponse à ses sources et à son cheminement", "Une traçabilité intégrée aux étapes partagées de récupération et d’orchestration"],
            ["Auditabilité", "Un contrôleur peut reconstituer ce qui s’est passé et qui avait accès", "Gestion des accès et enregistrements traités au niveau de la plateforme, pas projet par projet"],
            ["Conformité réglementaire", "La preuve que les règles ont été appliquées, pas seulement écrites", "Une gouvernance dès la conception, pour que chaque nouvelle application démarre conforme"],
          ],
        },
      },
      {
        h: "Comment la qualité des réponses a-t-elle été évaluée ?",
        p: [
          "Une administration ne peut pas livrer un assistant sur la foi d’une bonne démonstration. La plateforme a introduit des mesures systématiques de la qualité du RAG, qui donnent à chaque application le même étalon.",
          "Quatre mesures méritent d’être connues, car ce sont celles que les gens recherchent. La fidélité demande si la réponse est étayée par les documents récupérés. La pertinence de la réponse demande si elle traite la question. La précision du contexte demande si les passages récupérés étaient les bons, et le rappel du contexte demande si les bons passages ont bien été trouvés.",
          "Les scores rapportés sont de 0,94 pour la fidélité, 0,91 pour la pertinence de la réponse, 0,89 pour la précision du contexte et 0,92 pour le rappel du contexte. L’évaluation couvrait 85 % des scénarios RAG prioritaires. Je donne ces chiffres tels que rapportés pour cette plateforme, pas comme une référence pour d’autres contextes.",
        ],
      },
      {
        h: "Qu’a changé concrètement la plateforme ?",
        p: [
          "Les nouvelles applications RAG ont pu réutiliser les capacités partagées de traitement de documents, de récupération, d’évaluation et de sécurité, et les applications agentiques ont pu s’appuyer sur des modèles d’orchestration et des intégrations d’outils existants. Cela a réduit le travail d’ingénierie dupliqué, accéléré l’expérimentation et instauré une approche plus cohérente de la qualité et de la gouvernance. Les résultats rapportés :",
        ],
        list: [
          "La création de contenu est devenue 70 % plus rapide.",
          "Le délai de livraison d’une application RAG a baissé de 60 %, de 10 semaines à 4.",
          "75 % des capacités techniques communes ont été réutilisées.",
          "Le coût par requête d’IA a baissé de 30 %, grâce à l’optimisation des chaînes et à la réutilisation.",
          "Le temps de mise en œuvre du prototypage de workflows agentiques a baissé de 50 %.",
        ],
      },
      {
        h: "Que peuvent retenir les autres administrations de l’expérience DILA ?",
        p: [
          "La page de l’étude de cas formule la leçon simplement : la valeur d’une plateforme d’IA d’entreprise n’est pas seulement l’intelligence qu’elle apporte, mais la rapidité et la fiabilité avec lesquelles elle permet de construire l’application suivante. Voici ce que je transmettrais à une autre administration.",
        ],
        list: [
          "Traiter les chaînes RAG, les workflows agentiques, l’évaluation et la gouvernance comme des capacités de plateforme, pas comme des fonctions d’un projet.",
          "Inscrire les exigences de souveraineté et de sécurité dans les composants réutilisables, pour que la conformité soit héritée plutôt que répétée.",
          "Convenir des mesures de qualité avant la première version, et garder les mêmes pour toutes les applications.",
          "Mesurer la plateforme à la vitesse à laquelle l’application suivante peut être construite, pas à l’effet produit par la première.",
          "Garder l’équipe réduite et les composants partagés : une équipe de 9 personnes ne peut servir plusieurs applications que si chacune ne repart pas de zéro.",
        ],
      },
    ],
    take: "Après 13 ans à construire des produits d’IA, je pense que la souveraineté est une propriété d’ingénierie, pas une étiquette d’achat : elle n’existe que si les exigences sont intégrées à des composants dont chaque projet hérite. Ce que le travail à la DILA m’a montré de plus utile, c’est que gouvernance et vitesse ne s’opposent pas, car c’est une plateforme partagée et gouvernée qui a rendu la livraison plus rapide.",
    diagram: {
      nodes: ["Cas d’usage du service public", "Composants d’IA réutilisables", "Évaluation et gouvernance", "Socle souverain"],
      caption: "Les cas d’usage reposent sur des composants réutilisables, contrôlés par l’évaluation et la gouvernance, le tout sur un socle qui respecte les exigences de souveraineté.",
    },
    results: [
      { v: "70 %", l: "de création de contenu plus rapide (DILA)" },
      { v: "−60 %", l: "de délai de livraison d’une application RAG, de 10 à 4 semaines (DILA)" },
      { v: "75 %", l: "des capacités techniques communes réutilisées (DILA)" },
      { v: "0,94", l: "de fidélité du RAG, avec 85 % des scénarios prioritaires couverts (DILA)" },
    ],
    faq: [
      {
        q: "Qu’est-ce que l’IA générative souveraine ?",
        a: "C’est une IA générative déployée de façon que l’institution garde la maîtrise de ses données, de l’hébergement, de la sécurité et de la traçabilité. Pour une administration, cela suppose de respecter des exigences strictes de souveraineté des données, de sécurité, de traçabilité et de conformité réglementaire, sans dépendre d’un montage qu’elle ne peut ni auditer ni expliquer aux citoyens.",
      },
      {
        q: "Pourquoi une administration a-t-elle besoin d’une plateforme plutôt que de projets IA séparés ?",
        a: "Parce que des projets séparés reconstruisent à chaque fois l’ingestion, la récupération, la sécurité, l’évaluation et l’observabilité, ce qui duplique les coûts et multiplie ce qu’il faut auditer. Une plateforme partagée construit ces capacités une fois, applique la gouvernance dès la conception et laisse chaque nouvelle application en hériter.",
      },
      {
        q: "Comment évaluer un système RAG dans un service public ?",
        a: "Avec des mesures fixes et systématiques : fidélité, pertinence de la réponse, précision du contexte et rappel du contexte, appliquées à un ensemble défini de scénarios prioritaires. Sur la plateforme de la DILA, les scores étaient de 0,94, 0,91, 0,89 et 0,92, avec 85 % des scénarios RAG prioritaires couverts.",
      },
      {
        q: "Quels résultats la plateforme de la DILA a-t-elle obtenus ?",
        a: "La création de contenu est devenue 70 % plus rapide, le délai de livraison d’une application RAG a baissé de 60 %, de 10 semaines à 4, et 75 % des capacités techniques communes ont été réutilisées. Le coût par requête d’IA a baissé de 30 % et le temps de prototypage agentique de 50 %.",
      },
      {
        q: "Quelle est la principale leçon pour les autres administrations ?",
        a: "Traiter les chaînes RAG, les workflows agentiques, l’évaluation et la gouvernance comme des capacités de plateforme réutilisables. L’IA souveraine devient alors un modèle d’ingénierie qui passe à l’échelle, et non un ensemble d’expériences déconnectées, et l’application suivante est plus rapide et plus fiable à construire que la précédente.",
      },
    ],
  },
  ar: {
    title: "الذكاء الاصطناعي التوليدي السيادي للقطاع العام: دروس من DILA",
    dek: "ما معنى «السيادي» بالنسبة لجهة عامة تنشر الذكاء الاصطناعي التوليدي، وكيف غيّرت منصة قابلة لإعادة الاستخدام وتقييم منهجي وحوكمة منذ التصميم طريقة التسليم في DILA.",
    answer:
      "يتيح الذكاء الاصطناعي التوليدي السيادي لجهة عامة استخدام نماذج اللغة مع الاحتفاظ بالسيطرة على بياناتها واستضافتها وأمنها وقابلية التتبع. وتبيّن تجربة DILA أن الطريق العملي هو منصة قابلة لإعادة الاستخدام: مكوّنات مشتركة وحوكمة مدمجة وتقييم منهجي تسرّع التسليم وتجعل إثبات الجودة أسهل.",
    sections: [
      {
        h: "ماذا يعني الذكاء الاصطناعي التوليدي السيادي للجهات العامة؟",
        p: [
          "في سياق الخدمة العامة، يعني السيادي أن المؤسسة تبقى مسيطرة على مكان وجود بياناتها ومن يستطيع الوصول إليها وكيفية تأمين النظام وإمكانية ردّ كل إجابة إلى مصدرها. إنه مسألة سيطرة ومساءلة، لا مسألة جنسية التقنية. وبعبارة أخرى، السؤال الذي تطرحه الجهة على نفسها هو: هل أستطيع أن أشرح لمواطن أو لمدقق أين ذهبت البيانات ولماذا أعطى النظام هذه الإجابة؟",
          "وفي DILA، التابعة لمصالح رئيس الوزراء، شكّلت هذه المتطلبات المنصة منذ اليوم الأول بدل أن تُضاف في النهاية.",
        ],
      },
      {
        h: "لماذا يصعب نشر الذكاء الاصطناعي التوليدي في القطاع العام؟",
        p: [
          "تحتاج المؤسسات العامة إلى نشر الذكاء الاصطناعي التوليدي مع الالتزام بمتطلبات صارمة للسيادة على البيانات والأمن وقابلية التتبع والامتثال التنظيمي. وتنطبق هذه المتطلبات على كل تطبيق، وهنا تحديدًا تبدأ المشكلة.",
          "حين يُبنى كل تطبيق على حدة، يُعاد بناء استيعاب الوثائق والتضمينات والاسترجاع والتنسيق وضوابط الأمن والتقييم والمراقبة لكل مشروع. والازدواجية مكلفة، لكن الخطر الأكبر هو التفاوت: كل نسخة من طبقة الأمن عنصر مستقل يجب تدقيقه، وينتهي كل مشروع بتصوره الخاص عن معنى الجودة، فيصعب على أي مراجع أن يقارن بين التطبيقات أو أن يضمن أن القواعد طُبّقت بالطريقة نفسها في كل مكان.",
          "ولهذا أرى أن السؤال أمام الجهة العامة نادرًا ما يكون أي نموذج تختار. إنه كيف تتجنب حل مشكلة الامتثال نفسها للمرة الخامسة.",
          "وهناك كلفة بشرية أيضًا. فالفرق التي تعيد بناء البنية نفسها لكل مشروع تقضي وقتها في الأعمال التحتية بدل الخدمة التي سيستعملها المواطن فعلًا، ويواجه من يوافقون على كل نظام تصميمًا مختلفًا في كل مرة.",
        ],
      },
      {
        h: "ما التحدي الذي سعت DILA إلى حله؟",
        p: [
          "كان الهدف تجاوز النماذج الأولية المعزولة وإرساء أساس ذكاء اصطناعي سيادي وقابل لإعادة الاستخدام، قادر على تسريع تطوير تطبيقات RAG والتطبيقات الوكيلة الجاهزة للإنتاج. وRAG، أي التوليد المعزَّز بالاسترجاع، يعني أن النموذج يجيب انطلاقًا من وثائق المؤسسة لا من ذاكرته وحدها.",
          "وكانت مساهمتي قيادة فريق من 9 أشخاص في منهج المنتج والتنفيذ للمنصة، مع تركيز قوي على البنية المعيارية وإعادة استخدام المكونات وتسليم ذكاء اصطناعي قابل للتوسع. ولا أصف دوري إلا بقدر ما تفعل دراسة الحالة: فالمنصة ثمرة عمل الفريق كله. وقد جعل هذا التوجه المعياري من كل مكوّن وحدة يمكن تحسينها وتدقيقها وإعادة استخدامها دون المساس بالباقي، وهو ما يلائم جهة عامة تتغير فيها الأولويات وتبقى فيها المسؤولية قائمة.",
        ],
      },
      {
        h: "كيف يغيّر نهج المنصة طريقة تسليم الذكاء الاصطناعي؟",
        p: [
          "كان التحول من بناء كل تطبيق على حدة إلى تجميع مكونات ذكاء اصطناعي موحَّدة وخاضعة للحوكمة. وجمع النهج عدة عناصر، يجيب كل منها عن كلفة مكررة ذُكرت أعلاه.",
        ],
        list: [
          "بنية سيادية تتوافق مع متطلبات صارمة للاستضافة والأمن والسيادة على البيانات، بما فيها اعتبارات SecNumCloud.",
          "لبنات قابلة لإعادة الاستخدام: استيعاب الوثائق وتقطيعها والتضمينات والاسترجاع الهجين وإعادة الترتيب وإدارة التعليمات وربط نماذج اللغة الكبيرة.",
          "تنسيق وكيل: سير عمل قابلة لإعادة الاستخدام لاستدعاء الأدوات والاستدلال متعدد الخطوات وتنفيذ المهام عبر الوكلاء.",
          "مصنع RAG: مساعدات معتمدة على الوثائق تُنشأ من مسارات استرجاع قابلة للتهيئة بدل تنفيذات خاصة بكل مشروع.",
          "إطار تقييم يقيس جودة RAG بصورة منهجية.",
          "حوكمة منذ التصميم: إدارة الوصول وقابلية التتبع والتدقيق ومتطلبات السيادة مدمجة في المكونات نفسها.",
          "أنماط تنفيذ قابلة للتكرار تقلل جهد التطوير وتحسّن الاتساق بين المشاريع.",
        ],
      },
      {
        h: "كيف تتحول متطلبات السيادة إلى خصائص في المنصة؟",
        p: [
          "الجدول التالي قراءتي لكيفية ترجمة كل متطلب ورد في دراسة الحالة إلى سلوك في المنصة. هو إطار للنقاش لا وصف للتصميم الداخلي الذي لا أفصّله هنا.",
        ],
        table: {
          head: ["المتطلب", "ما يطلبه من نظام الذكاء الاصطناعي", "ما تقدمه منصة مشتركة"],
          rows: [
            ["السيادة على البيانات", "التحكم في مكان معالجة البيانات ومن يصل إليها", "أساس واحد معتمد بدل قرارات استضافة متعددة"],
            ["الأمن", "حماية متسقة عبر كل التطبيقات", "ضوابط أمن تُبنى مرة واحدة في مكونات قابلة لإعادة الاستخدام ثم تُورَّث"],
            ["قابلية التتبع", "إمكانية ربط كل إجابة بمصادرها ومسارها", "تتبّع مدمج في خطوات الاسترجاع والتنسيق المشتركة"],
            ["قابلية التدقيق", "يستطيع المدقق إعادة بناء ما حدث ومن كان له حق الوصول", "إدارة الوصول والسجلات على مستوى المنصة لا على مستوى كل مشروع"],
            ["الامتثال التنظيمي", "دليل على تطبيق القواعد لا مجرد كتابتها", "حوكمة منذ التصميم، فيبدأ كل تطبيق جديد ممتثلًا"],
          ],
        },
      },
      {
        h: "كيف جرى تقييم جودة الإجابات؟",
        p: [
          "لا تستطيع جهة عامة إطلاق مساعد اعتمادًا على عرض توضيحي جيد. فقد أدخلت المنصة قياسات منهجية لجودة RAG، منحت كل تطبيق المعيار نفسه.",
          "وهناك أربعة مقاييس يجدر معرفتها لأنها ما يبحث عنه الناس. تسأل الأمانة هل الإجابة مدعومة بالوثائق المسترجعة. وتسأل ملاءمة الإجابة هل تعالج السؤال. وتسأل دقة السياق هل كانت المقاطع المسترجعة هي الصحيحة، ويسأل استرجاع السياق هل عُثر على المقاطع الصحيحة أصلًا.",
          "وكانت النتائج المعلنة 0.94 للأمانة، و0.91 لملاءمة الإجابة، و0.89 لدقة السياق، و0.92 لاسترجاع السياق. وغطّى التقييم 85% من سيناريوهات RAG ذات الأولوية. وأورد هذه الأرقام كما وردت لتلك المنصة، لا كمرجع لسياقات أخرى.",
          "والأهم في الخدمة العامة ليس درجة بعينها بقدر ما هو الانضباط الذي يقف خلفها. فحين تُطبَّق المقاييس الأربعة نفسها على كل مساعد، يمكن الحكم على أي تغيير بأنه تحسّن أو تراجع، ويستطيع المراجع أن يطلب دليلًا بدل أن يكتفي بعرض تقديمي.",
          "وهذا الانضباط هو ما يحوّل الجودة من انطباع شخصي إلى التزام يمكن فحصه ومساءلة المسؤول عنه، وهو شرط ضروري لأي جهة تُسأل عن قراراتها أمام الجمهور وأمام جهات الرقابة.",
        ],
      },
      {
        h: "ما الذي غيّرته المنصة عمليًا؟",
        p: [
          "أمكن لتطبيقات RAG الجديدة إعادة استخدام القدرات المشتركة في معالجة الوثائق والاسترجاع والتقييم والأمن، وأمكن للتطبيقات الوكيلة البناء على أنماط تنسيق وتكاملات أدوات قائمة. فقلّ العمل الهندسي المكرر، وتسارعت التجربة وتقلّصت الحاجة إلى مراجعات متكررة للأمر نفسه، وترسخ نهج أكثر اتساقًا للجودة والحوكمة. ويعني ذلك أن الجهد الذي كان يُصرف في إعادة بناء الأساسيات صار متاحًا لما يهم المستخدم النهائي، أي تحسين الخدمة نفسها وتجريب حالات استخدام جديدة بثقة أكبر وبمخاطر أقل. والنتائج المعلنة:",
        ],
        list: [
          "أصبح إنشاء المحتوى أسرع بنسبة 70%.",
          "انخفض زمن تسليم تطبيق RAG بنسبة 60%، من 10 أسابيع إلى 4.",
          "أُعيد استخدام 75% من القدرات التقنية المشتركة.",
          "انخفضت كلفة كل طلب ذكاء اصطناعي بنسبة 30% عبر تحسين المسارات وإعادة الاستخدام.",
          "انخفض زمن تنفيذ النماذج الأولية لمسارات العمل الوكيلة بنسبة 50%.",
        ],
      },
      {
        h: "ماذا تستفيد الجهات العامة الأخرى من تجربة DILA؟",
        p: [
          "تصوغ صفحة دراسة الحالة الدرس ببساطة: قيمة منصة الذكاء الاصطناعي في المؤسسة ليست الذكاء الذي تقدمه فحسب، بل سرعة وموثوقية تمكينها المؤسسة من بناء تطبيقها التالي. وهذه النقاط التي أنقلها إلى أي جهة عامة أخرى، وهي تصلح نقطة انطلاق عملية لمن يبدأ رحلته مع الذكاء الاصطناعي التوليدي، ولا تعتمد أيٌّ منها على نموذج بعينه أو مزوّد بعينه، ما يجعلها صالحة حتى لو تغيّرت الأدوات مع مرور الوقت.",
        ],
        list: [
          "التعامل مع مسارات RAG وسير العمل الوكيل والتقييم والحوكمة كقدرات منصة لا كميزات مشروع واحد.",
          "كتابة متطلبات السيادة والأمن داخل المكونات القابلة لإعادة الاستخدام، فيُورَّث الامتثال بدل أن يتكرر.",
          "الاتفاق على مقاييس الجودة قبل الإصدار الأول، والإبقاء عليها نفسها لكل التطبيقات.",
          "قياس المنصة بسرعة بناء التطبيق التالي، لا بمدى إبهار التطبيق الأول.",
          "إبقاء الفريق صغيرًا والمكونات مشتركة: فريق من 9 أشخاص لا يخدم عدة تطبيقات إلا إذا لم يبدأ كل منها من الصفر.",
        ],
      },
    ],
    take: "بعد 13 عامًا في بناء منتجات الذكاء الاصطناعي، أرى أن السيادة خاصية هندسية لا ملصق شراء: لا توجد إلا إذا دُمجت المتطلبات في مكونات يرثها كل مشروع. وأنفع ما أظهره لي العمل في DILA أن الحوكمة والسرعة ليستا نقيضين، فالمنصة المشتركة الخاضعة للحوكمة هي التي جعلت التسليم أسرع.",
    diagram: {
      nodes: ["حالات استخدام الخدمة العامة", "مكونات ذكاء اصطناعي قابلة لإعادة الاستخدام", "التقييم والحوكمة", "أساس سيادي"],
      caption: "تستند حالات الاستخدام إلى مكونات قابلة لإعادة الاستخدام، يضبطها التقييم والحوكمة، وكلها على أساس يحترم متطلبات السيادة.",
    },
    results: [
      { v: "70%", l: "أسرع في إنشاء المحتوى (DILA)" },
      { v: "−60%", l: "من زمن تسليم تطبيق RAG، من 10 أسابيع إلى 4 (DILA)" },
      { v: "75%", l: "من القدرات التقنية المشتركة أُعيد استخدامها (DILA)" },
      { v: "0.94", l: "أمانة RAG، مع تغطية 85% من السيناريوهات ذات الأولوية (DILA)" },
    ],
    faq: [
      {
        q: "ما هو الذكاء الاصطناعي التوليدي السيادي؟",
        a: "هو ذكاء اصطناعي توليدي يُنشر بحيث تحتفظ المؤسسة بالسيطرة على بياناتها واستضافتها وأمنها وقابلية التتبع. وبالنسبة لجهة عامة يعني ذلك الوفاء بمتطلبات صارمة للسيادة على البيانات والأمن وقابلية التتبع والامتثال التنظيمي، دون الاعتماد على ترتيب لا تستطيع تدقيقه أو شرحه للمواطنين.",
      },
      {
        q: "لماذا تحتاج المؤسسات العامة إلى منصة بدل مشاريع ذكاء اصطناعي منفصلة؟",
        a: "لأن المشاريع المنفصلة تعيد في كل مرة بناء الاستيعاب والاسترجاع والأمن والتقييم والمراقبة، فتتضاعف الكلفة ويتضاعف ما يجب تدقيقه. أما المنصة المشتركة فتبني هذه القدرات مرة واحدة، وتطبّق الحوكمة منذ التصميم، وتتيح لكل تطبيق جديد أن يرثها.",
      },
      {
        q: "كيف نقيّم نظام RAG في خدمة عامة؟",
        a: "بمقاييس ثابتة ومنهجية: الأمانة وملاءمة الإجابة ودقة السياق واسترجاع السياق، تُطبَّق على مجموعة محددة من السيناريوهات ذات الأولوية. وفي منصة DILA كانت النتائج 0.94 و0.91 و0.89 و0.92، مع تغطية 85% من سيناريوهات RAG ذات الأولوية.",
      },
      {
        q: "ما النتائج التي حققتها منصة DILA؟",
        a: "أصبح إنشاء المحتوى أسرع بنسبة 70%، وانخفض زمن تسليم تطبيق RAG بنسبة 60% من 10 أسابيع إلى 4، وأُعيد استخدام 75% من القدرات التقنية المشتركة. وانخفضت كلفة الطلب بنسبة 30% وزمن النمذجة الوكيلة بنسبة 50%.",
      },
      {
        q: "ما الدرس الأهم للجهات العامة الأخرى؟",
        a: "التعامل مع مسارات RAG وسير العمل الوكيل والتقييم والحوكمة كقدرات منصة قابلة لإعادة الاستخدام. عندها يصبح الذكاء الاصطناعي السيادي نموذجًا هندسيًا قابلًا للتوسع لا مجموعة تجارب منفصلة، ويصبح بناء التطبيق التالي أسرع وأوثق من سابقه.",
      },
    ],
  },
};
