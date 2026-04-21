export type LeaderLevel = 'Executive' | 'Management' | 'Operations';

export interface Leader {
  id: number;
  slug: string;
  name: string;
  title: string;
  image: string;
  roleTag?: string;
  level: LeaderLevel;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  experienceTitle: string;
  experienceBio: string;
  experiencePoints: string[];
}

const DEFAULT_BIO = "A dedicated professional committed to Inyange Industries' mission of excellence and purity. Bringing years of industry expertise to ensure the highest standards of quality for Rwanda's dairy and beverage sector.";
const DEFAULT_EXP_BIO = "Extensive experience in their respective field, contributing to Inyange's growth and success through strategic leadership and operational excellence.";
const DEFAULT_EXP_POINTS = [
  "Over 10 years of experience in the industry",
  "Proven track record of leadership and innovation",
  "Dedicated to maintaining the highest standards of quality"
];

export const LEADERS: Leader[] = [
  {
    id: 1,
    slug: 'marcus-mango',
    name: 'Marcus Mango',
    title: 'Chief Executive Officer',
    roleTag: 'CEO & Founder',
    level: 'Executive',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'Marcus Mango is the visionary behind Inyange Industries, bringing over 20 years of experience in the dairy and beverage industry. His leadership has been instrumental in transforming Inyange from a local private enterprise into a regional powerhouse.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com',
    },
    experienceTitle: 'Marcus Mango Experience',
    experienceBio: 'Throughout his career, Marcus has focused on operational excellence and sustainable growth in the African food processing sector.',
    experiencePoints: [
      'Over 15 years of experience in the technology and food industry',
      'Before founding the company, Founder A served as a Manager at a global logistics firm',
      'Holds patents for technological innovations that led the industry standards'
    ]
  },
  {
    id: 2,
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Chief Financial Officer',
    roleTag: 'CFO',
    level: 'Executive',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'Sarah leads our financial strategy with a focus on sustainable growth and stakeholder value. With an extensive background in international finance, she ensures Inyange remains financially robust.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    experienceTitle: 'Sarah Chen Experience',
    experienceBio: 'Sarah has over 12 years of experience in financial management across multiple continents.',
    experiencePoints: [
      'Expertise in international trade finance and investment strategy',
      'Previously served as Senior Financial Analyst at a major investment bank',
      'Chartered Financial Analyst (CFA) with honors'
    ]
  },
  {
    id: 3,
    slug: 'jean-paul-kagabo',
    name: 'Jean-Paul Kagabo',
    title: 'Chief Operations Officer',
    roleTag: 'COO',
    level: 'Executive',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'Jean-Paul oversees the entire production chain at Inyange, ensuring our Masaka plant and other facilities maintain the highest standards of hygiene and efficiency.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
    experienceTitle: 'Jean-Paul Kagabo Experience',
    experienceBio: 'Jean-Paul has a deep understanding of manufacturing processes and supply chain logistics in East Africa.',
    experiencePoints: [
      'Led the USD 27M expansion project of the Masaka production plant',
      'Specialist in Lean Manufacturing and Six Sigma methodologies',
      'Former Operations Director for a regional dairy processor'
    ]
  },
  {
    id: 4,
    slug: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    title: 'Chief Marketing Officer',
    roleTag: 'CMO',
    level: 'Executive',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'Elena is responsible for the global brand strategy of Inyange. Her creative approach has helped build Inyange into a household name recognized for purity and quality.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    experienceTitle: 'Elena Rodriguez Experience',
    experienceBio: 'Elena specializes in brand positioning and consumer behavior in emerging markets.',
    experiencePoints: [
      'Architected several award-winning marketing campaigns in the FMCG sector',
      'Extensive experience in digital transformation and social media strategy',
      'MA in Global Marketing from a leading European business school'
    ]
  },
  {
    id: 5,
    slug: 'kwesi-mensah',
    name: 'Kwesi Mensah',
    title: 'Chief Technology Officer',
    level: 'Executive',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Kwesi Mensah Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 6,
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Head of Human Resources',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Priya Sharma Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 7,
    slug: 'michael-oneill',
    name: "Michael O'Neill",
    title: 'Head of Production',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: "Michael O'Neill Experience",
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 8,
    slug: 'amira-al-fayed',
    name: 'Amira Al-Fayed',
    title: 'Head of Research & Development',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0fe4a2c900?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Amira Al-Fayed Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 9,
    slug: 'david-smith',
    name: 'David Smith',
    title: 'Head of Sales',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'David Smith Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 10,
    slug: 'ling-wu',
    name: 'Ling Wu',
    title: 'Head of Supply Chain',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Ling Wu Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 11,
    slug: 'beatrice-mutoni',
    name: 'Beatrice Mutoni',
    title: 'Head of Quality Assurance',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd47?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Beatrice Mutoni Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 12,
    slug: 'carlos-mendez',
    name: 'Carlos Mendez',
    title: 'Head of Logistics',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Carlos Mendez Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 13,
    slug: 'sophie-dubois',
    name: 'Sophie Dubois',
    title: 'General Counsel',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Sophie Dubois Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 14,
    slug: 'thomas-muller',
    name: 'Thomas Müller',
    title: 'Head of Maintenance',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Thomas Müller Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 15,
    slug: 'fatima-zahra',
    name: 'Fatima Zahra',
    title: 'Digital Transformation Lead',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Fatima Zahra Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 16,
    slug: 'richard-baxter',
    name: 'Richard Baxter',
    title: 'Head of Finance',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3dbdf5bb3d?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Richard Baxter Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 17,
    slug: 'anya-ivanov',
    name: 'Anya Ivanov',
    title: 'Head of IT Infrastructure',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Anya Ivanov Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 18,
    slug: 'samuel-okoro',
    name: 'Samuel Okoro',
    title: 'Head of Security & Risk',
    level: 'Management',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Samuel Okoro Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 19,
    slug: 'isabella-conti',
    name: 'Isabella Conti',
    title: 'Creative Director',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Isabella Conti Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 20,
    slug: 'hiroshi-tanaka',
    name: 'Hiroshi Tanaka',
    title: 'Strategic Planning Manager',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Hiroshi Tanaka Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 21,
    slug: 'grace-ndayisaba',
    name: 'Grace Ndayisaba',
    title: 'Sustainability Officer',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Grace Ndayisaba Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 22,
    slug: 'oliver-wright',
    name: 'Oliver Wright',
    title: 'Communications Manager',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1517060197619-354f2c3dac5c?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Oliver Wright Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 23,
    slug: 'mariam-diallo',
    name: 'Mariam Diallo',
    title: 'Public Relations Officer',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Mariam Diallo Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 24,
    slug: 'daniel-park',
    name: 'Daniel Park',
    title: 'Senior Data Analyst',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Daniel Park Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  },
  {
    id: 25,
    slug: 'rose-nyirahabimana',
    name: 'Rose Nyirahabimana',
    title: 'Factory Operations Manager',
    level: 'Operations',
    image: 'https://images.unsplash.com/photo-1551069613-1904dbdcda11?auto=format&fit=crop&q=80&w=400&h=500',
    bio: DEFAULT_BIO,
    socialLinks: { linkedin: 'https://linkedin.com' },
    experienceTitle: 'Rose Nyirahabimana Experience',
    experienceBio: DEFAULT_EXP_BIO,
    experiencePoints: DEFAULT_EXP_POINTS
  }
];
