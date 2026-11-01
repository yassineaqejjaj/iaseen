import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "What Is an AI Factory? How to Set One Up Inside a Large Organisation",
    dek: "An AI Factory is not a lab and not a slide. It is an operating model that turns scattered AI experiments into products, deliveries and skills that repeat. Here is how I set one up at Devoteam, and what I would warn you about.",
    answer:
      "An AI Factory is a standing team and operating model that turns AI demand into repeatable output. It combines a shared platform, delivery of applied AI engagements and workforce enablement, under one governance and one way of measuring value. Its purpose is to make the tenth AI use case cheaper and safer than the first.",
    sections: [
      {
        h: "What is an AI Factory?",
        p: [
          "The word factory is deliberate. A lab explores, a centre of excellence advises, a factory produces, and it produces the same kind of thing more reliably each time. I have been Head of AI Factory at Devoteam since 2026, and this article gives the definition I can defend, then what I did.",
        ],
      },
      {
        h: "Why do large organisations need one?",
        p: [
          "Without a factory, every team rebuilds the same things. One team builds a retrieval pipeline, another builds a slightly different one, a third buys a tool that overlaps with both. Evaluation is improvised, security reviews start from zero and nobody can say which use cases created value. The cost is not only money. It is the time during which good ideas wait in a queue because nobody owns the shared parts.",
          "A large group makes this worse. At Devoteam we are 10,000+ consultants in 25 countries, and demand for AI comes from sales, delivery, internal functions and clients, all at once and in different languages. A factory is the answer to a coordination problem: one place that owns the reusable parts, so that the people closest to the business can focus on the problem in front of them.",
          "It is also an answer to a skills problem. Tools without trained people produce demos, and trained people without tools produce frustration. The factory has to treat both as one system.",
        ],
      },
      {
        h: "What does an AI Factory contain?",
        p: [
          "My definition rests on three engines that feed each other. Remove one and the factory becomes something else: a platform team, a consultancy or a training department. The table shows what each one means in my case.",
        ],
        table: {
          head: ["Engine", "What it produces", "In my AI Factory", "Why it needs the others"],
          rows: [
            ["Platform", "Reusable products and components", "NOVA Suite, used by 800 employees", "Without delivery it has no real problems to solve"],
            ["Client delivery", "Applied AI engagements with measured outcomes", "DILA, Decathlon, Carrefour", "Without a platform every engagement starts from zero"],
            ["Enablement", "People who can use and challenge the output", "LEAP, Prompt Arena, 1,500+ professionals trained", "Without it adoption stalls at the pilot"],
          ],
        },
      },
      {
        h: "How did I set up the AI Factory at Devoteam?",
        p: [
          "I joined Devoteam in 2023 as Principal Product Manager, became Lead of AI in 2024 and took the Head of AI Factory role in 2026.",
          "The platform pillar is NOVA Suite. It was built by a cross-functional team of 15 people, and I insisted on product discipline: a roadmap, users, a feedback loop and release criteria, not a collection of prototypes. It reached 800 employees.",
          "Client delivery is the second pillar, and it keeps the platform honest. On the DILA platform, shared components and evaluation made delivery faster. At Decathlon, the public figures from my CV show a €4M programme with 13 people and 2.6x productivity gains from augmented teams. At Carrefour, the work was applied machine learning in a retail supply chain. Each engagement fed requirements back to the platform.",
          "Enablement is the third pillar, and it should not wait for the platform to be finished. LEAP, our internal learning programme, was built with a 5-person team and has trained 1,500+ professionals, and Prompt Arena gives people hands-on practice. A factory with no trained users ships tools into silence.",
        ],
      },
      {
        h: "How does an AI Factory run day to day?",
        p: [
          "A factory is a flow, so the rhythm matters more than the structure. These are habits that make a factory work, in general terms:",
        ],
        list: [
          "One intake for AI demand, so that a request from sales, a client or an internal function is triaged in the same way.",
          "A shared backlog where platform needs from engagements compete openly with roadmap ideas.",
          "A rule that anything built twice becomes a platform candidate.",
          "Evaluation before scale: no use case widens its audience until it has been tested against agreed criteria.",
          "Named owners for governance questions such as data classification, human approval and acceptable use.",
          "A learning loop where delivery teams report what broke, and training content is updated from it.",
        ],
      },
      {
        h: "What goes wrong with AI Factories?",
        p: [
          "The failure modes below are predictable, which is the good news.",
        ],
        list: [
          "A factory without demand. Teams build platforms for use cases that nobody asked for. Start from a business problem and from clients.",
          "A factory that becomes a bottleneck. If every AI request must pass through one central team, people route around it. The factory should own the shared parts, not every decision.",
          "A platform that ignores delivery. If the platform team never works on client problems, it optimises for elegance, not for use.",
          "Training as an afterthought. Rolling out a tool to thousands of people without practice produces low usage and a few enthusiasts.",
          "Governance as a final gate. Security and compliance involved at the end create delays. Involve them from the first design.",
          "Counting activity instead of value. Number of prototypes, workshops and attendees say little about the business.",
          "Public repositories mistaken for production. A published design is not a validated deployment, and I try to be clear about that distinction in my own work.",
        ],
      },
      {
        h: "How do you measure an AI Factory?",
        p: [
          "Measurement is where most factories are weakest, so I treat it as a design constraint. I use four lenses, and I avoid a single headline number, because each lens answers a different question.",
        ],
        table: {
          head: ["Lens", "Question", "Examples of signals"],
          rows: [
            ["Adoption", "Do people actually use what we build?", "Active users of the platform, share of a population reached, repeat use"],
            ["Delivery", "Are we faster and more reusable?", "Time to deliver an AI application, share of reused components, cost per request"],
            ["Quality", "Can we prove a release is better?", "Evaluation scores, regression results, coverage of priority scenarios"],
            ["Commercial and skills", "Does the Factory create business and capability?", "Commercial pipeline, people trained, repeat clients"],
          ],
        },
      },
      {
        h: "What did I see?",
        p: [
          "I want to separate facts from interpretation. The facts: NOVA Suite is used by 800 employees, built by a 15-person team, inside a group of 10,000+ consultants in 25 countries. LEAP was built with a 5-person team and has trained 1,500+ professionals. The AI Factory carries a €12M+ commercial pipeline.",
          "On DILA, the public-sector platform, the figures I can cite are 70% faster content creation and a 60% reduction in RAG application delivery time, from 10 weeks to 4, with 75% of common technical capabilities reused. This is the pattern I trust most: a shared platform and disciplined evaluation make delivery faster, and the speed is visible in client work, not only on a dashboard.",
          "My interpretation, which is a judgement rather than a measurement: the three engines reinforce each other. The platform gets sharper because delivery exposes real constraints, delivery gets faster because the platform exists and enablement creates both users and demand. I cannot isolate the contribution of each engine, and I would be suspicious of anyone who claims to.",
        ],
      },
    ],
    take: "An AI Factory earns its name when the tenth use case is cheaper and safer than the first, and not before. If I started again, I would train people earlier and I would say no to more requests, because a factory that accepts everything produces nothing in particular. Most of all, I would keep it attached to real client and business problems, since a factory with no demand is just an expensive platform team.",
    diagram: { nodes: ["Business demand", "Platform products", "Client delivery", "Enablement", "Value and governance"], caption: "An AI Factory turns demand into platform, delivery and skills, and measures the value that comes back." },
    results: [{ v: "800", l: "employees use NOVA at Devoteam" }, { v: "1,500+", l: "professionals trained through LEAP" }, { v: "€12M+", l: "commercial pipeline" }, { v: "15", l: "people in the NOVA team" }],
    faq: [
      {
        q: "What is the difference between an AI Factory and an AI centre of excellence?",
        a: "A centre of excellence mainly advises and sets standards. An AI Factory also produces: it runs a shared platform, delivers applied engagements and trains people. In my experience the difference is ownership of output, which forces trade-offs, roadmaps and measurement that advice alone never requires.",
      },
      {
        q: "What are the core components of an AI Factory?",
        a: "Three engines that feed each other: a platform of reusable products, delivery of applied AI work for real clients or business units, and workforce enablement. Around them sit governance, an intake for demand and a way to measure value. Remove one engine and the model weakens.",
      },
      {
        q: "How big does an AI Factory need to be?",
        a: "Size matters less than scope. Start with one platform product, one or two real engagements and a small training effort, then grow with demand. My platform team was cross-functional, not large, and the learning programme was built by a small team. I would not copy a headcount, I would copy the flow.",
      },
      {
        q: "How do you measure the value of an AI Factory?",
        a: "Use several lenses rather than one number: adoption, delivery speed and reuse, quality of releases, and commercial and skills outcomes. Avoid counting prototypes or workshops. Each signal should answer a decision someone has to take, such as whether to widen a rollout or fund a component.",
      },
      {
        q: "Should a company build the platform or buy one?",
        a: "It depends on what is differentiating. Buy commodity capabilities, build the parts that encode your context, governance and workflows. A factory can do both, but it must own the integration, the evaluation and the permissions, because those are where enterprise AI succeeds or fails.",
      },
    ],
  },
  fr: {
    title: "Qu’est-ce qu’une AI Factory ? Comment en créer une dans une grande organisation",
    dek: "Une AI Factory n’est ni un laboratoire ni une diapositive. C’est un modèle opérationnel qui transforme des expérimentations dispersées en produits, en livraisons et en compétences qui se répètent. Voici comment j’en ai monté une chez Devoteam, et ce contre quoi je mets en garde.",
    answer:
      "Une AI Factory est une équipe permanente et un modèle opérationnel qui transforme la demande d’IA en production répétable. Elle combine plateforme partagée, missions d’IA appliquée et montée en compétences, sous une même gouvernance. Son but : rendre le dixième cas d’usage moins coûteux et plus sûr que le premier.",
    sections: [
      {
        h: "Qu’est-ce qu’une AI Factory ?",
        p: [
          "Le mot « factory » est voulu. Un laboratoire explore, un centre d’excellence conseille, une usine produit, et elle produit de plus en plus fiablement la même chose. Je suis Head of AI Factory chez Devoteam depuis 2026. Voici la définition que je peux défendre, puis ce que j’ai fait.",
        ],
      },
      {
        h: "Pourquoi une grande entreprise a-t-elle besoin d’une AI Factory ?",
        p: [
          "Sans usine, chaque équipe reconstruit les mêmes briques. L’une développe un pipeline de recherche documentaire, une autre en développe un légèrement différent, une troisième achète un outil qui recoupe les deux. L’évaluation est improvisée, les revues de sécurité repartent de zéro et personne ne sait dire quels cas d’usage ont créé de la valeur.",
          "Un grand groupe aggrave le problème. Chez Devoteam, nous sommes plus de 10 000 consultants dans 25 pays, et la demande d’IA vient en même temps des équipes commerciales, de la livraison, des fonctions internes et des clients, dans plusieurs langues. L’AI Factory répond à un problème de coordination : un lieu qui possède les briques réutilisables, pour que ceux qui sont au plus près du métier se concentrent sur leur sujet.",
          "Elle répond aussi à un problème de compétences. Des outils sans personnes formées donnent des démonstrations, et des personnes formées sans outils donnent de la frustration. L’usine doit traiter les deux comme un seul système.",
        ],
      },
      {
        h: "Que contient une AI Factory ?",
        p: [
          "Ma définition repose sur trois moteurs qui s’alimentent mutuellement. Si l’on en retire un, on obtient autre chose : une équipe plateforme, un cabinet de conseil ou un service de formation. Le tableau montre ce que chacun recouvre dans mon cas.",
        ],
        table: {
          head: ["Moteur", "Ce qu’il produit", "Dans mon AI Factory", "Pourquoi il a besoin des autres"],
          rows: [
            ["Plateforme", "Produits et composants réutilisables", "NOVA Suite, utilisé par 800 collaborateurs", "Sans livraison, elle n’a pas de vrais problèmes à résoudre"],
            ["Livraison client", "Missions d’IA appliquée aux résultats mesurés", "DILA, Decathlon, Carrefour", "Sans plateforme, chaque mission repart de zéro"],
            ["Montée en compétences", "Des personnes capables d’utiliser et de challenger les résultats", "LEAP, Prompt Arena, plus de 1 500 professionnels formés", "Sans elle, l’adoption s’arrête au pilote"],
          ],
        },
      },
      {
        h: "Comment ai-je monté l’AI Factory chez Devoteam ?",
        p: [
          "J’ai rejoint Devoteam en 2023 comme Principal Product Manager, je suis devenu Lead of AI en 2024 puis Head of AI Factory en 2026.",
          "Le premier pilier est la plateforme. NOVA Suite a été construit par une équipe pluridisciplinaire de 15 personnes, et j’ai exigé une discipline produit : une feuille de route, des utilisateurs, une boucle de retours et des critères de mise en production, pas une collection de prototypes. Elle a atteint 800 collaborateurs.",
          "La livraison client est le deuxième pilier, et c’est elle qui garde la plateforme honnête. Sur la plateforme DILA, des composants partagés et l’évaluation ont accéléré les livraisons. Chez Decathlon, les chiffres publics de mon CV indiquent un programme de 4 M€ avec 13 personnes et des gains de productivité de 2,6x grâce à des équipes augmentées. Chez Carrefour, il s’agissait de machine learning appliqué à la chaîne logistique du commerce.",
          "La montée en compétences est le troisième pilier, et elle ne doit pas attendre que la plateforme soit terminée. LEAP, notre programme interne d’apprentissage, a été conçu par une équipe de 5 personnes et a formé plus de 1 500 professionnels, et Prompt Arena offre une pratique concrète.",
        ],
      },
      {
        h: "Comment une AI Factory fonctionne-t-elle au quotidien ?",
        p: [
          "Une usine est un flux, donc le rythme compte plus que la structure. Voici, en termes généraux, des habitudes qui font fonctionner une usine :",
        ],
        list: [
          "Un guichet unique pour la demande d’IA, afin qu’une demande commerciale, client ou interne soit triée de la même manière.",
          "Un backlog partagé où les besoins de plateforme issus des missions rivalisent ouvertement avec les idées de feuille de route.",
          "Une règle : tout ce qui est construit deux fois devient un candidat pour la plateforme.",
          "L’évaluation avant le passage à l’échelle : aucun cas d’usage n’élargit son public avant d’avoir été testé selon des critères convenus.",
          "Des responsables nommés pour les questions de gouvernance : classification des données, validation humaine, usage acceptable.",
          "Une boucle d’apprentissage où les équipes de livraison remontent ce qui a cassé, et où les contenus de formation sont mis à jour en conséquence.",
        ],
      },
      {
        h: "Quels sont les échecs fréquents d’une AI Factory ?",
        p: [
          "Ces échecs sont prévisibles.",
        ],
        list: [
          "Une usine sans demande. Des équipes construisent des plateformes pour des cas d’usage que personne n’a demandés. Partez d’un problème métier et de clients.",
          "Une usine qui devient un goulot d’étranglement. Si toute demande d’IA doit passer par une équipe centrale, les gens la contournent. L’usine doit porter les éléments communs, pas chaque décision.",
          "Une plateforme qui ignore la livraison. Si l’équipe plateforme ne travaille jamais sur des problèmes clients, elle optimise l’élégance et non l’usage.",
          "La formation traitée en dernier. Déployer un outil auprès de milliers de personnes sans pratique donne un usage faible et quelques passionnés.",
          "La gouvernance comme dernière barrière. Sécurité et conformité impliquées à la fin créent des retards. Associez-les dès la première conception.",
          "Compter l’activité plutôt que la valeur. Le nombre de prototypes, d’ateliers et de participants dit peu de chose sur l’entreprise.",
          "Confondre dépôt public et production. Une conception publiée n’est pas un déploiement validé, et je m’efforce d’être clair sur cette distinction dans mon propre travail.",
        ],
      },
      {
        h: "Comment mesurer la performance d’une AI Factory ?",
        p: [
          "La mesure est le point le plus faible de la plupart des usines, donc je la traite comme une contrainte de conception. J’utilise quatre angles et j’évite un chiffre unique, car chacun répond à une question différente.",
        ],
        table: {
          head: ["Angle", "Question", "Exemples de signaux"],
          rows: [
            ["Adoption", "Les gens utilisent-ils vraiment ce que nous construisons ?", "Utilisateurs actifs de la plateforme, part d’une population atteinte, usage récurrent"],
            ["Livraison", "Sommes-nous plus rapides et plus réutilisables ?", "Délai de livraison d’une application d’IA, part de composants réutilisés, coût par requête"],
            ["Qualité", "Peut-on prouver qu’une version est meilleure ?", "Scores d’évaluation, résultats de non-régression, couverture des scénarios prioritaires"],
            ["Business et compétences", "L’usine crée-t-elle des affaires et des capacités ?", "Pipeline commercial, personnes formées, clients récurrents"],
          ],
        },
      },
      {
        h: "Qu’ai-je observé ?",
        p: [
          "Je veux séparer les faits de l’interprétation. Les faits : NOVA Suite est utilisé par 800 collaborateurs, construit par une équipe de 15 personnes, au sein d’un groupe de plus de 10 000 consultants dans 25 pays. LEAP a été conçu avec une équipe de 5 personnes et a formé plus de 1 500 professionnels. L’AI Factory porte un pipeline commercial de plus de 12 M€.",
          "Sur DILA, la plateforme du secteur public, les chiffres que je peux citer sont une création de contenu 70 % plus rapide et un délai de livraison d’une application RAG réduit de 60 %, de 10 à 4 semaines, avec 75 % des capacités techniques communes réutilisées. C’est le schéma auquel je crois le plus : plateforme partagée et évaluation rigoureuse accélèrent la livraison.",
          "Mon interprétation, qui relève du jugement et non de la mesure : les trois moteurs se renforcent. La plateforme s’affine parce que la livraison révèle des contraintes réelles, la livraison accélère parce que la plateforme existe, et la montée en compétences crée à la fois des utilisateurs et de la demande. Je ne peux pas isoler l’apport de chaque moteur, et je me méfierais de quiconque prétend le faire.",
        ],
      },
    ],
    take: "Une AI Factory mérite son nom quand le dixième cas d’usage coûte moins cher et présente moins de risques que le premier, pas avant. Si je recommençais, je formerais les gens plus tôt et je dirais non à davantage de demandes, car une usine qui accepte tout ne produit rien de particulier. Surtout, je la garderais attachée à de vrais problèmes clients et métiers, car une usine sans demande n’est qu’une équipe plateforme coûteuse.",
    diagram: { nodes: ["Demande métier", "Produits plateforme", "Livraison client", "Montée en compétences", "Valeur et gouvernance"], caption: "Une AI Factory transforme la demande en plateforme, en livraison et en compétences, puis mesure la valeur qui revient." },
    results: [{ v: "800", l: "collaborateurs utilisent NOVA chez Devoteam" }, { v: "1 500+", l: "professionnels formés grâce à LEAP" }, { v: "12 M€+", l: "de pipeline commercial" }, { v: "15", l: "personnes dans l’équipe NOVA" }],
    faq: [
      {
        q: "Quelle différence entre une AI Factory et un centre d’excellence IA ?",
        a: "Un centre d’excellence conseille et fixe des standards. Une AI Factory produit aussi : elle exploite une plateforme partagée, livre des missions appliquées et forme des équipes. D’après mon expérience, la différence tient à la responsabilité du résultat, qui impose arbitrages, feuille de route et mesure, ce que le simple conseil n’exige jamais.",
      },
      {
        q: "Quels sont les composants essentiels d’une AI Factory ?",
        a: "Trois moteurs qui s’alimentent : une plateforme de produits réutilisables, la livraison de travaux d’IA appliquée pour de vrais clients ou métiers, et la montée en compétences des équipes. Autour, une gouvernance, un guichet de demande et une mesure de la valeur. Sans l’un des moteurs, le modèle s’affaiblit.",
      },
      {
        q: "Quelle taille doit avoir une AI Factory ?",
        a: "La taille compte moins que le périmètre. Commencez par un produit de plateforme, une ou deux vraies missions et un effort de formation modeste, puis grandissez avec la demande. Mon équipe plateforme était pluridisciplinaire plutôt que nombreuse, et le programme d’apprentissage a été conçu par une petite équipe. Je ne copierais pas un effectif, je copierais le flux.",
      },
      {
        q: "Comment mesurer la valeur d’une AI Factory ?",
        a: "Utilisez plusieurs angles plutôt qu’un chiffre unique : adoption, vitesse de livraison et réutilisation, qualité des versions, résultats commerciaux et compétences. Évitez de compter prototypes ou ateliers. Chaque indicateur doit éclairer une décision à prendre, par exemple élargir un déploiement ou financer un composant.",
      },
      {
        q: "Faut-il construire sa plateforme d’IA ou en acheter une ?",
        a: "Cela dépend de ce qui vous différencie. Achetez les capacités banalisées, construisez ce qui porte votre contexte, votre gouvernance et vos processus. Une usine peut faire les deux, mais elle doit maîtriser l’intégration, l’évaluation et les habilitations, car c’est là que l’IA d’entreprise réussit ou échoue.",
      },
    ],
  },
  ar: {
    title: "ما هو مصنع الذكاء الاصطناعي (AI Factory)؟ وكيف تُنشئ واحدًا داخل مؤسسة كبيرة",
    dek: "مصنع الذكاء الاصطناعي ليس مختبرًا ولا شريحة عرض. إنه نموذج تشغيلي يحوّل التجارب المتفرقة إلى منتجات وتسليمات ومهارات قابلة للتكرار. وهنا أروي كيف أنشأت واحدًا في Devoteam وما الذي أحذّر منه.",
    answer:
      "مصنع الذكاء الاصطناعي فريق دائم ونموذج تشغيلي يحوّل الطلب على الذكاء الاصطناعي إلى مخرجات قابلة للتكرار. يجمع بين منصة مشتركة وتنفيذ مشاريع تطبيقية ورفع كفاءة الموظفين، تحت حوكمة واحدة وطريقة واحدة لقياس القيمة. وغايته أن تصبح حالة الاستخدام العاشرة أقل كلفة وأكثر أمانًا من الأولى.",
    sections: [
      {
        h: "ما هو مصنع الذكاء الاصطناعي؟",
        p: [
          "اختيار كلمة المصنع مقصود. المختبر يستكشف ومركز التميّز يقدّم المشورة، أما المصنع فينتج، وينتج الشيء نفسه بموثوقية أكبر في كل مرة. أشغل منصب رئيس AI Factory في Devoteam منذ عام 2026، وسأعرض هنا التعريف الذي أستطيع الدفاع عنه ثم ما فعلته.",
        ],
      },
      {
        h: "لماذا تحتاج المؤسسات الكبيرة إلى مصنع للذكاء الاصطناعي؟",
        p: [
          "من دون مصنع، يعيد كل فريق بناء الأشياء نفسها. فريق يبني خط استرجاع للوثائق، وآخر يبني خطًا مختلفًا قليلًا، وثالث يشتري أداة تتداخل مع الاثنين. يصبح التقييم ارتجاليًا، وتبدأ مراجعات الأمن من الصفر، ولا يستطيع أحد أن يقول أي حالات الاستخدام صنعت قيمة. والكلفة ليست مالية فقط، بل هي الوقت الذي تنتظر فيه الأفكار الجيدة في طابور لأن أحدًا لا يملك الأجزاء المشتركة.",
          "والمجموعة الكبيرة تضاعف المشكلة. في Devoteam نحن أكثر من 10,000 مستشار في 25 دولة، ويأتي الطلب على الذكاء الاصطناعي من المبيعات والتنفيذ والوظائف الداخلية والعملاء في وقت واحد وبلغات مختلفة. فالمصنع جواب عن مشكلة تنسيق: مكان واحد يملك المكوّنات القابلة لإعادة الاستخدام، ليتفرغ الأقرب إلى النشاط لمشكلتهم.",
          "وهو جواب أيضًا عن مشكلة المهارات. أدوات بلا أشخاص مدرَّبين تنتج عروضًا تجريبية، وأشخاص مدرَّبون بلا أدوات ينتجون الإحباط. ويجب أن يعامل المصنع الأمرين كنظام واحد، فيبني الأدوات ويدرّب مستخدميها في الحركة نفسها، ويقيس أثرهما معًا بدل أن يترك كل جانب لإدارة مستقلة.",
        ],
      },
      {
        h: "مم يتكوّن مصنع الذكاء الاصطناعي؟",
        p: [
          "يقوم تعريفي على ثلاثة محركات يغذي بعضها بعضًا. وإذا حذفت أحدها صار المصنع شيئًا آخر: فريق منصة أو شركة استشارات أو إدارة تدريب. ويبيّن الجدول ما يعنيه كل محرك في حالتي.",
        ],
        table: {
          head: ["المحرك", "ما ينتجه", "في AI Factory لديّ", "لماذا يحتاج إلى الآخرين"],
          rows: [
            ["المنصة", "منتجات ومكوّنات قابلة لإعادة الاستخدام", "NOVA Suite، يستخدمه 800 موظف", "من دون التنفيذ لا تجد مشكلات حقيقية تحلّها"],
            ["التنفيذ لدى العملاء", "مشاريع ذكاء اصطناعي تطبيقية بنتائج مقيسة", "DILA وDecathlon وCarrefour", "من دون منصة يبدأ كل مشروع من الصفر"],
            ["رفع الكفاءة", "أشخاص قادرون على استخدام المخرجات ومساءلتها", "LEAP وPrompt Arena وتدريب أكثر من 1,500 متخصص", "من دونه يتوقف التبنّي عند التجربة"],
          ],
        },
      },
      {
        h: "كيف أنشأت AI Factory في Devoteam؟",
        p: [
          "انضممت إلى Devoteam عام 2023 بصفة Principal Product Manager، ثم أصبحت Lead of AI عام 2024، وتوليت منصب Head of AI Factory عام 2026.",
          "الركيزة الأولى هي المنصة. بُنيت NOVA Suite على يد فريق متعدد التخصصات من 15 شخصًا، وأصررت على انضباط المنتجات: خارطة طريق ومستخدمون وحلقة ملاحظات ومعايير إصدار، لا مجموعة نماذج أولية. وقد وصلت إلى 800 موظف.",
          "والتنفيذ لدى العملاء هو الركيزة الثانية، وهو ما يُبقي المنصة صادقة. في منصة DILA أسهمت المكوّنات المشتركة والتقييم في تسريع التسليم. وفي Decathlon تُظهر الأرقام العامة في سيرتي الذاتية برنامجًا بقيمة 4 ملايين يورو شارك فيه 13 شخصًا وحقق مكاسب إنتاجية بمعدل 2.6 ضعف بفضل الفرق المعزَّزة. وفي Carrefour كان العمل تعلّمًا آليًا تطبيقيًا في سلسلة إمداد تجارة التجزئة. وأعاد كل مشروع متطلباته إلى المنصة، فصارت أولويات المنتج تُحدَّد من مشكلات فعلية واجهها العملاء لا من تخمينات داخل الفريق.",
          "ورفع الكفاءة هو الركيزة الثالثة، ولا ينبغي أن ينتظر اكتمال المنصة. بُني LEAP، برنامج التعلّم الداخلي لدينا، على يد فريق من 5 أشخاص ودرّب أكثر من 1,500 متخصص، ويوفّر Prompt Arena ممارسة عملية. ومصنع بلا مستخدمين مدرَّبين يسلّم أدواته إلى الصمت، ولذلك أعدّ التدريب جزءًا من المنتج نفسه لا نشاطًا جانبيًا.",
        ],
      },
      {
        h: "كيف يعمل مصنع الذكاء الاصطناعي يومًا بيوم؟",
        p: [
          "المصنع تدفّق، لذلك الإيقاع أهم من الهيكل. هذه عادات تجعل المصنع يعمل، بعبارات عامة:",
        ],
        list: [
          "قناة واحدة لطلبات الذكاء الاصطناعي، حتى يُفرز الطلب من المبيعات أو العميل أو وظيفة داخلية بالطريقة نفسها.",
          "قائمة أعمال مشتركة تتنافس فيها احتياجات المنصة القادمة من المشاريع علنًا مع أفكار خارطة الطريق.",
          "قاعدة تقول إن كل ما بُني مرتين يصبح مرشحًا ليدخل المنصة.",
          "التقييم قبل التوسع: لا توسّع حالة استخدام جمهورها قبل اختبارها وفق معايير متفق عليها.",
          "مسؤولون معيّنون عن قضايا الحوكمة مثل تصنيف البيانات والموافقة البشرية والاستخدام المقبول.",
          "حلقة تعلّم يبلّغ فيها فريق التنفيذ عمّا تعطّل، ويُحدَّث محتوى التدريب بناءً عليه.",
        ],
      },
      {
        h: "ما أسباب إخفاق مصانع الذكاء الاصطناعي؟",
        p: [
          "أنماط الإخفاق التالية متوقعة، وهذا هو الخبر الجيد.",
        ],
        list: [
          "مصنع بلا طلب. تبني الفرق منصات لحالات استخدام لم يطلبها أحد. ابدأ من مشكلة في النشاط ومن العملاء.",
          "مصنع يتحوّل إلى عنق زجاجة. إذا وجب أن يمر كل طلب عبر فريق مركزي واحد، التفّ الناس عليه. على المصنع أن يملك الأجزاء المشتركة لا كل قرار.",
          "منصة تتجاهل التنفيذ. إذا لم يعمل فريق المنصة على مشكلات العملاء، فإنه يحسّن الأناقة لا الاستخدام.",
          "التدريب كفكرة لاحقة. نشر أداة لآلاف الأشخاص بلا ممارسة ينتج استخدامًا ضعيفًا وقلة من المتحمسين.",
          "الحوكمة كبوابة أخيرة. إشراك الأمن والامتثال في النهاية يسبب التأخير. أشركهما منذ التصميم الأول.",
          "عدّ النشاط بدل القيمة. عدد النماذج الأولية وورش العمل والحضور لا يقول الكثير عن النشاط التجاري.",
          "الخلط بين المستودع العام والإنتاج. التصميم المنشور ليس نشرًا مُتحقَّقًا منه، وأحرص على توضيح هذا الفرق في عملي.",
        ],
      },
      {
        h: "كيف تقيس أداء مصنع الذكاء الاصطناعي؟",
        p: [
          "القياس أضعف نقطة في معظم المصانع، لذلك أعامله كقيد تصميمي. أستخدم أربع زوايا وأتجنب رقمًا واحدًا رئيسًا، لأن كل زاوية تجيب عن سؤال مختلف. وأنصح بأن يُتفق مسبقًا على من يقرأ هذه المؤشرات وما القرار الذي ستخدمه، وإلا تحولت لوحة المتابعة إلى زينة لا تغيّر شيئًا.",
        ],
        table: {
          head: ["الزاوية", "السؤال", "أمثلة على المؤشرات"],
          rows: [
            ["التبنّي", "هل يستخدم الناس فعلًا ما نبنيه؟", "المستخدمون النشطون للمنصة، وحصة الفئة التي وصلنا إليها، والاستخدام المتكرر"],
            ["التنفيذ", "هل نحن أسرع وأكثر إعادةً للاستخدام؟", "زمن تسليم تطبيق ذكاء اصطناعي، وحصة المكوّنات المعاد استخدامها، وكلفة الطلب"],
            ["الجودة", "هل نستطيع إثبات أن إصدارًا ما أفضل؟", "درجات التقييم، ونتائج اختبار الانحدار، وتغطية السيناريوهات ذات الأولوية"],
            ["الأعمال والمهارات", "هل يصنع المصنع أعمالًا وقدرات؟", "خط الصفقات التجارية، والمتدرّبون، والعملاء المتكررون"],
          ],
        },
      },
      {
        h: "ماذا لاحظت؟",
        p: [
          "أريد أن أفصل الحقائق عن التفسير. الحقائق: يستخدم NOVA Suite 800 موظف، وقد بناه فريق من 15 شخصًا، داخل مجموعة تضم أكثر من 10,000 مستشار في 25 دولة. وبُني LEAP بفريق من 5 أشخاص ودرّب أكثر من 1,500 متخصص. ويحمل AI Factory خط صفقات تجارية يزيد على 12 مليون يورو.",
          "وفي DILA، منصة القطاع العام، الأرقام التي أستطيع الاستشهاد بها هي إنشاء محتوى أسرع بنسبة 70% وخفض زمن تسليم تطبيق RAG بنسبة 60%، من 10 أسابيع إلى 4، مع إعادة استخدام 75% من القدرات التقنية المشتركة. وهذا النمط الذي أثق به أكثر، وهو يختلف عن الوعود العامة: منصة مشتركة وتقييم منضبط يسرّعان التسليم، وتظهر السرعة في عمل العملاء لا في لوحة المؤشرات فقط.",
          "وتفسيري، وهو حكم لا قياس: تعزز المحركات الثلاثة بعضها بعضًا. تزداد المنصة حدّة لأن التنفيذ يكشف قيودًا حقيقية، ويتسارع التنفيذ لأن المنصة موجودة، ويخلق رفع الكفاءة مستخدمين وطلبًا معًا. ولا أستطيع عزل مساهمة كل محرك، وسأرتاب فيمن يزعم ذلك. كما أن إعادة الاستخدام التي ذكرتها في DILA لا تثبت وحدها نجاح المصنع كله، لكنها مؤشر جدّي على أن العمل المشترك يؤتي أثرًا ملموسًا.",
        ],
      },
    ],
    take: "يستحق مصنع الذكاء الاصطناعي اسمه حين تصبح حالة الاستخدام العاشرة أقل كلفة وأكثر أمانًا من الأولى، لا قبل ذلك. ولو بدأت من جديد لدرّبت الناس مبكرًا ولقلت لا لطلبات أكثر، لأن مصنعًا يقبل كل شيء لا ينتج شيئًا بعينه. وسأضع مقاييس القيمة منذ اليوم الأول لا بعد الإطلاق. وقبل كل شيء سأُبقيه مرتبطًا بمشكلات حقيقية للعملاء وللنشاط، فمصنع بلا طلب ليس إلا فريق منصة مكلفًا.",
    diagram: { nodes: ["الطلب المهني", "منتجات المنصة", "التنفيذ لدى العملاء", "رفع الكفاءة", "القيمة والحوكمة"], caption: "يحوّل مصنع الذكاء الاصطناعي الطلب إلى منصة وتنفيذ ومهارات، ثم يقيس القيمة العائدة." },
    results: [{ v: "800", l: "موظف يستخدمون NOVA في Devoteam" }, { v: "+1,500", l: "متخصص دُرّبوا عبر LEAP" }, { v: "+12M€", l: "خط صفقات تجارية" }, { v: "15", l: "شخصًا في فريق NOVA" }],
    faq: [
      {
        q: "ما الفرق بين مصنع الذكاء الاصطناعي ومركز التميّز؟",
        a: "يقدّم مركز التميّز المشورة ويضع المعايير في الأغلب. أما المصنع فينتج أيضًا: يشغّل منصة مشتركة وينفّذ مشاريع تطبيقية ويدرّب الفرق. وفي تجربتي يكمن الفرق في ملكية المخرجات، فهي تفرض مفاضلات وخارطة طريق وقياسًا لا تتطلبها المشورة وحدها.",
      },
      {
        q: "ما المكوّنات الأساسية لمصنع الذكاء الاصطناعي؟",
        a: "ثلاثة محركات يغذي بعضها بعضًا: منصة منتجات قابلة لإعادة الاستخدام، وتنفيذ أعمال ذكاء اصطناعي تطبيقية لعملاء حقيقيين أو وحدات أعمال، ورفع كفاءة الموظفين. وحولها حوكمة وقناة للطلب وطريقة لقياس القيمة. وإذا غاب محرك ضعف النموذج.",
      },
      {
        q: "ما الحجم المناسب لمصنع الذكاء الاصطناعي؟",
        a: "الحجم أقل أهمية من النطاق. ابدأ بمنتج منصة واحد ومشروع أو اثنين حقيقيين وجهد تدريب متواضع، ثم انمُ مع الطلب. كان فريق منصتي متعدد التخصصات لا كبيرًا، وبُني برنامج التعلّم على يد فريق صغير. لن أنسخ عددًا من الموظفين، بل أنسخ التدفق.",
      },
      {
        q: "كيف تقيس قيمة مصنع الذكاء الاصطناعي؟",
        a: "استخدم عدة زوايا بدل رقم واحد: التبنّي، وسرعة التسليم وإعادة الاستخدام، وجودة الإصدارات، والنتائج التجارية والمهارية. وتجنب عدّ النماذج الأولية أو الورش. يجب أن يخدم كل مؤشر قرارًا يتعين اتخاذه، مثل توسيع نشر ما أو تمويل مكوّن.",
      },
      {
        q: "هل تبني الشركة منصتها أم تشتريها؟",
        a: "يتوقف ذلك على ما يميّزك. اشترِ القدرات الشائعة، وابنِ ما يحمل سياقك وحوكمتك وسير عملك. يمكن للمصنع أن يفعل الأمرين، لكن عليه أن يملك التكامل والتقييم والصلاحيات، لأن نجاح الذكاء الاصطناعي المؤسسي أو إخفاقه يتقرر هناك.",
      },
    ],
  },
};
