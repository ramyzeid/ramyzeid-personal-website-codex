import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

type BaseMeta = {
  title: string;
  slug: string;
  tags?: string[];
};

export type PublicationMeta = BaseMeta & {
  authors: string[];
  venue: string;
  year: number;
  type: string;
  abstract: string;
  links?: {
    pdf?: string;
    doi?: string;
    project?: string;
    slides?: string;
  };
  apa: string;
  bibtex: string;
};

export type WritingMeta = BaseMeta & {
  date: string;
  summary: string;
  readingTime: string;
};

export type TalkMeta = BaseMeta & {
  event: string;
  location: string;
  date: string;
  links?: {
    slides?: string;
    video?: string;
  };
};

export type ResearchMeta = BaseMeta & {
  summary: string;
  relatedPublications: string[];
};

function getDirEntries(dir: string): string[] {
  const fullPath = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => path.join(fullPath, file));
}

function parseMdxFile<T>(filePath: string): { meta: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath).replace(/\.mdx$/, '');
  return {
    meta: {
      slug,
      ...(data as object)
    } as T,
    content
  };
}

function estimateReadingTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function sortByYearDesc<T extends { year?: number; date?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.year && b.year) {
      return b.year - a.year;
    }
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export function getPublications(): PublicationMeta[] {
  const items = getDirEntries('publications').map((filePath) => parseMdxFile<PublicationMeta>(filePath).meta);
  return sortByYearDesc(items);
}

export function getPublicationBySlug(slug: string): { meta: PublicationMeta; content: string } | null {
  const filePath = path.join(CONTENT_ROOT, 'publications', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return parseMdxFile<PublicationMeta>(filePath);
}

export function getWritings(): WritingMeta[] {
  const items = getDirEntries('writing').map((filePath) => {
    const parsed = parseMdxFile<Omit<WritingMeta, 'readingTime'>>(filePath);
    return {
      ...parsed.meta,
      readingTime: estimateReadingTime(parsed.content)
    } as WritingMeta;
  });
  return sortByYearDesc(items);
}

export function getWritingBySlug(slug: string): { meta: WritingMeta; content: string } | null {
  const filePath = path.join(CONTENT_ROOT, 'writing', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const parsed = parseMdxFile<Omit<WritingMeta, 'readingTime'>>(filePath);
  return {
    meta: {
      ...parsed.meta,
      readingTime: estimateReadingTime(parsed.content)
    } as WritingMeta,
    content: parsed.content
  };
}

export function getTalks(): TalkMeta[] {
  const items = getDirEntries('talks').map((filePath) => parseMdxFile<TalkMeta>(filePath).meta);
  return sortByYearDesc(items);
}

export function getResearchThemes(): ResearchMeta[] {
  return getDirEntries('research').map((filePath) => parseMdxFile<ResearchMeta>(filePath).meta);
}

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }
    }
  });
  return content;
}

export function getAllPublicationSlugs(): string[] {
  return getPublications().map((item) => item.slug);
}

export function getAllWritingSlugs(): string[] {
  return getWritings().map((item) => item.slug);
}
