import type { Content } from "../blog-types";

export const content: Content = {
  en: {
    title: "AI Agent Governance: Policies, Human Approval and Signed Receipts",
    dek: "A chatbot that is wrong produces a bad sentence. An agent that is wrong produces a bad action. Here is how I think about controlling what agents may do, and proving what they did.",
    answer:
      "AI agent governance means controlling what an agent may do and proving what it did. In practice it rests on three controls: a policy layer that decides, before each action, whether it is permitted, blocked or held; a human approval flow for risky actions; and a signed receipt that records the evidence.",
    sections: [
      {
        h: "Why do AI agents need governance that chatbots do not?",
        p: [
          "A chatbot answers. An agent acts: it issues a refund, changes a plan, activates a feature, invites a user. The output is no longer text that a person reads before deciding, it is a change in a real system.",
          "That shifts the question from “is the answer good?” to “was this agent allowed to do this, on whose authority, and can we prove it afterwards?”.",
        ],
      },
      {
        h: "What questions must a governance layer answer for every action?",
        p: [
          "I like the way TrustRail frames it. For every protected operation, the layer has to answer five questions: which agent requested it, who authorised that agent, what limits apply, whether the action was permitted, blocked or held for approval, and what evidence supports the outcome.",
          "Notice what is missing from that list: the model. Governance does not depend on how clever or well prompted the agent is. It sits between the agent and the system it wants to change, and it treats the agent as an untrusted requester, whatever model runs behind it.",
          "TrustRail is a public design study. Its README describes a V1 working against synthetic sandboxes (a fictional merchant and a fictional SaaS product), and states that no real money moves. It is not a production system, and I do not present it as one. It is a way to make the ideas concrete and testable.",
        ],
      },
      {
        h: "What does a policy layer solve?",
        p: [
          "A policy layer replaces “the prompt says it should not” with a rule that is evaluated before each action and cannot be argued with. A prompt is a request to the model. A policy is a decision taken outside the model.",
          "Three design choices matter more than the rules themselves. First, the policy engine should be pure: given a request, a grant and a set of rules, it returns a verdict, with no database and no side effects, so it is easy to test exhaustively. TrustRail describes its policy engine in exactly those terms, with grant chain validation alongside it.",
          "Second, authority should be delegated explicitly. An agent acts on behalf of a person or a company, and the grant that says so should be checked on every call, not assumed. Third, the verdict should be one of three outcomes, not two. Permitted and blocked are obvious. The third, held for approval, is what makes governance usable instead of obstructive.",
        ],
      },
      {
        h: "When should a human approve an agent action?",
        p: [
          "Not always. If every action waits for a person, the agent is a slow form and people start approving without reading. If nothing waits, you have given an unexplained actor write access. The answer is to tie the control to the consequence of the action.",
          "The table below is my own framing, not a TrustRail specification. The example actions are the kind the TrustRail README mentions (refunds, credits, plan changes, invitations); the tiers and controls are what I would start from.",
        ],
        table: {
          head: ["Action tier", "Example", "Control I would start from"],
          rows: [
            ["Read-only", "Look up an order or an account", "Allow within the grant, keep a receipt"],
            ["Reversible, low impact", "Invite a user, activate a feature", "Allow within explicit limits, review samples afterwards"],
            ["Costly or hard to reverse", "Refund above a limit, grant credit, change a plan", "Hold for human approval, then execute"],
            ["Outside the grant", "Any action the agent was never delegated", "Block, and record the attempt"],
          ],
        },
        list: [
          "Put the limit in the policy, not in the agent’s instructions.",
          "Show the approver the request, the grant and the reason it was held, so approval is a decision and not a click.",
          "Treat a blocked attempt as information: it tells you where the agent’s behaviour and its mandate disagree.",
        ],
      },
      {
        h: "What is a signed receipt, and why is it more than a log?",
        p: [
          "A log is written by the system that did the thing, and whoever controls that system can change it. A signed receipt is a record that a third party can verify without trusting the system that produced it.",
          "TrustRail’s README describes receipts signed with Ed25519 (as JWS) and a separate receipt verifier package, and says a flow was verified independently. That separation is the point. If the check needs the same database that holds the data, it proves little. If anyone with the public key can check a receipt, it can be handed to an auditor, a customer or a colleague as evidence.",
          "The receipt is also where the five governance questions end up: the requesting agent, the authority, the limits, the verdict and the outcome, in one verifiable record. It turns “we think the agent did this” into “here is the evidence”.",
        ],
      },
      {
        h: "How should an agent earn its autonomy?",
        p: [
          "Autonomy should be a setting that the evidence moves, not a decision made once at launch. I use the same logic in NOVA, where the security and governance layer includes an autonomy policy and external actions always follow the company policy. NOVA is used by 800 employees at Devoteam, and that scale is exactly why “the agent can do anything the tool allows” is not an acceptable default.",
          "My working sequence, which is my own method rather than a standard:",
        ],
        list: [
          "Start with read-only and with every consequential action held for approval.",
          "Watch what the approvers do. Actions they approve unchanged, every time, are candidates for a limit-based rule.",
          "Widen the grant in small steps, with explicit limits, and keep the ability to withdraw it.",
          "Narrow it straight away when receipts, errors or incidents show something you did not expect.",
        ],
      },
      {
        h: "What should you log for every agent action?",
        p: [
          "Log enough to reconstruct the decision, not only the outcome. A line saying “refund succeeded” is not an audit trail. These are the elements I would require on every protected action:",
        ],
        list: [
          "Who: the agent identity and the person or company that authorised it.",
          "What: the requested operation and its parameters.",
          "Under which rule: the grant and the policy version evaluated.",
          "The verdict: permitted, blocked or held, and the reason.",
          "Who approved, when, and what they saw, if a human was involved.",
          "The result in the target system, with an idempotency key so a retry does not repeat the action.",
          "The signature, so the record can be verified later.",
        ],
      },
      {
        h: "How far can you trust a design study like TrustRail?",
        p: [
          "Less than a product, and that is the honest answer. TrustRail’s README points to a build status document and a threat model that describes what it does and does not protect against, and says its test report records commands actually run, not claims. I find that tone more useful than a feature list, and it is the tone I try to keep here.",
          "What it offers today is concrete: TypeScript and Python SDKs, an MCP adapter exposing get_order, request_refund and get_action_status, runnable example agents, and two synthetic use cases. What it does not offer is evidence from real customers, real money or a regulated environment. Keeping audit trails is also a sensible reason to build this way in general, since rules such as the EU AI Act push organisations towards traceability, but a design study is not a compliance answer.",
        ],
      },
    ],
    take: "I would rather have an agent that is blocked and explains why than one that succeeds and cannot be audited. Governance is what makes it reasonable to give agents more to do, because the limits and the evidence exist before the incident. TrustRail is my attempt to make that argument concrete, in a sandbox where nothing real can go wrong.",
    diagram: {
      nodes: ["Agent request", "Policy check", "Human approval", "Action", "Signed receipt", "Audit and review"],
      caption: "Each request is checked and either permitted, blocked or held for approval. What the audit finds goes back into the policies.",
    },
    results: [
      { v: "Policies", l: "evaluated before each agent action" },
      { v: "3 outcomes", l: "permitted, blocked or held for approval" },
      { v: "Signed", l: "receipts (Ed25519 JWS), verifiable independently" },
      { v: "Synthetic", l: "sandboxes only: no real money moves" },
      { v: "800", l: "employees using NOVA at Devoteam" },
    ],
    faq: [
      {
        q: "What is AI agent governance?",
        a: "It is the set of controls that decide what an AI agent may do and record what it did. The core pieces are a policy layer evaluated before each action, human approval for risky actions, and signed receipts that give verifiable evidence of the outcome.",
      },
      {
        q: "Why are prompt instructions not enough to control an agent?",
        a: "A prompt is a request to the model, which can be misread, ignored or manipulated. A policy is evaluated outside the model, before the action, and returns a verdict. Governance should not depend on the agent behaving well.",
      },
      {
        q: "What is a signed receipt for an AI agent action?",
        a: "It is a cryptographically signed record of what was requested, who authorised it, which limits applied, the verdict and the result. Because it is signed, someone with the public key can verify it without trusting the system that produced it.",
      },
      {
        q: "Should a human approve every agent action?",
        a: "No. Approving everything makes the agent slow and trains people to click without reading. Tie approval to consequence: allow low-impact actions within explicit limits, hold costly or hard-to-reverse ones for a person, and block anything outside the grant.",
      },
      {
        q: "Is TrustRail ready for production?",
        a: "No. TrustRail is a public design study running against synthetic sandboxes, and its README states that no real money moves. It is useful to explore policies, approvals and receipts, but it should not be presented as a validated production system.",
      },
    ],
  },

  fr: {
    title: "Gouvernance des agents IA : politiques, validation humaine et reçus signés",
    dek: "Un chatbot qui se trompe produit une mauvaise phrase. Un agent qui se trompe produit une mauvaise action. Voici comment je pense le contrôle de ce que les agents peuvent faire, et la preuve de ce qu’ils ont fait.",
    answer:
      "La gouvernance des agents IA consiste à contrôler ce qu’un agent peut faire et à prouver ce qu’il a fait. Elle repose sur trois contrôles : une couche de politiques qui décide avant chaque action si elle est autorisée, bloquée ou en attente, une validation humaine pour les actions risquées, et un reçu signé qui consigne la preuve.",
    sections: [
      {
        h: "Pourquoi les agents IA exigent-ils une gouvernance que les chatbots n’exigent pas ?",
        p: [
          "Un chatbot répond. Un agent agit : il rembourse, change un forfait, active une fonctionnalité, invite un utilisateur. La sortie n’est plus un texte qu’une personne lit avant de décider, c’est une modification dans un système réel.",
          "La question change : on ne demande plus « la réponse est-elle bonne ? » mais « cet agent avait-il le droit de le faire, de la part de qui, et peut-on le prouver ensuite ? ».",
        ],
      },
      {
        h: "À quelles questions une couche de gouvernance doit-elle répondre pour chaque action ?",
        p: [
          "J’aime la façon dont TrustRail cadre le sujet. Pour chaque opération protégée, la couche doit répondre à cinq questions : quel agent l’a demandée, qui a autorisé cet agent, quelles limites s’appliquent, si l’action a été autorisée, bloquée ou mise en attente d’approbation, et quelles preuves appuient le résultat.",
          "Remarquez ce qui manque dans cette liste : le modèle. La gouvernance ne dépend pas de l’intelligence de l’agent ni de la qualité de son prompt. Elle se place entre l’agent et le système qu’il veut modifier, et traite l’agent comme un demandeur non fiable, quel que soit le modèle derrière.",
          "TrustRail est une étude de conception publique. Son README décrit une V1 qui fonctionne sur des bacs à sable synthétiques (un commerçant fictif et un produit SaaS fictif) et précise qu’aucun argent réel ne circule. Ce n’est pas un système de production et je ne le présente pas comme tel : c’est un moyen de rendre les idées concrètes et testables.",
        ],
      },
      {
        h: "Que résout une couche de politiques ?",
        p: [
          "Une couche de politiques remplace « le prompt dit de ne pas le faire » par une règle évaluée avant chaque action, qu’on ne peut pas discuter. Un prompt est une demande faite au modèle. Une politique est une décision prise en dehors du modèle.",
          "Trois choix de conception comptent plus que les règles elles-mêmes. D’abord, le moteur de politiques doit être pur : à partir d’une demande, d’une délégation et de règles, il renvoie un verdict, sans base de données ni effet de bord, ce qui permet de le tester de façon exhaustive. TrustRail décrit son moteur en ces termes, avec une validation de la chaîne de délégations à côté.",
          "Ensuite, l’autorité doit être déléguée explicitement. Un agent agit au nom d’une personne ou d’une entreprise, et la délégation qui le dit doit être vérifiée à chaque appel, pas supposée. Enfin, le verdict doit avoir trois issues, pas deux. Autorisé et bloqué sont évidents. La troisième, la mise en attente d’approbation, rend la gouvernance utilisable au lieu d’être un frein.",
        ],
      },
      {
        h: "Quand un humain doit-il valider une action d’agent ?",
        p: [
          "Pas toujours. Si chaque action attend une personne, l’agent devient un formulaire lent et les gens finissent par valider sans lire. Si rien n’attend, vous avez donné un accès en écriture à un acteur que vous ne savez pas expliquer. La réponse consiste à lier le contrôle à la conséquence de l’action.",
          "Le tableau ci-dessous est mon propre cadrage, pas une spécification de TrustRail. Les exemples d’actions sont du type que mentionne le README (remboursements, crédits, changements de forfait, invitations) ; les niveaux et les contrôles sont mon point de départ.",
        ],
        table: {
          head: ["Niveau d’action", "Exemple", "Contrôle par lequel je commencerais"],
          rows: [
            ["Lecture seule", "Consulter une commande ou un compte", "Autoriser dans la délégation, conserver un reçu"],
            ["Réversible, faible impact", "Inviter un utilisateur, activer une fonctionnalité", "Autoriser dans des limites explicites, relire des échantillons ensuite"],
            ["Coûteuse ou difficile à annuler", "Remboursement au-dessus d’une limite, crédit, changement de forfait", "Mettre en attente de validation humaine, puis exécuter"],
            ["Hors délégation", "Toute action jamais déléguée à l’agent", "Bloquer et consigner la tentative"],
          ],
        },
        list: [
          "Placer la limite dans la politique, pas dans les instructions de l’agent.",
          "Montrer à la personne qui valide la demande, la délégation et la raison de la mise en attente : valider doit être une décision, pas un clic.",
          "Traiter une tentative bloquée comme une information : elle révèle où le comportement de l’agent et son mandat divergent.",
        ],
      },
      {
        h: "Qu’est-ce qu’un reçu signé, et en quoi est-ce plus qu’un journal ?",
        p: [
          "Un journal est écrit par le système qui a fait l’action, et celui qui contrôle ce système peut le modifier. Un reçu signé est un enregistrement qu’un tiers peut vérifier sans faire confiance au système qui l’a produit.",
          "Le README de TrustRail décrit des reçus signés en Ed25519 (au format JWS) et un paquet de vérification distinct, et indique qu’un parcours a été vérifié de façon indépendante. Cette séparation est le point essentiel. Si la vérification exige la base qui contient les données, elle prouve peu. Si toute personne disposant de la clé publique peut contrôler un reçu, celui-ci peut être remis à un auditeur, un client ou un collègue comme preuve.",
          "Le reçu est aussi l’endroit où se retrouvent les cinq questions de gouvernance : l’agent demandeur, l’autorité, les limites, le verdict et le résultat, dans un seul enregistrement vérifiable. Il transforme « nous pensons que l’agent a fait ceci » en « voici la preuve ».",
        ],
      },
      {
        h: "Comment un agent doit-il gagner son autonomie ?",
        p: [
          "L’autonomie doit être un réglage que les preuves font bouger, pas une décision prise une fois au lancement. J’applique la même logique dans NOVA, dont la couche de sécurité et de gouvernance comprend une politique d’autonomie, et dont les actions externes suivent toujours la politique de l’entreprise. NOVA est utilisé par 800 collaborateurs chez Devoteam : à cette échelle, « l’agent peut tout ce que l’outil permet » n’est pas une valeur par défaut acceptable.",
          "Ma séquence de travail, qui est ma méthode et non un standard :",
        ],
        list: [
          "Commencer en lecture seule, avec toute action à conséquence mise en attente de validation.",
          "Observer ce que font les validateurs. Les actions qu’ils approuvent sans changement, à chaque fois, sont candidates à une règle fondée sur des limites.",
          "Élargir la délégation par petits pas, avec des limites explicites, en gardant la possibilité de la retirer.",
          "La restreindre immédiatement quand les reçus, les erreurs ou les incidents montrent quelque chose d’inattendu.",
        ],
      },
      {
        h: "Que faut-il journaliser pour chaque action d’agent ?",
        p: [
          "Journalisez assez pour reconstituer la décision, pas seulement le résultat. Une ligne « remboursement réussi » n’est pas une piste d’audit. Voici les éléments que j’exigerais sur chaque action protégée :",
        ],
        list: [
          "Qui : l’identité de l’agent et la personne ou l’entreprise qui l’a autorisé.",
          "Quoi : l’opération demandée et ses paramètres.",
          "Selon quelle règle : la délégation et la version de politique évaluées.",
          "Le verdict : autorisé, bloqué ou mis en attente, et la raison.",
          "Qui a validé, quand, et ce que cette personne a vu, si un humain est intervenu.",
          "Le résultat dans le système cible, avec une clé d’idempotence pour qu’un nouvel essai ne répète pas l’action.",
          "La signature, pour pouvoir vérifier l’enregistrement plus tard.",
        ],
      },
      {
        h: "Quelle confiance accorder à une étude de conception comme TrustRail ?",
        p: [
          "Moins qu’à un produit, et c’est la réponse honnête. Le README de TrustRail renvoie à un état d’avancement et à un modèle de menaces qui décrit ce que le projet protège ou non, et précise que son rapport de tests consigne des commandes réellement exécutées, pas des affirmations. Je trouve ce ton plus utile qu’une liste de fonctionnalités, et c’est celui que j’essaie de tenir ici.",
          "Ce que le projet offre aujourd’hui est concret : des SDK TypeScript et Python, un adaptateur MCP exposant get_order, request_refund et get_action_status, des agents d’exemple exécutables et deux cas d’usage synthétiques. Il n’offre pas de preuves issues de clients réels, d’argent réel ou d’un environnement réglementé. Conserver des pistes d’audit est aussi une bonne raison de construire ainsi, car des textes comme le règlement européen sur l’IA poussent les organisations vers la traçabilité, mais une étude de conception n’est pas une réponse de conformité.",
        ],
      },
    ],
    take: "Je préfère un agent bloqué qui explique pourquoi à un agent qui réussit sans qu’on puisse l’auditer. La gouvernance est ce qui permet de confier davantage aux agents, car les limites et les preuves existent avant l’incident. TrustRail est ma tentative de rendre cet argument concret, dans un bac à sable où rien de réel ne peut mal tourner.",
    diagram: {
      nodes: ["Demande de l’agent", "Vérification des politiques", "Validation humaine", "Action", "Reçu signé", "Audit et revue"],
      caption: "Chaque demande est vérifiée, puis autorisée, bloquée ou mise en attente. Ce que l’audit révèle retourne dans les politiques.",
    },
    results: [
      { v: "Politiques", l: "évaluées avant chaque action d’agent" },
      { v: "3 issues", l: "autorisée, bloquée ou en attente d’approbation" },
      { v: "Signés", l: "reçus (Ed25519, JWS), vérifiables indépendamment" },
      { v: "Synthétiques", l: "bacs à sable uniquement : aucun argent réel" },
      { v: "800", l: "collaborateurs utilisant NOVA chez Devoteam" },
    ],
    faq: [
      {
        q: "Qu’est-ce que la gouvernance des agents IA ?",
        a: "C’est l’ensemble des contrôles qui décident de ce qu’un agent IA peut faire et consignent ce qu’il a fait. Les briques centrales sont une couche de politiques évaluée avant chaque action, une validation humaine pour les actions risquées et des reçus signés qui apportent une preuve vérifiable.",
      },
      {
        q: "Pourquoi les instructions du prompt ne suffisent-elles pas à contrôler un agent ?",
        a: "Un prompt est une demande faite au modèle, qui peut la mal lire, l’ignorer ou être manipulé. Une politique est évaluée en dehors du modèle, avant l’action, et renvoie un verdict. La gouvernance ne doit pas dépendre du bon comportement de l’agent.",
      },
      {
        q: "Qu’est-ce qu’un reçu signé pour une action d’agent IA ?",
        a: "C’est un enregistrement signé cryptographiquement de ce qui a été demandé, de qui l’a autorisé, des limites appliquées, du verdict et du résultat. Comme il est signé, quiconque détient la clé publique peut le vérifier sans faire confiance au système qui l’a produit.",
      },
      {
        q: "Un humain doit-il valider chaque action d’un agent ?",
        a: "Non. Tout valider ralentit l’agent et habitue les gens à cliquer sans lire. Liez la validation à la conséquence : autorisez les actions à faible impact dans des limites explicites, mettez en attente celles qui coûtent cher ou sont difficiles à annuler, et bloquez tout ce qui sort de la délégation.",
      },
      {
        q: "TrustRail est-il prêt pour la production ?",
        a: "Non. TrustRail est une étude de conception publique qui fonctionne sur des bacs à sable synthétiques, et son README précise qu’aucun argent réel ne circule. Il sert à explorer les politiques, les validations et les reçus, mais ne doit pas être présenté comme un système de production validé.",
      },
    ],
  },

  ar: {
    title: "حوكمة وكلاء الذكاء الاصطناعي: السياسات والموافقة البشرية والإيصالات الموقّعة",
    dek: "روبوت المحادثة حين يخطئ ينتج جملة سيئة، أما الوكيل حين يخطئ فينتج إجراءً سيئًا. هكذا أفكر في ضبط ما يجوز للوكلاء فعله، وإثبات ما فعلوه.",
    answer:
      "حوكمة وكلاء الذكاء الاصطناعي تعني ضبط ما يجوز للوكيل فعله وإثبات ما فعله. وتقوم عمليًا على ثلاث ضوابط: طبقة سياسات تقرر قبل كل إجراء هل هو مسموح أو محظور أو معلَّق، وتدفق موافقة بشرية للإجراءات الخطرة، وإيصال موقَّع يسجّل الدليل الذي يمكن الرجوع إليه.",
    sections: [
      {
        h: "لماذا يحتاج وكلاء الذكاء الاصطناعي إلى حوكمة لا تحتاجها روبوتات المحادثة؟",
        p: [
          "روبوت المحادثة يجيب، أما الوكيل فيتصرف: يردّ مبلغًا، ويغيّر خطة اشتراك، ويفعّل ميزة، ويدعو مستخدمًا. لم يعد الناتج نصًا يقرؤه شخص قبل أن يقرر، بل صار تغييرًا في نظام حقيقي.",
          "وهكذا يتحول السؤال من « هل الجواب جيد؟ » إلى « هل كان مسموحًا لهذا الوكيل بفعل ذلك، وبتفويض من من، وهل نستطيع إثباته لاحقًا؟ ». ولا تكفي هنا الأدوات التي صُممت لمراقبة النصوص، لأن المطلوب ضبط الأفعال نفسها قبل وقوعها، وترك أثر يمكن الرجوع إليه بعد وقوعها.",
        ],
      },
      {
        h: "ما الأسئلة التي يجب أن تجيب عنها طبقة الحوكمة لكل إجراء؟",
        p: [
          "يعجبني الإطار الذي يعتمده TrustRail. فعن كل عملية محمية يجب أن تجيب الطبقة عن خمسة أسئلة: أي وكيل طلبها، ومن فوّض هذا الوكيل، وما الحدود المطبَّقة، وهل كان الإجراء مسموحًا أو محظورًا أو معلَّقًا بانتظار الموافقة، وما الأدلة التي تسند النتيجة.",
          "لاحظ ما ليس في هذه القائمة: النموذج. فالحوكمة لا تتوقف على ذكاء الوكيل ولا على جودة تعليماته. إنها تقف بين الوكيل والنظام الذي يريد تغييره، وتعامل الوكيل بوصفه طالبًا غير موثوق، أيًّا كان النموذج الذي يعمل خلفه. وهذا ما يجعل الضوابط قابلة للبقاء حين يتبدل النموذج أو تتغير التعليمات أو يُستبدل الوكيل بآخر.",
          "TrustRail دراسة تصميم عامة. يصف ملف README الخاص به إصدارًا أول يعمل على بيئات تجريبية اصطناعية (تاجر خيالي ومنتج SaaS خيالي)، وينص على أنه لا أموال حقيقية تتحرك. وهو ليس نظام إنتاج ولا أقدّمه على هذا الأساس، بل وسيلة لجعل الأفكار ملموسة وقابلة للاختبار.",
        ],
      },
      {
        h: "ما المشكلة التي تحلّها طبقة السياسات؟",
        p: [
          "تستبدل طبقة السياسات عبارة « التعليمات تقول ألّا يفعل ذلك » بقاعدة تُقيَّم قبل كل إجراء ولا يمكن الجدال معها. التعليمات طلب موجَّه إلى النموذج، أما السياسة فقرار يُتخذ خارج النموذج.",
          "ثلاثة خيارات تصميمية أهم من القواعد نفسها. أولًا، يجب أن يكون محرك السياسات نقيًا: يتلقى طلبًا وتفويضًا ومجموعة قواعد ويعيد حكمًا، بلا قاعدة بيانات ولا آثار جانبية، فيسهل اختباره اختبارًا شاملًا. ويصف TrustRail محرك سياساته بهذه العبارات، مع تحقق من سلسلة التفويض إلى جانبه.",
          "ثانيًا، يجب أن تُفوَّض السلطة صراحةً. فالوكيل يتصرف باسم شخص أو شركة، والتفويض الذي يقول ذلك يجب أن يُفحص في كل استدعاء لا أن يُفترض. ثالثًا، يجب أن يكون للحكم ثلاث نتائج لا اثنتان. المسموح والمحظور واضحان، أما الثالثة، أي التعليق بانتظار الموافقة، فهي ما يجعل الحوكمة قابلة للاستخدام بدل أن تكون عائقًا. فالإجراء الذي يتجاوز حدًا معينًا لا يُرفض بالضرورة، بل يُوقَف إلى أن يراجعه شخص مسؤول، ويستأنف بعد ذلك أو يُلغى.",
        ],
      },
      {
        h: "متى ينبغي أن يوافق إنسان على إجراء يقوم به وكيل؟",
        p: [
          "ليس دائمًا. إذا انتظر كل إجراء شخصًا صار الوكيل استمارة بطيئة، وبدأ الناس يوافقون دون قراءة. وإذا لم ينتظر شيء فقد منحتَ جهة لا تستطيع تفسير سلوكها صلاحية كتابة. والحل أن تربط الضابط بعواقب الإجراء.",
          "الجدول التالي من صياغتي أنا، وليس مواصفة من TrustRail. أمثلة الإجراءات من النوع الذي يذكره README (ردّ المبالغ، والأرصدة، وتغيير الخطط، والدعوات)، أما المستويات والضوابط فهي نقطة البداية التي أقترحها.",
        ],
        table: {
          head: ["مستوى الإجراء", "مثال", "الضابط الذي أبدأ به"],
          rows: [
            ["قراءة فقط", "الاطلاع على طلب أو حساب", "السماح ضمن التفويض مع حفظ إيصال"],
            ["قابل للعكس، أثر منخفض", "دعوة مستخدم، تفعيل ميزة", "السماح ضمن حدود صريحة ومراجعة عينات لاحقًا"],
            ["مكلف أو يصعب عكسه", "ردّ مبلغ يتجاوز حدًا، منح رصيد، تغيير خطة", "التعليق بانتظار موافقة بشرية ثم التنفيذ"],
            ["خارج التفويض", "أي إجراء لم يُفوَّض به الوكيل قط", "الحظر وتسجيل المحاولة"],
          ],
        },
        list: [
          "ضع الحد في السياسة لا في تعليمات الوكيل.",
          "اعرض على من يوافق الطلب والتفويض وسبب التعليق، لتكون الموافقة قرارًا لا نقرة.",
          "عامل المحاولة المحظورة معلومة: فهي تبيّن أين يختلف سلوك الوكيل عن صلاحياته.",
        ],
      },
      {
        h: "ما الإيصال الموقَّع، ولماذا هو أكثر من سجل؟",
        p: [
          "السجل يكتبه النظام الذي نفّذ الفعل، ومن يتحكم في ذلك النظام يستطيع تعديله. أما الإيصال الموقَّع فهو سجل يستطيع طرف ثالث التحقق منه دون أن يثق بالنظام الذي أنتجه.",
          "يصف README الخاص بـ TrustRail إيصالات موقَّعة بخوارزمية Ed25519 (بصيغة JWS) وحزمة تحقق منفصلة، ويذكر أن أحد المسارات جرى التحقق منه بصورة مستقلة. وهذا الفصل هو الجوهر. فإذا احتاج التحقق إلى قاعدة البيانات نفسها التي تحمل البيانات فهو يثبت القليل. أما إذا استطاع كل من يملك المفتاح العام فحص الإيصال، أمكن تسليمه إلى مدقق أو عميل أو زميل دليلًا.",
          "والإيصال هو أيضًا المكان الذي تلتقي فيه أسئلة الحوكمة الخمسة: الوكيل الطالب، والسلطة، والحدود، والحكم، والنتيجة، في سجل واحد قابل للتحقق. فهو يحوّل « نظن أن الوكيل فعل كذا » إلى « هذا هو الدليل ». ويصبح النقاش بعد أي حادثة أقصر وأوضح، لأن الجميع ينظرون إلى السجل نفسه بدل أن يتبادلوا الروايات.",
        ],
      },
      {
        h: "كيف يكسب الوكيل استقلاليته؟",
        p: [
          "ينبغي أن تكون الاستقلالية إعدادًا تحركه الأدلة، لا قرارًا يُتخذ مرة واحدة عند الإطلاق. وأطبّق المنطق نفسه في NOVA، حيث تضم طبقة الأمان والحوكمة سياسة استقلالية، وتتبع الإجراءات الخارجية دائمًا سياسة الشركة. ويستخدم NOVA ثمانمئة موظف في Devoteam، ولهذا الحجم تحديدًا لا يصلح أن يكون الافتراضي « الوكيل يفعل كل ما تسمح به الأداة ».",
          "وهذا تسلسل عملي من منهجي الخاص وليس معيارًا، والغاية منه أن تتحرك الصلاحيات بقدر ما يتراكم من أدلة، لا بقدر ما يتزايد الحماس للتجربة:",
        ],
        list: [
          "ابدأ بالقراءة فقط، مع تعليق كل إجراء ذي أثر بانتظار الموافقة.",
          "راقب ما يفعله من يوافقون. الإجراءات التي يقبلونها دون تعديل في كل مرة مرشحة لقاعدة قائمة على الحدود.",
          "وسّع التفويض بخطوات صغيرة وحدود صريحة، مع إبقاء القدرة على سحبه.",
          "ضيّقه فورًا حين تُظهر الإيصالات أو الأخطاء أو الحوادث شيئًا لم تتوقعه.",
        ],
      },
      {
        h: "ماذا ينبغي تسجيله لكل إجراء يقوم به وكيل؟",
        p: [
          "سجّل ما يكفي لإعادة بناء القرار، لا النتيجة وحدها. فسطر يقول « نجح الردّ » ليس مسار تدقيق. والهدف أن يستطيع شخص لم يحضر الواقعة أن يفهم ما جرى دون أن يسأل أحدًا. وهذه العناصر التي أشترطها في كل إجراء محمي:",
        ],
        list: [
          "من: هوية الوكيل والشخص أو الشركة التي فوّضته.",
          "ماذا: العملية المطلوبة ومعاملاتها.",
          "وفق أي قاعدة: التفويض ونسخة السياسة التي قُيِّمت.",
          "الحكم: مسموح أو محظور أو معلَّق، والسبب.",
          "من وافق ومتى وماذا رأى، إن تدخل إنسان.",
          "النتيجة في النظام المستهدف، مع مفتاح تكرار آمن كي لا تعيد المحاولة الثانية الإجراء نفسه.",
          "التوقيع، ليمكن التحقق من السجل لاحقًا.",
        ],
      },
      {
        h: "إلى أي مدى يمكن الوثوق بدراسة تصميم مثل TrustRail؟",
        p: [
          "أقل من الوثوق بمنتج، وهذا هو الجواب الصادق. يشير README الخاص بـ TrustRail إلى وثيقة حالة البناء ونموذج تهديدات يصف ما يحميه المشروع وما لا يحميه، ويذكر أن تقرير الاختبارات يسجل أوامر نُفِّذت فعلًا لا ادعاءات. وأجد هذه النبرة أنفع من قائمة ميزات، وهي النبرة التي أحاول الالتزام بها هنا. فالمشروع يعرض حدوده بوضوح، وهذا بحد ذاته جزء من الحوكمة: ألّا يدّعي النظام أكثر مما أُثبت.",
          "وما يقدمه المشروع اليوم ملموس: حزم تطوير بلغتي TypeScript وPython، ومحوّل MCP يعرض get_order وrequest_refund وget_action_status، ووكلاء أمثلة قابلون للتشغيل، وحالتا استخدام اصطناعيتان. أما ما لا يقدمه فهو أدلة من عملاء حقيقيين أو أموال حقيقية أو بيئة خاضعة للتنظيم. والاحتفاظ بمسارات التدقيق سبب وجيه للبناء بهذه الطريقة عمومًا، إذ تدفع أنظمة مثل قانون الاتحاد الأوروبي للذكاء الاصطناعي المؤسسات نحو قابلية التتبع، لكن دراسة التصميم ليست جوابًا عن الامتثال، ولا أدّعي لها أي شهادة أو مصادقة خارجية. قيمتها أنها تتيح لفريقك أن يجرّب الفكرة ويرى أين تنفع وأين تحتاج إلى عمل إضافي قبل أن يقترب من أنظمة حقيقية.",
        ],
      },
    ],
    take: "أفضّل وكيلًا محظورًا يشرح السبب على وكيل ينجح ولا يمكن تدقيقه. والحوكمة هي ما يجعل من المعقول أن نوكل إلى الوكلاء مهام أكثر، لأن الحدود والأدلة موجودة قبل وقوع الحادثة. وTrustRail محاولتي لجعل هذه الحجة ملموسة، في بيئة تجريبية لا يمكن أن يسوء فيها شيء حقيقي.",
    diagram: {
      nodes: ["طلب الوكيل", "فحص السياسات", "موافقة بشرية", "الإجراء", "إيصال موقَّع", "تدقيق ومراجعة"],
      caption: "يُفحص كل طلب ثم يكون مسموحًا أو محظورًا أو معلَّقًا بانتظار الموافقة. وما يكشفه التدقيق يعود إلى السياسات.",
    },
    results: [
      { v: "سياسات", l: "تُقيَّم قبل كل إجراء يقوم به وكيل" },
      { v: "3 نتائج", l: "مسموح أو محظور أو معلَّق بانتظار الموافقة" },
      { v: "موقَّعة", l: "إيصالات (Ed25519 بصيغة JWS) قابلة للتحقق باستقلال" },
      { v: "اصطناعية", l: "بيئات تجريبية فقط: لا أموال حقيقية" },
      { v: "800", l: "موظف يستخدمون NOVA في Devoteam" },
    ],
    faq: [
      {
        q: "ما حوكمة وكلاء الذكاء الاصطناعي؟",
        a: "هي مجموعة الضوابط التي تقرر ما يجوز لوكيل الذكاء الاصطناعي فعله وتسجّل ما فعله. وأركانها الأساسية طبقة سياسات تُقيَّم قبل كل إجراء، وموافقة بشرية للإجراءات الخطرة، وإيصالات موقَّعة تقدّم دليلًا يمكن التحقق منه.",
      },
      {
        q: "لماذا لا تكفي تعليمات الموجِّه لضبط الوكيل؟",
        a: "التعليمات طلب موجَّه إلى النموذج، وقد يسيء فهمه أو يتجاهله أو يتعرض للتلاعب. أما السياسة فتُقيَّم خارج النموذج وقبل الإجراء وتعيد حكمًا. ولا ينبغي أن تتوقف الحوكمة على حسن سلوك الوكيل.",
      },
      {
        q: "ما الإيصال الموقَّع لإجراء يقوم به وكيل ذكاء اصطناعي؟",
        a: "هو سجل موقَّع تشفيريًا لما طُلب، ومن فوّض به، والحدود التي طُبقت، والحكم، والنتيجة. ولأنه موقَّع يستطيع من يملك المفتاح العام التحقق منه دون الوثوق بالنظام الذي أنتجه، ولذلك يصلح دليلًا أمام المدقق.",
      },
      {
        q: "هل يجب أن يوافق إنسان على كل إجراء يقوم به الوكيل؟",
        a: "لا. الموافقة على كل شيء تبطّئ الوكيل وتعوّد الناس النقر دون قراءة. اربط الموافقة بالعواقب: اسمح بالإجراءات منخفضة الأثر ضمن حدود صريحة، وعلّق المكلفة أو التي يصعب عكسها بانتظار شخص، واحظر كل ما يخرج عن التفويض، وراجع النتائج بانتظام.",
      },
      {
        q: "هل TrustRail جاهز للإنتاج؟",
        a: "لا. TrustRail دراسة تصميم عامة تعمل على بيئات تجريبية اصطناعية، وينص README الخاص به على أنه لا أموال حقيقية تتحرك. يفيد في استكشاف السياسات والموافقات والإيصالات، لكن لا ينبغي تقديمه نظام إنتاج مُصادَقًا عليه.",
      },
    ],
  },
};
