"""SVG figures for the AI Factory guide. Palette: IASEEN identity (Void, Deep, Chrome, Light, Electric, Glow)."""
import math

VOID, DEEP, CHROME, LIGHT, ELEC, GLOW = "#05060A", "#0B0E17", "#C9CED8", "#F2F4F8", "#4C6FF0", "#7B96FF"
INK, MUTED, LINE, SOFT = "#18243A", "#5A6682", "#E4E8F2", "#F6F8FC"
FONT = "font-family=\"Inter, sans-serif\""
DISP = "font-family=\"Space Grotesk, Inter, sans-serif\""
MONO = "font-family=\"JetBrains Mono, monospace\""


def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img">'
            '<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            f'<path d="M1 1 L9 5 L1 9" fill="none" stroke="{ELEC}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>'
            f'{body}</svg>')


def txt(x, y, s, size=11, fill=INK, weight=400, anchor="start", font=FONT, extra=""):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}" {font} {extra}>{s}</text>'


def lines(x, y, rows, size=10.5, fill=INK, gap=15, anchor="middle", weight=400):
    return "".join(txt(x, y + i * gap, r, size, fill, weight, anchor) for i, r in enumerate(rows))


def box(x, y, w, h, fill=SOFT, stroke=LINE, r=10, dash="", sw=1):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>'


