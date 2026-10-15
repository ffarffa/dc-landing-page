// Everything the page says lives here, so copy changes never touch layout code.

export const CONTACT_EMAIL = 'hello@destinycloud.my'

// Business Registration Rules 1957, r.13A (amended 2020): online businesses must show the registered
// name and SSM registration number on their website and social media. Source: SSM certificate (Borang D).
export const LEGAL_NAME = 'Destiny Cloud Solutions'
export const SSM_NO = '202503258632 (IP0613675-U)'

export const stack = [
  'Microsoft Azure', 'AWS', 'Google Cloud', '.NET', 'Kubernetes', 'Docker',
  'Terraform', 'PostgreSQL', 'SQL Server', 'Redis', 'Azure DevOps', 'GitHub Actions',
  'Linux', 'Windows Server', 'Nginx', 'Cloudflare', 'Prometheus', 'Grafana',
]

// Services, cloud-neutral: Azure is named only in the technology strip. `focus` marks the primary specialism.
export const services: { title: string; body: string; tags: string[]; focus?: boolean }[] = [
  {
    title: 'Solution architecture',
    body: 'System design for enterprise software in the cloud: landing zones, identity, networking and the decisions written down before a line of code ships.',
    tags: ['Well-Architected', 'Landing zones', 'Identity', 'Architecture decision records'],
    focus: true,
  },
  {
    title: 'Software engineering',
    body: 'Applications, APIs and integrations built to be operated, not just delivered: tested, observable and maintainable by the next team.',
    tags: ['.NET', 'APIs', 'Web apps', 'Integrations'],
  },
  {
    title: 'Cloud infrastructure',
    body: 'The platform your software runs on, defined as code: compute, data, networking and security, sized for today with room to grow.',
    tags: ['Kubernetes', 'Serverless', 'Managed databases', 'Infrastructure as code'],
  },
  {
    title: 'Migration & modernisation',
    body: 'Servers and legacy systems moved to the cloud, or re-platformed in place, with cutovers planned so the business keeps running.',
    tags: ['Server migration', 'Legacy .NET', 'Database moves', 'Zero-downtime cutover'],
  },
  {
    title: 'DevOps & platform engineering',
    body: 'Pipelines, environments and monitoring that make releases routine. Every change reviewed, every deploy reversible.',
    tags: ['CI/CD', 'GitHub Actions', 'Infrastructure as code', 'Observability'],
  },
  {
    title: 'Consulting & optimisation',
    body: 'Architecture and security reviews, performance and cost work, and a second opinion on hard problems, whichever cloud you run on.',
    tags: ['Design reviews', 'Security hardening', 'Cost', 'Performance'],
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
    who: 'Growing businesses',
    body: 'Companies whose operations run on software that has outgrown one server and one busy IT person.',
    need: 'Systems that are secure, scalable and properly looked after.',
  },
  {
    who: 'Product teams & founders',
    body: 'Teams building a SaaS or internal platform who need the architecture right before it has to scale.',
    need: 'Senior architecture and engineering from day one.',
  },
  {
    who: 'Enterprise IT & dev teams',
    body: 'In-house teams in the cloud, or moving to it, who need specialist depth in architecture, migration or DevOps.',
    need: 'Experienced engineers who work alongside their own people.',
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

// Extra copy for the alternative Services layouts (map and bento), in the same order as `services`.
// `node` is the part of the system diagram a service owns; `mark` is the bento tile's typographic centrepiece.
export const serviceExtras = [
  { node: 'users', line: 'Clear boundaries. Confident decisions.', mark: 'Foundations first' },
  { node: 'app', line: 'Applications, APIs and integrations.', mark: '.NET' },
  { node: 'edge', line: 'Networking, identity and security.', mark: 'Scale.' },
  { node: 'data', line: 'Safe, staged paths to modern platforms.', mark: 'Legacy → Next' },
  { node: 'pipeline', line: 'Automated delivery. Observable systems.', mark: 'commit → deploy → observe' },
  { node: 'monitoring', line: 'Performance, resilience and cost.', mark: 'Less friction.' },
] as const

export const systemNodes = [
  { id: 'users', label: 'Users' },
  { id: 'edge', label: 'Edge & identity' },
  { id: 'app', label: 'App services' },
  { id: 'data', label: 'Data' },
  { id: 'pipeline', label: 'CI / CD' },
  { id: 'monitoring', label: 'Monitoring' },
] as const

// Extra copy for the alternative Use-case layouts (split, stack, scroller), in the same order as `useCases`.
export const caseExtras = [
  {
    short: 'Store room → cloud', quote: 'Our whole business runs on one server in a cupboard.',
    outcome: 'Moved to the cloud. Backups you have seen restored.',
    stack: 'VMs · Managed SQL · Zero-trust access', engagement: 'Assess → migrate → hand over',
    heads: ['One box, no tested backup.', 'Move it, then prove it.', 'Nothing left to fail in a cupboard.'],
    before: { title: 'One server holding everything.', line: 'Single point of failure. Untested backups. Old VPN.', nodes: ['Windows server', 'Local SQL', 'VPN', 'USB backup'] },
    after: { title: 'A cloud setup that looks after itself.', line: 'Managed services. Verified backups. Secure access.', nodes: ['Zero-trust access', 'App VM', 'Managed SQL', 'Daily backup'] },
  },
  {
    short: 'Idea → SaaS', quote: 'We have the idea. Now we need the platform.',
    outcome: 'A launch-ready product with room to grow.',
    stack: '.NET · APIs · Postgres · CI/CD', engagement: 'MVP → launch',
    heads: ['A validated idea, no platform.', 'Start small. Design for the next stage.', 'A production-ready SaaS foundation.'],
    before: { title: 'A product without a platform.', line: 'No tenancy model. No logins. No way to take payments.', nodes: ['Prototype', 'Spreadsheet', 'Manual invoices', 'One laptop'] },
    after: { title: 'A platform built to grow.', line: 'Multi-tenant, secure, with payments and CI/CD from day one.', nodes: ['API gateway', 'Tenant & identity', 'App services', 'Payments'] },
  },
  {
    short: 'Month-end slowdown', quote: 'Month-end brings everything to a crawl.',
    outcome: 'Fast reports without slowing the day-to-day.',
    stack: 'PostgreSQL / SQL Server · Read replica', engagement: 'Review → tune → monitor',
    heads: ['Reports block daily work.', 'Tune first, then split the load.', 'Predictable performance when it matters.'],
    before: { title: 'One database doing every job.', line: 'Reports and daily work fight for the same CPU.', nodes: ['App', 'Reports', 'Primary DB', '100% CPU'] },
    after: { title: 'Each workload in its place.', line: 'Tuned queries, a reporting replica, pooled connections.', nodes: ['App', 'Primary DB', 'Read replica', 'Reports'] },
  },
  {
    short: 'Risky deploys', quote: 'Nobody wants to press deploy.',
    outcome: 'Repeatable releases. A reliable rollback.',
    stack: 'GitHub Actions · Containers · IaC', engagement: 'Pipeline → staging → handover',
    heads: ['Friday-night manual releases.', 'Automate the path to production.', 'Small releases anyone can ship.'],
    before: { title: 'Releases copied by hand.', line: 'No staging, no tests, no way back.', nodes: ['Laptop', 'FTP', 'Production', 'Hope'] },
    after: { title: 'A pipeline you can trust.', line: 'Tested, staged, one-click rollback.', nodes: ['Commit', 'Tests', 'Staging', 'Production'] },
  },
  {
    short: 'Exposed admin', quote: 'Our admin panel is on the public internet.',
    outcome: 'Private access. Clear identity boundaries.',
    stack: 'Tunnels · SSO · Secrets vault', engagement: 'Audit → lock down → monitor',
    heads: ['Everything reachable from anywhere.', 'Close the doors, keep the access.', 'A much smaller attack surface.'],
    before: { title: 'Doors left open.', line: 'Database ports, dashboards and SSH open to the internet.', nodes: ['Admin panel', 'Database port', 'SSH', 'Shared passwords'] },
    after: { title: 'One way in, and it is locked.', line: 'Encrypted tunnels, SSO, secrets in a vault.', nodes: ['SSO', 'Encrypted tunnel', 'Admin panel', 'Secrets vault'] },
  },
  {
    short: 'Growing cloud bill', quote: 'The cloud bill keeps growing.',
    outcome: 'Right-sized infrastructure. Clearer cost control.',
    stack: 'Cost review · CDN · Budgets', engagement: 'Review → right-size → alert',
    heads: ['Spend creeps up every quarter.', 'Find the waste, then fix it.', 'A bill you understand.'],
    before: { title: 'Paying for what you do not use.', line: 'Oversized servers, idle machines, no budgets.', nodes: ['Oversized VMs', 'Idle servers', 'No budgets', 'Surprise bill'] },
    after: { title: 'Paying for what you need.', line: 'Right-sized, cached at the edge, alerts before surprises.', nodes: ['Right-sized', 'CDN', 'Budgets', 'Alerts'] },
  },
]
