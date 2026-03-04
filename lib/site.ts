export const siteConfig = {
  name: 'Ramy Zeid',
  title: 'Economist',
  description:
    'Applied economist working on labor markets, social protection, and evidence-driven public policy in MENA.',
  url: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://ramyzeid.com',
  email: 'hello@ramyzeid.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/ramyzeid',
    github: 'https://github.com/ramyzeid',
    x: 'https://x.com/ramyzeid'
  }
};

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) {
    return path;
  }
  return `${siteConfig.url}${path}`;
}
