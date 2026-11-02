#!/usr/bin/env python3
"""La transformation agentique (livre blanc, FR). No client name or client result: only the author's own platform indicators."""
import sys
sys.path.insert(0, "../ai-factory")
sys.path.insert(0, "..")
from charts import *  # noqa: E402,F401
import charts as C  # noqa: E402
from common import *  # noqa: E402,F401

D = Doc("La transformation agentique")
page = D.page

# ======================================================================= COVER
page(f'''<div style="position:absolute;inset:0;background:radial-gradient(900px 500px at 85% 28%,rgba(76,111,240,.22),transparent 60%),#05060a"></div>{BIG}
<div style="position:absolute;left:20mm;top:22mm">{SYM}</div>
<div style="position:absolute;left:20mm;top:56mm;right:20mm">
<div class="mono" style="color:#7b96ff">LIVRE BLANC · 2026</div>
<h1 class="disp" style="font-size:50pt;line-height:1;margin:6mm 0 0;font-weight:700;letter-spacing:-0.045em">La transformation<br>agentique</h1>
<p style="font-size:15pt;line-height:1.35;color:#c9ced8;max-width:125mm;margin-top:8mm">Passer des assistants aux agents : méthode, gouvernance et feuille de route pour transformer des processus d’entreprise.</p></div>
<div style="position:absolute;left:20mm;right:20mm;bottom:22mm;display:flex;justify-content:space-between;align-items:flex-end;border-top:0.3mm solid #1c2233;padding-top:6mm">
<div><div class="disp" style="font-size:13pt;font-weight:600;letter-spacing:-0.01em">Yassine Aqejjaj</div><div style="color:#9ba3b5;font-size:9pt;margin-top:1mm">Head of AI Factory, Devoteam</div></div>
<div class="mono" style="color:#9ba3b5;text-align:right">VERSION 1.0<br>NOVEMBRE 2026<br>iaseen.com</div></div>''', dark=True, run=False, foot=False)

# ======================================================================= CONTENTS
toc = [("01", "Ce que « agentique » change vraiment", "Du assistant au système multi-agents"), ("02", "Choisir les processus à transformer", "Une grille de sélection et une matrice valeur / risque"),
       ("03", "Concevoir la place de l’humain", "Rôles, points de décision, niveaux d’autonomie"), ("04", "Architecture d’un système agentique", "Orchestration, spécialistes, contexte, évaluation"),
       ("05", "Contexte, données et droits", "Le contexte comme produit gouverné"), ("06", "Évaluer avant d’étendre", "Scénarios, juges, revue humaine, portes de production"),
       ("07", "Gouverner les actions", "Politiques, validation, traçabilité"), ("08", "Conduire le changement", "Métiers, compétences, adoption"),
       ("09", "Mesurer la transformation", "Quatre familles d’indicateurs"), ("10", "Feuille de route par vagues", "Assister, déléguer, superviser"),
       ("11", "Les erreurs à éviter", "Symptômes, causes, remèdes"), ("A", "Annexes", "Grille, fiche d’agent, checklist, glossaire")]
rows = "".join(f'<div style="display:grid;grid-template-columns:16mm 1fr;gap:4mm;padding:2.3mm 0;border-bottom:0.25mm solid #e4e8f2"><div class="disp" style="font-size:16pt;font-weight:700;color:#4c6ff0;line-height:1">{n}</div><div><div class="disp" style="font-size:11.5pt;font-weight:700;color:#05060a;line-height:1.2">{t}</div><div style="font-size:8.4pt;color:#5a6682">{s}</div></div></div>' for n, t, s in toc)
page(f'''<div class="pad" style="padding-top:20mm"><div class="mono" style="color:#4c6ff0">SOMMAIRE</div>
<h1 class="disp" style="font-size:26pt;margin:2mm 0 5mm;color:#05060a;letter-spacing:-0.04em">Ce que vous allez trouver</h1>{rows}
<div class="callout" style="margin-top:6mm"><span class="mono">COMMENT LIRE CE GUIDE</span><p>Les chapitres 1 à 3 posent les idées : ce qu’est un agent, quoi transformer, où mettre l’humain. Les chapitres 4 à 7 détaillent la mécanique, les chapitres 8 à 10 la conduite du changement et la feuille de route. Les annexes contiennent des modèles à copier.</p></div></div>''')

# ======================================================================= EXEC SUMMARY
page(f'''<div class="pad" style="padding-top:20mm"><div class="mono" style="color:#4c6ff0">RÉSUMÉ EXÉCUTIF</div>
<h1 class="disp" style="font-size:26pt;margin:2mm 0 5mm;color:#05060a;letter-spacing:-0.04em;line-height:1.05">Six idées à retenir</h1>
<div style="display:grid;gap:3mm">
<div class="card"><h3>1. Un agent agit, il ne se contente pas de répondre</h3><p style="margin:0">La rupture n’est pas la qualité des réponses mais la capacité à planifier et à agir avec des outils. C’est ce qui crée la valeur, et ce qui crée le risque.</p></div>
<div class="card"><h3>2. On transforme des processus, pas des outils</h3><p style="margin:0">Le bon point de départ n’est pas la technologie mais une liste de processus notés sur la valeur, le risque, les données et l’évaluabilité.</p></div>
<div class="card"><h3>3. L’autonomie se gagne</h3><p style="margin:0">Quatre niveaux, de la suggestion à la supervision. On monte d’un niveau à la fois, avec des preuves, et on redescend après un incident.</p></div>
<div class="card"><h3>4. Le contexte et l’évaluation font la fiabilité</h3><p style="margin:0">Les échecs viennent plus souvent d’un contexte périmé ou mal autorisé que du modèle. Aucune extension d’usage sans scénarios de test passés.</p></div>
<div class="card"><h3>5. Le changement est humain</h3><p style="margin:0">Les métiers changent de rôle : de l’exécution vers la supervision. La formation par la pratique fait partie du produit.</p></div>
<div class="card"><h3>6. Se déroule par vagues, se mesure en continu</h3><p style="margin:0">Assister d’abord, déléguer ensuite, superviser enfin, avec quatre familles d’indicateurs et un point de contrôle à chaque vague.</p></div></div>
<div class="mono" style="color:#8a93a8;margin:6mm 0 2.5mm">REPÈRES, PLATEFORME AGENTIQUE NOVA (AI FACTORY DE DEVOTEAM)</div>
<div class="cols3" style="grid-template-columns:repeat(4,1fr)"><div class="stat"><b>800</b><span>collaborateurs utilisent la plateforme</span></div><div class="stat"><b>92 %</b><span>de réussite des tâches</span></div><div class="stat"><b>−42 %</b><span>de temps d’exécution des tâches</span></div><div class="stat"><b>15</b><span>personnes dans l’équipe pluridisciplinaire</span></div></div></div>''')

