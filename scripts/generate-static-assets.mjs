import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content');
const PUBLIC = path.join(ROOT, 'public');

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://ramyzeid.com';

function readMdxDir(dir) {
  const target = path.join(CONTENT, dir);
  if (!fs.existsSync(target)) return [];

  return fs
    .readdirSync(target)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(target, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ''),
        ...data,
        content
      };
    });
}

function xmlEscape(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function generateRss() {
  const posts = readMdxDir('writing').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/writing/${post.slug}/`;
      return `<item>
  <title>${xmlEscape(post.title)}</title>
  <link>${xmlEscape(url)}</link>
  <guid>${xmlEscape(url)}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <description>${xmlEscape(post.summary || '')}</description>
</item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Ramy Zeid - Writing</title>
  <link>${siteUrl}</link>
  <description>Writing on economics, policy, and methods.</description>
  ${items}
</channel>
</rss>`;

  fs.writeFileSync(path.join(PUBLIC, 'rss.xml'), rss);
}

function generateSitemap() {
  const staticRoutes = ['/', '/about/', '/publications/', '/research/', '/writing/', '/talks/', '/contact/'];
  const publicationRoutes = readMdxDir('publications').map((item) => `/publications/${item.slug}/`);
  const writingRoutes = readMdxDir('writing').map((item) => `/writing/${item.slug}/`);

  const urls = [...staticRoutes, ...publicationRoutes, ...writingRoutes];

  const entries = urls
    .map((route) => {
      return `<url>
  <loc>${xmlEscape(`${siteUrl}${route}`)}</loc>
  <changefreq>monthly</changefreq>
</url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), sitemap);
}

function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC, 'robots.txt'), robots);
}

generateRss();
generateSitemap();
generateRobots();

console.log('Generated rss.xml, sitemap.xml, and robots.txt');
