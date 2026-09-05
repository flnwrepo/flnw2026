# Frontline Website

**Technology Leadership. Cybersecurity. Governance.**
_Strategy backed by execution._

A static, editorial website for **Frontline**, a technology services company
headquartered in Ventura, CA, serving small and midsized organizations.

## Structure

```
flnw2026/
├── build.py                    # Assembles pages from src/ into static HTML
├── src/                        # ← EDIT HERE
│   ├── layout.html             # Document shell (head, header slot, footer slot)
│   ├── partials/
│   │   ├── header.html         # Shared header + services menu + mobile nav
│   │   └── footer.html         # Shared footer
│   └── pages/                  # One file per page — body content only
│       ├── index.html
│       ├── fractional-cio.html
│       ├── governance-risk-compliance.html
│       ├── cybersecurity.html
│       ├── managed-technology-services.html
│       └── private-ai-ai-governance.html
│
├── index.html                  # ← GENERATED, committed
├── fractional-cio/index.html   # ← GENERATED, committed
├── governance-risk-compliance/index.html
├── cybersecurity/index.html
├── managed-technology-services/index.html
├── private-ai-ai-governance/index.html
│
├── css/styles.css              # Design system
├── js/
│   ├── app.js                  # Header, services menu, mobile nav, reveals
│   └── sanity.js               # Optional Sanity CMS integration (homepage)
├── assets/                     # Logo files
└── studio/                     # Sanity Studio (CMS)
```

## Editing pages

Page bodies live in `src/pages/`. The header and footer are shared partials, so
navigation and footer links only need to be changed in one place.

After editing anything under `src/`, regenerate the static HTML:

```bash
python3 build.py
```

The generated HTML is **committed to the repo**, so the site deploys as a plain
static folder — no build step is needed on the host.

> Never hand-edit the generated `index.html` files. The next build overwrites them.

## Running locally

Pages use root-relative asset paths (`/css/styles.css`), so they need a web
server rather than opening the file directly:

```bash
python3 -m http.server 4321
```

Then open `http://localhost:4321`.

## URL structure

| Page | URL |
|------|-----|
| Home | `/` |
| Fractional CIO | `/fractional-cio` |
| Governance, Risk & Compliance | `/governance-risk-compliance` |
| Cybersecurity | `/cybersecurity` |
| Managed Technology Services | `/managed-technology-services` |
| Private AI & AI Governance | `/private-ai-ai-governance` |

Each service page is a directory containing `index.html`, so clean URLs work on
any static host without rewrite rules.

## Homepage flow

1. Hero — Technology Leadership. Cybersecurity. Governance.
2. Executive questions
3. Five service areas (each links to its breakout page)
4. Frontline operating model — Assess → Standardize → Secure → Govern → Lead
5. Strategy backed by execution
6. GRC / security highlight
7. Private AI highlight
8. Industries & experience
9. Why Frontline
10. _Insights — intentionally hidden until articles exist_
11. Final CTA

### About the hidden Insights section

The brief calls for no placeholder "Read More" links. Until real articles are
published there is nothing to link to, so the section is omitted rather than
stubbed. To bring it back:

1. Create the article pages under `/insights/`.
2. Restore the section markup in `src/pages/index.html` (the original is in git
   history at commit `d07bc6b`).
3. Add **Insights** back to `src/partials/header.html` and `footer.html`.
4. Run `python3 build.py`.

## Content accuracy

Two rules the site is built to hold to:

- **No unsupported outcome claims.** Specific readiness timelines, percentage
  cost reductions, client sizes, and case-study metrics were removed. They may
  only return if they reflect a real, documented engagement that can be
  substantiated publicly. The `outcome` Sanity type carries this warning in the
  Studio.
- **No vaporware.** The Private AI page separates *Available today*, *Current
  Frontline Private AI capability*, and *Developing / roadmap*. Roadmap items
  are not described as generally available.

## Enabling the CMS (Sanity)

The site ships with content baked into the generated HTML and works without a
CMS. Sanity is wired up for the **homepage** only; the five service pages are
currently static, with a `servicePage` schema in place for when the front end is
connected to them.

### 1. Create a Sanity project

1. Sign up at [sanity.io](https://www.sanity.io/) (free tier is sufficient)
2. Create a new project — copy the **Project ID**

### 2. Configure the Studio

```bash
cd studio
export SANITY_PROJECT_ID=your_project_id_here
npm install
```

### 3. Seed initial content

```bash
cd studio
export SANITY_PROJECT_ID=your_project_id_here
./seed/import.sh
```

This imports the current site content (site settings, practices, questions,
operating stages, industries, insights, and the five service pages) into Sanity.

### 4. Run the Studio

```bash
npm run dev          # http://localhost:3333
npm run deploy       # optional: host the Studio at a Sanity URL
```

### 5. Connect the front end

In `src/layout.html`, set the project ID, then rebuild:

```html
<script>window.SANITY_PROJECT_ID = "your_project_id_here";</script>
```

If Sanity is unreachable or the project ID is not set, the static HTML content
is used as the fallback.

### 6. Configure CORS

In [manage.sanity.io](https://manage.sanity.io), under the project's API
settings, add CORS origins:

- `http://localhost:4321` (development)
- `https://flnw.com` (production)

Allow credentials.

## Content model

The homepage is built from **section blocks** that can be added, removed, and
reordered in the Studio. Service pages use a single `servicePage` document type
with a defined set of components — layout stays in code so the five pages remain
a visual family.

### Homepage block types

| Block | Description |
|-------|-------------|
| **Hero** | Headline, kicker, supporting copy, CTAs, three-bar motif |
| **Business Questions** | Editorial list of executive questions |
| **Practice Areas** | The five service areas, each linking to its page |
| **Operating Model** | Assess → Lead bar diagram |
| **Industries** | Industries and environments |
| **Outcomes** | Case notes — only for documented, substantiated engagements |
| **Insights** | Journal index (hidden while unpublished) |
| **CTA** | Closing call to action with email + phone |
| **Custom Text** | Free-form rich text section |
| **Split Content** | Two-column layout with rich text |
| **Pull Quote** | Large editorial quote |
| **Motif Divider** | Intentional whitespace with optional three-bar mark |

### Document types

| Type | Description |
|------|-------------|
| `siteSettings` | Footer text, default contact info, section headings |
| `servicePage` | A service breakout page (title, slug, eyebrow, headline, intro, hero CTA, problems, capabilities, process, deliverables, engagement models, frameworks, related services, FAQ, final CTA, SEO) |
| `practice` | Homepage service-area summary (lede, description, capabilities, link) |
| `businessQuestion` | Individual executive question |
| `operatingStage` | Operating-model stage (with bar height) |
| `industry` | Industry or environment |
| `outcome` | Case note — documented engagements only |
| `insight` | Article |

## Design

- **Typography:** Inter (sans) + IBM Plex Mono (labels/metadata)
- **Palette:** Frontline Navy `#202D4C`, Medium Blue `#4669A0`, Light Blue `#6092D5`, Slate `#697386`, Off-white `#F8F9FB`
  - `--blue-on-navy` (`#7AAEF0`) is the accent for **text** on navy — `--blue-light` only reaches 4.26:1 there and is reserved for bars and rules
- **Motif:** Three ascending bars from the Frontline logo, used as list marks, diagram elements, and section accents
- **Balance:** roughly 70% light backgrounds, 30% navy sections
- **Accessibility:** all body and UI text meets WCAG AA contrast; single `<h1>` per page with no heading-level skips; visible focus rings; skip link; reduced-motion support