# ======================================================================= CH1
SPEC = spectrum({"cols": [("Assistant", [("QUI CHOISIT LE CHEMIN", "L’utilisateur"), ("CE QU’IL FAIT", "Répond, résume, rédige"), ("CONTRÔLE HUMAIN", "À chaque échange")]),
                          ("Workflow", [("QUI CHOISIT LE CHEMIN", "Le concepteur"), ("CE QU’IL FAIT", "Enchaîne des étapes fixes"), ("CONTRÔLE HUMAIN", "À la conception")]),
                          ("Agent", [("QUI CHOISIT LE CHEMIN", "L’agent"), ("CE QU’IL FAIT", "Planifie, utilise des outils"), ("CONTRÔLE HUMAIN", "Aux points de décision")]),
                          ("Multi-agents", [("QUI CHOISIT LE CHEMIN", "Un orchestrateur"), ("CE QU’IL FAIT", "Coordonne des spécialistes"), ("CONTRÔLE HUMAIN", "Plan, résultat, actions")])],
                 "lo": "Plus de prévisibilité", "hi": "Plus d’autonomie  →"})
page(band("01", "Ce que « agentique » change vraiment", "Un agent ne répond pas seulement : il planifie et agit.") +
     f'''<div class="body"><div class="take"><span class="mono">DÉFINITION</span><p>Un système agentique est un système où un modèle de langage décide de la suite des étapes et agit avec des outils pour atteindre un objectif, dans un cadre de droits, de limites et de contrôle défini par l’organisation.</p></div>
<h2>Le mot est à la mode, le changement est réel</h2><p>Pendant deux ans, l’IA générative s’est surtout déployée sous forme d’assistants : on pose une question, on obtient une réponse. Le changement n’est pas que les réponses sont meilleures. C’est que le système peut maintenant <b>enchaîner des étapes, consulter des sources, appeler des outils et produire un livrable</b>, sans qu’un humain décrive chaque étape. La valeur monte, et le risque aussi.</p>
{fig(SPEC, 1, "Quatre familles de systèmes, classées par autonomie croissante. Chaque famille a sa place : la bonne est la moins autonome qui résout le problème.")}
<h2>Trois idées reçues</h2><div class="cols3"><div class="card"><h3>« Plus d’autonomie, c’est mieux »</h3><p style="margin:0;font-size:9pt">Non : la bonne autonomie est la plus faible qui suffit. Chaque niveau coûte en évaluation et en supervision.</p></div><div class="card"><h3>« Un meilleur modèle règle tout »</h3><p style="margin:0;font-size:9pt">Les échecs viennent plus souvent d’un contexte périmé, de droits mal appliqués ou d’une évaluation absente.</p></div><div class="card"><h3>« On déploie, puis on évalue »</h3><p style="margin:0;font-size:9pt">L’ordre inverse : on évalue sur des scénarios fixes avant d’étendre l’usage ou les droits.</p></div></div></div>''')

page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">Choisir la bonne famille</h2>
<p>Le réflexe est de viser le niveau le plus avancé. C’est rarement le bon : l’autonomie coûte en évaluation, en gouvernance et en supervision. La règle que je recommande est simple : <b>prendre la famille la moins autonome qui résout le problème</b>.</p>
{table(["Critère", "Assistant", "Workflow", "Agent", "Multi-agents"],
       [["Chemin connu à l’avance ?", "Peu importe", "Oui, fixe", "Non, varie selon le cas", "Non, et il se découpe en spécialités"], ["Nombre d’étapes", "Une", "Quelques-unes, stables", "Plusieurs, variables", "Beaucoup, à coordonner"],
        ["Outils à utiliser", "Aucun ou peu", "Fixes", "Choisis par l’agent", "Répartis entre spécialistes"], ["Coût d’une erreur", "Faible, corrigée par l’utilisateur", "Maîtrisé par la conception", "À encadrer", "À encadrer fortement"],
        ["Effort d’évaluation", "Léger", "Léger", "Significatif", "Élevé"], ["Exemple de besoin", "Reformuler un texte", "Router une demande vers une équipe", "Préparer un dossier à partir de sources", "Produire un livrable avec plusieurs expertises"]])}
<h2>Ce que ça change pour l’entreprise</h2>
<div class="cols"><div class="card"><h3>Avant : l’humain exécute</h3><ul style="font-size:9pt;margin:0"><li>il cherche l’information ;</li><li>il assemble les éléments ;</li><li>il produit le livrable ;</li><li>il vérifie à la main.</li></ul></div><div class="card"><h3>Après : l’humain supervise</h3><ul style="font-size:9pt;margin:0"><li>il formule l’objectif ;</li><li>il valide le plan et les actions critiques ;</li><li>il relit le livrable et ses sources ;</li><li>il corrige et améliore le système.</li></ul></div></div>
{callout("MON ANALYSE", "<p>La vraie transformation n’est pas la technologie, c’est le déplacement du travail humain de l’exécution vers la supervision. Une organisation qui n’a pas préparé ses équipes à superviser verra l’agent produire plus vite des erreurs qu’on ne sait pas détecter.</p>")}
</div>''')

# ======================================================================= CH2
MAT = matrix({"q": ["Commencer ici", "Encadrer fortement", "Rester en workflow", "Ne pas automatiser"], "x": "Risque d’une erreur  →", "y": "Valeur attendue  →",
              "pts": [(0.16, 0.82, "Préparation de dossiers"), (0.28, 0.66, "Tri et routage de demandes"), (0.58, 0.86, "Réponses à des tiers"), (0.62, 0.64, "Actions sur des systèmes"),
                      (0.22, 0.22, "Mises en forme"), (0.64, 0.24, "Décisions sans trace")]})
page(band("02", "Choisir les processus à transformer", "On ne transforme pas une technologie : on transforme des processus, choisis sur des critères explicites.") +
     f'''<div class="body"><p>La plupart des programmes agentiques démarrent par un outil et cherchent ensuite à l’utiliser. Le meilleur ordre est inverse : <b>dresser la liste des processus candidats</b>, les noter, et ne retenir que ceux où un agent apporte plus qu’un workflow ou qu’un assistant.</p>
