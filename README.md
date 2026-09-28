# Sungho Park - Personal Website

Personal academic website at <https://pshlego.github.io>, built with [Astro](https://astro.build).
All content lives in this repository as Markdown. **Push to `main` and GitHub Actions rebuilds and deploys the site.**

## Editing content

| What | Where | URL |
|---|---|---|
| Home intro + photo | `src/content/pages/home.md` | `/` |
| About | `src/content/pages/about.md` | `/about/` |
| Publications | `src/content/publications/<slug>.md` | `/posts/<slug>/` |
| News | `src/content/news/<date>-<name>.md` | home page |
| Personal notes | `src/content/notes/<slug>.md` | `/posts/<slug>/` |
| Site title, menu, socials, tag colors | `src/site.config.ts` | |

The fields each file accepts are defined (and validated at build time) in `src/content.config.ts`.

### Add a publication

Create `src/content/publications/my-paper.md`:

```markdown
---
title: "MyPaper: A Descriptive Subtitle"
authors: [Sungho Park, Coauthor Name, Wook-Shin Han] # add * for equal contribution, e.g. "Sungho Park*"
venue: NeurIPS 2026 # e.g. "ACL 2025 | Main Conference"
award: Best Paper Award # optional
date: 2026-09-25 # ordering (newest first) and year grouping
tags: [Multihop QA]
image: ../../assets/publications/my-paper.png # optional; put the file in src/assets/publications/
links:
  pdf: https://openreview.net/pdf?id=...
  project: https://...
  code: https://github.com/...
selected: 1 # optional: position under "Selected Publications" on the home page
---

Optional abstract or notes, shown on the paper's page.
```

Publications without an image show their short name (the part before `:`) instead.
Set `draft: true` to hide any publication, news item, or note.

### Add a news item

Create `src/content/news/2026-09-25-neurips.md`:

```markdown
---
date: 2026-09-25
title: "AutoSaddler: Automatic Harness Optimization ..."
link: /posts/autosaddler/ # optional: makes the title a link
---
A paper on ... has been accepted to _NeurIPS_ 2026.
```

The newest three items appear under **News**; older ones fold into **Past notices** (`newsCount` in `src/site.config.ts`).

## Local development

Requires Node.js 20.3+ or 22+.

```bash
npm install
npm run dev      # http://localhost:4321 with live reload
npm run build    # production build into dist/ (+ Pagefind search index)
npm run preview  # serve dist/
```

Search only works after `npm run build`, since the index is generated from the built pages.

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main` (and on manual
"Run workflow"). In repository **Settings → Pages**, the source must be **GitHub Actions**.

## Color palette

| Usage | Light | Dark |
|---|---|---|
| Text | `#101010` | `#F5F5F5` |
| Link | `#059669` | `#34D399` |
| Accent | `#154D40` | `#267860` |

Defined in `src/styles/global.css`.
