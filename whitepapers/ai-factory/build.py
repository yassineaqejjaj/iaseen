#!/usr/bin/env python3
"""Builds the AI Factory guide (French) as one HTML file, printed to PDF by headless Chrome.
Only validated figures are used: the author's own AI Factory (800 NOVA users, 15-person team, 1,500+ trained, EUR 12M+ pipeline),
NOVA / LEAP / Prompt Arena indicators. No client name or client result appears anywhere."""
import re
from charts import *
import charts as C

FOOT = "IASEEN · Le guide de l’AI Factory"
pages = []


def page(inner, dark=False, run=True, foot=True):
    n = len(pages) + 1
    r = f'<div class="run mono"><span>IASEEN</span><span>Le guide de l’AI Factory</span></div>' if run else ""
    f = f'<div class="foot mono"><span>{FOOT}</span><span>{n:02d}</span></div>' if foot else ""
    pages.append(f'<section class="page{" dark" if dark else ""}">{r}{inner}{f}</section>')


def band(num, title, lead):
    bg = ('<svg class="bg" width="300" height="180" viewBox="0 0 200 120"><g stroke="rgba(201,206,216,0.30)" stroke-width="0.6" fill="none"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z"/>'
          '<path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60"/></g><g fill="#F2F4F8"><circle cx="20" cy="60" r="2.4"/><circle cx="60" cy="30" r="2.1"/><circle cx="100" cy="22" r="1.9"/><circle cx="140" cy="30" r="2.1"/><circle cx="180" cy="60" r="2.4"/><circle cx="140" cy="90" r="2.1"/><circle cx="100" cy="98" r="1.9"/><circle cx="60" cy="90" r="2.1"/></g><circle cx="100" cy="60" r="5.2" fill="#4C6FF0"/></svg>')
    return f'<div class="band">{bg}<div class="num">{num}</div><h1>{title}</h1><p class="lead">{lead}</p></div>'


def fig(svgs, n, cap):
    return f'<figure class="fig">{svgs}<figcaption><b>FIGURE {n}</b>&nbsp;&nbsp;{cap}</figcaption></figure>'


def table(head, rows, first_th=True):
    h = "".join(f"<th>{c}</th>" for c in head)
    body = ""
    for r in rows:
        cells = "".join((f"<th>{c}</th>" if (i == 0 and first_th) else f"<td>{c}</td>") for i, c in enumerate(r))
        body += f"<tr>{cells}</tr>"
    return f"<table><thead><tr>{h}</tr></thead><tbody>{body}</tbody></table>"


def callout(label, text):
    return f'<div class="callout"><span class="mono">{label}</span>{text}</div>'


def take(label, text):
    return f'<div class="take"><span class="mono">{label}</span><p>{text}</p></div>'


# ======================================================================= COVER
SYM = ('<svg width="150" height="90" viewBox="0 0 200 120"><g stroke="rgba(201,206,216,0.5)" stroke-width="1.3" fill="none" stroke-linejoin="round"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z"/>'
       '<path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60"/></g><g fill="#F2F4F8"><circle cx="20" cy="60" r="5"/><circle cx="60" cy="30" r="4.5"/><circle cx="100" cy="22" r="4"/><circle cx="140" cy="30" r="4.5"/><circle cx="180" cy="60" r="5"/><circle cx="140" cy="90" r="4.5"/><circle cx="100" cy="98" r="4"/><circle cx="60" cy="90" r="4.5"/></g><circle cx="100" cy="60" r="11" fill="#4C6FF0"/></svg>')
BIG = ('<svg style="position:absolute;left:14mm;top:128mm;opacity:.9" width="640" height="384" viewBox="0 0 200 120"><g stroke="rgba(201,206,216,0.35)" stroke-width="0.5" fill="none" stroke-linejoin="round"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z"/>'
       '<path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60"/></g><g fill="#F2F4F8"><circle cx="20" cy="60" r="2"/><circle cx="60" cy="30" r="1.8"/><circle cx="100" cy="22" r="1.6"/><circle cx="140" cy="30" r="1.8"/><circle cx="180" cy="60" r="2"/><circle cx="140" cy="90" r="1.8"/><circle cx="100" cy="98" r="1.6"/><circle cx="60" cy="90" r="1.8"/></g><circle cx="100" cy="60" r="4.6" fill="#4C6FF0"/></svg>')
page(f'''<div style="position:absolute;inset:0;background:radial-gradient(900px 500px at 85% 28%,rgba(76,111,240,.22),transparent 60%),#05060a"></div>{BIG}
<div style="position:absolute;left:20mm;top:22mm">{SYM}</div>
<div style="position:absolute;left:20mm;top:56mm;right:20mm">
<div class="mono" style="color:#7b96ff">LIVRE BLANC · 2026</div>
<h1 class="disp" style="font-size:50pt;line-height:1;margin:6mm 0 0;font-weight:700;letter-spacing:-0.045em">Le guide<br>de l’AI Factory</h1>
<p style="font-size:15pt;line-height:1.35;color:#c9ced8;max-width:125mm;margin-top:8mm">Monter et piloter une usine d’IA au sein d’une grande organisation : modèle, plateforme, gouvernance, adoption et mesure.</p></div>
<div style="position:absolute;left:20mm;right:20mm;bottom:22mm;display:flex;justify-content:space-between;align-items:flex-end;border-top:0.3mm solid #1c2233;padding-top:6mm">
<div><div class="disp" style="font-size:13pt;font-weight:600;letter-spacing:-0.01em">Yassine Aqejjaj</div><div style="color:#9ba3b5;font-size:9pt;margin-top:1mm">Head of AI Factory, Devoteam</div></div>
<div class="mono" style="color:#9ba3b5;text-align:right">VERSION 1.0<br>NOVEMBRE 2026<br>iaseen.com</div></div>''', dark=True, run=False, foot=False)

# ======================================================================= CONTENTS
toc = [("01", "Comprendre l’AI Factory", "Définition, trois moteurs, maturité"), ("02", "Les six décisions de conception", "Mandat, périmètre, gouvernance, financement, talents, plateforme"),
       ("03", "Organisation et rôles", "Équipes, responsabilités, passerelles"), ("04", "Construire la plateforme", "Quatre couches et règles d’assemblage"),
       ("05", "Évaluer et gouverner", "Évaluation, niveaux d’autonomie, risques"), ("06", "Former et faire adopter", "Formation par la pratique, adoption mesurée"),
       ("07", "Mesurer la valeur", "Quatre dimensions, un tableau de bord"), ("08", "Feuille de route sur 12 mois", "Quatre phases et leurs points de contrôle"),
       ("09", "Les erreurs à éviter", "Symptômes, causes, remèdes"), ("A", "Annexes", "Checklist, charte, fiche d’intake, glossaire")]