<div style="width:80%;margin:0 auto">{fig(MAT, 2, "Matrice valeur / risque. On commence dans le quadrant à forte valeur et à faible risque ; le quadrant à fort risque demande un niveau d’autonomie bas et une validation humaine. Les points sont des exemples génériques à placer selon votre contexte.")}</div>
<h2>Familles de processus et pattern souvent adapté</h2>
{table(["Famille", "Exemple générique", "Pattern souvent adapté"], [["Questions sur un corpus", "Interroger une base documentaire interne", "Assistant avec récupération"], ["Routage et qualification", "Orienter une demande vers la bonne équipe", "Workflow, avec un modèle pour classer"], ["Préparation de dossiers", "Assembler des éléments de plusieurs sources", "Agent, supervisé"], ["Livrables multi-expertises", "Un document qui demande plusieurs spécialités", "Multi-agents, orchestré"], ["Actions sur des systèmes", "Mettre à jour un enregistrement", "Agent sous politique et validation"]])}
<p class="src">À titre d’illustration : à classer selon votre contexte.</p></div>''')

page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">La grille de sélection d’un processus</h2>
<p>Notez chaque critère de 0 à 3. Le but est de comparer des processus entre eux, pas d’atteindre un score absolu.</p>
{table(["Critère", "Question", "Un bon candidat…"],
       [["Valeur", "Quel gain, mesuré comment, attendu par qui ?", "A un responsable métier qui attend le résultat"], ["Fréquence", "Combien de fois par semaine le processus se répète-t-il ?", "Se répète assez pour amortir l’effort de mise en place"], ["Variabilité", "Le chemin change-t-il d’un cas à l’autre ?", "Varie assez pour qu’un workflow fixe ne suffise pas"],
        ["Données", "Les sources sont-elles accessibles, à jour, autorisées ?", "Repose sur des sources identifiées et gouvernées"], ["Risque", "Une erreur est-elle réversible et détectable ?", "Reste détectable par un humain avant tout effet"], ["Évaluabilité", "Sait-on décrire un bon résultat et le mesurer ?", "A des critères écrits et des cas de test"], ["Adoption", "Les utilisateurs sont-ils prêts à changer leur façon de faire ?", "A des utilisateurs identifiés et motivés"]])}
<h2>De la liste de processus à la décision</h2>
<ol style="padding-left:5mm"><li><b>Recenser</b> vingt à trente processus avec les responsables métier, sans filtrer.</li><li><b>Noter</b> sur la grille, en atelier, avec les équipes qui les exécutent.</li><li><b>Placer</b> chacun dans la matrice valeur / risque et écarter ceux du quadrant « ne pas automatiser ».</li><li><b>Choisir la famille</b> (workflow, agent…) la moins autonome qui convienne à chacun.</li><li><b>Retenir deux ou trois processus pilotes</b>, pas dix : l’évaluation et la supervision demandent de l’attention.</li></ol>
{take("MON ANALYSE", "Le meilleur processus pilote n’est pas le plus spectaculaire. C’est celui où l’on sait dire ce qu’est un bon résultat, où une erreur coûte peu et où quelqu’un attend vraiment le livrable.")}</div>''')

# ======================================================================= CH3
LAN = lanes({"lanes": ["Utilisateur", "Système agentique", "Humain valideur"],
             "steps": [(0, ["Formule", "l’objectif"]), (1, ["Cadre et", "planifie"]), (2, ["Valide", "le plan"]), (1, ["Exécute avec", "des outils"]), (2, ["Approuve", "les actions", "critiques"]), (1, ["Assemble", "le livrable"]), (0, ["Relit et", "corrige"])]})
page(band("03", "Concevoir la place de l’humain", "Superviser ne veut pas dire tout relire : on place l’humain là où son jugement compte.") +
     f'''<div class="body"><p>« Humain dans la boucle » ne signifie pas validation de chaque étape, ce qui annulerait le gain. Cela signifie des <b>points de décision explicites</b>, placés là où une erreur coûte le plus ou là où le jugement métier est irremplaçable.</p>
{fig(LAN, 3, "Un parcours type : l’humain formule, valide le plan, approuve les actions critiques, puis relit le livrable.")}
<h2>Les trois rôles humains</h2>
<div class="cols3"><div class="card"><h3>Le demandeur</h3><p style="margin:0;font-size:9pt">Exprime l’objectif et utilise le résultat. Il doit savoir ce qu’il peut demander et comment vérifier.</p></div><div class="card"><h3>Le superviseur</h3><p style="margin:0;font-size:9pt">Valide les plans et les actions critiques. Il a l’autorité et le temps pour refuser.</p></div><div class="card"><h3>Le responsable du système</h3><p style="margin:0;font-size:9pt">Possède les critères, les scénarios et les niveaux d’autonomie. Il décide de monter ou de baisser l’autonomie.</p></div></div>
<h2>Trois points de décision à ne pas oublier</h2><ol style="padding-left:5mm"><li><b>Le plan.</b> Avant d’exécuter, l’humain voit ce que l’agent compte faire et peut l’arrêter ou le corriger.</li><li><b>Les actions critiques.</b> Envoi, modification, paiement : une validation proportionnée à la conséquence.</li><li><b>Le livrable.</b> La relecture se fait avec les sources affichées, pas à l’aveugle.</li></ol></div>''')

