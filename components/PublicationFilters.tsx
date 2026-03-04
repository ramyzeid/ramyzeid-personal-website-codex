'use client';

import { useMemo, useState } from 'react';

import { PublicationItem } from '@/components/PublicationItem';
import type { PublicationMeta } from '@/lib/content';

type Props = {
  publications: PublicationMeta[];
};

export function PublicationFilters({ publications }: Props) {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const years = useMemo(
    () => Array.from(new Set(publications.map((item) => item.year))).sort((a, b) => b - a),
    [publications]
  );

  const types = useMemo(
    () => Array.from(new Set(publications.map((item) => item.type))).sort(),
    [publications]
  );

  const tags = useMemo(
    () => Array.from(new Set(publications.flatMap((item) => item.tags || []))).sort(),
    [publications]
  );

  const filtered = useMemo(
    () =>
      publications.filter((item) => {
        const yearOk = selectedYear === 'all' || String(item.year) === selectedYear;
        const typeOk = selectedType === 'all' || item.type === selectedType;
        const tagOk = selectedTag === 'all' || item.tags?.includes(selectedTag);
        return yearOk && typeOk && tagOk;
      }),
    [publications, selectedYear, selectedType, selectedTag]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-3">
        <label className="text-sm text-muted">
          Year
          <select
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
          >
            <option value="all">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-muted">
          Type
          <select
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="all">All</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-muted">
          Tag
          <select
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            value={selectedTag}
            onChange={(event) => setSelectedTag(event.target.value)}
          >
            <option value="all">All</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <PublicationItem key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