rows = "".join(f'<div style="display:grid;grid-template-columns:16mm 1fr;gap:4mm;padding:2.6mm 0;border-bottom:0.25mm solid #e4e8f2"><div class="disp" style="font-size:17pt;font-weight:700;color:#4c6ff0;line-height:1">{n}</div><div><div class="disp" style="font-size:12pt;font-weight:700;color:#05060a;line-height:1.2">{t}</div><div style="font-size:8.6pt;color:#5a6682">{s}</div></div></div>' for n, t, s in toc)
page(f'''<div class="pad" style="padding-top:20mm"><div class="mono" style="color:#4c6ff0">SOMMAIRE</div>
<h1 class="disp" style="font-size:26pt;margin:2mm 0 6mm;color:#05060a;letter-spacing:-0.04em">Ce que vous allez trouver</h1>{rows}
<div class="callout" style="margin-top:8mm"><span class="mono">COMMENT LIRE CE GUIDE</span><p>Chaque chapitre se lit seul. Les trois premiers donnent le cadre, les chapitres 4 à 7 détaillent la mécanique, le chapitre 8 donne un plan d’action et le chapitre 9 liste les pièges. Les annexes contiennent des modèles à copier.</p></div></div>''')

# ======================================================================= EXEC SUMMARY
page(f'''<div class="pad" style="padding-top:26mm"><div class="mono" style="color:#4c6ff0">RÉSUMÉ EXÉCUTIF</div>
<h1 class="disp" style="font-size:26pt;margin:2mm 0 5mm;color:#05060a;letter-spacing:-0.04em;line-height:1.05">Cinq idées à retenir</h1>
<div style="display:grid;gap:3.2mm">
<div class="card"><h3>1. Une usine, pas un laboratoire</h3><p style="margin:0">Une AI Factory produit de l’IA de façon répétable. Elle relie une plateforme partagée, des missions d’IA appliquée et un dispositif de montée en compétences, sous une gouvernance commune.</p></div>
<div class="card"><h3>2. Le test du dixième cas d’usage</h3><p style="margin:0">Elle mérite son nom quand le dixième cas d’usage est plus rapide, moins coûteux et plus sûr que le premier. C’est la seule mesure qui ne se contourne pas.</p></div>
<div class="card"><h3>3. Trois choix qui font la différence</h3><p style="margin:0">Un mandat clair qui sait dire non, une plateforme que les équipes préfèrent à leurs propres scripts, et une évaluation systématique avant tout passage à l’échelle.</p></div>
<div class="card"><h3>4. L’adoption est une affaire de personnes</h3><p style="margin:0">Une plateforme que personne ne sait utiliser est un coût. La formation par la pratique fait partie du produit, au même titre que l’interface.</p></div>
<div class="card"><h3>5. Mesurer quatre dimensions</h3><p style="margin:0">Adoption, livraison, qualité et valeur. Sans tableau de bord partagé, l’AI Factory se juge sur des impressions.</p></div></div>
<div class="mono" style="color:#8a93a8;margin:7mm 0 2.5mm">REPÈRES, AI FACTORY DE DEVOTEAM (2023–2026)</div>
<div class="cols3" style="grid-template-columns:repeat(4,1fr)"><div class="stat"><b>800</b><span>collaborateurs utilisent la plateforme NOVA</span></div><div class="stat"><b>15</b><span>personnes dans l’équipe plateforme pluridisciplinaire</span></div><div class="stat"><b>1 500+</b><span>professionnels formés à l’IA générative et agentique</span></div><div class="stat"><b>12 M€+</b><span>de pipeline commercial auquel l’AI Factory a contribué</span></div></div></div>''')

# ======================================================================= CH1
F1 = fig(model({"demand": "Demande d’IA de l’organisation", "e1": ("Plateforme", ["Composants réutilisables", "Contexte et mémoire gouvernés", "Évaluation et sécurité"]),
                "e2": ("Livraison appliquée", ["Missions à valeur réelle", "Exigences remontées", "Mise en production"]),
                "e3": ("Enablement", ["Formation par la pratique", "Communauté et champions", "Mesure des usages"]),
                "gov": "Gouvernance commune · Mesure de la valeur"}), 1, "Le modèle de l’AI Factory : trois moteurs qui se renforcent, une gouvernance et une mesure communes.")
page(band("01", "Comprendre l’AI Factory", "Un modèle opérationnel qui transforme la demande d’IA en production répétable.") +
     f'''<div class="body"><div class="take"><span class="mono">DÉFINITION</span><p>Une AI Factory est une équipe permanente et un modèle opérationnel qui transforment la demande d’IA en production répétable. Elle combine une plateforme partagée, des missions d’IA appliquée et un dispositif de montée en compétences, sous une gouvernance commune.</p></div>
<h2>Pourquoi le mot « factory » ?</h2><p>Un laboratoire explore. Un centre d’expertise conseille. Une usine <b>produit</b>, et produit de plus en plus fiablement la même chose. Ce choix de mot est une promesse : chaque cas d’usage livré doit rendre le suivant moins cher, plus rapide et plus sûr. Sans cette promesse, l’organisation accumule des pilotes qui ne se parlent pas.</p>
{F1}
<div class="cols3" style="margin-top:0"><div class="card"><h3>Répétable</h3><p style="margin:0;font-size:9pt">Chaque cas d’usage réutilise ce que les précédents ont produit : composants, critères, compétences.</p></div><div class="card"><h3>Mesurable</h3><p style="margin:0;font-size:9pt">Quatre dimensions suivies chaque mois : adoption, livraison, qualité, valeur.</p></div><div class="card"><h3>Gouverné</h3><p style="margin:0;font-size:9pt">Des niveaux de risque et d’autonomie écrits, et des portes de mise en production.</p></div></div></div>''')

