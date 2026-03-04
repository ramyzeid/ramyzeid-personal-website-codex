'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { TagPill } from '@/components/TagPill';
import type { PublicationMeta } from '@/lib/content';

type Props = {
  item: PublicationMeta;
};

function buildCitationButtons(item: PublicationMeta) {
  return [
    { label: 'Copy APA', value: item.apa },
    { label: 'Copy BibTeX', value: item.bibtex }
  ];
}

export function PublicationItem({ item }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const citationButtons = useMemo(() => buildCitationButtons(item), [item]);

  const handleCopy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <h3 className="font-serif text-xl text-foreground">
            <Link href={`/publications/${item.slug}/`} className="hover:text-accent">
              {item.title}
            </Link>
          </h3>
          <p className="text-sm text-muted">
            {item.authors.join(', ')} · {item.venue} · {item.year}
          </p>
        </div>
        <p className="text-xs uppercase tracking-wide text-muted">{item.type}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags?.map((tag) => <TagPill key={`${item.slug}-${tag}`} label={tag} />)}
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-accent">Toggle abstract</summary>
        <p className="mt-2 text-sm text-muted">{item.abstract}</p>
      </details>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {item.links?.pdf ? (
          <a href={item.links.pdf} className="underline underline-offset-4 hover:text-accent">
            PDF
          </a>
        ) : null}
        {item.links?.doi ? (
          <a href={item.links.doi} className="underline underline-offset-4 hover:text-accent">
            DOI
          </a>
        ) : null}
        {item.links?.project ? (
          <a href={item.links.project} className="underline underline-offset-4 hover:text-accent">
            Project
          </a>
        ) : null}
        {item.links?.slides ? (
          <a href={item.links.slides} className="underline underline-offset-4 hover:text-accent">
            Slides
          </a>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {citationButtons.map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={() => handleCopy(button.label, button.value)}
            className="rounded-md border border-border px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent"
          >
            {copied === button.label ? 'Copied' : button.label}
          </button>
        ))}
      </div>
    </article>
  );
}
