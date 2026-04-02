import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL_RAW = process.env.API_BASE_URL;
const API_BASE = API_BASE_URL_RAW || 'http://localhost:5000/api';

// Default to mock data when no backend base URL is configured,
// so the UI can be explored without the API running.
const USE_MOCK_DATA =
  process.env.USE_MOCK_DATA === 'true' ||
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' ||
  !API_BASE_URL_RAW;

type Milestone = {
  id: number;
  label: string;
  number: string;
  year: string;
  title: string;
  company: string;
  description: string;
  cx: number;
  cy: number;
};

type ServiceStep = {
  year: string;
  title: string;
  description: string;
};

type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  number: string;
  tagline: string;
  hook: string;
  steps: ServiceStep[];
};

type Role = { id: string; name: string };

type TeamMember = {
  id: number;
  name: string;
  role: string;
  roleId?: string;
  category: string;
  bio: string;
  imageUrl: string;
  socialLinks?: { github?: string; linkedin?: string; email?: string };
};

type Project = {
  id: string; // used by the frontend UI assets map
  projectId: string;
  title: string;
  accent: string;
  subtitle: string;
  tag: string;
  description: string;
  mirrored: boolean;
  icons: string[];
  category?: string;
  image?: string;
  link?: string;
};

type BlogPost = {
  id: number;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: string;
  image: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

const MOCK_MILESTONES: Milestone[] = [
  {
    id: 1,
    label: 'Brand Founded',
    number: '01',
    year: '1997',
    title: 'Inyange Begins Operations',
    company: 'Inyange Industries',
    description: 'A new dairy & beverage brand takes shape with strong foundations for quality and growth.',
    cx: 45,
    cy: 255,
  },
  {
    id: 2,
    label: 'Dairy Expansion',
    number: '02',
    year: '1999',
    title: 'Pasteurized Milk & Yoghurt',
    company: 'Inyange Industries',
    description: 'Operations expand to processing and selling pasteurized milk and yoghurt under the Inyange brand.',
    cx: 297,
    cy: 170,
  },
  {
    id: 3,
    label: 'Water Added',
    number: '03',
    year: '2001',
    title: 'Mineral Water Processing',
    company: 'Inyange Industries',
    description: 'The plant introduces mineral water processing and packaging to complement the dairy portfolio.',
    cx: 558,
    cy: 100,
  },
  {
    id: 4,
    label: 'Masaka Expansion',
    number: '04',
    year: '2004',
    title: 'USD 27M Production Plan',
    company: 'Inyange Industries',
    description: 'A major expansion in Masaka increases capacity tenfold, enabling stronger local supply and regional growth.',
    cx: 792,
    cy: 40,
  },
];

const MOCK_ROLES: Role[] = [
  { id: 'role-1', name: 'Engineering' },
  { id: 'role-2', name: 'Design' },
  { id: 'role-3', name: 'Product' },
];

const MOCK_TEAM: TeamMember[] = [
  {
    id: 1,
    name: 'K. Sam',
    role: 'Engineering Lead',
    roleId: 'role-1',
    category: 'Engineering',
    bio: 'Architects the core systems, keeps the quality bar high, and mentors the team.',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    socialLinks: { github: 'https://github.com/', linkedin: 'https://linkedin.com/', email: 'sam@example.com' },
  },
  {
    id: 2,
    name: 'L. Lavender',
    role: 'Product Strategist',
    roleId: 'role-3',
    category: 'Product',
    bio: 'Turns ambiguity into milestones, builds roadmaps, and aligns teams around impact.',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    socialLinks: { linkedin: 'https://linkedin.com/', email: 'lavender@example.com' },
  },
  {
    id: 3,
    name: "N. N'Gwino",
    role: 'UX Designer',
    roleId: 'role-2',
    category: 'Design',
    bio: 'Designs experiences that feel premium: typography, motion, and interaction details.',
    imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    socialLinks: { github: 'https://github.com/', linkedin: 'https://linkedin.com/' },
  },
  {
    id: 4,
    name: 'R. Retail',
    role: 'Frontend Engineer',
    roleId: 'role-1',
    category: 'Engineering',
    bio: 'Delivers performant, accessible interfaces with modern React patterns.',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    socialLinks: { github: 'https://github.com/', email: 'retail@example.com' },
  },
  {
    id: 5,
    name: 'A. Analytics',
    role: 'Data Engineer',
    roleId: 'role-1',
    category: 'Engineering',
    bio: 'Connects signals to decisions with dashboards, pipelines, and reliable data models.',
    imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    socialLinks: { linkedin: 'https://linkedin.com/' },
  },
  {
    id: 6,
    name: 'S. Systems',
    role: 'Design Engineer',
    roleId: 'role-2',
    category: 'Design',
    bio: 'Bridges design and engineering for smooth animations and cohesive component systems.',
    imageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    socialLinks: { email: 'systems@example.com' },
  },
];

const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    slug: 'dairy-milk-yoghurt',
    title: 'Milk & Yoghurt Processing',
    tagline: 'Pasteurization to Packaging',
    hook: 'We transform quality raw milk into safe, consistent dairy products families can trust.',
    description: 'A production flow focused on hygiene, consistency, and reliable batching for milk and yoghurt.',
    number: '01',
    steps: [
      { year: '01', title: 'Procure', description: 'Source and validate incoming milk quality for each production run.' },
      { year: '02', title: 'Process', description: 'Pasteurize and manage fermentation to achieve desired texture and taste.' },
      { year: '03', title: 'Quality Check', description: 'Run in-process sampling to confirm safety and consistency targets.' },
      { year: '04', title: 'Pack & Distribute', description: 'Fill, seal, label, and prepare products for dependable delivery.' },
    ],
  },
  {
    id: 2,
    slug: 'mineral-water-processing',
    title: 'Mineral Water Processing',
    tagline: 'Hydration with Hygiene',
    hook: 'From sourcing to bottling, we maintain strict controls for clean, safe mineral water.',
    description: 'A high-hygiene line designed for filtration, bottling, and reliable quality release.',
    number: '02',
    steps: [
      { year: '01', title: 'Source Water', description: 'Select water sources and verify basic quality indicators before processing.' },
      { year: '02', title: 'Filter & Treat', description: 'Use filtration and treatment steps to meet safety and clarity targets.' },
      { year: '03', title: 'Bottle & Seal', description: 'Fill bottles with precise controls to prevent contamination.' },
      { year: '04', title: 'QA Release', description: 'Complete final checks, labeling verification, and traceability approvals.' },
    ],
  },
  {
    id: 3,
    slug: 'fruit-juice-production',
    title: 'Fruit Juice Production',
    tagline: 'Taste-first Processing',
    hook: 'We craft flavorful fruit juices with careful blending and hygienic processing.',
    description: 'A production process designed for clean extraction, consistent taste profiles, and safe packaging.',
    number: '03',
    steps: [
      { year: '01', title: 'Select Fruit', description: 'Assess fruit readiness for consistent extraction and quality outcomes.' },
      { year: '02', title: 'Extract', description: 'Juice and process to retain flavor while managing cleanliness controls.' },
      { year: '03', title: 'Blend & Pasteurize', description: 'Achieve consistent profiles through blending and pasteurization steps.' },
      { year: '04', title: 'Pack', description: 'Package, label, and release juice batches with traceability checks.' },
    ],
  },
  {
    id: 4,
    slug: 'packaging-distribution',
    title: 'Packaging & Distribution',
    tagline: 'From Plant to Shelf',
    hook: 'We ensure products stay protected from fill to delivery for maximum freshness and reliability.',
    description: 'A logistics-ready production workflow with packaging verification and dependable delivery planning.',
    number: '04',
    steps: [
      { year: '01', title: 'Packaging Setup', description: 'Validate packaging materials and labels before production start.' },
      { year: '02', title: 'Fill & Seal', description: 'Run controlled filling, sealing, and cleanliness checks for each batch.' },
      { year: '03', title: 'Cold-chain / Logistics Prep', description: 'Plan transport requirements to protect quality during movement.' },
      { year: '04', title: 'Delivery Coordination', description: 'Coordinate dispatch schedules to keep supply consistent across regions.' },
    ],
  },
  {
    id: 5,
    slug: 'food-safety-quality',
    title: 'Food Safety & Quality Assurance',
    tagline: 'Confidence in Every Batch',
    hook: 'We embed quality into the workflow with controls, testing, and traceability at every stage.',
    description: 'A practical, evidence-driven quality process for consistent safety and reliable outcomes.',
    number: '05',
    steps: [
      { year: '01', title: 'Hazard Analysis', description: 'Identify risks and define safe operating targets for each line.' },
      { year: '02', title: 'In-process QA', description: 'Sample and verify during production to keep batches within specification.' },
      { year: '03', title: 'Testing', description: 'Run microbial and product checks to confirm safety standards.' },
      { year: '04', title: 'Traceability', description: 'Keep full batch records for accountability, recalls, and continuous improvement.' },
    ],
  },
  {
    id: 6,
    slug: 'procurement-supply-chain',
    title: 'Procurement & Supply Chain',
    tagline: 'Reliable Inputs, Reliable Output',
    hook: 'We strengthen the upstream network so production runs consistently and efficiently.',
    description: 'Supplier onboarding, inventory planning, and transport coordination for stable production inputs.',
    number: '06',
    steps: [
      { year: '01', title: 'Supplier Onboarding', description: 'Work with trusted partners and align quality expectations.' },
      { year: '02', title: 'Inventory Planning', description: 'Balance inputs with demand forecasts to reduce shortages and waste.' },
      { year: '03', title: 'Transport Coordination', description: 'Manage deliveries with hygiene and freshness controls.' },
      { year: '04', title: 'Reporting & Improvement', description: 'Review performance and adjust processes for better consistency.' },
    ],
  },
  {
    id: 7,
    slug: 'sustainability-innovation',
    title: 'Sustainability & Innovation',
    tagline: 'Better Processes, Better Tomorrow',
    hook: 'We continuously challenge operations to reduce waste, improve efficiency, and innovate responsibly.',
    description: 'Innovation cycles focused on smarter processes, better resource use, and sustained quality.',
    number: '07',
    steps: [
      { year: '01', title: 'Identify Improvements', description: 'Find opportunities for reducing waste and improving throughput.' },
      { year: '02', title: 'Pilot', description: 'Test new approaches with controlled trials before scaling.' },
      { year: '03', title: 'Optimize', description: 'Refine energy, water, and production efficiency while preserving quality.' },
      { year: '04', title: 'Scale Learning', description: 'Standardize successful improvements and share outcomes across teams.' },
    ],
  },
  {
    id: 8,
    slug: 'market-expansion',
    title: 'Market Expansion Programs',
    tagline: 'Growth Across the Region',
    hook: 'We expand responsibly by aligning production capacity with market readiness and demand.',
    description: 'A disciplined go-to-market approach built around quality, partnerships, and consistent supply.',
    number: '08',
    steps: [
      { year: '01', title: 'Target Markets', description: 'Prioritize markets based on demand signals and distribution feasibility.' },
      { year: '02', title: 'Regulatory Readiness', description: 'Ensure compliance and prepare product documentation for new regions.' },
      { year: '03', title: 'Partnerships', description: 'Collaborate with distributors and partners to improve availability.' },
      { year: '04', title: 'Go-to-market', description: 'Launch with consistent supply planning and quality assurance checks.' },
    ],
  },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: '01',
    projectId: '01',
    title: 'Masaka Dairy Expansion',
    accent: 'Emerald',
    subtitle: 'Production Capacity Upgrade',
    tag: 'Masaka',
    description: 'A production expansion program designed to increase capacity and ensure consistent dairy output.',
    mirrored: false,
    icons: ['Milk', 'Yoghurt', 'Bottling'],
    category: 'Dairy',
    image: '',
    link: 'https://example.com',
  },
  {
    id: '02',
    projectId: '02',
    title: 'Inyange Water Bottling Line',
    accent: 'Sky',
    subtitle: 'Mineral Water Processing',
    tag: 'Water',
    description: 'A hygienic bottling workflow focused on filtration, sealing, and reliable quality release.',
    mirrored: true,
    icons: ['Filtration', 'Bottling', 'QA'],
    category: 'Beverages',
    image: '',
    link: 'https://example.com',
  },
  {
    id: '03',
    projectId: '03',
    title: 'Fruit Juice Production Program',
    accent: 'Violet',
    subtitle: 'Processing & Packaging',
    tag: 'Juice',
    description: 'A taste-first production approach for consistent fruit extraction, blending, and packaging.',
    mirrored: false,
    icons: ['Extraction', 'Blending', 'Packaging'],
    category: 'Fruit',
    image: '',
    link: 'https://example.com',
  },
];

