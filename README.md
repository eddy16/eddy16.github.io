# Edgar Cirilo — Personal Portfolio

A minimal personal portfolio site built with Node.js, Express, and EJS. All content is driven by `config.yml`. Deploys as a static site to GitHub Pages via the `docs/` folder.

## Prerequisites

- Node.js 18+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the site at `http://localhost:4000` with live reload. Edit any file in `views/`, `public/`, or `config.yml` and the browser refreshes automatically.

## Production build

```bash
npm run build
```

Renders all templates and copies assets into `docs/`. The result is a fully self-contained static site — open `docs/index.html` directly in a browser or deploy it anywhere.

To update content: edit `config.yml`, then run `npm run build` again.

## Deploy to GitHub Pages

1. Run `npm run build`
2. Commit and push the `docs/` folder to the `master` branch
3. In your GitHub repo go to **Settings → Pages**
4. Set source to **Deploy from a branch**, branch: `master`, folder: `/docs`
5. Your site will be live at `https://eddy16.github.io`

## Customisation

All personal data lives in `config.yml`:

| Section | What it controls |
|---------|-----------------|
| `site` | Page title and meta description |
| `profile` | Name, job title, bio text, photo path |
| `contact` | Email and social media links |
| `nav` | Navigation links in the hero |
| `skills` | Bullet list in the "What I can do" column |
| `footer` | Tagline text below the copyright |
