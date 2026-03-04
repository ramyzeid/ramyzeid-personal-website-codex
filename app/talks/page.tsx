import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { getTalks } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Talks',
  description: 'Talks, workshops, and training sessions.',
  path: '/talks/'
});

export default function TalksPage() {
  const talks = getTalks();

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">Talks</h1>
        <div className="mt-8 space-y-4">
          {talks.map((talk) => (
            <Card key={talk.slug}>
              <h2 className="font-serif text-2xl">{talk.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {talk.event} · {talk.location} ·{' '}
                {new Date(talk.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short'
                })}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {talk.links?.slides ? (
                  <a href={talk.links.slides} className="text-accent underline">
                    Slides
                  </a>
                ) : null}
                {talk.links?.video ? (
                  <a href={talk.links.video} className="text-accent underline">
                    Video
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
