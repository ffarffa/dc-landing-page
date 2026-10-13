// Everything the page says lives here, so copy changes never touch layout code.

export const CONTACT_EMAIL = 'hello@destinycloud.my'

// Business Registration Rules 1957, r.13A (amended 2020): online businesses must show the registered
// name and SSM registration number on their website and social media. Source: SSM certificate (Borang D).
export const LEGAL_NAME = 'Destiny Cloud Solutions'
export const SSM_NO = '202503258632 (IP0613675-U)'

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

export const audiences = [
  {
    who: 'Growing SMEs',
    body: 'Retail, logistics, manufacturing, clinics and hospitality businesses running on one ageing server and one busy IT person.',
    need: 'Reliable systems without hiring an infrastructure team.',
  },
  {
    who: 'Startups & SaaS founders',
    body: 'Teams with a product to ship who need a production platform: multi-tenant, secure, with local payments built in.',
    need: 'A platform that scales, built right the first time.',
  },
  {
    who: 'In-house dev teams',
    body: 'Companies with developers but no DevOps or database specialist, where releases are manual and nobody owns the servers.',
    need: 'Senior infrastructure skills, on demand.',
  },
]

export const useCases = [
  {
    sector: 'Retail & distribution',
    title: 'The server in the store room',
    problem: 'Accounting and inventory run on one on-premise Windows server. Backups are “probably” running and staff connect through an old VPN.',
    approach: 'Move the workloads to a cloud VM and a managed database, schedule backups with monthly restore tests, and replace the VPN with zero-trust access.',
    result: 'No single box to fail, backups you have seen restored, and secure access from anywhere.',
  },
  {
    sector: 'Startups & SaaS',
    title: 'From idea to a live SaaS platform',
    problem: 'A founder has a product and a deadline, but no architecture for tenants, logins, payments or scale.',
    approach: 'An API gateway, separate services for tenants, identity and business logic, a shared cache, and FPX / online banking payments through Malaysian gateways. CI/CD from day one.',
    result: 'A multi-tenant platform ready for paying customers. We run our own hospitality SaaS on this exact pattern.',
  },
  {
    sector: 'Finance & operations',
    title: 'The month-end slowdown',
    problem: 'Reports take minutes, the database pegs at 100% CPU every month-end, and the answer so far has been a bigger server.',
    approach: 'Query and index tuning, a read replica for reporting, connection pooling and a proper maintenance plan for PostgreSQL or SQL Server.',
    result: 'Fast reports without blocking daily operations, often on a smaller, cheaper instance.',
  },
  {
    sector: 'Software teams',
    title: 'Deploys nobody wants to do',
    problem: 'Releases are copied by hand on Friday nights. One mistake takes the site down and rolling back means guessing.',
    approach: 'Git-based CI/CD with automated tests, staging, containers and one-click rollback. Infrastructure written as code and reviewed like code.',
    result: 'Small, frequent releases any developer can ship, and a way back from every one of them.',
  },
  {
    sector: 'Any business online',
    title: 'Admin panels open to the internet',
    problem: 'Database ports, admin dashboards and SSH are reachable from anywhere. Passwords are shared in chat.',
    approach: 'Close every inbound port behind encrypted tunnels, enforce SSO and key-only access, move secrets into a vault, add brute-force protection and patching.',
    result: 'A much smaller attack surface, with an audit trail of who can reach what.',
  },
  {
    sector: 'Scale-ups',
    title: 'The cloud bill that keeps growing',
    problem: 'Monthly spend creeps up every quarter and nobody can say which service is costing what.',
    approach: 'A cost review: right-size instances, move static content to a CDN and object storage, consolidate idle servers, add budgets and alerts.',
    result: 'A bill you understand, with savings that come back every month.',
  },
]
