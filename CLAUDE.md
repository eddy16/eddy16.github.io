# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal GitHub Pages portfolio site for Edgar Cirilo. Built with Node.js + Express + EJS. All content is driven by `config.yml`. Deploys as a pre-built static site from the `docs/` folder.

## Commands

```bash
npm install          # install dependencies

npm run dev          # live-reload dev server at http://localhost:4000
npm run build        # generate static site → docs/
npm start            # bare Express server at http://localhost:3000 (no live reload)
```

`npm run dev` spawns Express on :3000 and proxies it through browser-sync on :4000, watching `views/`, `public/`, and `config.yml` for changes.

## Architecture

### Content flow

`config.yml` → read by `server.js` (on every request in dev) or `build.js` (once at build time) → injected into `views/index.ejs` → rendered HTML.

Changing `config.yml` during `npm run dev` is reflected on the next browser refresh. After `npm run build`, the rendered output lands in `docs/index.html`.

### Key files

| File | Purpose |
|------|---------|
| `config.yml` | Single source of truth: name, bio, social links, nav, skills, footer |
| `server.js` | Express dev server — serves `public/` as static, renders `views/index.ejs` |
| `dev.js` | Spawns `server.js` + browser-sync proxy for live reload |
| `build.js` | Renders template + copies `public/` → `docs/` (cleans first) |
| `views/index.ejs` | Single-page EJS template |
| `public/css/main.css` | Hand-crafted CSS — no preprocessor |
| `public/js/app.js` | particles.js initialisation config |

### `config.yml` structure

```
site.*        page <title> and meta description
profile.*     name, job title, bio, photo path
contact.*     email, instagram, twitter, linkedin, github
nav[]         hero navigation links (label + href)
skills[]      "What I can do" bullet list
footer.*      tagline text
```

### GitHub Pages deployment

`docs/` is committed to the repo (not gitignored). GitHub Pages is configured to serve from the `docs/` folder on the `master` branch. Workflow: edit `config.yml` → `npm run build` → commit `docs/` → push.

### Design details

- Color palette: `#1a222c` (dark navy), `#4B5664` (secondary), `#ffffff` (text/icons)
- Fonts: Montserrat (hero) + Antic Slab (body) via Google Fonts CDN
- Particles: 160 white floating dots via particles.js 2.0.0 (CDN)
- Icons: Font Awesome 6 Free (CDN) — `fa-solid` for envelope/chevron, `fa-brands` for social icons
- Responsive breakpoint: 768px
- Smooth scroll: CSS `scroll-behavior: smooth` only — no JS scroll library

### CSS gotchas

- `.header-icons .icon` (not `.icon` globally) carries the circle-border styles — avoids bleeding onto `.down .icon`
- `#particles-js` needs `position: relative` so the `.header` overlay (z-index 1) sits above the canvas
- `canvas.particles-js-canvas-el { height: 100vh !important }` overrides the inline height particles.js sets at init time
- The `pulse` keyframe animates `top` on `.down .icon` (which is `position: absolute`), creating the floating chevron effect

### Asset paths

All `href`/`src` values in `views/index.ejs` are relative (e.g. `css/main.css`, `images/profile.png`) so `docs/index.html` works when opened directly as a file and when served by GitHub Pages. CDN URLs use `https://` — never `//` (protocol-relative breaks under `file://`).
