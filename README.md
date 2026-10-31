# YA. — Personal AI Portfolio

Next.js 16 · TypeScript · Tailwind v4 · Motion

## Run
    npm install && npm run dev   # port 3100 (change in package.json if busy)
    npm run build && npm start

## Content
Everything lives in `lib/content.ts`. Ask My AI answers only from that file.
Case-study `impact` / `lessons` are `null` until you validate real figures; they never render as metrics.
Defense missions: only public/authorised information.

## Env (optional)
- `NEXT_PUBLIC_SITE_URL` — canonical URL (sitemap, OG)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — enables Plausible analytics

## Deploy
Push to GitHub, import in Vercel, add the env vars, attach the domain.
