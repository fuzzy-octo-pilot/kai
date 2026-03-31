# Kai Blog Setup

## Folder Structure

```text
kai/
├── blog/
│   ├── _config.yml
│   ├── _data/
│   │   └── notion_covers.yml
│   ├── _includes/
│   │   └── post-card.html
│   ├── _layouts/
│   │   ├── default.html
│   │   ├── home.html
│   │   └── post.html
│   ├── _posts/
│   │   ├── YYYY-MM-DD-title-of-post.md
│   │   └── ...
│   ├── assets/
│   │   ├── css/main.scss
│   │   ├── images/blog/
│   │   └── js/blog.js
│   ├── Gemfile
│   ├── index.html
│   └── scripts/build-pages.mjs
├── docs/
│   └── .vitepress/
└── package.json
```

## Naming Convention

Posts belong in `blog/_posts/` and must use `YYYY-MM-DD-title-of-post.md`.

## Front Matter Template

```yaml
---
title: "Why We Chose Static Typing"
date: 2026-02-15
author: "Your Name"
tags: [design, typing, performance]
categories: [engineering]
cover_image: "/blog/assets/images/custom-cover.jpg" # optional
notion_link: "https://www.notion.so/..." # optional
excerpt: "Custom excerpt if you don't want auto-generated"
---
```

## Local Build Flow

```bash
npm run docs:build
node blog/scripts/build-pages.mjs
cd blog && bundle exec jekyll build --destination ../_site/blog
```

The VitePress site is published at the site root. The Jekyll blog is built into `_site/blog/`, and the merge step copies the VitePress output into `_site/` so GitHub Pages can deploy one artifact.
