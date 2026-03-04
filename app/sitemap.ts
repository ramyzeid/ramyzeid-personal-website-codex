import type { MetadataRoute } from 'next';

import { getAllPublicationSlugs, getAllWritingSlugs } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['/', '/about/', '/publications/', '/research/', '/writing/', '/talks/', '/projects/', '/contact/'];

  const publicationRoutes = getAllPublicationSlugs().map((slug) => `/publications/${slug}/`);
  const writingRoutes = getAllWritingSlugs().map((slug) => `/writing/${slug}/`);

  return [...staticRoutes, ...publicationRoutes, ...writingRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7
  }));
}
