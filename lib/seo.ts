import type { Metadata } from 'next';

import { absoluteUrl, siteConfig } from '@/lib/site';

export function buildMetadata({
  title,
  description,
  path
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`;
  const pageDescription = description || siteConfig.description;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl('/og-image.svg'),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} website`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [absoluteUrl('/og-image.svg')]
    }
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.x]
  };
}

export function scholarlyArticleJsonLd(input: {
  title: string;
  authors: string[];
  year: number;
  description: string;
  url: string;
  venue: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: input.title,
    description: input.description,
    author: input.authors.map((author) => ({
      '@type': 'Person',
      name: author
    })),
    datePublished: `${input.year}-01-01`,
    isPartOf: {
      '@type': 'Periodical',
      name: input.venue
    },
    mainEntityOfPage: input.url
  };
}