page(f'''<div class="pad" style="padding-top:20mm"><h2 style="margin-top:0">Quatre structures qu’on confond souvent</h2>
<p>Ces modèles ne s’excluent pas : une AI Factory peut contenir un laboratoire et s’appuyer sur un centre d’expertise. Ce qui la distingue, c’est la <b>production répétable</b> et la <b>mesure</b>.</p>
{table(["", "Laboratoire", "Centre d’excellence", "Équipes projet isolées", "AI Factory"],
       [["Objectif", "Explorer, tester des idées", "Diffuser les bonnes pratiques", "Livrer un projet", "Produire de l’IA de façon répétable"],
        ["Livrable", "Prototypes, notes", "Cadres, standards, conseils", "Une application", "Plateforme, missions livrées, compétences"],
        ["Succès mesuré par", "Découvertes", "Conformité aux standards", "Délai et budget du projet", "Coût et délai du n-ième cas d’usage"],
        ["Risque typique", "Rester en démonstration", "Conseiller sans livrer", "Tout reconstruire à chaque fois", "Devenir un goulot d’étranglement"]])}
<h2>Les trois moteurs</h2>
<div class="cols3"><div class="card"><h3>Plateforme</h3><p style="margin:0;font-size:9pt">Traitement des documents, récupération et contexte, orchestration d’agents, évaluation, sécurité : des composants assemblés plutôt que reconstruits.</p></div>
<div class="card"><h3>Livraison appliquée</h3><p style="margin:0;font-size:9pt">Des missions qui apportent de la valeur réelle et qui nourrissent la plateforme en exigences concrètes. Elles la gardent honnête.</p></div>
<div class="card"><h3>Enablement</h3><p style="margin:0;font-size:9pt">Formation par la pratique, communauté, champions. Sans utilisateurs formés, la plateforme livre des outils dans le silence.</p></div></div>
<div style="width:80%;margin:0 auto">{fig(flywheel({"nodes": [("Demande réelle", "un besoin métier"), ("Livraison appliquée", "des missions"), ("Composants réutilisables", "remontés à la plateforme"), ("Plateforme", "gouvernée et évaluée"), ("Équipes formées", "qui savent l’utiliser")], "center": ("L’effet volant", "chaque tour coûte moins")}), 2, "L’effet volant : la demande nourrit la livraison, la livraison nourrit la plateforme, la plateforme et les équipes formées rendent la demande suivante plus simple à servir.")}</div></div>''')

STAIRS = stairs({"steps": [("Expériences", ["Pilotes isolés,", "chacun avec sa", "propre qualité"]), ("Plateforme", ["Composants", "partagés, réutilisés", "par plusieurs équipes"]), ("Gouvernance", ["Règles décidées", "avec la plateforme,", "pas après"]),
                           ("Évaluation", ["Aucun passage", "à l’échelle sans", "tests passés"]), ("Adoption", ["Usage mesuré,", "compétences,", "valeur suivie"])], "axis": "Maturité de l’organisation  →  chaque stade rend le suivant moins coûteux"})
page(f'''<div class="pad" style="padding-top:20mm"><h2 style="margin-top:0">Les cinq stades de maturité</h2>
<p>La plupart des organisations se trouvent entre les stades 1 et 2. Le passage au stade 3 est le plus sous-estimé : la gouvernance doit être pensée <b>avec</b> la plateforme, sinon les équipes ne lui font pas confiance et ne la réutilisent pas.</p>
{fig(STAIRS, 3, "Cinq stades de maturité d’une AI Factory. Le dernier est atteint quand l’usage, les compétences et la valeur sont suivis.")}
{callout("MON ANALYSE", "<p>Le stade qui sépare les organisations qui avancent de celles qui stagnent est le quatrième : <b>aucun passage à l’échelle sans évaluation</b>. Une plateforme utilisée par des centaines de personnes ne peut pas reposer sur l’impression que « ça semble mieux ».</p>")}
<h2>À qui s’adresse une AI Factory ?</h2>
<div class="cols"><div><h3>Elle est utile si…</h3><ul><li>plusieurs équipes lancent des projets d’IA en parallèle ;</li><li>les mêmes briques (ingestion, récupération, sécurité) sont reconstruites à chaque projet ;</li><li>la direction veut un portefeuille de cas d’usage et pas une collection de pilotes ;</li><li>les compétences en IA restent concentrées sur quelques personnes.</li></ul></div>
<div><h3>Elle est prématurée si…</h3><ul><li>l’organisation n’a pas encore de cas d’usage à forte valeur identifié ;</li><li>aucun sponsor exécutif ne porte le sujet ;</li><li>les données de base ne sont pas accessibles ;</li><li>il n’y a pas de budget pour au moins une équipe plateforme stable.</li></ul></div></div></div>''')

# ======================================================================= CH2
page(band("02", "Les six décisions de conception", "Six choix, faits tôt et explicitement, déterminent la forme et la durée de vie de l’AI Factory.") +
     f'''<div class="body"><p>Ces décisions sont présentées avec l’option que je recommande par défaut. C’est un avis fondé sur ma pratique, pas une norme : adaptez-le à votre contexte.</p>
{table(["Décision", "Question clé", "Option par défaut", "Piège"],
       [["1. Mandat", "À quoi sert l’AI Factory, et que refuse-t-elle ?", "Une mission écrite en une page, un sponsor exécutif, une liste de ce qu’on ne fait pas", "Accepter toutes les demandes : l’usine ne produit plus rien de précis"],
        ["2. Périmètre", "Quels cas d’usage d’abord ?", "Peu de cas à forte valeur et à données accessibles, choisis sur une grille commune", "Choisir selon l’enthousiasme plutôt que la valeur"],
        ["3. Gouvernance", "Qui décide, qui valide, selon quel niveau de risque ?", "Des niveaux de risque, un comité léger, des droits de décision écrits", "Une gouvernance de documents que personne n’applique"],
        ["4. Financement", "Qui paie la plateforme ?", "Plateforme financée comme un produit, missions facturées ou imputées", "Financer chaque projet seul : la plateforme n’existe jamais"],
        ["5. Talents", "Quels profils, internes ou externes ?", "Équipes pluridisciplinaires : produit, ingénierie, évaluation, risque, formation", "Tout miser sur des spécialistes de modèles"],
        ["6. Plateforme", "Construire, acheter ou assembler ?", "Assembler des briques éprouvées, construire seulement ce qui différencie", "Tout construire par fierté, ou tout acheter sans maîtriser le contexte"]])}
<div class="take"><span class="mono">MON ANALYSE</span><p>La décision la plus difficile est de dire non. Une usine qui accepte tout produit des pièces uniques, pas des pièces répétables.</p></div></div>''')

