import { PageId } from '../../types';
import CaseStudyCard, { ProjectItem } from './CaseStudyCard';
import { Orbit } from 'lucide-react';
import { motion } from 'motion/react';

// Import Generated Project Visuals
import mikyajhubImg from '../../assets/images/mikyajhub_ecom_ui_1787942272671.jpg';
import phoenixImg from '../../assets/images/phoenix_medical_ui_1787942159369.jpg';
import maharashtraImg from '../../assets/images/maharashtra_traders_catalog_preview_1787937809338.jpg';
import soloLevelingImg from '../../assets/images/solo_leveling_ui_1787941851589.jpg';
import treasuryManagerImg from '../../assets/images/treasury_manager_dotcom_ui_1788003111607.jpg';
import apexManagerImg from '../../assets/images/apex_manager_ui_1788015665578.jpg';
import tajPhotographyImg from '../../assets/images/taj_photography_preview_1789218182908.jpg';

interface OrbitDeploymentsPageProps {
  onNavigate?: (page: PageId) => void;
}

const featuredProjects: ProjectItem[] = [
  {
    id: 'taj-photography',
    title: 'Taj Photography',
    subtitle: "A Photographer's Den",
    description: "An interactive digital portfolio and creative den crafted for an editorial photographer. Designed around a tactile 35mm camera interface, featuring curated galleries, client story showcases, and seamless booking inquiries.",
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    liveLink: 'https://taj.ayyuq.in/',
    imageSrc: tajPhotographyImg,
  },
  {
    id: 'apex-manager',
    title: 'Apex Manager',
    subtitle: 'A Business Management System',
    description: 'A comprehensive business management system developed for businesses to manage income, track expenses, generate client quotations, and automate queries with an integrated virtual AI chatbot. (Demo version — full system available for purchase).',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Chatbot', 'Financial Analytics'],
    liveLink: 'https://apexmanager.ayyuq.in/',
    imageSrc: apexManagerImg,
    note: 'Demo system (Available for sale)',
  },
  {
    id: 'treasury-manager',
    title: 'Treasury Manager',
    subtitle: 'Dotcom Club, Jai Hind College',
    description: 'A dedicated treasury management system developed for treasurers at Dotcom Club, Jai Hind College, to track event budgets, manage expense approvals, generate invoices, and audit transactions.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'Framer Motion'],
    liveLink: 'https://treasurymanager.ayyuq.in/',
    imageSrc: treasuryManagerImg,
    credentialsNote: 'Username: treasurer · Pass: treasurer1256',
  },
  {
    id: 'mikyajhub',
    title: 'Cosmetic Website',
    subtitle: 'Mikyajhub',
    description: 'A modern cosmetic and beauty e-commerce website crafted for a leading Kuwait-based cosmetic brand, featuring sleek product catalogs, localized currencies, and high-conversion mobile checkout.',
    techStack: ['Shopify', 'Canva', 'Liquid', 'Responsive Design', 'E-Commerce UX'],
    liveLink: 'https://mikyajhub.com',
    imageSrc: mikyajhubImg,
  },
  {
    id: 'phoenix-global-medical',
    title: 'Medical Hospital',
    subtitle: 'PhoenixGlobalMedical',
    description: 'A premier digital portal built for a highly reputable Mumbai-based hospital, providing doctor appointment scheduling, department navigation, and smooth interactive patient onboarding.',
    techStack: ['Next.js', 'React', 'TypeScript', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
    liveLink: 'https://phoenixglobalmedical.in',
    imageSrc: phoenixImg,
  },
  {
    id: 'maharashtra-traders',
    title: 'AI Catalog System',
    subtitle: 'Maharashtra Traders',
    description: 'A comprehensive B2B SaaS web application to manage product catalog systems with AI-assisted product parsing, automated brochure reading, and fast inventory search.',
    techStack: ['Next.js', 'React', 'MongoDB', 'Gemini API', 'Tailwind CSS', 'Express.js', 'PDF Parse'],
    liveLink: 'https://mht-traders.ayyuq.in/',
    imageSrc: maharashtraImg,
    credentialsNote: 'Email: admin@gmail.com · Password: admin12345',
  },
  {
    id: 'solo-leveling',
    title: 'Level Up Game',
    subtitle: 'SoloLeveling',
    description: 'A gamified productivity web application where users complete real-life daily tasks to gain XP, unlock character stats, and level up their personal habits.',
    techStack: ['React', 'Tailwind CSS', 'Firebase', 'Framer Motion', 'Cloud Firestore'],
    liveLink: 'https://solo-leveling.ayyuq.in/',
    imageSrc: soloLevelingImg,
  },
];

export default function OrbitDeploymentsPage({ onNavigate: _onNavigate }: OrbitDeploymentsPageProps) {
  return (
    <div id="orbit-deployments-page" className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* PAGE HEADER */}
        <section className="text-center max-w-4xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141A10] border border-[#607345]/40 text-[#829A5F] text-xs sm:text-sm font-mono tracking-wider"
          >
            <Orbit className="w-4 h-4 text-orange-500" />
            <span>PORTFOLIO & CLIENT PROJECTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#D8E8C5] tracking-tight leading-tight"
          >
            Real Projects Built For <br />
            <span className="text-orange-500 font-black">
              Growing Businesses.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#9BB17B] max-w-2xl mx-auto leading-relaxed"
          >
            Take a look at the custom websites, mobile apps, and business software we have built for companies across different industries.
          </motion.p>
        </section>

        {/* 2-COLUMN PROJECT GRID WITH IMAGES */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#607345]/20 pb-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#D8E8C5] tracking-tight">
              Featured Client Work & Case Studies
            </h2>
            <span className="text-xs font-mono text-orange-400 font-bold">Showing {featuredProjects.length} Featured Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project, idx) => (
              <CaseStudyCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
