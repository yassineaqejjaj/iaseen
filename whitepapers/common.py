"""Shared helpers for the IASEEN white papers (A4 pages rendered to PDF by headless Chrome)."""
import re

SYM = ('<svg width="150" height="90" viewBox="0 0 200 120"><g stroke="rgba(201,206,216,0.5)" stroke-width="1.3" fill="none" stroke-linejoin="round"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z"/>'
       '<path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60"/></g><g fill="#F2F4F8"><circle cx="20" cy="60" r="5"/><circle cx="60" cy="30" r="4.5"/><circle cx="100" cy="22" r="4"/><circle cx="140" cy="30" r="4.5"/><circle cx="180" cy="60" r="5"/><circle cx="140" cy="90" r="4.5"/><circle cx="100" cy="98" r="4"/><circle cx="60" cy="90" r="4.5"/></g><circle cx="100" cy="60" r="11" fill="#4C6FF0"/></svg>')
BIG = ('<svg style="position:absolute;left:14mm;top:128mm;opacity:.9" width="640" height="384" viewBox="0 0 200 120"><g stroke="rgba(201,206,216,0.35)" stroke-width="0.5" fill="none" stroke-linejoin="round"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z"/>'
       '<path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60"/></g><g fill="#F2F4F8"><circle cx="20" cy="60" r="2"/><circle cx="60" cy="30" r="1.8"/><circle cx="100" cy="22" r="1.6"/><circle cx="140" cy="30" r="1.8"/><circle cx="180" cy="60" r="2"/><circle cx="140" cy="90" r="1.8"/><circle cx="100" cy="98" r="1.6"/><circle cx="60" cy="90" r="1.8"/></g><circle cx="100" cy="60" r="4.6" fill="#4C6FF0"/></svg>')
BAND_BG = ('<svg class="bg" width="300" height="180" viewBox="0 0 200 120"><g stroke="rgba(201,206,216,0.30)" stroke-width="0.6" fill="none"><path d="M20 60 L60 30 L100 22 L140 30 L180 60 L140 90 L100 98 L60 90 Z"/>'
           '<path d="M60 30 L100 60 L140 30 M60 90 L100 60 L140 90 M20 60 L180 60"/></g><g fill="#F2F4F8"><circle cx="20" cy="60" r="2.4"/><circle cx="60" cy="30" r="2.1"/><circle cx="100" cy="22" r="1.9"/><circle cx="140" cy="30" r="2.1"/><circle cx="180" cy="60" r="2.4"/><circle cx="140" cy="90" r="2.1"/><circle cx="100" cy="98" r="1.9"/><circle cx="60" cy="90" r="2.1"/></g><circle cx="100" cy="60" r="5.2" fill="#4C6FF0"/></svg>')


class Doc:
    def __init__(self, short_title):
        self.short = short_title
        self.pages = []

    def page(self, inner, dark=False, run=True, foot=True):
        n = len(self.pages) + 1
        r = f'<div class="run mono"><span>IASEEN</span><span>{self.short}</span></div>' if run else ""
        f = f'<div class="foot mono"><span>IASEEN · {self.short}</span><span>{n:02d}</span></div>' if foot else ""
        self.pages.append(f'<section class="page{" dark" if dark else ""}">{r}{inner}{f}</section>')

    def write(self, path, title, lang="fr"):
        html = (f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><title>{title}</title>'
                '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">'
                '<link rel="stylesheet" href="style.css"></head><body>' + "".join(self.pages) + "</body></html>")
        open(path, "w").write(typo(html))
        print("pages:", len(self.pages))


def band(num, title, lead):
    return f'<div class="band">{BAND_BG}<div class="num">{num}</div><h1>{title}</h1><p class="lead">{lead}</p></div>'


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
