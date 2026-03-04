import Link from 'next/link';

import { Container } from '@/components/Container';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Ramy Zeid. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/writing" className="hover:text-foreground">
              Writing
            </Link>
            <Link href="/publications" className="hover:text-foreground">
              Publications
            </Link>
            <a href="/rss.xml" className="hover:text-foreground">
              RSS
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
