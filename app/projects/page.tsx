import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { TagPill } from '@/components/TagPill';
import { getProjects } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Projects',
  description: 'Selected policy and analytics projects.',
  path: '/projects/'
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-serif text-4xl tracking-tight">Projects</h1>
        <p className="mt-3 max-w-2xl text-muted">Applied tools and policy products with public-sector relevance.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-2xl">{project.title}</h2>
                <TagPill label={project.status} />
              </div>
              <p className="mt-2 text-sm text-muted">{project.period}</p>
              <p className="mt-3 text-sm text-muted">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {project.links?.repo ? (
                  <a href={project.links.repo} className="text-accent underline">
                    Repository
                  </a>
                ) : null}
                {project.links?.demo ? (
                  <a href={project.links.demo} className="text-accent underline">
                    Demo
                  </a>
                ) : null}
                {project.links?.writeup ? (
                  <a href={project.links.writeup} className="text-accent underline">
                    Write-up
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