page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">Quatre niveaux d’autonomie, gagnés un par un</h2>
<p>L’autonomie n’est pas une propriété du modèle : c’est un <b>statut gagné par type de travail</b>. J’utilise une échelle à quatre niveaux, issue d’un cadre public pour les agents de code, transposable à d’autres usages.</p>
{table(["Niveau", "L’agent peut", "L’humain doit encore", "On monte quand…"],
       [["L0 · Suggérer", "Proposer des options et des brouillons", "Décider et écrire le changement", "Les suggestions sont régulièrement utiles"], ["L1 · Assister", "Produire en petites étapes", "Relire chaque modification", "Les relectures ne trouvent plus d’erreur sur un échantillon représentatif"],
        ["L2 · Déléguer", "Accomplir une tâche bornée et la soumettre", "La relire et passer les contrôles", "Les scénarios de test sont passés et les incidents sont rares"], ["L3 · Superviser", "Vérifier et appliquer dans un environnement non productif", "Auditer des échantillons et approuver la mise en production", "—"]])}
{callout("DEUX RÈGLES DE PRUDENCE", "<p>Jamais au-dessus de L1 pour des actions irréversibles ou des données sensibles. Et l’autonomie baisse d’un niveau après tout incident : elle ne remonte qu’avec des preuves.</p>")}
<h2>Les niveaux de risque d’une action</h2>
{table(["Type d’action", "Exemple", "Contrôle attendu"],
       [["Lecture seule", "Résumer un document autorisé", "Droits d’accès, sources affichées"], ["Écriture réversible", "Brouillon dans un outil de projet", "Journal, annulation possible"], ["Action coûteuse ou externe", "Envoyer un message ou lancer un paiement", "Validation humaine avant exécution"], ["Hors périmètre", "Accéder à des données non autorisées", "Blocage par politique, alerte"]])}
{take("MON ANALYSE", "La question à poser n’est pas « l’agent est-il assez bon ? » mais « que se passe-t-il quand il se trompe, et qui le voit ? ». Le niveau d’autonomie se déduit de la réponse.")}</div>''')

# ======================================================================= CH4
LAY = layers({"rows": [("Utilisateur et objectif", "Une intention exprimée en langage naturel", "ENTRÉE"), ("Orchestration", "Cadre l’objectif, planifie, délègue, supervise, assemble le résultat", "COUCHE 1"),
                       ("Contexte gouverné", "Récupère les bonnes informations, avec les droits de l’utilisateur et la traçabilité", "COUCHE 2"),
                       ("Agents spécialistes et outils", "Un agent par profil, avec des compétences versionnées et des outils sous politique", "COUCHE 3"), ("Livrable structuré", "Versionné, éditable, avec ses sources", "SORTIE")],
              "loop": ("Évaluation continue",)})
page(band("04", "Architecture d’un système agentique", "Un agent à qui parler, des spécialistes derrière, un contexte gouverné dessous, une évaluation autour.") +
     f'''<div class="body"><p>Un système agentique d’entreprise n’est pas « un modèle plus des outils ». C’est un assemblage de couches, chacune avec sa responsabilité et sa question de conception. Ce découpage vient de la plateforme agentique que je dirige ; il s’applique à d’autres.</p>
{fig(LAY, 4, "Architecture en couches d’un système agentique. L’évaluation entoure l’ensemble : chaque résultat revient dans le contexte et le comportement.")}
{table(["Couche", "Rôle", "Question de conception"],
       [["Orchestration", "Un seul interlocuteur : il cadre, planifie, délègue, supervise", "Comment éviter que l’utilisateur doive connaître l’organigramme des agents ?"], ["Contexte", "Récupérer le bon contenu, au bon moment, avec les bons droits", "Que sait-on, d’où, pour qui, depuis quand, et pourquoi cet élément a-t-il été retenu ?"],
        ["Spécialistes", "Un agent par profil, avec des compétences versionnées", "Où l’autonomie est-elle utile, où vaut-il mieux un flux fixe ?"], ["Évaluation", "Mesurer chaque version avant et après passage à l’échelle", "Quels scénarios, quels critères, quel seuil de décision ?"]])}</div>''')

BARS = bars([("Tâches complétées (Nova Agents)", 86, 100, "86 %"), ("Coordination des agents réussie", 92, 100, "92 %"), ("Livrables acceptés sans révision majeure", 81, 100, "81 %"), ("Précision de récupération du contexte @5", 91, 100, "91 %"), ("Contrôles d’accès conformes aux tests", 100, 100, "100 %")])
page(f'''<div class="pad" style="padding-top:16mm"><h2 style="margin-top:0">Cinq principes d’assemblage</h2>
<ol style="padding-left:5mm"><li><b>Un seul interlocuteur.</b> L’utilisateur ne choisit jamais un agent : l’orchestrateur le fait pour lui. C’est la principale décision d’adoption, bien avant la qualité du modèle.</li><li><b>Le contexte est un produit, pas une instruction.</b> Il a un propriétaire, un cycle de vie et une piste d’audit.</li><li><b>Des compétences versionnées.</b> Les workflows d’agents sont testés, versionnés et réutilisables, comme du code.</li><li><b>Des livrables structurés.</b> Le résultat n’est pas un message de chat à copier : c’est un livrable versionné, éditable, avec ses sources.</li><li><b>Tout composant est évalué avant d’être étendu</b> à une autre équipe.</li></ol>
<h2>Ce que montrent les indicateurs de la plateforme NOVA</h2>
<p>Les indicateurs ci-dessous viennent de la plateforme agentique de l’AI Factory de Devoteam. Ils illustrent ce qu’on peut mesurer pour chaque couche. La méthode de calcul, le périmètre et la période de mesure sont communiqués sur demande.</p>
{fig(BARS, 5, "Indicateurs par couche de la plateforme NOVA (agents, contexte). Source : AI Factory de Devoteam.")}
{callout("PRÉCAUTION", "<p>Les projets publics que je cite en fin de guide sont des dépôts en bêta publique : ils décrivent une conception, pas une garantie de production.</p>")}
</div>''')

# ======================================================================= CH5
page(band("05", "Contexte, données et droits", "La plupart des échecs d’agents ne sont pas des échecs du modèle : ce sont des échecs de contexte.") +
     f'''<div class="body"><p>Un agent qui cite une décision remplacée depuis un mois, qui mélange deux versions d’une spécification, ou pire qui expose un document à quelqu’un qui n’a pas le droit de le voir : ces échecs ne se règlent pas en changeant de modèle. Ils se règlent en traitant le <b>contexte comme un produit gouverné</b>.</p>
{table(["Sujet", "Ce qu’un système naïf fait", "Ce qu’un système gouverné fait"],
       [["Fraîcheur", "Récupère le passage le plus proche, même périmé", "Tient compte de la date et de l’état de validité de l’information"], ["Contradictions", "Cite deux sources contradictoires sans le signaler", "Détecte les conflits et les fait arbitrer"], ["Droits d’accès", "Ouvre tout ce que la connexion technique permet", "Applique les droits de l’utilisateur, de bout en bout"],
        ["Données sensibles", "Les mélange au reste", "Détecte, classe et masque, et propage le classement"], ["Explication", "Donne une réponse sans trace", "Dit pourquoi un élément a été retenu ou écarté"], ["Coût", "Envoie tout le contexte possible au modèle", "Applique un budget et mesure le coût par requête"]])}
