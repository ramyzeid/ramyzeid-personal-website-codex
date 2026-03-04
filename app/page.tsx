import Link from 'next/link';

import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Home',
  description:
    'Ramy Zeid is an economist focused on labor markets, social protection, and policy analytics.',
  path: '/'
});

export default function HomePage() {
  return (
    <Container>
      <section className="py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Ramy Zeid</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight md:text-7xl">Economist</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          I work at the intersection of labor markets, social policy, and development data systems,
          translating evidence into practical policy choices.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/publications" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            Publications
          </Link>
          <Link href="/research" className="rounded-full border border-border px-5 py-3 text-sm font-medium">
            Research
          </Link>
          <Link href="/contact" className="rounded-full border border-border px-5 py-3 text-sm font-medium">
            Contact
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <Card className="max-w-3xl">
          <h2 className="font-serif text-2xl">Currently</h2>
          <ul className="mt-4 space-y-2 text-muted">
            <li>Leading applied work on care-economy modeling in MENA.</li>
            <li>Designing policy analytics pipelines for social protection reforms.</li>
            <li>Building open research tools for evidence synthesis and communication.</li>
          </ul>
        </Card>
      </section>
    </Container>
  );
}
