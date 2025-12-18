/**
 * ABOUT PAGE DATA
 * 
 * All data arrays for the About page components.
 * Structured for easy maintenance and real asset swapping.
 * 
 * ASSET PLACEHOLDERS:
 * Replace placeholder URLs with actual assets:
 * - assets/history-1.jpg through assets/history-5.jpg - Company history imagery
 * - assets/timeline-2021.jpg through assets/timeline-2025.jpg - Timeline hero images
 * - assets/timeline-2023.gif - Optional animated GIF for milestone year
 * - assets/testimonial-1.pdf through assets/testimonial-4.pdf - PDF documents
 * - assets/testimonial-cover-1.jpg through assets/testimonial-cover-4.jpg - PDF cover thumbnails
 */

// ============================================
// COMPANY HISTORY DATA
// Used in CinematicHistory component
// ============================================
export interface HistoryEntry {
  year: number;
  title: string;
  blurb: string;
  imageUrl: string;
  /** Optional secondary parallax layer image */
  imageLayer2?: string;
  /** Optional tertiary parallax layer image */
  imageLayer3?: string;
  /** Accent color for this era (HSL values) */
  accentColor: string;
}

export const companyHistory: HistoryEntry[] = [
  {
    year: 2019,
    title: "The Genesis",
    blurb: "Born from a simple idea in a garage workshop, our founders envisioned a world where technology serves humanity with elegance and purpose. What started as late-night coding sessions and whiteboard dreams would soon reshape an industry. The first prototype was built with nothing but passion, determination, and an unwavering belief in the impossible.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    imageLayer2: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80",
    imageLayer3: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    accentColor: "38 92% 50%",
  },
  {
    year: 2020,
    title: "Weathering the Storm",
    blurb: "When the world stood still, we adapted and evolved. The global challenges became our catalyst for innovation, pushing us to reimagine remote collaboration and digital transformation. Our team grew closer despite the distance, forging bonds that would define our culture for years to come. We emerged stronger, with products that mattered more than ever.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    imageLayer2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    accentColor: "200 80% 50%",
  },
  {
    year: 2021,
    title: "Breaking Through",
    blurb: "Our Series A funding marked more than capital—it validated our vision. Industry veterans joined our board, bringing wisdom and connections that accelerated our growth exponentially. We opened our second office, crossed the million-user milestone, and began building the platform that would become our flagship product. The breakthrough we'd dreamed of was finally here.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    imageLayer2: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    imageLayer3: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    accentColor: "142 70% 45%",
  },
  {
    year: 2023,
    title: "Global Expansion",
    blurb: "From Tokyo to Toronto, our solutions now power businesses across six continents. Strategic partnerships with Fortune 500 companies brought our technology to millions of new users. We launched three new product lines, each addressing critical market needs we'd identified through years of customer research. The world was taking notice.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    imageLayer2: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    accentColor: "280 70% 50%",
  },
  {
    year: 2025,
    title: "The Future Unfolds",
    blurb: "Today, we stand at the precipice of a new era. Our AI-driven initiatives are setting industry standards, our sustainability commitments are reshaping corporate responsibility, and our community of innovators spans the globe. But we're just getting started. The next chapter promises breakthroughs we can only imagine—and we're writing it together, one innovation at a time.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    imageLayer2: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    imageLayer3: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
    accentColor: "38 92% 50%",
  },
];

// ============================================
// MISSION, VISION, VALUES, GOALS DATA
// Used in MVVGSection component
// ============================================
export interface MVVGItem {
  id: string;
  type: 'mission' | 'vision' | 'values' | 'goals';
  icon: string;
  title: string;
  summary: string;
  expandedContent: string;
}

