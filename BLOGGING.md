# Kai Blog Setup

## Folder Structure

```text
kai/
├── _config.yml
├── _data/
│   └── notion_covers.yml
├── _includes/
│   └── post-card.html
├── _layouts/
│   ├── default.html
│   ├── home.html
│   └── post.html
├── _posts/
│   ├── YYYY-MM-DD-title-of-post.md
│   └── ...
├── assets/
│   ├── css/main.scss
│   ├── images/blog/
│   └── js/blog.js
├── docs/
│   └── .vitepress/
├── index.html
├── Gemfile
└── scripts/build-pages.mjs
```

## Naming Convention

Posts belong in `_posts/` and must use `YYYY-MM-DD-title-of-post.md`.

## Front Matter Template

```yaml
---
title: "Why We Chose Static Typing"
date: 2026-02-15
author: "Your Name"
tags: [design, typing, performance]
categories: [engineering]
cover_image: "/assets/images/custom-cover.jpg" # optional
notion_link: "https://www.notion.so/..." # optional
excerpt: "Custom excerpt if you don't want auto-generated"
---
```

## Local Build Flow

```bash
bundle exec jekyll build
npm run docs:build
node scripts/build-pages.mjs
```

The Jekyll site builds to `_site/`. The merge step copies the VitePress output into `_site/docs/` so GitHub Pages can deploy one artifact.
