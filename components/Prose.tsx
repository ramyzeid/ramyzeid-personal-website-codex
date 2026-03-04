import { PropsWithChildren } from 'react';

export function Prose({ children }: PropsWithChildren) {
  return (
    <div className="prose prose-neutral max-w-none text-muted prose-headings:font-serif prose-headings:text-foreground prose-a:text-accent dark:prose-invert">
      {children}
    </div>
  );
}
