import Link from 'next/link';

import { Container } from '@/components/Container';

export default function NotFound() {
  return (
    <Container>
      <section className="py-24">
        <h1 className="font-serif text-4xl">Page not found</h1>
        <p className="mt-3 text-muted">The page you requested does not exist.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full border border-border px-5 py-2 text-sm">
          Return home
        </Link>
      </section>
    </Container>
  );
}