page(f'''<div class="pad" style="padding-top:17mm">
<h2 style="margin-top:0">La grille de choix des cas d’usage</h2>
<p>Un cas d’usage est un bon candidat s’il coche la plupart des critères ci-dessous. Notez chacun de 0 à 3 et comparez les cas entre eux, plutôt que de chercher un score absolu.</p>
{table(["Critère", "Question", "Poids"], [["Valeur", "Le gain est-il identifiable et attendu par un responsable métier ?", "Fort"], ["Données", "Les données nécessaires sont-elles accessibles et de qualité suffisante ?", "Fort"], ["Réutilisabilité", "Les composants construits serviront-ils à un autre cas ?", "Moyen"], ["Risque", "Une erreur est-elle réversible, et un humain peut-il la détecter ?", "Fort"], ["Évaluabilité", "Peut-on définir ce qu’est un bon résultat et le mesurer ?", "Fort"], ["Adoption", "Les futurs utilisateurs sont-ils identifiés et prêts à changer leur façon de faire ?", "Moyen"]])}
<h2>Trois questions avant de dire oui</h2><ol style="padding-left:5mm"><li><b>Qui attend ce résultat, par nom ?</b> Un cas d’usage sans responsable métier identifié est un pilote orphelin.</li><li><b>Comment saura-t-on que c’est bon ?</b> Si l’on ne sait pas décrire un bon résultat, on ne sait pas l’évaluer, donc on ne pourra pas l’étendre.</li><li><b>Que réutiliserons-nous ensuite ?</b> Si rien ne sort de la mission pour la plateforme, c’est une pièce unique.</li></ol>
<div class="callout"><span class="mono">UN BON REFUS</span><p>« Pas maintenant, parce que les données ne sont pas prêtes. Voici ce qu’il faut pour que ce soit un oui dans six mois. » Un refus argumenté protège la crédibilité de l’usine et fait avancer les équipes en amont.</p></div></div>''')

# ======================================================================= CH3
ORG = org({"sponsor": ("Sponsor exécutif", "mandat, arbitrage, budget"), "lead": ("Responsable de l’AI Factory", "stratégie, portefeuille, résultats"),
           "teams": [("Plateforme", ["Product manager", "Ingénieurs plateforme", "Sécurité applicative"]), ("Livraison appliquée", ["Leads de mission", "Ingénieurs IA", "Consultants métier"]),
                     ("Évaluation et qualité", ["Responsable évaluation", "Jeux de scénarios", "Revue humaine"]), ("Gouvernance et risque", ["Risque et conformité", "Données et sécurité", "Juridique"]),
                     ("Enablement", ["Formateurs", "Champions", "Communauté"])],
           "bridge": "Passerelles : revue d’architecture commune, backlog partagé, comité de gouvernance mensuel"})
page(band("03", "Organisation et rôles", "Cinq équipes, un responsable, des passerelles explicites.") +
     f'''<div class="body"><p>Il n’existe pas d’organigramme unique. Le modèle ci-dessous est un point de départ : il montre les <b>fonctions</b> à couvrir, qui peuvent être portées par des équipes distinctes ou par des personnes polyvalentes dans une petite structure.</p>
{fig(ORG, 4, "Organisation type d’une AI Factory. Les fonctions comptent plus que les cases : une petite équipe en cumule plusieurs.")}
<h2>Les cinq fonctions en bref</h2><div class="cols3"><div class="card"><h3>Plateforme</h3><p style="margin:0;font-size:8.6pt">Traite la plateforme comme un produit : feuille de route, utilisateurs internes, critères de version, support.</p></div><div class="card"><h3>Livraison appliquée</h3><p style="margin:0;font-size:8.6pt">Livre des missions à valeur réelle et remonte à la plateforme les exigences et les composants à partager.</p></div><div class="card"><h3>Évaluation et qualité</h3><p style="margin:0;font-size:8.6pt">Possède les jeux de scénarios, les critères et les portes de mise en production. Indépendante des équipes qui livrent.</p></div><div class="card"><h3>Gouvernance et risque</h3><p style="margin:0;font-size:8.6pt">Définit les niveaux de risque et d’autonomie, valide les cas sensibles, tient la piste d’audit.</p></div><div class="card"><h3>Enablement</h3><p style="margin:0;font-size:8.6pt">Conçoit les parcours de formation par rôle, anime la communauté et les champions, mesure l’usage.</p></div></div></div>''')

page(f'''<div class="pad" style="padding-top:17mm">
<h2 style="margin-top:0">Qui fait quoi ?</h2>
{table(["Activité", "Resp. AI Factory", "Plateforme", "Livraison", "Évaluation", "Gouvernance", "Enablement"],
       [["Choisir les cas d’usage", "A", "C", "R", "C", "C", "I"], ["Concevoir un composant partagé", "A", "R", "C", "C", "C", "I"], ["Livrer une mission", "A", "C", "R", "C", "C", "I"],
        ["Définir les critères de qualité", "A", "C", "C", "R", "C", "I"], ["Valider un passage en production", "A", "C", "C", "R", "R", "I"], ["Former les utilisateurs", "A", "I", "C", "I", "I", "R"], ["Suivre les indicateurs", "A", "C", "C", "C", "C", "R"]])}
<p class="src">R : réalise · A : arbitre et répond du résultat · C : consulté · I : informé. Exemple à adapter à votre organisation.</p>
{callout("RÈGLE DES DEUX FOIS", "<p>Tout ce qui a été construit deux fois devient un candidat à la plateforme. C’est le critère le plus simple pour décider ce qui doit sortir d’une mission et entrer dans les composants partagés.</p>")}
<h2>Droits de décision (recommandation)</h2>
{table(["Décision", "Décide", "Consulté"], [["Entrée d’un cas d’usage", "Responsable AI Factory", "Sponsor, métier demandeur, gouvernance"], ["Choix d’un composant partagé", "Responsable plateforme", "Livraison, évaluation, sécurité"], ["Passage en production", "Évaluation et qualité, avec la gouvernance", "Responsable AI Factory, métier"], ["Hausse d’un niveau d’autonomie", "Gouvernance et risque", "Évaluation, livraison"], ["Budget de la plateforme", "Sponsor exécutif", "Responsable AI Factory"]])}</div>''')

# ======================================================================= CH4
LAY = layers({"rows": [("Utilisateur et demande", "Une intention exprimée en langage naturel", "ENTRÉE"), ("Orchestration", "Cadre la demande, planifie, délègue, supervise, assemble le résultat", "COUCHE 1"),
                       ("Contexte gouverné", "Récupère le bon contexte, avec les droits de l’utilisateur et la traçabilité", "COUCHE 2"),
                       ("Agents spécialistes", "Produit, projet, design, ingénierie : un agent par profil, avec ses compétences versionnées", "COUCHE 3"), ("Livrable structuré", "Versionné, éditable, avec ses sources", "SORTIE")],
              "loop": ("Évaluation continue",)})
