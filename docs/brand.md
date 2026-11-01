# IASEEN brand identity (v1.0, 2026)

Source: the "IASEEN Constellation" board of the identity canvas. This file mirrors it so the code and the brand stay aligned.

## Logo: Constellation

An eye drawn by eight connected nodes, with the pupil (the centre node) as the only colour: an intelligence that sees the connections.

| File | Use |
|---|---|
| `public/brand/symbol.svg` | Symbol on dark grounds (default) |
| `public/brand/symbol-small.svg` | Below 48 px wide: four nodes, heavier strokes |
| `public/brand/symbol-light.svg` | Symbol on light grounds |
| `public/brand/symbol-mono.svg` | One colour (print, stamps) |
| `public/brand/symbol-accent.svg` | On the electric blue ground |
| `public/brand/lockup.svg`, `lockup-light.svg` | Horizontal symbol + IASEEN |
| `public/brand/app-icon.svg`, `app-icon-dark.svg` | App and avatar icon |
| `app/icon.svg`, `app/apple-icon.tsx` | Favicon and touch icon |

Component: `components/Logo.tsx` (`Symbol`, `Wordmark`, default lockup).

Rules: minimum 16 px (symbol) and 96 px wide (full logo); clear space = 1.5 x the pupil diameter on every side; never stretch, recolour the nodes, rotate the eye or change the wordmark typeface; one point of light per screen.

## Colours

| Role | Name | Hex |
|---|---|---|
| Background (about 70%) | Void | `#05060A` |
| Surfaces | Deep | `#0B0E17` (cards `#11141F`) |
| Links between nodes, text | Chrome | `#C9CED8` |
| Nodes, text | Light | `#F2F4F8` |
| Pupil, buttons | Electric | `#4C6FF0` |
| Glow, links, labels | Glow | `#7B96FF` |

Muted text `#9BA3B5`, borders `#1C2233` / `rgba(201,206,216,.16)`. Tokens live in `app/globals.css` (`:root`).

## Typography

- Titles: Space Grotesk 700, tracking -4%.
- Wordmark IASEEN: Space Grotesk 500, tracking +28%.
- Text: Inter 400 / 600.
- Labels: JetBrains Mono, capitals, tracking +24% (`.eyebrow`).
- Arabic: Noto Sans Arabic, no letter-spacing.
