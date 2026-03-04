import { Container } from '@/components/Container';
import { PublicationFilters } from '@/components/PublicationFilters';
import { getPublications } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Publications',
  description: 'Research publications by Ramy Zeid with filters and citations.',
  path: '/publications/'
});

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">Publications</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Peer-reviewed and policy publications, with metadata and reusable citation formats.
        </p>
        <div className="mt-8">
          <PublicationFilters publications={publications} />
        </div>
      </section>
    </Container>
  );
}
