# Elevatek site — game plan

Repo: `github.com/Elevatek-ca/elevatek-site` · Package date: June 2026

## What's in this package

A complete static v2 of elevatek.ca, ready to commit as-is and migrate to Astro:

```
elevatek/
  index.html        homepage (hero, lead-to-cash, services, widgets, process,
                    calculator, pricing, testimonials, FAQ, closer)
  contact.html      structured intake form + live request summary
  privacy.html      draft — flagged for counsel (PIPEDA + Québec Law 25)
  terms.html        draft — flagged for counsel
  404.html          on-brand (4Λ4)
  assets/
    styles.css      the whole design system → becomes src/styles/global.css
    app.js          shared nav / reveal / year → stays as a small public script
```

Every section of `index.html` is fenced with `COMPONENT: X.astro` comments. The carve-up is pre-decided; Claude Code just executes it.

## The sequence

**Phase 1 — Repo + Astro migration (first Claude Code session).** Commit this package to the repo root first, so there's a rendered-output baseline to diff against. Then run the kickoff prompt below. Goal: byte-equivalent pages, zero copy changes.

**Phase 2 — Assets (you, in parallel).** Specs below. Drop files in `public/assets/`, then make the two documented swaps (logo band comment, testimonial avatar comment).

**Phase 3 — Launch gates (decisions, not code).** The form backend choice unblocks the contact page; everything else can ship behind it.

**Phase 4 — Astro-native service pages (second Claude Code session).** Don't build these in HTML first — that's double work. Briefs below; each follows the Resoluble pattern: one hard truth as the H1, one honest widget, no invented numbers.

## Claude Code kickoff prompt (Phase 1 — paste as-is)

```
Repo: Elevatek-ca/elevatek-site. The static package is committed at the root.
Goal: migrate to Astro with zero visual or copy changes.

1. Scaffold: npm create astro@latest -- --template minimal (no extra integrations).
2. Move assets/styles.css → src/styles/global.css, imported once in the base layout.
   Move assets/app.js → public/app.js, loaded from the layout.
3. Create src/layouts/Base.astro from the shared <head> + header + footer
   (identical across pages). Props: title, description, plus a noindex flag
   for legal/404 pages.
4. Slice index.html into components named exactly per its comment fences:
   Hero, LeadToCash, Services, Features, Process, Calculator, Pricing,
   Testimonials, Faq, Closer (Header/Footer live in the layout).
   Keep the markup inside each fence byte-identical.
5. Pages: index, contact, privacy, terms, 404 — composed from the layout.
   contact.html's form <script> stays an inline script in contact.astro.
   index's calculator <script> stays inline in Calculator.astro.
6. Internal links: convert *.html hrefs to clean routes (/, /contact, /privacy,
   /terms) and keep the #anchors.
7. Verify: npm run build, then diff dist/ HTML against the static files
   (whitespace-insensitive). List any diff before committing.
8. Do not rewrite copy. Do not add libraries. Do not touch the calculator math
   or the form logic. Commit: "feat: Astro migration, parity with static v2".
```

## Asset specs (what to gather)

**Client logos** — SVG preferred, otherwise transparent PNG at least 240px wide, any color: the CSS renders them white-monochrome on the dark band automatically. Files go in `public/assets/logos/`; the swap pattern is commented in the LogoBand markup. While gathering: confirm each client's permission, and verify whether HubSpot is a client or a partner badge — label the band accordingly.

**Testimonial photos** — square, 320×320 or larger, jpg or webp, named by first name (`alexandre.jpg`…) in `public/assets/people/`. The swap pattern is commented above the first quote; initials remain the fallback for anyone without a photo.

**og-image** — 1200×630. Suggestion: ink background, ELEVΛTEK wordmark, the elevation chart. Referenced from a TODO already sitting in the head.

**Favicon** — the Λ glyph, blue on ink: 32px ico/png + 180px apple-touch.

## Launch gates

1. **Form backend** — the one real decision. If hosting on Netlify, use Netlify Forms (zero code: add the attribute, set `FORM_ENDPOINT` aside). Host-agnostic: Formspree free tier, paste its URL into `FORM_ENDPOINT` in contact.astro. Until then, submit composes a mailto — functional from day one.
2. **Booking link** — if you'd rather send the strategy-session CTAs to Calendly than the form, swap the `contact.html?type=session` hrefs. The form qualifies leads better; the calendar converts faster. Pick one as primary.
3. **Newsletter** — wire the footer form `action` to your provider.
4. **Resoluble cross-link** — set the real URL in the Features section, or delete the dashed card.
5. **Legal review** — both drafts are flagged inline; Law 25 also wants a named privacy officer (currently info@).
6. **JSON-LD address** — the Val-David legal address still sits invisibly in the structured data. Keep for NAP consistency, or strip for zero footprint. One-line change either way.
7. **Analytics decision** — if added, update the privacy cookies section (Law 25 consent applies).

## Service pages (Phase 4 briefs — build Astro-native)

Each page: hard-truth H1 → outcome subhead → one honest widget → engagement CTA.

- `/salesforce-implementation` — "The org outlives the project that built it." Widget: the build report, expanded with a per-layer checklist.
- `/integrations` — "Re-keyed data is a decision, not a default." Widget: the sync audit, expanded to a full flow inventory.
- `/fractional-revops` — "You don't need a hire. You need owned Tuesdays." Widget: a sample sprint backlog with shipped/in-progress states.
- `/gtm-process` — "Deals don't die in stages. They die between them." Widget: the lead-to-cash band, expanded with per-seam leak notes.

Priority order if time is short: contact backend → assets → launch → service pages. The form is the conversion path; everything else is depth.
