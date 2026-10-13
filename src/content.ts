// Everything the page says lives here, so copy changes never touch layout code.

export const CONTACT_EMAIL = 'hello@destinycloud.my'

export const stack = [
  'AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform',
  'PostgreSQL', 'SQL Server', 'MySQL', 'Redis', 'Linux', 'Windows Server',
  'Nginx', 'Cloudflare', 'GitHub Actions', 'Prometheus', 'Grafana', 'Supabase',
]

export type IconName = 'cloud' | 'server' | 'database' | 'pipeline' | 'shield' | 'code'

export const services: { icon: IconName; title: string; body: string; tags: string[] }[] = [
  {
    icon: 'cloud',
    title: 'Cloud architecture & migration',
    body: 'Landing zones, networking and identity done properly the first time. We move workloads off ageing hardware or between providers without a weekend of downtime.',
    tags: ['AWS', 'Azure', 'GCP', 'Hybrid'],
  },
  {
    icon: 'server',
    title: 'Servers & infrastructure',
    body: 'Linux and Windows fleets, VPS and bare metal, built from code and hardened by default. Patched, backed up and documented so nobody depends on one person’s memory.',
    tags: ['Linux', 'Windows', 'Bare metal', 'Hardening'],
  },
  {
    icon: 'database',
    title: 'Databases',
    body: 'Design, tuning, replication and backups you have actually restored. Zero-downtime migrations and schema changes for systems that cannot simply be switched off.',
    tags: ['PostgreSQL', 'SQL Server', 'MySQL', 'Redis'],
  },
  {
    icon: 'pipeline',
    title: 'DevOps & automation',
    body: 'CI/CD pipelines, infrastructure as code and containers. Every change goes through review, every deploy can be rolled back, and releases stop being events.',
    tags: ['CI/CD', 'Terraform', 'Docker', 'Kubernetes'],
  },
  {
    icon: 'shield',
    title: 'Security & access',
    body: 'Least-privilege access, secrets management, zero-trust tunnels instead of open ports, and audit trails your compliance team can read.',
    tags: ['Zero trust', 'Secrets', 'Audit', 'Backups'],
  },
  {
    icon: 'code',
    title: 'Software & integration',
    body: 'APIs, backends and internal tools that connect the systems you already own. Built to be operated, with logs, health checks and a runbook on day one.',
    tags: ['APIs', 'Backends', 'Integration', 'Internal tools'],
  },
]

export const steps = [
  { title: 'Assess', body: 'We read what you run today: architecture, costs, risks and the parts nobody wants to touch.' },
  { title: 'Design', body: 'A written plan with trade-offs and a rollback for every step, agreed before anything changes.' },
  { title: 'Build', body: 'Everything as code, reviewed and tested, delivered in small changes you can see working.' },
  { title: 'Operate', body: 'Monitoring, patching and on-call — or a clean handover with runbooks your team can own.' },
]

export const engagements = [
  {
    name: 'Project',
    lead: 'A defined outcome with a fixed scope.',
    points: ['Cloud migration or new platform', 'Database upgrade or move', 'CI/CD and infrastructure as code', 'Handover with documentation'],
  },
  {
    name: 'Managed',
    lead: 'We run it, you build on it.',
    points: ['Monitoring and alerting', 'Patching, backups and restore tests', 'Incident response', 'Monthly reports and cost review'],
    featured: true,
  },
  {
    name: 'Advisory',
    lead: 'Senior engineers on call for your team.',
    points: ['Architecture and design reviews', 'Security and resilience audits', 'Vendor and cost assessments', 'Hiring and team support'],
  },
]

export const principles = [
  { k: 'Written down', v: 'Decisions, runbooks and diagrams live next to the code, not in someone’s head.' },
  { k: 'Reversible', v: 'Every change ships with a way back. Nothing goes live that cannot be rolled back.' },
  { k: 'Least privilege', v: 'Nothing gets more access than it needs; no ports open that do not have to be.' },
  { k: 'Boring where it counts', v: 'Proven technology for the foundations, so the interesting work happens on top.' },
]
