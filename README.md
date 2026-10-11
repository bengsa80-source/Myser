# MYSER | مُيسّرة

An Arabic-first, bilingual Saudi digital-services concept built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

The default homepage is a simple sector-based guide: Commerce & business, People & public services, Traffic & vehicles, and Justice & legal services. Each sector has its own directory of official platforms.

`/sectors/business` keeps the commerce platforms together, while `/sectors/justice` independently lists the justice platforms. `/business` offers a four-step business setup guide tailored to retail shops, cafés/restaurants, and online stores. Users open official platforms in a new tab and mark their own progress; no official completion is inferred. Activity and checklist progress are retained locally in the browser without collecting personal information.

The previous cinematic landing page, assistant, GovMeet meeting demo, wallet, and mobile concepts remain available at `/showcase`. Arabic uses RTL; each page includes an English LTR switch.

## Development

Use Node.js 20.9 or newer (validated on Node.js 24.19.0).

```sh
cd /workspace/Myser
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

The development server uses port 3000. There is no database, external AI endpoint, API key, or government integration required. All fonts and imagery are served locally; installation only requires the npm registry.

## Validation

```sh
npm run build
npm run typecheck
npm run test:e2e
```

To exercise an existing production build, use `MYSER_TEST_PRODUCTION=1 npm run test:e2e`.

The browser suite covers independent sector directories, activity-specific business steps, persisted progress, official link destinations, Arabic/English mobile layouts, and the original showcase interactions. It starts its own development server on port 3100 with two workers. Avoid running two Next.js development servers in this checkout at the same time because they share `.next`.

Tests use system Chromium when `/usr/bin/chromium` exists. Else install the Playwright browser with `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an installed browser. For a production smoke check, run `npm run build` followed by `npm start`, then make a local HTTP request and exercise a demo journey in a browser.

## Structure

- `app/`: Next.js routes, metadata, app icon, and responsive design system.
- `components/PlatformHome.tsx`, `SectorDirectory.tsx`, `BusinessJourney.tsx`: simple sector portal, official directories, and business checklist.
- `components/PlatformHeader.tsx`: shared portal header and navigation.
- `lib/platforms.ts`: sector-specific official platform definitions.
- `components/Homepage.tsx`: preserved cinematic showcase and demo interactions.
- `components/Brand.tsx`, `SectorArt.tsx`, `PhoneMockups.tsx`: reusable identity and visual components.
- `lib/content.ts`: Arabic and English product copy.
- `public/`: optimized local WebP artwork and locally hosted variable fonts with their OFL licenses.
- `tests/`: functional browser checks.

## Demo scope

This is an independent presentation prototype with no official government affiliation. Service numbers and target users describe the concept's vision. The Saudi skyline is an artistic composition combining landmarks in Riyadh and Buraidah, rather than a documentary view of a single location. Artwork and the advisor portrait were generated for the concept.

The main portal is a guidance and navigation layer, not an authenticated integration with government systems. Requirements must be verified with the relevant authorities and may vary by activity, location, and legal structure. Business checklist completion is self-reported and stored locally.

The showcase assistant uses local guided responses, not a live language model. Showcase requests and payments update only in browser-session memory; reloading resets that demo. Meetings never access the camera or microphone. Mobile app store buttons display a coming-soon notice; the app mockups are not downloadable applications. No real payments or official submissions are performed.
