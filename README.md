# Ramy Zeid Personal Website

A typography-first, content-driven personal website built with Next.js static export for deployment on Cloudflare Pages.

## Stack

- Next.js (App Router) with static export (`output: "export"`)
- Tailwind CSS
- MDX content files in `/content`
- JSON-LD structured data (Person + ScholarlyArticle)
- Build-time RSS, sitemap, and robots generation

## Quick Start

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev`: local development server
- `npm run build`: generate RSS/sitemap/robots, then build static export
- `npm run export`: Next static export build alias
- `npm run lint`: lint code
- `npm run format`: format code with Prettier

## Content Editing

All content is editable via MDX files under `/content`.

### Add a publication

1. Create `content/publications/your-slug.mdx`
2. Add frontmatter fields:
   - `title`, `authors`, `venue`, `year`, `type`, `tags`, `abstract`, `apa`, `bibtex`
   - optional `links.pdf`, `links.doi`, `links.project`, `links.slides`
3. Write body content below frontmatter

### Add a writing post

1. Create `content/writing/your-slug.mdx`
2. Add frontmatter:
   - `title`, `date`, `summary`, `tags`
3. Write post body in MDX

### Add a talk

1. Create `content/talks/your-slug.mdx`
2. Add frontmatter:
   - `title`, `event`, `location`, `date`, `tags`
   - optional `links.slides`, `links.video`

### Add a project

1. Create `content/projects/your-slug.mdx`
2. Add frontmatter:
   - `title`, `period`, `status` (`Active|Completed|Planned`), `summary`, `tags`
   - optional `links.repo`, `links.demo`, `links.writeup`

## Files to Replace

- `public/cv.pdf`: replace placeholder CV
- `public/headshot-placeholder.svg`: replace with real headshot if needed
- `public/ramy-zeid.vcf`: update contact info

## Cloudflare Pages Deployment (GitHub Integration)

This project is configured for static export and works with Cloudflare Pages Git deployments.

### 1. Connect repository

1. Push this repo to GitHub
2. In Cloudflare Dashboard: **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**
3. Select this GitHub repo

Cloudflare Pages will build on every push and create preview deployments for pull requests automatically.

### 2. Build configuration

Use these settings in Cloudflare Pages:

- **Framework preset**: `Next.js` (or `None` with manual build command)
- **Build command**: `npm ci && npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (repo root)

### 3. Node version guidance

Use Node.js `20` (recommended). You can enforce with environment variable:

- `NODE_VERSION=20`

### 4. Environment variables (Pages Dashboard)

Set variables for both **Production** and **Preview** environments:

- `NEXT_PUBLIC_SITE_URL`
  - Production: `https://ramyzeid.com`
  - Preview: `https://<preview-subdomain>.pages.dev`
- `SITE_URL`
  - Same values as above
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
  - Example: `https://formspree.io/f/your-form-id`

### 5. Custom domains

After first successful deploy:

1. Go to your Pages project -> **Custom domains**
2. Add `ramyzeid.com`
3. Add `www.ramyzeid.com`
4. In Cloudflare DNS, ensure the records are set as Cloudflare-managed CNAME/flattened records per Pages prompts
5. Set preferred redirect behavior (`www` -> apex, or apex -> `www`) in Pages domain settings

## SEO Features Included

- Per-page metadata and canonical URLs
- OpenGraph/Twitter metadata
- `sitemap.xml` and `robots.txt` generated at build time
- `rss.xml` generated from `/content/writing`
- JSON-LD:
  - Site-wide `Person`
  - `ScholarlyArticle` on publication detail pages

## Notes

- The site is static-first and optimized for fast global delivery on Cloudflare Pages.
- No SSR/edge runtime is required for current features.
