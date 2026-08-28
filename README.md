# Frontline Website

A modern, editorial website for **Frontline**, a technology advisory and managed
services firm headquartered in Ventura, CA.

## Structure

```
Frontline2026/
├── index.html              # Homepage (static HTML, works standalone)
├── css/
│   └── styles.css          # Design system
├── js/
│   ├── app.js              # Interactions (header, nav, reveals)
│   └── sanity.js           # Sanity CMS integration (optional)
├── assets/                 # Logo files
└── studio/                 # Sanity Studio (CMS)
    ├── sanity.config.ts    # Studio configuration
    ├── sanity.cli.ts       # CLI configuration
    ├── schemas/            # Content type definitions
    ├── seed/               # Initial content (NDJSON)
    └── README.md           # Studio setup instructions
```

## Running the site locally

The site is static and works without a CMS. From this directory:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(Port: 4321, DocumentRoot: Dir.pwd).start'
```

Then open `http://localhost:4321`.

## Enabling the CMS (Sanity)

The site ships with static content baked into `index.html`. To manage content
through a CMS instead:

### 1. Create a Sanity project

1. Sign up at [sanity.io](https://www.sanity.io/) (free tier is sufficient)
2. Create a new project — copy the **Project ID**

### 2. Configure the Studio

```bash
cd studio
export SANITY_PROJECT_ID=your_project_id_here
npm install
```

Update `sanity.config.ts` and `sanity.cli.ts` with your project ID (or keep
using the environment variable).

### 3. Seed initial content

```bash
cd studio
export SANITY_PROJECT_ID=your_project_id_here
./seed/import.sh
```

This imports all current site content (practices, questions, stages, industries,
outcomes, insights, settings) into Sanity.

### 4. Run the Studio

```bash
npm run dev
```

Opens at `http://localhost:3333`. Edit content through the control panel.

### 5. Deploy the Studio (hosted, optional)

```bash
npm run deploy
```

This hosts the Studio at a Sanity URL you can access from any browser.

### 6. Connect the frontend

In `index.html`, set the project ID:

```html
<script>window.SANITY_PROJECT_ID = "your_project_id_here";</script>
```

The site will now fetch content from Sanity on load. If Sanity is unreachable
or the project ID is not set, the static HTML content is used as fallback.

### 7. Configure CORS

In [manage.sanity.io](https://manage.sanity.io), under your project's API
settings, add CORS origins:
- `http://localhost:4321` (development)
- `https://flnw.com` (production)

Allow credentials.

## Content model

The homepage is built from **section blocks** — you can add, remove, and reorder them in the Sanity Studio to change the page structure without touching code.

### Block types

| Block | Description |
|-------|-------------|
| **Hero** | Full-viewport headline, supporting copy, CTAs, three-bar motif |
| **Business Questions** | Editorial list of executive questions |
| **Practice Areas** | Five practices with featured GRC panel (dark or light) |
| **Operating Model** | Assess → Lead bar diagram (tall/normal/compact spacing) |
| **Industries** | Industries list (compact by default) |
| **Outcomes** | Case notes with figures (dark or light) |
| **Insights** | Journal index of field notes |
| **CTA** | Closing call to action with email + phone |
| **Custom Text** | Free-form rich text section (for new content) |
| **Split Content** | Two-column layout with rich text |
| **Pull Quote** | Large editorial quote |
| **Motif Divider** | Intentional whitespace with optional three-bar mark |

### Content types (referenced by blocks)

| Type | Description |
|------|-------------|
| `siteSettings` | Footer text, default contact info |
| `practice` | Practice area (with featured flag, GRC tags) |
| `businessQuestion` | Individual question (used inline in questions block) |
| `operatingStage` | Maturity stage (with bar height) |
| `industry` | Industry name |
| `outcome` | Case note (figure, title, description) |
| `insight` | Article (title, excerpt, category, body) |

## Design

- **Typography:** Inter (sans) + IBM Plex Mono (labels/metadata)
- **Palette:** Frontline Navy `#202D4C`, Medium Blue `#4669A0`, Light Blue `#6092D5`, Slate `#697386`, Off-white `#F8F9FB`
- **Motif:** Three ascending bars from the Frontline logo, used as list marks, diagram elements, and section accents
- **Balance:** ~70% light backgrounds, ~30% navy sections