page(band("04", "Construire la plateforme", "Un agent à qui parler, des spécialistes derrière, un contexte gouverné dessous, une évaluation autour.") +
     f'''<div class="body"><p>La plateforme est ce qui transforme chaque mission en capital réutilisable. Sa conception repose sur quatre couches. Ce découpage vient de la plateforme agentique que je dirige, mais il s’applique à d’autres.</p>
{fig(LAY, 5, "Architecture en couches d’une plateforme agentique. L’évaluation entoure l’ensemble : chaque résultat revient dans le contexte et le comportement.")}
{table(["Couche", "Rôle", "Question de conception"],
       [["Orchestration", "Un seul interlocuteur pour l’utilisateur : il cadre, planifie, délègue, supervise", "Comment éviter que l’utilisateur doive connaître l’organigramme des agents ?"],
        ["Contexte", "Récupérer le bon contenu, au bon moment, avec les bons droits", "Que sait-on, d’où, pour qui, depuis quand, et pourquoi cet élément a-t-il été retenu ?"],
        ["Spécialistes", "Un agent par profil, avec des compétences versionnées", "Où l’autonomie est-elle utile, où vaut-il mieux un flux fixe ?"],
        ["Évaluation", "Mesurer chaque version avant et après passage à l’échelle", "Quels scénarios, quels critères, quel seuil de décision ?"]])}</div>''')

page(f'''<div class="pad" style="padding-top:20mm"><h2 style="margin-top:0">Construire, acheter ou assembler ?</h2>
<p>La question n’est presque jamais binaire. Je recommande d’<b>assembler</b> des briques éprouvées et de ne construire que ce qui vous différencie : en général le <b>contexte</b> (vos données, vos droits, votre vocabulaire) et l’<b>évaluation</b> (vos critères de qualité).</p>
{table(["Brique", "Construire", "Acheter ou réutiliser", "Critère de décision"],
       [["Modèles de langage", "Presque jamais", "Presque toujours", "Qualité, coût, confidentialité, souveraineté exigée"], ["Orchestration d’agents", "Si vos flux sont très spécifiques", "Si le besoin est générique", "Part de logique métier dans l’orchestration"],
        ["Contexte et mémoire", "Souvent : c’est un actif propre", "Pour les connecteurs standards", "Sensibilité des données et droits d’accès"], ["Évaluation", "Souvent : vos critères sont les vôtres", "Pour l’outillage de traces", "Spécificité des critères de qualité"], ["Interface", "Rarement différenciante", "Composants standards", "Accessibilité, rapidité de livraison"]])}
<h2>Cinq principes d’assemblage</h2>
<ol style="padding-left:5mm"><li><b>Le contexte est un produit, pas une instruction.</b> Il a un propriétaire, un cycle de vie et une piste d’audit.</li><li><b>Chaque composant a une interface stable.</b> Une mission ne doit pas dépendre de ses détails internes.</li><li><b>Tout composant partagé est évalué avant d’être proposé</b> à une seconde équipe.</li><li><b>Les droits sont propagés de bout en bout :</b> l’agent ne voit que ce que l’utilisateur peut voir.</li><li><b>Chaque résultat porte ses sources</b> et une explication de ce qui a été retenu ou écarté.</li></ol>
<h2>Quelques réglages qui comptent</h2><div class="cols"><ul><li><b>Une source de vérité par donnée.</b> Dupliquer les documents dans chaque projet multiplie les risques de fuite et d’obsolescence.</li><li><b>Un catalogue de compétences.</b> Les workflows d’agents sont versionnés, testés et réutilisables.</li></ul><ul><li><b>Des environnements d’essai synthétiques.</b> Testez les actions d’agents sur des données fictives avant toute donnée réelle.</li><li><b>Un coût suivi par requête.</b> Sans mesure, le coût d’usage dérive sans que personne ne l’ait décidé.</li></ul></div></div>''')

# ======================================================================= CH5
EV = evalloop({"nodes": [("Scénario", "jeu fixe"), ("Exécution", "version testée"), ("Trace", "tout est rejouable"), ("Score", "règles et juges"), ("Revue", "humaine ciblée"), ("Décision", "porte de mise en prod")], "back": "Ce que la décision apprend retourne dans les scénarios"})
page(band("05", "Évaluer et gouverner", "On ne confie pas plus d’autonomie à ce qu’on ne sait pas mesurer.") +
     f'''<div class="body"><h2 style="margin-top:0">La question est toujours : cette version est-elle meilleure ?</h2>
<p>Un système d’agents change à chaque modification de consigne, d’outil, de modèle ou de contexte. Sans jeu de scénarios fixe, personne ne distingue une amélioration d’une régression. L’évaluation traite chaque version comme une <b>expérience</b> : mêmes scénarios, une référence contre un candidat, avec scores, coût, erreurs et niveau de confiance.</p>
{fig(EV, 6, "La boucle d’évaluation d’un système d’agents.")}
{table(["Couche d’évaluation", "Ce qu’elle attrape", "Sa limite"],
       [["Règles déterministes", "Format, citations, sources absentes, données personnelles, outil interdit, coût ou latence hors budget", "Ne juge pas si une réponse est vraiment bonne"],
        ["Juges automatiques (LLM)", "Qualité, cohérence, raisonnement par rapport à une grille écrite", "Ont leurs propres biais ; à calibrer sur des jugements humains"],
        ["Revue humaine", "Erreurs subtiles, ton, justesse métier", "Lente et coûteuse : à cibler sur les cas critiques"],
        ["Traces", "Quel appel de modèle, d’outil ou de récupération a échoué", "Explique un échec, ne dit pas s’il faut le corriger"],
        ["Scénarios cachés ou nouveaux", "Sur-optimisation : un système réglé sur des tests publics échoue sur du nouveau", "Valent ce que valent leur fraîcheur et leur représentativité"]])}</div>''')

page(f'''<div class="pad" style="padding-top:20mm"><h2 style="margin-top:0">Quatre niveaux d’autonomie, gagnés un par un</h2>
<p>L’autonomie d’un agent est un <b>statut gagné par type de travail</b>, pas une propriété du modèle. Je m’appuie sur une échelle à quatre niveaux, issue d’un cadre public pour les agents de code, que l’on peut transposer à d’autres usages.</p>
{table(["Niveau", "L’agent peut", "L’humain doit encore"],
       [["L0 · Suggérer", "Proposer des options et des brouillons", "Décider et écrire le changement"], ["L1 · Assister", "Produire en petites étapes", "Relire chaque modification"], ["L2 · Déléguer", "Accomplir une tâche bornée et la soumettre", "La relire et passer les contrôles"], ["L3 · Superviser", "Vérifier et appliquer dans un environnement non productif", "Auditer des échantillons et approuver la mise en production"]])}
<h2>Les niveaux de risque d’une action</h2>
{table(["Type d’action", "Exemple", "Contrôle attendu"],
       [["Lecture seule", "Résumer un document accessible", "Droits d’accès, traçabilité des sources"], ["Écriture réversible", "Brouillon dans un outil de gestion de projet", "Journal, annulation possible"], ["Action coûteuse ou externe", "Envoyer un message ou un paiement", "Validation humaine avant exécution"], ["Hors périmètre", "Accès à des données non autorisées", "Blocage par politique, alerte"]])}
<div class="take"><span class="mono">MON ANALYSE</span><p>L’évaluation est le plan de contrôle d’une plateforme d’agents. Sans elle, chaque version est un pari. Avec elle, on peut donner plus d’autonomie aux agents, parce qu’on peut montrer ce qui se passe.</p></div>
<h2>Cinq règles de gouvernance</h2><ol style="padding-left:5mm"><li>Un agent est un demandeur non fiable : la politique est décidée <b>hors du modèle</b>.</li><li>L’approbation humaine dépend de la <b>conséquence</b> de l’action, pas de sa nouveauté.</li><li>L’autonomie baisse d’un niveau après un incident et ne remonte qu’avec des preuves.</li><li>Tout ce qui agit laisse une <b>trace vérifiable</b> : qui, quoi, sous quelle politique.</li><li>Les données sensibles sont classées et le classement suit le contexte jusqu’à la réponse.</li></ol></div>''')

