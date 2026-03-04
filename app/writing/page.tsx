import Link from 'next/link';

import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { TagPill } from '@/components/TagPill';
import { getWritings } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Writing',
  description: 'Essays and notes on economics, policy, and methods.',
  path: '/writing/'
});

export default function WritingPage() {
  const posts = getWritings();

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">Writing</h1>
        <p className="mt-3 max-w-2xl text-muted">Long-form notes and short policy briefs in MDX.</p>
        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <Card key={post.slug}>
              <Link href={`/writing/${post.slug}/`} className="font-serif text-2xl hover:text-accent">
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}{' '}
                · {post.readingTime}
              </p>
              <p className="mt-3 text-sm text-muted">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags?.map((tag) => <TagPill key={`${post.slug}-${tag}`} label={tag} />)}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
