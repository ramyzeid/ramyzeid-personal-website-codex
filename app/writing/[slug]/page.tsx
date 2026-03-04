import { notFound } from 'next/navigation';

import { Container } from '@/components/Container';
import { Prose } from '@/components/Prose';
import { getAllWritingSlugs, getWritingBySlug, renderMdx } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getAllWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getWritingBySlug(params.slug);
  if (!post) {
    return buildMetadata({ title: 'Writing', path: '/writing/' });
  }

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.summary,
    path: `/writing/${params.slug}/`
  });
}

export default async function WritingPostPage({ params }: { params: { slug: string } }) {
  const post = getWritingBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const mdx = await renderMdx(post.content);

  return (
    <Container>
      <article className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">{post.meta.title}</h1>
        <p className="mt-2 text-sm text-muted">
          {new Date(post.meta.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}{' '}
          · {post.meta.readingTime}
        </p>
        <div className="mt-8">
          <Prose>{mdx}</Prose>
        </div>
      </article>
    </Container>
  );
}
