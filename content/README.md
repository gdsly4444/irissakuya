# Content guide

This folder is the **single source of truth** for site content.  
Write here; the agent generates HTML under `about/`, `journal/`, `skills/`, and `achievements/`.

## Layout

```
content/
├── README.md           ← this file
├── about.yaml          ← About page
├── skills.yaml         ← Skills page
├── achievements.yaml   ← Achievements page
└── journal/
    └── YYYY-MM-DD-slug.md
```

Images for articles: `assets/images/`

Generated article pages: `journal/posts/<slug>.html`

---

## Journal articles

**Filename:** `YYYY-MM-DD-slug.md` (date for sorting, slug for URL)

**Template:**

```markdown
---
title: Getting Started with This Garden
date: 2026-06-01
category: notes          # notes | research | life
description: One-line summary for the list page.
draft: false             # true = do not publish
featured: false          # true = highlight on homepage
tags: [meta, blogging]
---

Body in Markdown. The title in frontmatter is the page title.

## Section heading

Paragraphs, **bold**, `code`, lists, blockquotes, and images:

![Caption](../assets/images/example.png)
```

**Publish:** tell the agent *「发布 `content/journal/2026-06-01-getting-started.md`」*

The agent will:

1. Create `journal/posts/getting-started.html`
2. Add a list item to `journal/index.html`
3. Update entry count; optionally add to homepage if `featured: true`

---

## About page

**File:** `content/about.yaml`

```yaml
banner:
  title: A space for thought
  subtitle: Who I am, what I write about, and why this garden exists.

intro:
  - Welcome to Irissakuya — my personal archive...
  - This site grows slowly and intentionally...

sections:
  - title: Background
    body: |
      Multi-line text. One or more paragraphs.
  - title: Contact
    links:
      - label: GitHub
        url: https://github.com/gdsly4444/irissakuya

aside:
  stat: "3"
  label: Topics covered
```

**Update:** *「把下面加到 About intro：…」* or edit this file and ask the agent to sync `about/index.html`.

---

## Skills

**File:** `content/skills.yaml`

```yaml
items:
  - name: Programming
    level: 85
  - name: Research & Analysis
    level: 75

tags: [Python, JavaScript, Git, LaTeX]

aside:
  title: Stack & tools
  description: Technologies I reach for most often.
```

---

## Achievements

**File:** `content/achievements.yaml`

```yaml
items:
  - year: "2026"
    title: Launched Irissakuya
    description: Started this personal knowledge garden.
  - year: "2025"
    title: Your milestone
    description: Degrees, awards, projects, etc.
```

---

## Paste-in-chat format (no file needed)

When you do not want to create a file first, use labeled blocks:

```
【类型】journal / about / skills / achievements

【文章】
title: ...
date: 2026-06-01
category: notes
description: ...

正文...

【或 About 更新】
intro 加一段：...
```

---

## Format choice

| Format | Use for |
|--------|---------|
| Markdown + YAML frontmatter | Journal posts |
| YAML | About, Skills, Achievements |
| Word / PDF / raw HTML | Avoid — slow to convert, easy to break layout |

---

## Future: build script

When there are many posts, add `scripts/build.py` to read `content/` and regenerate all HTML. Until then, the agent publishes on demand.