export const mvvgData: MVVGItem[] = [
  {
    id: "mission",
    type: "mission",
    icon: "🎯",
    title: "Our Mission",
    summary: "Empowering organizations to achieve extraordinary outcomes through innovative technology.",
    expandedContent: "We believe that the right tools can transform how people work, collaborate, and create value. Our mission drives every decision we make—from the features we build to the partnerships we forge. We're committed to democratizing access to enterprise-grade technology, ensuring that organizations of all sizes can compete on a level playing field. Every line of code we write serves this singular purpose: to unlock human potential at scale.",
  },
  {
    id: "vision",
    type: "vision",
    icon: "🔮",
    title: "Our Vision",
    summary: "A world where technology amplifies human creativity rather than replacing it.",
    expandedContent: "We envision a future where artificial intelligence and human ingenuity work in harmony, where automation handles the mundane so people can focus on what matters. Our vision extends beyond products—we're building an ecosystem that nurtures innovation, celebrates diversity of thought, and creates lasting positive impact. By 2030, we aim to have helped over 100 million professionals reclaim their time for meaningful work.",
  },
  {
    id: "values",
    type: "values",
    icon: "💎",
    title: "Our Values",
    summary: "Integrity, innovation, and impact guide everything we do.",
    expandedContent: "INTEGRITY: We do what's right, even when no one is watching. Transparency isn't just a policy—it's our default. INNOVATION: We challenge assumptions, embrace calculated risks, and celebrate failures as learning opportunities. IMPACT: We measure success not by revenue alone, but by the positive change we create. INCLUSION: Diverse perspectives make us stronger. We actively build teams and products that reflect the world we serve. SUSTAINABILITY: We build for the long term, considering environmental and social implications in every decision.",
  },
  {
    id: "goals",
    type: "goals",
    icon: "🚀",
    title: "Our Goals",
    summary: "Ambitious milestones that drive us forward every single day.",
    expandedContent: "2025 GOALS: Launch AI-powered analytics platform • Achieve carbon-neutral operations • Expand to 25 new markets • Reach 10 million active users • Establish $10M innovation fund for underrepresented founders. LONG-TERM: Become the global standard for enterprise collaboration • Create 50,000 jobs in emerging markets • Open-source our core infrastructure • Fund 1,000 technology scholarships worldwide.",
  },
];

// ============================================
// COMPANY WAY TIMELINE DATA
// Used in CompanyTimeline component
// ============================================
export interface TimelineYear {
  year: number;
  heroImage: string;
  /** Optional GIF or video URL for enhanced visual */
  mediaUrl?: string;
  mediaType?: 'gif' | 'video';
  summary: string;
  kpis: Array<{
    label: string;
    value: string;
  }>;
  gallery: string[];
}