# ======================================================================= CH6
BA = beforeafter(61, 84, "Avant", "Après", "/100")
page(band("06", "Former et faire adopter", "Une plateforme que personne ne sait utiliser est un coût. La formation fait partie du produit.") +
     f'''<div class="body"><p>L’adoption ne se décrète pas. Elle repose sur des compétences concrètes, une pratique régulière et des relais dans chaque métier. Les chiffres ci-dessous viennent de deux dispositifs que j’ai conçus au sein de l’AI Factory de Devoteam : un programme de formation interne et un espace de pratique du prompting.</p>
<div class="mono" style="color:#8a93a8;margin:3mm 0 2mm">PROGRAMME DE FORMATION INTERNE (LEAP)</div>
<div class="cols3" style="grid-template-columns:repeat(5,1fr)"><div class="stat"><b>1 500+</b><span>professionnels formés</span></div><div class="stat"><b>75+</b><span>sessions animées</span></div><div class="stat"><b>4,6/5</b><span>satisfaction</span></div><div class="stat"><b>+32 pts</b><span>progression à l’évaluation des connaissances</span></div><div class="stat"><b>68 %</b><span>appliquent leurs compétences après 30 jours</span></div></div>
<div class="cols" style="margin-top:5mm;align-items:center"><div><h2 style="margin-top:0">La pratique fait la différence</h2><p>Une session de formation seule produit des enthousiastes. La pratique encadrée produit des habitudes. L’espace de pratique du prompting propose 13 parcours et 130 défis appliqués ; le score d’évaluation passe de 61 à 84 sur 100.</p><ul><li>13 parcours d’apprentissage</li><li>130 défis appliqués</li><li>76 % de réussite aux défis</li><li>71 % d’achèvement des parcours</li></ul></div>
{fig(BA, 7, "Score d’évaluation avant et après le parcours de pratique (sur 100).")}</div>
{callout("PRINCIPE", "<p>On forme <b>par rôle</b> et à partir de <b>vraies tâches</b> : un juriste, un chef de projet et un ingénieur n’ont pas besoin du même parcours. Et on mesure ce qui se passe à trente jours, pas seulement la satisfaction du jour.</p>")}</div>''')

DON = donut(800, 10000, "≈ 8 %", "")
BARS = bars([("Réussite des tâches", 92, 100, "92 %"), ("Coordination des agents", 92, 100, "92 %"), ("Livrables acceptés sans révision majeure", 81, 100, "81 %"), ("Rétention des utilisateurs à J7", 23, 100, "23 %")])
page(f'''<div class="pad" style="padding-top:20mm"><h2 style="margin-top:0">Cinq leviers d’adoption</h2>
{table(["Levier", "Ce qu’il change", "Comment le mettre en place"],
       [["Formation par rôle", "Les utilisateurs savent quoi demander et comment vérifier", "Parcours courts, basés sur des tâches réelles du métier"], ["Pratique encadrée", "Les compétences deviennent des habitudes", "Défis appliqués, retours, évaluation avant et après"], ["Champions", "Un relais de confiance dans chaque équipe", "Un volontaire par équipe, un temps dédié, une communauté"], ["Retours rapides", "Les frictions sont corrigées vite", "Un canal unique, un rythme de correction, des releases visibles"], ["Mesure des usages", "L’équipe voit ce qui marche", "Taux d’usage, rétention, tâches réussies, temps gagné"]])}
<h2>Un exemple chiffré : l’adoption de la plateforme NOVA</h2>
<div class="cols" style="align-items:center;grid-template-columns:48mm 1fr"><div style="text-align:center"><div style="width:42mm;margin:0 auto">{DON}</div><div class="disp" style="font-size:19pt;font-weight:700;color:#05060a;margin-top:-2mm">800</div><div style="font-size:8pt;color:#5a6682">collaborateurs utilisent NOVA, sur un groupe de plus de 10 000 consultants dans 25 pays</div></div>
<div>{fig(BARS, 8, "Indicateurs d’usage de la plateforme NOVA. Source : AI Factory de Devoteam.")}</div></div>
{callout("LECTURE HONNÊTE", "<p>La rétention à J7 (23 %) est l’indicateur le plus bas et le plus utile : il dit que l’outil convainc à l’usage mais ne devient pas encore une habitude pour tous. C’est un chantier d’adoption, pas un problème de qualité. Chiffres indicatifs de la plateforme interne ; la méthode de calcul est communiquée sur demande.</p>")}</div>''')

# ======================================================================= CH7
TILES = tiles([("800", "ADOPTION", "utilisateurs déployés"), ("92 %", "QUALITÉ", "tâches réussies"), ("−42 %", "EFFICACITÉ", "temps d’exécution des tâches"), ("+32 pts", "COMPÉTENCES", "progression à l’évaluation")])
page(band("07", "Mesurer la valeur", "Quatre dimensions, peu d’indicateurs, un tableau de bord partagé.") +
     f'''<div class="body"><p>Une AI Factory qui ne mesure pas sa valeur se juge à l’intuition. La mesure ne doit pas devenir un projet : quatre dimensions, trois à cinq indicateurs chacune, relus chaque mois.</p>
{table(["Dimension", "Question posée", "Indicateurs types", "Propriétaire"],
       [["Adoption", "Les gens utilisent-ils ce qu’on construit ?", "Utilisateurs actifs, rétention, taux d’usage par métier", "Enablement"], ["Livraison", "Livre-t-on plus vite et plus sûrement ?", "Délai de livraison, taux de réutilisation des composants, coût par cas d’usage", "Livraison"],
        ["Qualité", "Les résultats sont-ils fiables ?", "Taux de réussite des tâches, couverture d’évaluation, régressions détectées", "Évaluation"], ["Valeur", "Qu’est-ce que cela rapporte ?", "Temps gagné, coût par requête, revenus ou économies attribuables, pipeline", "Responsable AI Factory"]])}
{fig(TILES, 9, "Exemple de tableau de bord à quatre tuiles, avec les indicateurs de la plateforme NOVA et du programme de formation. Source : AI Factory de Devoteam.")}
<h2>Trois règles pour des indicateurs crédibles</h2>
<ol style="padding-left:5mm"><li><b>Dire comment on calcule.</b> Une valeur sans méthode, périmètre ni période de mesure ne convainc ni un recruteur ni un financeur.</li><li><b>Comparer à une référence.</b> Un temps gagné se calcule contre une situation initiale mesurée, pas contre une estimation.</li><li><b>Montrer aussi ce qui va mal.</b> Un tableau de bord où tout est vert n’inspire pas confiance.</li></ol>
{take("MON ANALYSE", "L’indicateur qui compte le plus est le coût et le délai du dixième cas d’usage par rapport au premier. Tout le reste en est un symptôme.")}</div>''')

