import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <article className={clsx('rounded-2xl border border-border bg-card p-6 shadow-soft', className)}>
      {children}
    </article>
  );
}
