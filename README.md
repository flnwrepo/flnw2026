# Frontline Website

**Technology Leadership. Cybersecurity. Governance.**
_Strategy backed by execution._

A static, editorial website for **Frontline**, a technology services company serving
small businesses and nonprofits, with offices in Ventura, CA and New York, NY.

## Structure

```
flnw2026/
├── build.py                # Generates dist/ from src/
│
├── src/                    # ← EDIT HERE
│   ├── layout.html         # Document shell (head, header slot, footer slot)
│   ├── partials/
│   │   ├── header.html     # Shared header, services menu, mobile nav
│   │   └── footer.html     # Shared footer
│   ├── pages/              # One file per page, body content only
│   │   ├── index.html
│   │   ├── fractional-cio.html
│   │   ├── governance-risk-compliance.html
│   │   ├── cybersecurity.html
│   │   ├── managed-technology-services.html
│   │   ├── private-ai-ai-governance.html
│   │   └── contact.html
│   ├── css/styles.css      # Design system
│   ├── js/
│   │   ├── app.js          # Header, services menu, mobile nav, contact form
│   │   └── sanity.js       # Optional Sanity CMS integration (homepage)
│   └── assets/             # Logo files
│
├── dist/                   # ← GENERATED AND COMMITTED. This is what deploys.
│   ├── index.html
│   ├── <page>/index.html   # One directory per page, for clean URLs
│   └── css, js, assets
│
└── studio/                 # Sanity Studio (CMS)
```

**Only `dist/` is published.** `build.py`, `src/` and `studio/` stay in the repo
but never reach the live site, so nobody can fetch the page sources, the build
script, or the Studio's `package.json` from frontlinecio.com.

## Editing pages

Edit files under `src/`, then rebuild:

```bash
python3 build.py
```

`build.py` deletes and regenerates `dist/` each run, so a page removed from
`PAGES` disappears from the site rather than lingering.

> Never hand-edit anything in `dist/`. The next build overwrites it.

Commit both your `src/` change and the regenerated `dist/`. The host serves
`dist/` as-is and runs no build of its own, so what you commit is exactly what
ships.

## Running locally

```bash
cd dist
python3 -m http.server 4321
```

Then open `http://localhost:4321`. Pages use root-relative asset paths, so they
need a web server rather than opening the file directly.

## Deployment

Cloudflare Pages, connected to this repo:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | *(leave empty)* |
| Build output directory | `dist` |

No build runs on the host. Every push to `main` publishes `dist/` as it stands.

## URL structure

| Page | URL |
|------|-----|
| Home | `/` |
| Fractional CIO | `/fractional-cio` |
| Governance, Risk & Compliance | `/governance-risk-compliance` |
| Cybersecurity | `/cybersecurity` |
| Managed Technology Services | `/managed-technology-services` |
| Private AI & AI Governance | `/private-ai-ai-governance` |
| Contact | `/contact` |

Each page is a directory containing `index.html`, so clean URLs work on any
static host without rewrite rules.

## Homepage flow

1. Hero — Technology Leadership. Cybersecurity. Governance.
2. Questions worth asking
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

## Who the site is written for

Frontline's clients are small businesses and nonprofits — typically a few dozen
employees, with no internal IT department or one person carrying it alongside
another job. Copy should read for an owner or director, not a corporate
executive team. Nonprofit realities (donor data, funder and grant security
requirements, lean budgets, board reporting, volunteer turnover) are named
explicitly on the homepage.

Office locations are kept understated — two cities in the footer, no
"headquartered in" framing and no service-area claims.

## Contact form

`/contact` posts to [Web3Forms](https://web3forms.com), which emails the submission
to **support@flnw.com** (the ConnectWise PSA ingestion address). No server or PHP is
needed, which matters because the site is hosted on GoDaddy.

### Configuration

The access key lives in `src/pages/contact.html` as a hidden `access_key` field.
It is public by design: it identifies the destination mailbox and nothing else. It
cannot read stored submissions or reach the Web3Forms account.

To point the form somewhere else, change the destination on the form inside the
Web3Forms dashboard, or swap the key here and run `python3 build.py`.

The Web3Forms account is owned by an admin address, not by support@flnw.com, so
account recovery does not depend on the shared ingestion mailbox. The dashboard
keeps 30 days of submissions, which is the fallback if a lead ever fails to
appear as a ticket.

Free tier: 250 submissions per month.

### How it reaches the PSA

- **Subject** is built from the submission: `Website enquiry: Jane Doe, Acme (jane@acme.org)`.
  The address is in the subject deliberately, so the ConnectWise ticket summary
  identifies the sender even though the mail itself arrives from Web3Forms.
- **Reply-To** is the submitter's address. Web3Forms sets this automatically from the
  field named `email`. Do not rename that field.
- **Spam**: a hidden `botcheck` honeypot field plus Web3Forms' own server-side
  filtering. Worth watching early on, since anything that gets through becomes a
  ticket rather than just an email.

### Behaviour

With JavaScript, the form submits in the background and is replaced by a
confirmation. Without JavaScript it posts natively to Web3Forms and still works.
Required fields are Name, Work email, and the message; Organization is optional.

## Content accuracy

Two rules the site is built to hold to:

- **No unsupported outcome claims.** Specific readiness timelines, percentage
  cost reductions, client sizes, and case-study metrics were removed. They may
  only return if they reflect a real, documented engagement that can be
  substantiated publicly. The `outcome` Sanity type carries this warning in the
  Studio.
- **No vaporware.** The Private AI page says Frontline is *developing* private AI
  architectures and that RAG is *being designed*, and it states plainly that
  private AI infrastructure still costs money. Nothing on that page describes a
  capability as generally available before it is.

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

In `src/layout.html`, set the project ID, then run `python3 build.py`:

```html
<script>window.SANITY_PROJECT_ID = "your_project_id_here";</script>
```

If Sanity is unreachable or the project ID is not set, the static HTML content
is used as the fallback.

### 6. Configure CORS

In [manage.sanity.io](https://manage.sanity.io), under the project's API
settings, add CORS origins:

- `http://localhost:4321` (local development)
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