<h2>Quatre règles pour les données</h2>
<ul><li><b>Une source de vérité par donnée.</b> Dupliquer les documents dans chaque projet multiplie les fuites et les versions périmées.</li><li><b>Propager les droits.</b> L’agent ne voit que ce que l’utilisateur peut voir, quel que soit le chemin d’accès.</li><li><b>Classer les données</b> et faire suivre le classement jusqu’à la réponse.</li><li><b>Tester les droits comme du code :</b> des cas de test d’accès font partie des scénarios d’évaluation.</li></ul>
{take("MON ANALYSE", "Les prochains gains des agents d’entreprise viendront du contexte, pas de modèles plus gros. Si l’on ne peut pas expliquer pourquoi un élément est arrivé dans l’invite de l’agent, on ne contrôle pas encore son agent.")}</div>''')

# ======================================================================= CH6
EV = evalloop({"nodes": [("Scénario", "jeu fixe"), ("Exécution", "version testée"), ("Trace", "tout est rejouable"), ("Score", "règles et juges"), ("Revue", "humaine ciblée"), ("Décision", "porte de mise en prod")], "back": "Ce que la décision apprend retourne dans les scénarios"})
page(band("06", "Évaluer avant d’étendre", "On ne confie pas plus d’autonomie à ce qu’on ne sait pas mesurer.") +
     f'''<div class="body"><p>Un système agentique change à chaque modification de consigne, d’outil, de modèle ou de contexte. Sans jeu de scénarios fixe, personne ne distingue une amélioration d’une régression. L’évaluation traite chaque version comme une <b>expérience</b> : mêmes scénarios, une référence contre un candidat, avec scores, coût, erreurs et niveau de confiance.</p>
{fig(EV, 6, "La boucle d’évaluation d’un système agentique.")}
{table(["Couche d’évaluation", "Ce qu’elle attrape", "Sa limite"],
       [["Règles déterministes", "Format, citations, sources absentes, données personnelles, outil interdit, coût ou latence hors budget", "Ne juge pas si une réponse est vraiment bonne"], ["Juges automatiques", "Qualité, cohérence et raisonnement par rapport à une grille écrite", "Ont leurs biais ; à calibrer sur des jugements humains"],
        ["Revue humaine", "Erreurs subtiles, ton, justesse métier", "Lente et coûteuse : à cibler sur les cas critiques"], ["Traces", "Quel appel de modèle, d’outil ou de récupération a échoué", "Explique un échec, ne dit pas s’il faut le corriger"], ["Scénarios cachés ou nouveaux", "Sur-optimisation : un système réglé sur des tests publics échoue sur du nouveau", "Valent ce que valent leur fraîcheur et leur représentativité"]])}
<h2>Quatre questions pour une revue de scénarios</h2><ol style="padding-left:5mm"><li>Les scénarios ressemblent-ils à des cas réels, y compris des cas limites ?</li><li>Qui a écrit les critères, et le métier les a-t-il validés ?</li><li>Que se passe-t-il sur des cas jamais vus ?</li><li>Quand un résultat échoue, sait-on dire pourquoi ?</li></ol></div>''')

TILES = tiles([("88 %", "COUVERTURE", "évaluation automatisée"), ("89 %", "ACCORD", "juge automatique et humain"), ("96 %", "RÉGRESSIONS", "connues détectées"), ("−65 %", "TEMPS", "d’exécution des évaluations")])
page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">Une porte de mise en production, avant tout élargissement</h2>
<p>L’évaluation ne sert que si elle débouche sur une décision. La porte de mise en production est un ensemble de critères <b>écrits à l’avance</b>, que la version candidate doit satisfaire avant d’être étendue à plus d’utilisateurs ou d’actions.</p>
{table(["Critère de porte", "Exemple de formulation", "Qui décide"],
       [["Qualité", "Au moins X % des scénarios prioritaires réussis, sans régression sur les scénarios déjà acquis", "Responsable de l’évaluation"], ["Sécurité et droits", "Tous les cas de test d’accès sont conformes ; aucune donnée sensible exposée", "Gouvernance et sécurité"], ["Coût et délai", "Coût par requête et latence dans le budget", "Responsable du système"], ["Supervision", "Les points de validation humaine sont en place pour les actions à risque", "Responsable métier"]])}
<p class="src">Les seuils chiffrés (X) sont à fixer avec le métier selon le risque du processus : ils ne se copient pas d’une organisation à l’autre.</p>
<h2>Un exemple d’indicateurs d’évaluation</h2>
{fig(TILES, 7, "Indicateurs de la couche d’évaluation de la plateforme NOVA. Source : AI Factory de Devoteam.")}
{callout("LECTURE", "<p>Un accord de 89 % entre juge automatique et humain ne veut pas dire que le juge est « bon à 89 % » : cela veut dire qu’il est calibré contre des jugements humains sur un jeu de cas. C’est cette calibration qui permet de s’appuyer ensuite sur lui pour passer à l’échelle.</p>")}
{take("MON ANALYSE", "L’évaluation est le plan de contrôle d’une plateforme agentique. Sans elle, chaque version est un pari. Avec elle, on peut donner plus d’autonomie aux agents, parce qu’on peut montrer ce qui se passe.")}</div>''')