# ======================================================================= CH8
G = gantt({"rows": [("Gouvernance", [(0, 2, "Mandat, charte", True), (2, 6, "Niveaux de risque, comité", False), (6, 12, "Revue trimestrielle", False)]),
                    ("Plateforme", [(1, 5, "Socle minimal", True), (5, 10, "Composants partagés", True), (10, 12, "Catalogue", False)]),
                    ("Livraison", [(2, 6, "2 cas pilotes", True), (6, 10, "5 à 8 cas", False), (10, 12, "Réutilisation", False)]),
                    ("Évaluation", [(2, 4, "Critères", False), (4, 9, "Jeux de scénarios, portes", True), (9, 12, "Régression continue", False)]),
                    ("Enablement", [(3, 6, "Parcours pilotes", False), (6, 12, "Champions, communauté", True)]),
                    ("Mesure", [(1, 3, "Référence", False), (3, 12, "Tableau de bord mensuel", False)])],
          "gates": [(2, "Mandat"), (6, "Preuve"), (10, "Échelle"), (12, "Bilan")]})
page(band("08", "Feuille de route sur 12 mois", "Quatre phases, quatre points de contrôle. Une trajectoire recommandée, à adapter.") +
     f'''<div class="body"><p>Cette feuille de route est un <b>cadre recommandé</b>, pas le calendrier d’une organisation particulière. Les durées dépendent de la taille, du niveau de maturité et de la disponibilité des données.</p>
{fig(G, 10, "Feuille de route sur 12 mois par chantier. Les losanges marquent les points de contrôle.")}
{table(["Phase", "Mois", "Objectif", "Point de contrôle"],
       [["Cadrer", "M1 à M2", "Mandat écrit, sponsor, charte, grille de choix des cas d’usage, mesure de référence", "Mandat validé par le sponsor"], ["Prouver", "M3 à M6", "Deux cas pilotes en production restreinte, socle minimal de plateforme, premiers critères d’évaluation", "Les pilotes passent leurs scénarios et sont utilisés"],
        ["Industrialiser", "M7 à M10", "Composants partagés réutilisés, portes de mise en production, parcours de formation, champions", "Un deuxième cas réutilise des composants du premier"], ["Étendre", "M11 à M12", "Portefeuille de cas d’usage, catalogue de compétences, bilan chiffré", "Le coût et le délai du cas n sont inférieurs à ceux du cas 1"]])}
<div class="callout"><span class="mono">CE QU’IL FAUT PROTÉGER</span><p>Les deux premiers mois paraissent lents. Ils décident pourtant de tout le reste : un mandat qui sait dire non et une mesure de référence. Sans eux, il n’y a aucun moyen de prouver que l’usine s’améliore.</p></div></div>''')

# ======================================================================= CH9
page(band("09", "Les erreurs à éviter", "Elles sont prévisibles, ce qui est la bonne nouvelle.") +
     f'''<div class="body">{table(["Erreur", "Symptôme", "Cause", "Remède"],
       [["Une usine sans demande", "Une plateforme brillante que personne n’utilise", "On construit pour des cas d’usage que personne n’a demandés", "Partir d’un problème métier et d’un responsable qui l’attend"],
        ["Un goulot d’étranglement", "Les équipes contournent l’AI Factory", "Toute demande d’IA doit passer par une équipe centrale", "L’usine possède les briques partagées, pas chaque décision"],
        ["Une plateforme déconnectée de la livraison", "Élégante mais inutile pour les missions", "L’équipe plateforme ne travaille jamais sur un problème client", "Faire tourner des ingénieurs entre plateforme et missions"],
        ["La formation en dernier", "Faible usage, quelques enthousiastes", "Déploiement d’un outil sans pratique", "Concevoir la formation en même temps que le produit"],
        ["Une gouvernance de papier", "Des règles que personne n’applique", "Définie après la plateforme et sans les équipes", "Écrire les règles avec la plateforme et les automatiser"],
        ["Pas d’évaluation", "Des régressions découvertes par les utilisateurs", "On juge sur des démonstrations", "Un jeu de scénarios fixe et une porte de mise en production"],
        ["Des indicateurs sans méthode", "Des chiffres qui ne convainquent personne", "Pas de référence, pas de périmètre", "Documenter calcul, périmètre et période de mesure"],
        ["Tout accepter", "Une collection de pièces uniques", "Pas de mandat ni de critères de choix", "Une grille de choix et le courage de refuser"]])}
{take("MON ANALYSE", "Si je recommençais, je formerais les gens plus tôt et je dirais non à davantage de demandes. Une usine qui accepte tout ne produit rien de précis, et une usine sans demande n’est qu’une équipe plateforme coûteuse.")}</div>''')

# ======================================================================= ANNEXES
page(band("A", "Annexes", "Modèles à copier : checklist de lancement, charte, fiche d’intake.") +
     f'''<div class="body"><h2 style="margin-top:0">A. Checklist de lancement</h2><div class="cols"><div><h3>Cadrage</h3><ul class="check"><li>Un sponsor exécutif nommé</li><li>Une mission en une page, avec ce qu’on refuse</li><li>Une grille de choix des cas d’usage</li><li>Une mesure de référence avant de commencer</li></ul><h3>Plateforme</h3><ul class="check"><li>Un socle minimal et une interface stable</li><li>Des droits d’accès propagés de bout en bout</li><li>Un journal et des sources sur chaque résultat</li><li>Un suivi du coût par requête</li></ul></div>
<div><h3>Évaluation et gouvernance</h3><ul class="check"><li>Un jeu de scénarios fixe par cas d’usage</li><li>Des niveaux de risque et d’autonomie écrits</li><li>Une validation humaine avant les actions coûteuses</li><li>Une porte de mise en production</li></ul><h3>Adoption et mesure</h3><ul class="check"><li>Un parcours de formation par rôle</li><li>Un champion par équipe</li><li>Un tableau de bord à quatre dimensions</li><li>Une revue mensuelle des indicateurs</li></ul></div></div>
<h2>B. Charte d’une AI Factory (à remplir sur une page)</h2>
{table(["Rubrique", "À écrire"], [["Mission", "À quoi sert l’AI Factory, pour qui, en une phrase"], ["Périmètre", "Les types de cas d’usage pris en charge et les critères de choix"], ["Ce que nous ne faisons pas", "Trois à cinq refus explicites"], ["Gouvernance", "Qui décide, qui valide, niveaux de risque et d’autonomie"], ["Plateforme", "Les briques partagées et leurs responsables"], ["Indicateurs", "Trois à cinq indicateurs par dimension, avec méthode de calcul"], ["Revue", "Rythme, participants, décisions possibles"]])}</div>''')

