import { notFound } from 'next/navigation';

import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';
import {
  getAllPublicationSlugs,
  getPublicationBySlug,
  renderMdx
} from '@/lib/content';
import { buildMetadata, scholarlyArticleJsonLd } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return getAllPublicationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const publication = getPublicationBySlug(params.slug);
  if (!publication) {
    return buildMetadata({ title: 'Publication', path: '/publications/' });
  }

  return buildMetadata({
    title: publication.meta.title,
    description: publication.meta.abstract,
    path: `/publications/${params.slug}/`
  });
}

export default async function PublicationDetailPage({ params }: { params: { slug: string } }) {
  const publication = getPublicationBySlug(params.slug);
  if (!publication) {
    notFound();
  }

  const mdx = await renderMdx(publication.content);
  const jsonLd = scholarlyArticleJsonLd({
    title: publication.meta.title,
    authors: publication.meta.authors,
    year: publication.meta.year,
    description: publication.meta.abstract,
    venue: publication.meta.venue,
    url: absoluteUrl(`/publications/${params.slug}/`)
  });

  return (
    <Container>
      <section className="py-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <h1 className="font-serif text-4xl tracking-tight">{publication.meta.title}</h1>
        <p className="mt-2 text-muted">
          {publication.meta.authors.join(', ')} · {publication.meta.venue} · {publication.meta.year}
        </p>
        <p className="mt-4 max-w-3xl text-muted">{publication.meta.abstract}</p>
        <div className="mt-8">
          <Prose>{mdx}</Prose>
        </div>
      </section>
    </Container>
  );
}