const MOCK_BLOGS: BlogPost[] = [
  {
    id: 1,
    slug: 'milk-and-yoghurt-quality',
    category: 'Dairy',
    date: '2026-02-10',
    title: 'Milk & Yoghurt: Quality by Design',
    excerpt: 'How our production workflow keeps consistency from procurement to the final package.',
    readTime: '5 min',
    content: '<p>Quality begins at procurement and continues through every production stage.</p><ul><li>Hygienic processing steps</li><li>In-process sampling</li><li>Batch traceability</li></ul>',
    image: '',
  },
  {
    id: 2,
    slug: 'mineral-water-processing-hygiene',
    category: 'Water',
    date: '2026-01-22',
    title: 'Mineral Water Processing & Hygiene',
    excerpt: 'A practical look at filtration, bottling, and the quality checks behind every bottle.',
    readTime: '4 min',
    content: '<p>We treat water processing as a controlled workflow with measurable safety steps.</p><p>From sourcing to final release, every batch is verified.</p>',
    image: '',
  },
  {
    id: 3,
    slug: 'fruit-juice-production-taste-and-safety',
    category: 'Juice',
    date: '2025-12-18',
    title: 'Fruit Juice: Taste & Safety Together',
    excerpt: 'How we balance flavor, consistency, and safe packaging for every serving.',
    readTime: '6 min',
    content: '<p>Great juice is consistent juice.</p><p>We focus on clean extraction, careful blending, and safe packaging.</p>',
    image: '',
  },
  {
    id: 4,
    slug: 'masaka-expansion-capacity-story',
    category: 'Operations',
    date: '2025-11-30',
    title: 'The Masaka Expansion Story',
    excerpt: 'Why capacity matters—and how expansion supports local supply and regional growth.',
    readTime: '5 min',
    content: '<p>Increased capacity helps meet demand and enables expansion to neighboring markets.</p><p>Our goal stays the same: high quality at scale.</p>',
    image: '',
  },
];

