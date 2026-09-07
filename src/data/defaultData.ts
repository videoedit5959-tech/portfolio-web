import {
  ProfileData,
  ProjectData,
  SkillData,
  ServiceData,
  ExperienceData,
  TestimonialData,
  SiteSettingsData,
} from '../types/portfolio';

export const initialProfile: ProfileData = {
  id: 'profile-1',
  name: 'Asif',
  title: 'MERN Stack Web Developer',
  shortBio: 'I build modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.',
  aboutText: `I am a dedicated MERN Stack Web Developer passionate about building high-performance, responsive, and maintainable web applications. My foundation is built on practical craftsmanship—transforming ideas into clean interfaces and robust RESTful backends.

With a strong grasp of modern JavaScript, React component architecture, Express middleware, and MongoDB document modeling, I build full-stack applications with an emphasis on code cleanliness, security, and responsive UX across all screen sizes. Alongside MERN, I have practical experience delivering custom WordPress and Elementor websites, as well as exploring mobile foundations with basic Android development.`,
  email: 'asif.mern.dev@gmail.com',
  phone: '',
  location: 'Dhaka, Bangladesh (Available Worldwide)',
  avatarUrl: '/images/profile-placeholder.svg',
  resumeUrl: '',
  isAvailable: true,
  socialLinks: {
    github: '',
    linkedin: '',
    whatsapp: '',
    facebook: '',
  },
  specializations: {
    frontend: [
      'Interactive UI component architecture with React.js',
      'Modern styling with Tailwind CSS & Bootstrap',
      'Mobile-first responsive design & accessibility',
      'State management & asynchronous RESTful data fetching',
    ],
    backend: [
      'RESTful API architecture using Express.js',
      'Node.js asynchronous event-driven services',
      'MongoDB data modeling & indexing with Mongoose',
      'JWT authentication, bcrypt hashing & route protection',
    ],
    cms: [
      'WordPress theme customization & site architecture',
      'Pixel-perfect Elementor & Elementor Pro design',
      'Speed optimization & SEO-friendly site structure',
    ],
  },
  philosophy: 'Code should be readable, architectures scalable, and user experiences intuitive. I believe in continuous hands-on learning, transparent communication, and delivering real business value through clean engineering.',
};

export const initialProjects: ProjectData[] = [
  {
    id: 'project-1',
    title: 'Full-Stack E-Commerce Platform',
    slug: 'e-commerce-platform',
    category: 'E-Commerce',
    type: 'Featured Personal Project',
    status: 'Completed',
    displayOrder: 1,
    featured: true,
    shortDescription: 'Modern digital storefront featuring dynamic product catalog, persistent shopping cart, checkout flow, and administrative inventory management.',
    problem: 'Small businesses struggle with slow, bloated commerce templates that complicate catalog maintenance and hurt checkout conversions.',
    solution: 'Engineered a streamlined MERN application with decoupled REST endpoints, fast database indexing, responsive checkout layouts, and instant cart updates.',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'JWT'],
    features: [
      'Secure User authentication with JWT & bcrypt password hashing',
      'Dynamic product listing with price, category, and rating filters',
      'Debounced live product search with instant results',
      'Persistent shopping cart & customizable wishlist',
      'Product details page with multi-image gallery & stock status',
      'Streamlined multi-step checkout UI with order review',
      'Customer order history & status tracking (Pending, Shipped, Delivered)',
      'Protected Admin Dashboard for product CRUD and inventory metrics',
      'Modular RESTful API with centralized error handling',
      'Fully responsive UI optimized for mobile, tablet, and desktop',
    ],
    githubUrl: '',
    liveUrl: '',
    detailedDescription: 'This comprehensive MERN stack personal project showcases full-lifecycle e-commerce development. From designing the database schemas for Products, Users, and Orders in Mongoose, to crafting responsive UI components with Tailwind CSS and React, every layer is engineered for reliability and high performance.',
  },
  {
    id: 'project-2',
    title: 'Project Management SaaS Platform',
    slug: 'project-management-saas',
    category: 'SaaS',
    type: 'Featured Personal Project',
    status: 'Completed',
    displayOrder: 2,
    featured: true,
    shortDescription: 'Productivity and team task workspace featuring status columns, task prioritization, deadlines, and activity feeds.',
    problem: 'Distributed teams often face fragmented communication, task overlap, and difficulty tracking project velocity across different milestones.',
    solution: 'Built a centralized project management dashboard providing task lifecycle visualization, member role assignments, status filtering, and progress tracking.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'REST API'],
    features: [
      'Role-based permissions (Project Manager, Contributor, Observer)',
      'Workspace dashboard with summary metrics & progress rings',
      'Interactive task boards with status columns (To Do, In Progress, In Review, Done)',
      'Task assignment, deadline reminders, and priority tags',
      'Team member directory with active workload indicators',
      'Fast search, tag-based filtering, and sorting by due date',
      'Activity log tracking project changes & updates',
      'RESTful endpoints with parameterized queries and schema validation',
      'Clean, distraction-free developer aesthetic with dark and light support',
    ],
    githubUrl: '',
    liveUrl: '',
    detailedDescription: 'Developed as a showcase SaaS application, this project highlights complex state orchestration in React combined with relational-style document referencing in MongoDB. The backend enforces robust authorization checks on all task mutations.',
  },
  {
    id: 'project-3',
    title: 'Real Estate Property Platform',
    slug: 'real-estate-property-platform',
    category: 'Full Stack',
    type: 'Featured Personal Project',
    status: 'Completed',
    displayOrder: 3,
    featured: true,
    shortDescription: 'Modern real estate marketplace with multi-parameter property search, rich photo galleries, agent inquiry forms, and favorite listings bookmarking.',
    problem: 'Homebuyers and renters waste time navigating cluttered real estate portals with poor filter accuracy and unoptimized mobile views.',
    solution: 'Designed an intuitive property portal featuring verified listing filters (type, location, budget, bedrooms), high-resolution photo galleries, and instant inquiry messaging.',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Tailwind CSS'],
    features: [
      'Property listings with status badges (For Sale, For Rent, Featured)',
      'Multi-parameter filter: Price range, Property Type, Bedrooms, City',
      'Detailed property page with amenities checklist and specs table',
      'High-resolution image carousel and lightbox view',
      'Saved favorites list with database synchronization',
      'Integrated contact & tour schedule inquiry form with validation',
      'Agent dashboard to post and edit property listings',
      'Optimized MongoDB geo & property index queries for fast searches',
      'Responsive design ensuring crisp presentation on phones and ultra-wide screens',
    ],
    githubUrl: '',
    liveUrl: '',
    detailedDescription: 'An enterprise-grade property marketplace architecture designed to show real-world full-stack capabilities. Includes multi-image upload models, structured search indexing in MongoDB, and dynamic route rendering.',
  },
];

