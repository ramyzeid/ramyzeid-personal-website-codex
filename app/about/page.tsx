import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'Bio, expertise, affiliations, and CV for Ramy Zeid.',
  path: '/about/'
});

export default function AboutPage() {
  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">About</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Card>
            <p className="text-muted">
              I am an economist focused on labor policy, social insurance, and public-sector delivery.
              My work combines empirical research with implementation-oriented product thinking,
              especially in MENA contexts where institutional constraints shape outcomes.
            </p>
            <h2 className="mt-6 font-serif text-2xl">Expertise</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>Labor markets and employment dynamics</li>
              <li>Social protection system design and targeting</li>
              <li>Care economy diagnostics and workforce modeling</li>
              <li>Applied econometrics and policy analytics</li>
            </ul>
            <h2 className="mt-6 font-serif text-2xl">Affiliations</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>World Bank Group (placeholder)</li>
              <li>Policy research collaborations across MENA institutions</li>
            </ul>
            <a
              href="/cv.pdf"
              className="mt-8 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
            >
              Download CV
            </a>
          </Card>

          <Card className="flex items-center justify-center">
            <div className="w-full max-w-[260px]">
              <img
                src="/headshot-placeholder.svg"
                alt="Headshot placeholder"
                className="h-auto w-full rounded-xl border border-border"
              />
            </div>
          </Card>
        </div>
      </section>
    </Container>
  );
}
