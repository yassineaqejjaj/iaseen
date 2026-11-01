import type { Locale } from "./i18n";

/**
 * Key results shown on project cards, case pages, the NOVA page and the CV roles.
 * Values are the ones supplied by the author. Thales is deliberately absent (client approval pending).
 * `top` lists the three indices shown on a card; `all` feeds the full tables.
 */
export type Kpi = { v: string; l: { en: string; fr: string; ar: string } };
type KpiSet = { all: Kpi[]; top: [number, number, number] };

const k = (v: string, en: string, fr: string, ar: string): Kpi => ({ v, l: { en, fr, ar } });

export const KPIS: Record<string, KpiSet> = {
  // ---- Client missions
  "dila-sovereign-ai": {
    all: [
      k("−60%", "RAG delivery time reduction", "Réduction du délai de livraison RAG", "تقليص زمن تسليم RAG"),
      k("75%", "Component reuse rate", "Taux de réutilisation des composants", "معدل إعادة استخدام المكوّنات"),
      k("0.94", "Answer faithfulness", "Fidélité des réponses", "أمانة الإجابات"),
      k("0.91", "Answer relevancy", "Pertinence des réponses", "ملاءمة الإجابات"),
      k("0.89", "Context precision", "Précision du contexte", "دقة السياق"),
      k("0.92", "Context recall", "Rappel du contexte", "استرجاع السياق"),
      k("−30%", "AI cost per request", "Coût par requête d’IA", "كلفة كل طلب ذكاء اصطناعي"),
      k("85%", "Evaluation coverage", "Couverture de l’évaluation", "تغطية التقييم"),
    ],
    top: [0, 2, 1],
  },
  "decathlon-ai-transformation": {
    all: [
      k("×2.6", "Augmented productivity", "Productivité augmentée", "الإنتاجية المعزَّزة"),
      k("4 M€", "Programme scope", "Périmètre du programme", "نطاق البرنامج"),
      k("13", "Team members", "Membres de l’équipe", "أعضاء الفريق"),
      k("93%", "Computer vision precision", "Précision de la vision par ordinateur", "دقة الرؤية الحاسوبية"),
      k("−38%", "Stock investigation time", "Temps d’investigation des stocks", "زمن فحص المخزون"),
      k("−45%", "Decision preparation time", "Temps de préparation des décisions", "زمن إعداد القرارات"),
      k("72%", "Weekly pilot adoption", "Adoption hebdomadaire du pilote", "التبنّي الأسبوعي للتجربة"),
    ],
    top: [0, 3, 1],
  },
  "carrefour-ml-mlops": {
    all: [
      k("65% → 78%", "Fill rate", "Taux de service", "معدل التلبية"),
      k("+13 pts", "Fill rate improvement", "Amélioration du taux de service", "تحسّن معدل التلبية"),
      k("10", "Engagement team", "Équipe de la mission", "فريق المهمة"),
      k("18% → 12%", "Forecasting WAPE", "WAPE des prévisions", "WAPE للتنبؤات"),
      k("−9%", "Pallet volume reduction", "Réduction du volume de palettes", "تقليص حجم المنصّات"),
      k("99.5%", "Data pipeline availability", "Disponibilité des pipelines de données", "توافر مسارات البيانات"),
      k("−35%", "Forecast processing time", "Temps de traitement des prévisions", "زمن معالجة التنبؤات"),
    ],
    top: [1, 3, 6],
  },

  // ---- NOVA Suite
  nova: {
    all: [
      k("800", "Deployed users", "Utilisateurs déployés", "مستخدمون منشورون"),
      k("68%", "Task success rate", "Taux de réussite des tâches", "معدل نجاح المهام"),
      k("−42%", "Task execution time reduction", "Réduction du temps d’exécution des tâches", "تقليص زمن تنفيذ المهام"),
      k("23%", "D7 user retention", "Rétention des utilisateurs à J7", "الاحتفاظ بالمستخدمين في اليوم 7"),
      k("99.3%", "Technical execution success", "Succès d’exécution technique", "نجاح التنفيذ التقني"),
      k("15", "Team members", "Membres de l’équipe", "أعضاء الفريق"),
    ],
    top: [0, 1, 2],
  },
  "nova-agents": {
    all: [
      k("86%", "Task completion rate", "Taux d’achèvement des tâches", "معدل إتمام المهام"),
      k("92%", "Agent coordination success", "Succès de la coordination des agents", "نجاح تنسيق الوكلاء"),
      k("81%", "Deliverables accepted without major revision", "Livrables acceptés sans révision majeure", "مخرجات قُبلت دون مراجعة جوهرية"),
      k("28 s", "Median task execution time", "Temps d’exécution médian d’une tâche", "الزمن الوسيط لتنفيذ المهمة"),
    ],
    top: [0, 1, 2],
  },
  "nova-context": {
    all: [
      k("91%", "Context retrieval precision@5", "Précision de récupération du contexte @5", "دقة استرجاع السياق @5"),
      k("99.5%", "Temporal context accuracy", "Exactitude temporelle du contexte", "الدقة الزمنية للسياق"),
      k("−48%", "Context token reduction", "Réduction des tokens de contexte", "تقليص رموز السياق"),
      k("100%", "Access policy test compliance", "Conformité aux tests de politiques d’accès", "الامتثال لاختبارات سياسات الوصول"),
    ],
    top: [1, 0, 2],
  },
  "nova-evals": {
    all: [
      k("88%", "Automated evaluation coverage", "Couverture d’évaluation automatisée", "تغطية التقييم الآلي"),
      k("89%", "LLM–human judge agreement", "Accord entre juge LLM et humain", "الاتفاق بين محكّم النموذج والإنسان"),
      k("96%", "Known regression detection rate", "Taux de détection des régressions connues", "معدل كشف الانحدارات المعروفة"),
      k("−65%", "Evaluation execution time reduction", "Réduction du temps d’exécution des évaluations", "تقليص زمن تنفيذ التقييمات"),
    ],
    top: [2, 1, 0],
  },

  // ---- AI Lab products
  TrustRail: {
    all: [
      k("100%", "Policy tests passed", "Tests de politiques réussis", "اختبارات السياسات الناجحة"),
      k("18 ms", "P95 gateway overhead", "Surcoût P95 de la passerelle", "الكلفة الزمنية P95 للبوابة"),
      k("100%", "Audit receipt generation", "Génération des reçus d’audit", "توليد إيصالات التدقيق"),
      k("2,000", "Simulated tool calls evaluated", "Appels d’outils simulés évalués", "استدعاءات أدوات محاكاة جرى تقييمها"),
    ],
    top: [0, 1, 2],
  },
  "M3aya Santé": {
    all: [
      k("9/9", "Care pathways covered", "Parcours de soins couverts", "مسارات الرعاية المغطاة"),
      k("94%", "Workflow test success", "Réussite des tests de workflow", "نجاح اختبارات سير العمل"),
      k("−35%", "Administrative time reduction", "Réduction du temps administratif", "تقليص الزمن الإداري"),
      k("200", "Validated test scenarios", "Scénarios de test validés", "سيناريوهات اختبار مُصادَق عليها"),
    ],
    top: [0, 1, 2],
  },
  "TRAIL Academy": {
    all: [
      k("18", "Learning modules", "Modules de formation", "وحدات التعلم"),
      k("70%", "Hands-on content", "Contenu pratique", "المحتوى العملي"),
      k("82%", "Learning completion rate", "Taux d’achèvement des formations", "معدل إتمام التعلم"),
      k("83/100", "Post-training assessment score", "Score d’évaluation après formation", "درجة التقييم بعد التدريب"),
      k("58/100", "Pre-training assessment score", "Score d’évaluation avant formation", "درجة التقييم قبل التدريب"),
    ],
    top: [0, 2, 1],
  },
  "MedGuard AI": {
    all: [
      k("91%", "AI–expert evaluation agreement", "Accord d’évaluation IA–expert", "الاتفاق بين تقييم الذكاء الاصطناعي والخبير"),
      k("96%", "Critical issue recall", "Rappel des problèmes critiques", "استرجاع المشكلات الحرجة"),
      k("100%", "Test audit coverage", "Couverture d’audit des tests", "تغطية تدقيق الاختبارات"),
      k("500", "Responses in the evaluation dataset", "Réponses dans le jeu d’évaluation", "إجابات في مجموعة التقييم"),
    ],
    top: [0, 1, 2],
  },
  SimuLearn: {
    all: [
      k("24", "Simulation scenarios", "Scénarios de simulation", "سيناريوهات المحاكاة"),
      k("87%", "Scenario completion rate", "Taux d’achèvement des scénarios", "معدل إتمام السيناريوهات"),
      k("4.3/5", "User experience rating", "Note d’expérience utilisateur", "تقييم تجربة المستخدم"),
      k("100", "Simulation sessions evaluated", "Sessions de simulation évaluées", "جلسات محاكاة جرى تقييمها"),
    ],
    top: [0, 1, 2],
  },
  ClassMind: {
    all: [
      k("0.91", "Answer faithfulness", "Fidélité des réponses", "أمانة الإجابات"),
      k("89%", "Curriculum alignment", "Alignement au programme", "الاتساق مع المنهج"),
      k("−40%", "Lesson preparation time reduction", "Réduction du temps de préparation des cours", "تقليص زمن إعداد الدروس"),
      k("200", "Evaluation questions", "Questions d’évaluation", "أسئلة التقييم"),
    ],
    top: [0, 1, 2],
  },
  "Fencing Intelligence": {
    all: [
      k("3", "Fencing disciplines covered", "Disciplines d’escrime couvertes", "تخصصات المبارزة المغطاة"),
      k("91%", "Event detection precision", "Précision de détection des événements", "دقة كشف الأحداث"),
      k("−60%", "Video review time reduction", "Réduction du temps de revue vidéo", "تقليص زمن مراجعة الفيديو"),
      k("30 → 12 min", "Review time per session", "Temps de revue par séance", "زمن المراجعة لكل جلسة"),
    ],
    top: [1, 2, 0],
  },
  LEAP: {
    all: [
      k("1,500+", "Professionals trained", "Professionnels formés", "متخصصون دُرِّبوا"),
      k("75+", "Training sessions delivered", "Sessions de formation animées", "جلسات تدريب نُفِّذت"),
      k("4.6/5", "Training satisfaction", "Satisfaction des formations", "الرضا عن التدريب"),
      k("+32 pts", "Knowledge assessment improvement", "Progression à l’évaluation des connaissances", "تحسّن تقييم المعارف"),
      k("68%", "Skills application after 30 days", "Application des compétences après 30 jours", "تطبيق المهارات بعد 30 يومًا"),
    ],
    top: [0, 1, 2],
  },
  "Prompt Arena": {
    all: [
      k("13", "Learning paths", "Parcours d’apprentissage", "مسارات التعلم"),
      k("130", "Applied challenges", "Défis appliqués", "تحديات تطبيقية"),
      k("76%", "Challenge success rate", "Taux de réussite des défis", "معدل نجاح التحديات"),
      k("61 → 84/100", "Assessment score improvement", "Progression du score d’évaluation", "تحسّن درجة التقييم"),
      k("71%", "Learning path completion", "Achèvement des parcours", "إتمام مسارات التعلم"),
    ],
    top: [0, 1, 2],
  },

  // ---- Other experiences (CV roles)
  "role:Fujitsu": {
    all: [
      k("94%", "Computer vision precision", "Précision de la vision par ordinateur", "دقة الرؤية الحاسوبية"),
      k("#2", "AVA Challenge ranking", "Classement à l’AVA Challenge", "الترتيب في AVA Challenge"),
    ],
    top: [0, 1, 1],
  },
  "role:AXA": {
    all: [k("−30%", "Delivery lead time reduction", "Réduction du délai de livraison", "تقليص زمن التسليم")],
    top: [0, 0, 0],
  },
  "role:Carrefour": {
    all: [
      k("88%", "Voice intent recognition accuracy (LEA)", "Précision de reconnaissance d’intention vocale (LEA)", "دقة التعرف على النية الصوتية (LEA)"),
      k("−22%", "Cloud cost reduction (OPTIM)", "Réduction des coûts cloud (OPTIM)", "تقليص كلفة السحابة (OPTIM)"),
    ],
    top: [0, 1, 1],
  },
  "role:Banque Populaire": {
    all: [k("+18 pts", "Digital journey completion improvement", "Amélioration de l’achèvement des parcours digitaux", "تحسّن إتمام الرحلات الرقمية")],
    top: [0, 0, 0],
  },
};

/** Number formatting by language: French uses a space before %, a decimal comma and a space as thousands separator. */
export function fmtKpi(v: string, locale: Locale): string {
  if (locale !== "fr") return v;
  return v.replace(/(\d),(\d{3})/g, "$1 $2").replace(/(\d)\.(\d)/g, "$1,$2").replace(/(\d)%/g, "$1 %").replace(/(\d) pts/g, "$1 pts");
}

/** Roles with 1 or 2 KPIs show each only once. */
export function topKpis(key: string): Kpi[] {
  const s = KPIS[key];
  if (!s) return [];
  const idx = [...new Set(s.top)];
  return idx.map((i) => s.all[i]);
}