page(f'''<div class="pad" style="padding-top:17mm"><h2 style="margin-top:0">C. Fiche d’intake d’une demande</h2>
{table(["Champ", "Exemple de question"], [["Problème", "Quelle tâche ou décision veut-on améliorer, et pour qui ?"], ["Valeur attendue", "Quel gain, mesuré comment, par qui ?"], ["Données", "Où sont-elles, qui les gère, sont-elles autorisées pour cet usage ?"], ["Risque", "Une erreur est-elle réversible ? Qui la détecterait ?"], ["Qualité", "À quoi ressemble un bon résultat ? Quels scénarios de test ?"], ["Adoption", "Qui utilisera cela, et que doit-il changer dans son travail ?"]])}
<h2>D. Glossaire</h2>
{table(["Terme", "Définition"],
       [["AI Factory", "Équipe permanente et modèle opérationnel qui produisent de l’IA de façon répétable"], ["Agent", "Programme qui utilise un modèle de langage pour planifier et agir avec des outils"], ["Orchestrateur", "Agent unique qui cadre la demande et délègue aux spécialistes"],
        ["RAG", "Génération augmentée par récupération : le modèle répond à partir de documents retrouvés"], ["Contexte", "L’ensemble des informations fournies à un agent pour une tâche, avec leurs droits et leur provenance"], ["Évaluation de régression", "Comparaison d’une version à une référence sur des scénarios fixes"],
        ["Fidélité", "Part de la réponse qui s’appuie sur les sources fournies"], ["Précision du contexte", "Part des éléments récupérés qui sont réellement utiles"], ["Rappel du contexte", "Part des éléments utiles qui ont bien été récupérés"],
        ["Niveau d’autonomie", "Degré de liberté d’un agent, gagné par type de travail"], ["MCP", "Protocole standard qui connecte un agent à des outils et à des sources de données"], ["Porte de mise en production", "Critères explicites à satisfaire avant tout élargissement d’usage"]])}
</div>''')

page(f'''<div class="pad" style="padding-top:20mm"><h2 style="margin-top:0">E. Pour aller plus loin</h2>
<p>Les projets suivants sont des dépôts publics, en bêta publique pour la plupart. Ils décrivent des conceptions et des cadres, pas des garanties de production.</p>
<ul><li><b>NOVA</b> : plateforme d’agents de travail produit. github.com/yassineaqejjaj/NOVA</li><li><b>ORBIT</b> : contexte et mémoire gouvernés pour agents. github.com/yassineaqejjaj/ORBIT</li><li><b>FORGE</b> : laboratoire d’évaluation d’agents. github.com/yassineaqejjaj/FORGE</li><li><b>TrustRail</b> : politiques, validation humaine et reçus signés pour actions d’agents. github.com/yassineaqejjaj/TrustRail</li><li><b>agentic-sdlc</b> : autonomie gagnée pour les agents de code (licence MIT). github.com/yassineaqejjaj/agentic-sdlc</li></ul>
<p>Des articles détaillés sont disponibles sur <b>iaseen.com/blog</b> : plateformes agentiques, modèle opérationnel, évaluation, gouvernance et ingénierie du contexte.</p>
<div class="take" style="margin-top:7mm"><span class="mono">À PROPOS DE L’AUTEUR</span><p>Yassine Aqejjaj dirige l’AI Factory de Devoteam. Il compte 13 ans d’expérience dans la construction de produits d’IA et de modèles opérationnels, dans la défense, les services publics, le retail et les services financiers. Il a formé plus de 1 500 professionnels et publié quatre livres sur l’IA et le leadership. iaseen.com</p></div></div>''')

# ======================================================================= BACK COVER
page(f'''<div style="position:absolute;inset:0;background:radial-gradient(800px 460px at 20% 80%,rgba(76,111,240,.2),transparent 60%),#05060a"></div>
<div style="position:absolute;left:20mm;top:112mm;right:20mm">{SYM}<h1 class="disp" style="font-size:30pt;margin:10mm 0 0;font-weight:700;letter-spacing:-0.04em;line-height:1.05">Construisons<br>la suite.</h1>
<p style="color:#c9ced8;font-size:12pt;margin-top:6mm;max-width:120mm">Un échange sur la mise en place de votre AI Factory, un retour sur ce guide ou une intervention : écrivez-moi.</p>
<div class="mono" style="color:#7b96ff;margin-top:10mm">IASEEN.COM · LINKEDIN.COM/IN/YASSINE-AQEJJAJ</div></div>
<div class="mono" style="position:absolute;left:20mm;right:20mm;bottom:16mm;color:#6e778c;line-height:1.7">© 2026 Yassine Aqejjaj. Ce document est fourni à titre informatif. Les indicateurs cités proviennent de l’AI Factory de Devoteam et sont communiqués avec leur méthode de calcul sur demande. Les modèles de gouvernance et la feuille de route sont des cadres recommandés, à adapter à chaque organisation.</div>''', dark=True, run=False, foot=False)

# ======================================================================= WRITE
html = ('<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Le guide de l’AI Factory · IASEEN</title>'
        '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">'
        '<link rel="stylesheet" href="style.css"></head><body>' + "".join(pages) + "</body></html>")


def typo(s):
    parts = re.split(r"(<[^>]+>)", s)
    out = []
    for p in parts:
        if p.startswith("<"):
            out.append(p)
            continue
        p = re.sub(r" ([?!:;»%])", "\u202f\\1", p)
        p = p.replace("« ", "«\u202f")
        p = re.sub(r"(\d) (\d{3})", "\\1\u202f\\2", p)
        p = re.sub(r"(\d) (M€|pts|%|min|s)\b", "\\1\u202f\\2", p)
        out.append(p)
    return "".join(out)


open("guide-ai-factory-fr.html", "w").write(typo(html))
print("pages:", len(pages))