let MOCK_CONTACTS: Contact[] = [
  {
    id: 'c-1',
    name: 'Iris N.',
    email: 'iris@example.com',
    message: 'Hi Inyange Industries, I would like to learn more about your dairy and beverage processing capabilities. Can we talk?',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
  },
  {
    id: 'c-2',
    name: 'Patrick K.',
    email: 'patrick@example.com',
    message: 'We are interested in strengthening our distribution plan for beverages. What is the best next step?',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    id: 'c-3',
    name: 'Esther M.',
    email: 'esther@example.com',
    message: 'We want to learn how you manage production milestones and quality checks. Could you help us set up a process?',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

function tryGetMockResponse(method: string, segments: string[], bodyJson: any): NextResponse | null {
  const resource = segments[0] || '';
  const second = segments[1] || '';

  // AUTH
  if (resource === 'auth') {
    const action = second;
    if (action === 'me' && method === 'GET') {
      return NextResponse.json({ id: 'u-1', name: 'Mock Admin', email: 'admin@example.com', role: 'admin' }, { status: 200 });
    }
    if (action === 'login' && method === 'POST') {
      return NextResponse.json(
        { token: 'mock-token', _id: 'u-1', name: 'Mock Admin', email: bodyJson?.email || 'admin@example.com', role: 'admin' },
        { status: 200 }
      );
    }
  }

  // READ: home + public pages
  if (resource === 'milestones' && method === 'GET' && !second) return NextResponse.json(MOCK_MILESTONES, { status: 200 });

  if (resource === 'services' && method === 'GET' && !second) return NextResponse.json(MOCK_SERVICES, { status: 200 });

  if (resource === 'projects' && method === 'GET' && !second) return NextResponse.json(MOCK_PROJECTS, { status: 200 });

  if (resource === 'roles' && method === 'GET' && !second) return NextResponse.json(MOCK_ROLES, { status: 200 });

  if (resource === 'team' && method === 'GET' && !second) return NextResponse.json(MOCK_TEAM, { status: 200 });

  if (resource === 'blogs') {
    if (method === 'GET' && !second) {
      return NextResponse.json(
        MOCK_BLOGS.map(b => ({
          id: b.id,
          slug: b.slug,
          category: b.category,
          date: b.date,
          title: b.title,
          excerpt: b.excerpt,
          readTime: b.readTime,
        })),
        { status: 200 }
      );
    }
    if (method === 'GET' && second) {
      const found = MOCK_BLOGS.find(b => b.slug === second);
      if (!found) return NextResponse.json({ message: 'Not found' }, { status: 404 });
      return NextResponse.json(found, { status: 200 });
    }
  }

  // CONTACTS: used by public contact form + admin inbox
  if (resource === 'contacts') {
    if (method === 'GET' && !second) return NextResponse.json(MOCK_CONTACTS, { status: 200 });

    if (method === 'POST' && !second) {
      const name = String(bodyJson?.name || 'Guest');
      const email = String(bodyJson?.email || 'guest@example.com');
      const message = String(bodyJson?.message || '');

      const newContact: Contact = {
        id: `c-${Date.now()}`,
        name,
        email,
        message,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      MOCK_CONTACTS = [...MOCK_CONTACTS, newContact];
      return NextResponse.json({ message: 'Mock message received', contact: newContact }, { status: 200 });
    }

    if ((method === 'PATCH' || method === 'DELETE') && second) {
      if (method === 'PATCH') MOCK_CONTACTS = MOCK_CONTACTS.map(c => (c.id === second ? { ...c, isRead: true } : c));
      if (method === 'DELETE') MOCK_CONTACTS = MOCK_CONTACTS.filter(c => c.id !== second);
      return NextResponse.json({ message: 'Mock update ok' }, { status: 200 });
    }
  }

  // Admin mutations: return success so modals close.
  const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
  if (isMutation && ['services', 'milestones', 'projects', 'blogs', 'team', 'roles', 'contacts'].includes(resource)) {
    return NextResponse.json({ message: 'Mock mutation ok' }, { status: 200 });
  }

  return null;
}

async function proxyRequest(req: NextRequest) {
    const url = new URL(req.url);
    // Extract the path after /api/
    const pathSegments = url.pathname.replace(/^\/api\//, '');
    const targetUrl = `${API_BASE}/${pathSegments}${url.search}`;
    const segments = pathSegments.split('/').filter(Boolean);

    const headers: Record<string, string> = {};

    // Forward authorization header securely
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
        headers['Authorization'] = authHeader;
    }

    const contentType = req.headers.get('content-type');

    let body: BodyInit | null = null;
    let bodyJson: any = undefined;

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        if (contentType && contentType.includes('multipart/form-data')) {
            // For file uploads, forward the raw body — don't set Content-Type 
            // so fetch auto-generates the correct boundary
            body = await req.arrayBuffer();
            headers['Content-Type'] = contentType;
        } else {
            // JSON payloads
            try {
                const json = await req.json();
                bodyJson = json;
                body = JSON.stringify(json);
                headers['Content-Type'] = 'application/json';
            } catch {
                // Empty body
            }
        }
    }

    try {
        if (USE_MOCK_DATA) {
            const mock = tryGetMockResponse(req.method, segments, bodyJson);
            if (mock) return mock;
        }
        const response = await fetch(targetUrl, {
            method: req.method,
            headers,
            body,
        });

        const data = await response.text();

        return new NextResponse(data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
            },
        });
    } catch (error) {
        const mock = tryGetMockResponse(req.method, segments, bodyJson);
        if (mock) return mock;
        console.error('API Proxy Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    return proxyRequest(req);
}

export async function POST(req: NextRequest) {
    return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
    return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
    return proxyRequest(req);
}

export async function PATCH(req: NextRequest) {
    return proxyRequest(req);
}