export const timelineData: TimelineYear[] = [
  {
    year: 2021,
    heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    summary: "The year of foundation. We assembled our core team, secured seed funding, and launched our MVP to an eager early-adopter community. Every challenge became a lesson, every setback a stepping stone.",
    kpis: [
      { label: "Team Size", value: "12" },
      { label: "Seed Raised", value: "$2.5M" },
      { label: "Beta Users", value: "5K" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
    ],
  },
  {
    year: 2022,
    heroImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80",
    summary: "Growth accelerated beyond projections. Series A funding enabled rapid scaling, and our product-market fit crystallized. We hired across three continents and launched our enterprise tier.",
    kpis: [
      { label: "Team Size", value: "48" },
      { label: "Series A", value: "$18M" },
      { label: "Active Users", value: "100K" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
    ],
  },
  {
    year: 2023,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    // Placeholder: Replace with assets/timeline-2023.gif for animated milestone
    mediaUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    mediaType: 'gif',
    summary: "The milestone year. We crossed one million users, opened offices in London and Singapore, and launched our AI-powered features that redefined industry standards.",
    kpis: [
      { label: "Team Size", value: "156" },
      { label: "Revenue", value: "$42M" },
      { label: "Users", value: "1.2M" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80",
    ],
  },
  {
    year: 2024,
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    summary: "Transformation at scale. Series C funding positioned us as a market leader. We acquired two complementary startups, launched in 15 new countries, and achieved profitability.",
    kpis: [
      { label: "Team Size", value: "320" },
      { label: "Series C", value: "$120M" },
      { label: "Users", value: "4.5M" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80",
    ],
  },
  {
    year: 2025,
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    summary: "The future is now. Our platform powers enterprises worldwide, our AI initiatives are setting new benchmarks, and we're just getting started on our mission to transform how the world works.",
    kpis: [
      { label: "Team Size", value: "500+" },
      { label: "Valuation", value: "$2B" },
      { label: "Users", value: "10M+" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
    ],
  },
];

// ============================================
// TESTIMONIAL DATA
// Used in TestimonialSlider component
// ============================================
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  /** Cover thumbnail for the testimonial card */
  coverImage: string;
  /** PDF document URL - lazy loaded on interaction */
  pdfUrl: string;
  /** Short excerpt displayed on hover */
  excerpt: string;
  /** Full quote for accessibility */
  fullQuote: string;
}

export const testimonialData: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah Chen",
    title: "Chief Technology Officer",
    company: "Nexus Innovations",
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    // Placeholder: Replace with assets/testimonial-1.pdf
    pdfUrl: "/placeholder-testimonial.pdf",
    excerpt: "The transformation in our workflow efficiency has been nothing short of remarkable. We've reduced project delivery times by 40%.",
    fullQuote: "The transformation in our workflow efficiency has been nothing short of remarkable. We've reduced project delivery times by 40%, and our team collaboration has reached new heights. This platform has become the backbone of our operations.",
  },
  {
    id: "testimonial-2",
    name: "Marcus Williams",
    title: "VP of Operations",
    company: "GlobalTech Solutions",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    // Placeholder: Replace with assets/testimonial-2.pdf
    pdfUrl: "/placeholder-testimonial.pdf",
    excerpt: "Implementation was seamless, and the ROI was visible within the first quarter. Our teams across 12 countries now work as one.",
    fullQuote: "Implementation was seamless, and the ROI was visible within the first quarter. Our teams across 12 countries now work as one unified force. The platform's scalability and reliability have exceeded every expectation we had.",
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    title: "Director of Digital Strategy",
    company: "Horizon Enterprises",
    coverImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    // Placeholder: Replace with assets/testimonial-3.pdf
    pdfUrl: "/placeholder-testimonial.pdf",
    excerpt: "What impressed me most was the AI-powered insights. We're making decisions faster and with more confidence than ever before.",
    fullQuote: "What impressed me most was the AI-powered insights. We're making decisions faster and with more confidence than ever before. The analytics dashboard alone has transformed how our leadership team operates.",
  },
  {
    id: "testimonial-4",
    name: "David Park",
    title: "Founder & CEO",
    company: "Velocity Labs",
    coverImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    // Placeholder: Replace with assets/testimonial-4.pdf
    pdfUrl: "/placeholder-testimonial.pdf",
    excerpt: "As a startup, we needed enterprise-grade tools without enterprise complexity. This platform delivered exactly that.",
    fullQuote: "As a startup, we needed enterprise-grade tools without enterprise complexity. This platform delivered exactly that—powerful features that scale with us, intuitive interfaces that our team adopted instantly, and support that treats us like partners.",
  },
];

// ============================================
// ANALYTICS HOOKS (Global)
// Exposed on window for external analytics integration
// ============================================

// Initialize global analytics arrays
declare global {
  interface Window {
    aboutMvvClicks: Array<{ id: string; label: string; timestamp: number }>;
    testimonialPdfOpened: Array<{ id: string; name: string; timestamp: number }>;
  }
}

if (typeof window !== 'undefined') {
  window.aboutMvvClicks = window.aboutMvvClicks || [];
  window.testimonialPdfOpened = window.testimonialPdfOpened || [];
}

/**
 * Track MVV card interaction
 */
export const trackMvvClick = (id: string, label: string): void => {
  if (typeof window !== 'undefined') {
    window.aboutMvvClicks.push({ id, label, timestamp: Date.now() });
    console.log('[Analytics] MVV Click:', { id, label });
  }
};

/**
 * Track PDF open interaction
 */
export const trackPdfOpen = (id: string, name: string): void => {
  if (typeof window !== 'undefined') {
    window.testimonialPdfOpened.push({ id, name, timestamp: Date.now() });
    console.log('[Analytics] PDF Opened:', { id, name });
  }
};
