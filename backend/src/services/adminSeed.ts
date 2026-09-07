import bcrypt from 'bcryptjs';
import {
  Admin,
  Profile,
  Project,
  Skill,
  Service,
  SiteSettings,
} from '../models';
import { getDbStatus } from '../config/db';

export const seedInitialDatabase = async () => {
  const dbStatus = getDbStatus();
  if (!dbStatus.isConnected) {
    console.log('ℹ️ Database offline or not configured; skipping MongoDB seeding.');
    return;
  }

  try {
    // 1. Seed Initial Admin Account
    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || '';

    if (adminEmail && adminPassword) {
      const existingAdmin = await Admin.findOne({ email: adminEmail });
      if (!existingAdmin) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(adminPassword, salt);
        await Admin.create({
          email: adminEmail,
          passwordHash,
          name: 'Asif',
          role: 'admin',
        });
        console.log(`🔐 Initial Admin account provisioned: ${adminEmail}`);
      }
    } else {
      console.warn('⚠️ ADMIN_EMAIL and ADMIN_PASSWORD environment variables not set. Set them in your environment for initial admin access.');
    }

    // 2. Seed Initial Profile if none exists
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: 'Asif',
        title: 'MERN Stack Web Developer',
        shortBio: 'I build modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.',
        aboutText: 'I am a dedicated MERN Stack Web Developer passionate about building high-performance, responsive, and maintainable web applications. My foundation is built on practical craftsmanship—transforming ideas into clean interfaces and robust RESTful backends.\n\nWith a strong grasp of modern JavaScript, React component architecture, Express middleware, and MongoDB document modeling, I build full-stack applications with an emphasis on code cleanliness, security, and responsive UX across all screen sizes. Alongside MERN, I have practical experience delivering custom WordPress and Elementor websites, as well as exploring mobile foundations with basic Android development.',
        philosophy: 'Code should be readable, architectures scalable, and user experiences intuitive. I believe in continuous hands-on learning, transparent communication, and delivering real value through clean engineering.',
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
            'Mobile-first responsive layout design & accessibility',
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
            'Responsive Elementor & Elementor Pro design',
            'Speed optimization & SEO-friendly site structure',
          ],
        },
      });
      console.log('👤 Profile document initialized in MongoDB.');
    }

    // 3. Seed Skills if none exist (Strictly provided skills only)
    const skillsCount = await Skill.countDocuments();
    if (skillsCount === 0) {
      const initialSkills = [
        // Frontend
        { name: 'HTML', category: 'Frontend', level: 95, iconName: 'Code', displayOrder: 1, isActive: true },
        { name: 'CSS', category: 'Frontend', level: 90, iconName: 'Palette', displayOrder: 2, isActive: true },
        { name: 'JavaScript', category: 'Frontend', level: 88, iconName: 'Braces', displayOrder: 3, isActive: true },
        { name: 'React.js', category: 'Frontend', level: 85, iconName: 'Atom', displayOrder: 4, isActive: true },
        { name: 'Tailwind CSS', category: 'Frontend', level: 90, iconName: 'Sparkles', displayOrder: 5, isActive: true },
        { name: 'Bootstrap', category: 'Frontend', level: 85, iconName: 'Layout', displayOrder: 6, isActive: true },

        // Backend
        { name: 'Node.js', category: 'Backend', level: 84, iconName: 'Server', displayOrder: 7, isActive: true },
        { name: 'Express.js', category: 'Backend', level: 86, iconName: 'Network', displayOrder: 8, isActive: true },
        { name: 'MongoDB', category: 'Backend', level: 82, iconName: 'Database', displayOrder: 9, isActive: true },

        // CMS
        { name: 'WordPress', category: 'CMS', level: 88, iconName: 'Globe', displayOrder: 10, isActive: true },
        { name: 'Elementor', category: 'CMS', level: 92, iconName: 'Component', displayOrder: 11, isActive: true },

        // Other
        { name: 'Basic Android Development', category: 'Other', level: 60, iconName: 'Smartphone', displayOrder: 12, isActive: true },
      ];

      await Skill.insertMany(initialSkills as any);
      console.log('⚡ Initial verified skills seeded in MongoDB.');
    }

    // 4. Seed Services if none exist
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const initialServices = [
        {
          title: 'Full-Stack Web Development',
          description: 'End-to-end web applications built using MongoDB, Express.js, React.js, and Node.js with secure authentication and clean REST APIs.',
          iconName: 'Layers',
          highlights: [
            'MERN Stack Architecture',
            'Custom REST API Development',
            'MongoDB Schema Design & Querying',
            'JWT & Session Authentication',
          ],
          displayOrder: 1,
          isActive: true,
        },
        {
          title: 'Frontend & UI Engineering',
          description: 'Pixel-perfect, mobile-responsive user interfaces with React, Tailwind CSS, and modern JavaScript adhering to web accessibility standards.',
          iconName: 'Layout',
          highlights: [
            'React.js Component Architecture',
            'Tailwind CSS & Utility-First Styling',
            'Mobile-First Responsive Layouts',
            'Interactive & Accessible UX',
          ],
          displayOrder: 2,
          isActive: true,
        },
        {
          title: 'WordPress & Elementor Development',
          description: 'High-converting, customizable WordPress websites designed with Elementor Pro, structured for rapid load speeds and easy content management.',
          iconName: 'Globe',
          highlights: [
            'Custom Elementor Pro Page Layouts',
            'Theme Customization & Integration',
            'Mobile & Cross-Browser Optimization',
            'SEO-Friendly Page Structure',
          ],
          displayOrder: 3,
          isActive: true,
        },
      ];

      await Service.insertMany(initialServices as any);
      console.log('🛠️ Services seeded in MongoDB.');
    }

    // 5. Seed Showcase Projects if none exist (Truthfully labeled as Featured Personal Projects)
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      const initialProjects = [
        {
          title: 'Full-Stack E-Commerce Platform',
          slug: 'ecommerce-platform',
          category: 'E-Commerce',
          type: 'Featured Personal Project',
          shortDescription: 'Modern digital storefront with dynamic product catalog, cart state, checkout flow, and administrative inventory management.',
          detailedDescription: 'An end-to-end full-stack e-commerce application developed to showcase asynchronous shopping cart persistence, faceted product filtering, and responsive product showcase layouts. Includes secure administrative management for catalog updates and order tracking.',
          problem: 'Small retail businesses often struggle with bloated, slow commerce templates that complicate catalog maintenance and hurt checkout conversions.',
          solution: 'Engineered a streamlined MERN application with decoupled REST endpoints, fast database indexing, responsive checkout layouts, and instant cart updates.',
          thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
          gallery: [
            'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
          ],
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
          features: [
            'Faceted category filtering & dynamic text search',
            'Persistent shopping cart state management',
            'Administrative product management dashboard',
            'Mobile-first responsive design across all viewports',
          ],
          githubUrl: '',
          liveUrl: '',
          featured: true,
          displayOrder: 1,
          status: 'Completed',
        },
        {
          title: 'Project Management SaaS Platform',
          slug: 'project-management-saas',
          category: 'SaaS',
          type: 'Featured Personal Project',
          shortDescription: 'Productivity and task workspace featuring status columns, task prioritization, deadlines, and activity feeds.',
          detailedDescription: 'A modern agile project tracking workspace engineered with clean visual task workflows. Demonstrates complex relational document references in MongoDB, role permissions, and clean dashboard data presentation.',
          problem: 'Teams frequently find enterprise task software overly convoluted and bloated with unnecessary features that slow down daily delivery.',
          solution: 'Created an intuitive workspace with clean column-based workflows, clear task ownership assignments, and high-contrast status feedback.',
          thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
          gallery: [
            'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
          ],
          technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
          features: [
            'Visual task boards with priority tagging',
            'Project milestone & deadline tracking',
            'Role-based administrative controls',
            'Responsive task modal drawer with sub-items',
          ],
          githubUrl: '',
          liveUrl: '',
          featured: true,
          displayOrder: 2,
          status: 'Completed',
        },
        {
          title: 'Real Estate Property Platform',
          slug: 'real-estate-property-platform',
          category: 'Full Stack',
          type: 'Featured Personal Project',
          shortDescription: 'Property discovery application with location queries, price filtering, high-resolution imagery, and agent inquiry forms.',
          detailedDescription: 'A responsive real estate listing portal with multifaceted property search, image carousels, detailed amenity specifications, and inquiry handling.',
          problem: 'Property buyers often experience slow filtering, cluttered interfaces, and non-responsive image viewing on mobile devices.',
          solution: 'Built a responsive layout featuring fast property filtering, optimized visual galleries, and instant direct inquiry transmission.',
          thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
          gallery: [
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
          ],
          technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
          features: [
            'Filter by price, location, and property type',
            'Rich property photo gallery',
            'Direct inquiry submission form',
            'Responsive property comparison layout',
          ],
          githubUrl: '',
          liveUrl: '',
          featured: true,
          displayOrder: 3,
          status: 'Completed',
        },
      ];

      await Project.insertMany(initialProjects as any);
      console.log('📁 Showcase personal projects seeded in MongoDB.');
    }

    // 6. Seed Site Settings if none exist
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create({
        siteTitle: 'Asif | MERN Stack Web Developer',
        metaDescription: 'Portfolio of Asif, a MERN Stack Web Developer specializing in React, Node.js, Express, MongoDB and modern responsive web development.',
        keywords: 'MERN Stack, React, Node.js, Express, MongoDB, Tailwind CSS, Web Developer, Asif',
        ogImage: '/images/profile-placeholder.svg',
        themeAccent: '#2563eb',
        footerText: 'Built with React, Node.js, Express & MongoDB. Crafted with clean minimalism.',
      });
      console.log('⚙️ Site settings document initialized in MongoDB.');
    }
  } catch (error) {
    console.error('❌ Error during initial database seeding:', error);
  }
};
