import Link from 'next/link';

import { Container } from '@/components/Container';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  ['About', '/about'],
  ['Publications', '/publications'],
  ['Research', '/research'],
  ['Writing', '/writing'],
  ['Talks', '/talks'],
  ['Contact', '/contact']
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-6">
          <Link href="/" className="font-serif text-lg tracking-tight text-foreground">
            Ramy Zeid
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
        <nav
          aria-label="Main Navigation"
          className="flex items-center gap-5 overflow-x-auto pb-3 text-sm md:pb-4"
        >
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