export const initialSkills: SkillData[] = [
  // Frontend
  { id: 'skill-1', name: 'HTML', category: 'Frontend', level: 95, iconName: 'Code', displayOrder: 1, isActive: true },
  { id: 'skill-2', name: 'CSS', category: 'Frontend', level: 90, iconName: 'Palette', displayOrder: 2, isActive: true },
  { id: 'skill-3', name: 'JavaScript', category: 'Frontend', level: 88, iconName: 'FileCode2', displayOrder: 3, isActive: true },
  { id: 'skill-4', name: 'React.js', category: 'Frontend', level: 85, iconName: 'Atom', displayOrder: 4, isActive: true },
  { id: 'skill-5', name: 'Tailwind CSS', category: 'Frontend', level: 90, iconName: 'Wind', displayOrder: 5, isActive: true },
  { id: 'skill-6', name: 'Bootstrap', category: 'Frontend', level: 85, iconName: 'LayoutGrid', displayOrder: 6, isActive: true },
  
  // Backend
  { id: 'skill-7', name: 'Node.js', category: 'Backend', level: 84, iconName: 'Server', displayOrder: 7, isActive: true },
  { id: 'skill-8', name: 'Express.js', category: 'Backend', level: 86, iconName: 'Cpu', displayOrder: 8, isActive: true },
  { id: 'skill-9', name: 'MongoDB', category: 'Backend', level: 82, iconName: 'Database', displayOrder: 9, isActive: true },
  
  // CMS
  { id: 'skill-10', name: 'WordPress', category: 'CMS', level: 88, iconName: 'Globe', displayOrder: 10, isActive: true },
  { id: 'skill-11', name: 'Elementor', category: 'CMS', level: 92, iconName: 'Layers', displayOrder: 11, isActive: true },
  
  // Other
  { id: 'skill-12', name: 'Basic Android Development', category: 'Other', level: 60, iconName: 'Smartphone', displayOrder: 12, isActive: true },
];

export const initialServices: ServiceData[] = [
  {
    id: 'srv-1',
    title: 'Full-Stack Web Development',
    description: 'End-to-end web applications built using MongoDB, Express.js, React.js, and Node.js with secure authentication and clean REST APIs.',
    iconName: 'Layers',
    displayOrder: 1,
    isActive: true,
    highlights: ['MERN Stack Architecture', 'Custom REST API Development', 'MongoDB Schema Design & Querying', 'JWT & Session Authentication'],
  },
  {
    id: 'srv-2',
    title: 'Frontend & UI Engineering',
    description: 'Pixel-perfect, mobile-responsive user interfaces with React, Tailwind CSS, and modern JavaScript adhering to web accessibility standards.',
    iconName: 'Atom',
    displayOrder: 2,
    isActive: true,
    highlights: ['React.js Component Architecture', 'Tailwind CSS & Utility-First Styling', 'Mobile-First Responsive Layouts', 'Interactive & Accessible UX'],
  },
  {
    id: 'srv-3',
    title: 'WordPress & Elementor Development',
    description: 'High-converting, customizable WordPress websites designed with Elementor Pro, structured for rapid load speeds and easy content management.',
    iconName: 'Globe',
    displayOrder: 3,
    isActive: true,
    highlights: ['Custom Elementor Pro Page Layouts', 'Theme Customization & Integration', 'Mobile & Cross-Browser Optimization', 'SEO-Friendly Page Structure'],
  },
];

// Truthful empty arrays per prompt specifications
export const initialExperience: ExperienceData[] = [];
export const initialTestimonials: TestimonialData[] = [];

export const initialSiteSettings: SiteSettingsData = {
  siteTitle: 'Asif | MERN Stack Web Developer',
  metaDescription: 'Portfolio of Asif, a MERN Stack Web Developer specializing in React, Node.js, Express, MongoDB and modern responsive web development.',
  keywords: 'Asif, MERN Stack, React Developer, Node.js, Express, MongoDB, Web Developer, Full Stack, Portfolio, WordPress, Elementor',
  ogImageUrl: '/images/profile-placeholder.svg',
  primaryColor: '#2563eb',
  footerText: 'Built with React, Node.js, Express & MongoDB. Crafted with clean minimalism.',
  enableHireBadge: true,
};