# ======================================================================= CH7
page(band("07", "Gouverner les actions", "Dès qu’un agent agit, la gouvernance change de nature : il ne s’agit plus de contrôler des textes, mais des effets.") +
     f'''<div class="body"><p>Un chatbot qui se trompe produit un mauvais texte. Un agent qui se trompe produit une mauvaise <b>action</b> : un message envoyé, un enregistrement modifié, un paiement lancé. La gouvernance doit donc porter sur ce que l’agent a le droit de faire, pas seulement sur ce qu’il peut dire.</p>
<h2>Les quatre fonctions d’une gouvernance d’actions</h2>
{table(["Fonction", "Ce qu’elle garantit", "Question à poser"],
       [["Politique", "Ce que l’agent peut faire, sur quelles ressources, avec quelles limites", "Qui a écrit la règle, et est-elle appliquée hors du modèle ?"], ["Approbation", "Une validation humaine proportionnée à la conséquence", "Quelles actions exigent un humain, et lequel ?"], ["Traçabilité", "Une preuve vérifiable de ce qui a été demandé, décidé et fait", "Peut-on rejouer et prouver ce qui s’est passé ?"], ["Révocation", "Retirer ou réduire des droits rapidement", "Que se passe-t-il quand un incident survient ?"]])}
<h2>Cinq règles de gouvernance</h2>
<ol style="padding-left:5mm"><li>Un agent est un <b>demandeur non fiable</b> : la politique est décidée hors du modèle.</li><li>L’approbation humaine dépend de la <b>conséquence</b> de l’action, pas de sa nouveauté.</li><li>L’autonomie baisse d’un niveau après un incident et ne remonte qu’avec des preuves.</li><li>Tout ce qui agit laisse une <b>trace vérifiable</b> : qui, quoi, sous quelle politique.</li><li>Les environnements d’essai utilisent des <b>données synthétiques</b> avant toute donnée réelle.</li></ol>
{callout("MA PRATIQUE", "<p>Je teste des politiques, des validations humaines et des reçus signés sur des environnements d’essai synthétiques. Ce sont des études de conception, pas des systèmes en production.</p>")}
{take("MON ANALYSE", "L’approbation humaine doit dépendre de la conséquence, pas de la nouveauté. Un agent qui demande une validation pour tout finit par être contourné ; un agent qui n’en demande jamais finit par provoquer l’incident.")}</div>''')

# ======================================================================= CH8
BA = beforeafter(61, 84, "Avant", "Après", "/100")
page(band("08", "Conduire le changement", "Le travail humain se déplace de l’exécution vers la supervision : cela se prépare.") +
     f'''<div class="body"><p>Une plateforme que personne ne sait utiliser est un coût. Le changement agentique touche les métiers en profondeur : ce qu’on demande à un collaborateur n’est plus de produire, mais de formuler, valider et améliorer. Les chiffres ci-dessous viennent de deux dispositifs que j’ai conçus au sein de l’AI Factory de Devoteam.</p>
<div class="mono" style="color:#8a93a8;margin:3mm 0 2mm">PROGRAMME DE FORMATION INTERNE (LEAP)</div>
<div class="cols3" style="grid-template-columns:repeat(5,1fr)"><div class="stat"><b>1 500+</b><span>professionnels formés</span></div><div class="stat"><b>75+</b><span>sessions animées</span></div><div class="stat"><b>4,6/5</b><span>satisfaction</span></div><div class="stat"><b>+32 pts</b><span>progression à l’évaluation des connaissances</span></div><div class="stat"><b>68 %</b><span>appliquent leurs compétences après 30 jours</span></div></div>
<div class="cols" style="margin-top:5mm;align-items:center"><div><h2 style="margin-top:0">La pratique fait la différence</h2><p>Une session de formation produit des enthousiastes. La pratique encadrée produit des habitudes. L’espace de pratique du prompting propose 13 parcours et 130 défis appliqués ; le score d’évaluation passe de 61 à 84 sur 100.</p><ul><li>13 parcours d’apprentissage</li><li>130 défis appliqués</li><li>76 % de réussite aux défis</li></ul></div>
{fig(BA, 8, "Score d’évaluation avant et après le parcours de pratique (sur 100).")}</div>
<h2>Trois formats de formation</h2><div class="cols3"><div class="card"><h3>Atelier court</h3><p style="margin:0;font-size:9pt">Découvrir ce qu’on peut demander à un agent et comment vérifier le résultat.</p></div><div class="card"><h3>Parcours par rôle</h3><p style="margin:0;font-size:9pt">Des défis appliqués à des tâches du métier, avec évaluation avant et après.</p></div><div class="card"><h3>Communauté de champions</h3><p style="margin:0;font-size:9pt">Des relais dans chaque équipe, qui remontent les frictions et diffusent les bonnes pratiques.</p></div></div></div>''')

page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">Ce qui change pour chaque population</h2>
{table(["Population", "Ce qui change", "Ce qu’il faut leur donner"],
       [["Collaborateurs métier", "Ils formulent des objectifs, relisent des livrables, signalent les écarts", "Formation par rôle, exemples de leur métier, droit de refuser un résultat"], ["Managers", "Ils supervisent des équipes qui travaillent avec des agents", "Indicateurs d’usage, règles d’approbation, temps pour superviser"], ["Équipes IT et sécurité", "Elles gouvernent des actions et plus seulement des accès", "Politiques lisibles, traces, outils de révocation"], ["Direction", "Elle arbitre un portefeuille de processus et accepte un risque encadré", "Tableau de bord partagé, points de contrôle par vague"]])}
