import Link from 'next/link';

import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { getPublications, getResearchThemes } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Research',
  description: 'Core research themes and linked publications.',
  path: '/research/'
});

export default function ResearchPage() {
  const themes = getResearchThemes();
  const publicationBySlug = new Map(getPublications().map((item) => [item.slug, item]));

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">Research</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {themes.map((theme) => (
            <Card key={theme.slug}>
              <h2 className="font-serif text-2xl">{theme.title}</h2>
              <p className="mt-3 text-sm text-muted">{theme.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {theme.relatedPublications.map((slug) => (
                  <Link key={slug} href={`/publications/${slug}/`} className="text-sm text-accent underline">
                    {publicationBySlug.get(slug)?.title || slug}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
