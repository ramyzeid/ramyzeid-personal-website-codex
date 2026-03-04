import { Container } from '@/components/Container';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const formAction = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/your-form-id';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Contact Ramy Zeid for collaborations, talks, and advisory work.',
  path: '/contact/'
});

export default function ContactPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">Contact</h1>
        <p className="mt-3 max-w-xl text-muted">
          For research collaboration, advisory work, or speaking requests, use the form below or email directly.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-sm text-muted">
            <p>
              Email:{' '}
              <a className="text-accent underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p>
              LinkedIn:{' '}
              <a className="text-accent underline" href={siteConfig.social.linkedin}>
                {siteConfig.social.linkedin}
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a className="text-accent underline" href={siteConfig.social.github}>
                {siteConfig.social.github}
              </a>
            </p>
            <a href="/ramy-zeid.vcf" className="inline-flex rounded-full border border-border px-4 py-2 text-sm">
              Download vCard
            </a>
          </div>

          <form
            action={formAction}
            method="POST"
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <label className="block text-sm text-muted">
              Name
              <input
                type="text"
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
            </label>
            <label className="block text-sm text-muted">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
            </label>
            <label className="block text-sm text-muted">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
            </label>
            <button type="submit" className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white">
              Send
            </button>
          </form>
        </div>
      </section>
    </Container>
  );
}