<h2>Cinq leviers d’adoption</h2>
{table(["Levier", "Ce qu’il change", "Comment le mettre en place"],
       [["Formation par rôle", "Les utilisateurs savent quoi demander et comment vérifier", "Parcours courts, basés sur des tâches réelles du métier"], ["Pratique encadrée", "Les compétences deviennent des habitudes", "Défis appliqués, retours, évaluation avant et après"], ["Champions", "Un relais de confiance dans chaque équipe", "Un volontaire par équipe, un temps dédié, une communauté"], ["Retours rapides", "Les frictions sont corrigées vite", "Un canal unique, un rythme de correction, des versions visibles"], ["Mesure des usages", "L’équipe voit ce qui marche", "Taux d’usage, rétention, tâches réussies, temps gagné"]])}
{callout("PRINCIPE", "<p>On forme <b>par rôle</b> et à partir de <b>vraies tâches</b> : un juriste, un chef de projet et un ingénieur n’ont pas besoin du même parcours. Et on mesure ce qui se passe à trente jours, pas seulement la satisfaction du jour.</p>")}
{take("MON ANALYSE", "Une transformation agentique qui ne forme pas à superviser produit des agents mal utilisés ou pas utilisés. La formation fait partie du produit, au même titre que l’interface.")}</div>''')

# ======================================================================= CH9
TILES2 = tiles([("800", "ADOPTION", "utilisateurs déployés"), ("92 %", "QUALITÉ", "tâches réussies"), ("−42 %", "EFFICACITÉ", "temps d’exécution des tâches"), ("23 %", "RÉTENTION", "utilisateurs actifs à J7")])
page(band("09", "Mesurer la transformation", "Quatre familles d’indicateurs, relues chaque mois, avec leur méthode de calcul.") +
     f'''<div class="body"><p>Une transformation agentique qui ne mesure pas se juge à l’intuition. Il ne s’agit pas de multiplier les tableaux de bord : quatre familles, trois à cinq indicateurs chacune.</p>
{table(["Famille", "Question posée", "Indicateurs types"],
       [["Adoption", "Les gens utilisent-ils le système ?", "Utilisateurs actifs, rétention, usage par métier"], ["Qualité", "Les résultats sont-ils fiables ?", "Taux de réussite des tâches, livrables acceptés, couverture d’évaluation, régressions détectées"], ["Efficacité", "Gagne-t-on du temps et de l’argent ?", "Temps d’exécution, coût par requête, taux de réutilisation"], ["Maîtrise", "Garde-t-on le contrôle ?", "Actions approuvées ou refusées, incidents, conformité aux tests de droits"]])}
{fig(TILES2, 9, "Exemple de tableau de bord à quatre tuiles, avec les indicateurs de la plateforme NOVA. Source : AI Factory de Devoteam.")}
{callout("LECTURE HONNÊTE", "<p>La rétention à J7 (23 %) est le chiffre le plus bas et le plus utile : l’outil convainc à l’usage mais ne devient pas encore une habitude pour tous. C’est un chantier d’adoption, pas un problème de qualité. Un tableau de bord où tout est vert n’inspire pas confiance.</p>")}
<h2>Trois règles pour des indicateurs crédibles</h2>
<ol style="padding-left:5mm"><li><b>Dire comment on calcule :</b> une valeur sans méthode, périmètre ni période de mesure ne convainc personne.</li><li><b>Comparer à une référence mesurée</b> avant le déploiement, pas à une estimation.</li><li><b>Montrer aussi ce qui va mal</b> et ce qu’on en fait.</li></ol></div>''')

# ======================================================================= CH10
G = gantt({"rows": [("Choix des processus", [(0, 2, "Recenser, noter", True), (2, 4, "Pilotes retenus", False), (6, 9, "Vague suivante", False)]),
                    ("Plateforme", [(1, 4, "Socle et contexte", True), (4, 8, "Spécialistes, outils", True), (8, 12, "Catalogue", False)]),
                    ("Niveaux d’autonomie", [(2, 6, "L0 à L1", True), (6, 9, "L2 sur preuves", False), (9, 12, "L3 ciblé", False)]),
                    ("Évaluation", [(2, 4, "Critères", False), (4, 9, "Scénarios, portes", True), (9, 12, "Régression continue", False)]),
                    ("Gouvernance", [(0, 3, "Politiques", True), (3, 8, "Approbations, traces", False), (8, 12, "Revue trimestrielle", False)]),
                    ("Formation", [(3, 6, "Parcours pilotes", False), (6, 12, "Champions, communauté", True)])],
          "gates": [(3, "Pilotes"), (6, "Vague 1"), (9, "Vague 2"), (12, "Bilan")]})
page(band("10", "Feuille de route par vagues", "Assister d’abord, déléguer ensuite, superviser enfin : une trajectoire recommandée, à adapter.") +
     f'''<div class="body"><p>Cette feuille de route est un <b>cadre recommandé</b>, pas le calendrier d’une organisation particulière. Les durées dépendent de la taille, de la maturité et de la disponibilité des données.</p>
{fig(G, 10, "Feuille de route sur 12 mois par chantier. Les losanges marquent les points de contrôle.")}
{table(["Vague", "Objectif", "Niveau d’autonomie", "Point de contrôle"],
       [["Pilotes (M1 à M3)", "Deux ou trois processus choisis sur la grille, socle minimal, politiques écrites", "L0 à L1", "Les pilotes passent leurs scénarios et sont utilisés"], ["Vague 1 (M4 à M6)", "Mise en production restreinte, évaluation systématique, premiers champions", "L1", "Qualité, droits et coûts dans le budget"],
        ["Vague 2 (M7 à M9)", "Extension à de nouveaux processus, composants réutilisés", "L2 sur preuves", "Un deuxième processus réutilise les composants du premier"], ["Vague 3 (M10 à M12)", "Portefeuille de processus, supervision ciblée, bilan chiffré", "L3 ciblé", "Le coût et le délai du processus n sont inférieurs à ceux du processus 1"]])}
{callout("CE QU’IL FAUT PROTÉGER", "<p>Les trois premiers mois paraissent lents, mais ils décident de tout : un choix rigoureux des processus, des politiques écrites et une mesure de référence.</p>")}</div>''')

# ======================================================================= CH11
page(band("11", "Les erreurs à éviter", "Elles sont prévisibles, ce qui est la bonne nouvelle.") +
     f'''<div class="body">{table(["Erreur", "Symptôme", "Cause", "Remède"],
       [["Partir de la technologie", "Un outil brillant cherche un usage", "Le point de départ est un modèle, pas un processus", "Dresser et noter la liste des processus d’abord"],
        ["Viser l’autonomie maximale", "Des incidents et un retour en arrière", "On saute les niveaux L0 et L1", "Monter d’un niveau à la fois, sur des preuves"],
        ["Évaluer à l’œil", "Des régressions découvertes par les utilisateurs", "On juge sur des démonstrations", "Un jeu de scénarios fixe et une porte de mise en production"],
        ["Négliger le contexte", "Des réponses périmées ou non autorisées", "Les sources ne sont pas gouvernées", "Traiter le contexte comme un produit, tester les droits"],
        ["Valider tout ou ne rien valider", "Contournement ou incident", "Aucune règle liée à la conséquence", "Approbation proportionnée au risque de l’action"],
        ["Oublier les équipes", "Faible usage, quelques enthousiastes", "Déploiement sans formation à superviser", "Former par rôle, avec des champions et de la pratique"],
        ["Des indicateurs sans méthode", "Des chiffres qui ne convainquent personne", "Pas de référence ni de périmètre", "Documenter calcul, périmètre et période de mesure"],
        ["Dix pilotes en parallèle", "Aucun n’est évalué correctement", "Pas de choix, donc pas d’attention", "Deux ou trois pilotes, bien évalués et bien supervisés"]])}
{take("MON ANALYSE", "Si je devais retenir une seule règle : ne jamais donner à un agent plus d’autonomie que celle qu’on sait évaluer et superviser aujourd’hui. Tout le reste en découle.")}
<h2>Cinq questions avant de lancer</h2><ol style="padding-left:5mm"><li>Quel processus, et quel responsable métier l’attend ?</li><li>Quel niveau d’autonomie au démarrage, et pourquoi ?</li><li>Quels scénarios de test, et quelle porte de mise en production ?</li><li>Quelles actions exigent une validation humaine, et laquelle ?</li><li>Quel indicateur de succès, avec quelle référence mesurée ?</li></ol></div>''')

# ======================================================================= ANNEXES
page(band("A", "Annexes", "Modèles à copier : grille de sélection, fiche d’agent, checklist de préparation.") +
     f'''<div class="body"><h2 style="margin-top:0">A. Fiche d’un agent (cahier des charges)</h2>
{table(["Rubrique", "À écrire"], [["Mission", "Ce que l’agent doit accomplir, pour qui, en une phrase"], ["Périmètre", "Les tâches incluses et exclues"], ["Outils et sources", "Les outils autorisés et les sources de données, avec leurs droits"], ["Niveau d’autonomie", "L0, L1, L2 ou L3, et les conditions pour changer"], ["Points de validation", "Les actions qui exigent une approbation humaine, et qui approuve"], ["Scénarios de test", "Les cas de test, y compris les droits d’accès et les cas limites"], ["Indicateurs", "Réussite des tâches, qualité, coût, temps, avec méthode de calcul"], ["Responsable", "Qui répond du comportement de l’agent"]])}
<h2>B. Checklist de préparation</h2><div class="cols"><div><h3>Avant de commencer</h3><ul class="check"><li>Liste de processus candidats, notée sur la grille</li><li>Deux ou trois pilotes retenus</li><li>Un sponsor et un responsable métier par pilote</li><li>Une mesure de référence</li></ul><h3>Contexte et droits</h3><ul class="check"><li>Sources gouvernées, une source de vérité par donnée</li><li>Droits propagés de bout en bout</li><li>Cas de test d’accès écrits</li></ul></div>
<div><h3>Évaluation et gouvernance</h3><ul class="check"><li>Jeu de scénarios fixe par processus</li><li>Niveaux d’autonomie et de risque écrits</li><li>Validation humaine avant les actions coûteuses</li><li>Porte de mise en production</li></ul><h3>Adoption et mesure</h3><ul class="check"><li>Parcours de formation par rôle</li><li>Un champion par équipe</li><li>Tableau de bord à quatre familles</li></ul></div></div></div>''')

page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">C. Glossaire</h2>
{table(["Terme", "Définition"],
       [["Agent", "Programme qui utilise un modèle de langage pour planifier et agir avec des outils"], ["Système multi-agents", "Ensemble d’agents spécialisés coordonnés pour produire un résultat"],
        ["Contexte", "L’ensemble des informations fournies à un agent pour une tâche, avec leurs droits et leur provenance"], ["Niveau d’autonomie", "Degré de liberté d’un agent, gagné par type de travail"],
        ["Évaluation de régression", "Comparaison d’une version à une référence sur des scénarios fixes"], ["Juge automatique", "Modèle qui note des résultats selon une grille écrite, à calibrer sur des jugements humains"], ["Porte de mise en production", "Critères explicites à satisfaire avant tout élargissement d’usage"],
        ["Compétence (skill)", "Workflow d’agent versionné, testé et réutilisable"], ["MCP", "Protocole standard qui connecte un agent à des outils et à des sources de données"]])}
<h2>D. Pour aller plus loin</h2>
<p>Les projets suivants sont des dépôts publics, en bêta publique pour la plupart. Ils décrivent des conceptions et des cadres, pas des garanties de production.</p>
<ul><li><b>NOVA</b> : plateforme d’agents de travail produit. github.com/yassineaqejjaj/NOVA</li><li><b>ORBIT</b> : contexte et mémoire gouvernés pour agents. github.com/yassineaqejjaj/ORBIT</li><li><b>FORGE</b> : laboratoire d’évaluation d’agents. github.com/yassineaqejjaj/FORGE</li><li><b>TrustRail</b> : politiques, validation humaine et reçus signés pour actions d’agents. github.com/yassineaqejjaj/TrustRail</li><li><b>agentic-sdlc</b> : autonomie gagnée pour les agents de code (licence MIT). github.com/yassineaqejjaj/agentic-sdlc</li></ul>
<p>Des articles détaillés sont disponibles sur <b>iaseen.com/blog</b>. Un second livre blanc, <b>Le guide de l’AI Factory</b>, décrit l’organisation qui produit ces systèmes de façon répétable.</p>
<div class="take" style="margin-top:6mm"><span class="mono">À PROPOS DE L’AUTEUR</span><p>Yassine Aqejjaj dirige l’AI Factory de Devoteam. Il compte 13 ans d’expérience dans la construction de produits d’IA et de modèles opérationnels, dans la défense, les services publics, le retail et les services financiers. Il a formé plus de 1 500 professionnels et publié quatre livres sur l’IA et le leadership. iaseen.com</p></div></div>''')

