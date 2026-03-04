import { PropsWithChildren } from 'react';

export function SectionHeading({ children }: PropsWithChildren) {
  return <h2 className="font-serif text-3xl tracking-tight text-foreground">{children}</h2>;
}