def arrow(x1, y1, x2, y2, color=ELEC):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.6" marker-end="url(#ar)"/>'


# ---- Figure: the AI Factory model --------------------------------------------------------------
def model(l):
    b = box(150, 6, 340, 40, "#fff", ELEC, 12, "4 4", 1.2) + txt(320, 31, l["demand"], 12.5, INK, 600, "middle")
    cols = [(10, l["e1"]), (222, l["e2"]), (434, l["e3"])]
    for x, (title, items) in cols:
        b += box(x, 82, 196, 160, "#fff", ELEC, 14, "", 1.2)
        b += f'<rect x="{x}" y="82" width="196" height="34" rx="14" fill="{ELEC}"/><rect x="{x}" y="100" width="196" height="16" fill="{ELEC}"/>'
        b += txt(x + 98, 104, title, 12.5, "#fff", 700, "middle", DISP)
        for i, it in enumerate(items):
            b += f'<circle cx="{x + 16}" cy="{140 + i * 26}" r="2.6" fill="{ELEC}"/>' + txt(x + 26, 144 + i * 26, it, 10.2, INK)
    for x in (320,):
        b += arrow(x, 48, x, 80)
    b += arrow(206, 160, 220, 160) + arrow(418, 160, 432, 160)
    b += box(10, 266, 620, 44, DEEP, DEEP, 12) + txt(320, 293, l["gov"], 12, LIGHT, 600, "middle")
    for x in (108, 320, 532):
        b += arrow(x, 244, x, 264)
    return svg(640, 322, b)


# ---- Figure: the flywheel ----------------------------------------------------------------------
def flywheel(l):
    cx, cy, R = 320, 168, 118
    n = len(l["nodes"])
    pts = []
    for i in range(n):
        a = -math.pi / 2 + i * 2 * math.pi / n
        pts.append((cx + R * 1.7 * math.cos(a), cy + R * 0.95 * math.sin(a)))
    b = f'<ellipse cx="{cx}" cy="{cy}" rx="{R * 1.7}" ry="{R * 0.95}" fill="none" stroke="{LINE}" stroke-width="1.4" stroke-dasharray="3 5"/>'
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        vx, vy = mx - cx, my - cy
        k = 0.10
        qx, qy = mx + vx * k, my + vy * k
        sx, sy = x1 + (qx - x1) * 0.42, y1 + (qy - y1) * 0.42
        ex, ey = x2 + (qx - x2) * 0.42, y2 + (qy - y2) * 0.42
        b += f'<path d="M{sx:.1f} {sy:.1f} Q{qx:.1f} {qy:.1f} {ex:.1f} {ey:.1f}" fill="none" stroke="{ELEC}" stroke-width="1.7" marker-end="url(#ar)"/>'
    for (x, y), (t, s) in zip(pts, l["nodes"]):
        b += box(x - 66, y - 24, 132, 48, "#fff", ELEC, 12, "", 1.2) + txt(x, y - 3, t, 10.8, INK, 700, "middle", DISP) + txt(x, y + 12, s, 8.4, MUTED, 400, "middle")
    b += txt(cx, cy - 4, l["center"][0], 13, ELEC, 700, "middle", DISP) + txt(cx, cy + 12, l["center"][1], 9, MUTED, 400, "middle")
    return svg(640, 336, b)


# ---- Figure: maturity staircase ----------------------------------------------------------------
def stairs(l):
    n = len(l["steps"])
    w = 118
    b = ""
    for i, (t, s) in enumerate(l["steps"]):
        h = 74 + i * 38
        x = 8 + i * (w + 6)
        y = 262 - h
        fill = ELEC if i == n - 1 else "#EEF1FF"
        tc = "#fff" if i == n - 1 else INK
        sc = "#E6ECFF" if i == n - 1 else MUTED
        b += box(x, y, w, h, fill, ELEC, 12, "", 1.1)
        b += txt(x + 12, y + 20, f"0{i + 1}", 9, GLOW if i == n - 1 else ELEC, 500, "start", MONO, 'letter-spacing="2"')
        b += txt(x + 12, y + 40, t, 11.5, tc, 700, "start", DISP)
        for j, row in enumerate(s):
            b += txt(x + 12, y + 58 + j * 13, row, 8.4, sc)
    b += arrow(14, 282, 622, 282)
    b += txt(14, 300, l["axis"], 8.6, MUTED)
    return svg(640, 306, b)


# ---- Figure: org chart -------------------------------------------------------------------------
def org(l):
    b = box(220, 4, 200, 44, DEEP, DEEP, 12) + txt(320, 22, l["sponsor"][0], 12.5, LIGHT, 700, "middle", DISP) + txt(320, 38, l["sponsor"][1], 9.4, CHROME, 400, "middle")
    b += box(220, 78, 200, 46, ELEC, ELEC, 12) + txt(320, 97, l["lead"][0], 12.5, "#fff", 700, "middle", DISP) + txt(320, 113, l["lead"][1], 9.4, "#E6ECFF", 400, "middle")
    b += arrow(320, 48, 320, 76)
    b += f'<path d="M320 124 V146 M64 146 H576" stroke="{ELEC}" stroke-width="1.6" fill="none"/>'
    cols = l["teams"]
    w = 118
    for i, (t, rows) in enumerate(cols):
        x = 4 + i * (w + 7)
        cx = x + w / 2
        b += f'<path d="M{cx} 146 V164" stroke="{ELEC}" stroke-width="1.6" fill="none" marker-end="url(#ar)"/>'
        b += box(x, 166, w, 118, "#fff", ELEC, 12, "", 1.1) + txt(cx, 187, t, 10.6, INK, 700, "middle", DISP)
        for j, r in enumerate(rows):
            b += txt(cx, 208 + j * 15, r, 9.2, MUTED, 400, "middle")
    b += box(4, 296, 632, 30, SOFT, LINE, 10, "4 4") + txt(320, 316, l["bridge"], 10, INK, 500, "middle")
    return svg(640, 334, b)


# ---- Figure: platform layers -------------------------------------------------------------------
def layers(l):
    b = ""
    y = 4
    for i, (t, s, role) in enumerate(l["rows"]):
        edge = i in (0, len(l["rows"]) - 1)
        b += box(10, y, 500, 56, "#fff" if edge else "#EEF1FF", ELEC, 12, "4 4" if edge else "", 1.2)
        b += txt(26, y + 24, t, 12.2, INK, 700, "start", DISP) + txt(26, y + 42, s, 9.2, MUTED)
        b += txt(494, y + 33, role, 7.8, ELEC, 500, "end", MONO, 'letter-spacing="1.4"')
        if i < len(l["rows"]) - 1:
            b += arrow(260, y + 56, 260, y + 70)
        y += 72
    b += f'<path d="M520 {y - 100} H600 V32 H520" fill="none" stroke="{ELEC}" stroke-width="1.6" marker-end="url(#ar)"/>'
    b += txt(610, 126, l["loop"][0], 9.6, ELEC, 700, "middle", DISP, 'transform="rotate(90 610 126)"')
    return svg(640, y + 4, b)


# ---- Figure: evaluation loop -------------------------------------------------------------------
def evalloop(l):
    n = len(l["nodes"])
    w = 92
    gap = (640 - n * w) / (n - 1)
    b = ""
    for i, (t, s) in enumerate(l["nodes"]):
        x = i * (w + gap)
        last = i == n - 1
        b += box(x, 18, w, 62, ELEC if last else "#fff", ELEC, 12, "", 1.2)
        b += txt(x + w / 2, 44, t, 10.4, "#fff" if last else INK, 700, "middle", DISP) + txt(x + w / 2, 62, s, 8, "#E6ECFF" if last else MUTED, 400, "middle")
        if i < n - 1:
            b += arrow(x + w + 2, 49, x + w + gap - 2, 49)
    b += f'<path d="M{640 - w / 2} 82 V112 H{w / 2} V82" fill="none" stroke="{ELEC}" stroke-width="1.6" stroke-dasharray="4 4" marker-end="url(#ar)"/>'
    b += txt(320, 130, l["back"], 9.4, ELEC, 600, "middle")
    return svg(640, 140, b)


# ---- Figure: horizontal bars -------------------------------------------------------------------
def bars(rows, title=""):
    b = ""
    y = 6
    for label, val, mx, shown in rows:
        b += txt(0, y + 13, label, 10, INK, 500)
        b += f'<rect x="250" y="{y}" width="330" height="16" rx="8" fill="{LINE}"/>'
        b += f'<rect x="250" y="{y}" width="{330 * val / mx:.1f}" height="16" rx="8" fill="{ELEC}"/>'
        b += txt(630, y + 13, shown, 12, INK, 700, "end", DISP)
        y += 34
    return svg(640, y, b)


# ---- Figure: donut -----------------------------------------------------------------------------
def donut(value, total, centre, sub):
    r = 54
    c = 2 * math.pi * r
    frac = value / total
    b = f'<circle cx="70" cy="70" r="{r}" fill="none" stroke="{LINE}" stroke-width="16"/>'
    b += f'<circle cx="70" cy="70" r="{r}" fill="none" stroke="{ELEC}" stroke-width="16" stroke-dasharray="{c * frac:.1f} {c:.1f}" stroke-linecap="round" transform="rotate(-90 70 70)"/>'
    b += txt(70, 76, centre, 21, INK, 700, "middle", DISP)
    return svg(140, 140, b)


# ---- Figure: before / after --------------------------------------------------------------------
def beforeafter(a, b2, label_a, label_b, unit="/100"):
    ya, yb = 220 - a * 2, 220 - b2 * 2
    b = f'<line x1="20" y1="220" x2="300" y2="220" stroke="{LINE}" stroke-width="1.2"/>'
    b += f'<rect x="60" y="{ya}" width="70" height="{a * 2}" rx="8" fill="{CHROME}"/><rect x="180" y="{yb}" width="70" height="{b2 * 2}" rx="8" fill="{ELEC}"/>'
    b += txt(95, ya - 8, f"{a}{unit}", 14, INK, 700, "middle", DISP) + txt(215, yb - 8, f"{b2}{unit}", 14, ELEC, 700, "middle", DISP)
    b += txt(95, 240, label_a, 9.6, MUTED, 400, "middle") + txt(215, 240, label_b, 9.6, MUTED, 400, "middle")
    b += arrow(138, ya + 30, 172, yb + 30)
    return svg(320, 252, b)


# ---- Figure: KPI tiles (dashboard) -------------------------------------------------------------
def tiles(items):
    b = ""
    w = 150
    for i, (v, lab, sub) in enumerate(items):
        x = i * (w + 8)
        b += box(x, 4, w, 96, DEEP, DEEP, 12)
        b += txt(x + 14, 24, lab, 7.4, GLOW, 500, "start", MONO, 'letter-spacing="1.6"')
        b += txt(x + 14, 62, v, 28, LIGHT, 700, "start", DISP)
        b += txt(x + 14, 84, sub, 8.4, CHROME)
        b += f'<circle cx="{x + w - 16}" cy="20" r="5" fill="{ELEC}"/>'
    return svg(640, 108, b)


# ---- Figure: gantt -----------------------------------------------------------------------------
def gantt(l):
    left, cw = 150, (640 - 150 - 4) / 12
    b = ""
    for m in range(12):
        x = left + m * cw
        b += txt(x + cw / 2, 12, f"M{m + 1}", 8.2, MUTED, 500, "middle", MONO)
        b += f'<line x1="{x}" y1="20" x2="{x}" y2="{24 + len(l["rows"]) * 34}" stroke="{LINE}" stroke-width="1"/>'
    b += f'<line x1="{left + 12 * cw}" y1="20" x2="{left + 12 * cw}" y2="{24 + len(l["rows"]) * 34}" stroke="{LINE}" stroke-width="1"/>'
    for i, (name, bars_) in enumerate(l["rows"]):
        y = 26 + i * 34
        b += txt(0, y + 16, name, 10.2, INK, 600)
        for (a, z, lab, strong) in bars_:
            b += box(left + a * cw + 2, y + 2, (z - a) * cw - 4, 24, ELEC if strong else "#EEF1FF", ELEC, 8, "", 1)
            b += txt(left + a * cw + 10, y + 18, lab, 8.2, "#fff" if strong else INK, 600)
    yb = 30 + len(l["rows"]) * 34
    for (m, lab) in l["gates"]:
        x = left + m * cw
        last = m >= 12
        b += f'<path d="M{x - (7 if last else 0)} {yb} l7 -7 l7 7 l-7 7z" fill="{VOID}"/>' + txt(x if last else x + 7, yb + 24, lab, 8.2, INK, 600, "end" if last else "middle")
    return svg(640, yb + 36, b)