# ======================================================================= BACK COVER
page(f'''<div style="position:absolute;inset:0;background:radial-gradient(800px 460px at 20% 80%,rgba(76,111,240,.2),transparent 60%),#05060a"></div>
<div style="position:absolute;left:20mm;top:112mm;right:20mm">{SYM}<h1 class="disp" style="font-size:30pt;margin:10mm 0 0;font-weight:700;letter-spacing:-0.04em;line-height:1.05">Construisons<br>la suite.</h1>
<p style="color:#c9ced8;font-size:12pt;margin-top:6mm;max-width:120mm">Un échange sur votre transformation agentique, un retour sur ce guide ou une intervention : écrivez-moi.</p>
<div class="mono" style="color:#7b96ff;margin-top:10mm">IASEEN.COM · LINKEDIN.COM/IN/YASSINE-AQEJJAJ</div></div>
<div class="mono" style="position:absolute;left:20mm;right:20mm;bottom:16mm;color:#6e778c;line-height:1.7">© 2026 Yassine Aqejjaj. Ce document est fourni à titre informatif. Les indicateurs cités proviennent de la plateforme NOVA de l’AI Factory de Devoteam et sont communiqués avec leur méthode de calcul sur demande. Les niveaux d’autonomie, la matrice de sélection et la feuille de route sont des cadres recommandés, à adapter à chaque organisation.</div>''', dark=True, run=False, foot=False)

D.write("guide-transformation-agentique-fr.html", "La transformation agentique · IASEEN")
