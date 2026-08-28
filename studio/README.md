# Frontline Sanity Studio

Content management for the Frontline website, built on [Sanity](https://www.sanity.io/).

## Setup

### 1. Create a Sanity project

Create a free account at [sanity.io](https://www.sanity.io/) and create a new project.
Copy the **Project ID** from the project settings.

### 2. Configure the Studio

Set your project ID in `sanity.config.ts` and `sanity.cli.ts`, replacing
`REPLACE_WITH_PROJECT_ID`, or set it as an environment variable:

```bash
export SANITY_PROJECT_ID=your_project_id_here
```

### 3. Run the Studio locally

```bash
cd studio
npm install
npm run dev
```

The Studio opens at `http://localhost:3333`.

### 4. Deploy the Studio (hosted)

```bash
npm run deploy
```

This hosts the Studio at `https://frontline-studio.sanity.studio` (or a custom
subdomain you choose). You can then edit content from any browser.

### 5. Configure CORS

In the Sanity project dashboard (manage.sanity.io), add CORS origins:
- `http://localhost:4321` (local development)
- `https://flnw.com` (production)

Allow credentials.

## Content model

| Type | Description |
|------|-------------|
| `siteSettings` | Single document — hero copy, section titles, CTA text, footer |
| `practice` | Five practice areas (Fractional CIO, GRC, Cybersecurity, Managed IT, Transformation) |
| `businessQuestion` | Executive questions for the homepage questions section |
| `operatingStage` | Assess → Standardize → Secure → Govern → Lead stages |
| `industry` | Industries / experience tiles |
| `outcome` | Selected outcomes / case notes |
| `insight` | Field notes / articles |

## Frontend integration

The website (`/index.html`) fetches content from the Sanity Content Lake via
`/js/sanity.js`. Set `SANITY_PROJECT_ID` in that file to match the Studio.
