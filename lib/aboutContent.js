// Factual source: the MTAT brief. Do not add certifications, awards,
// customer names/numbers, facilities or statistics without confirmation.

export const ROUTES = {
  contact: '/contact',
  // Set to '/products' once that route exists. While null, no product links render.
  products: null,
};

export const HERO = {
  company: 'MTAT Technologies Private Limited',
  title: 'Engineering Precision. Powering Progress.',
  tagline:
    'Connecting manufacturing industries with advanced machine-tool technologies and expertise.',
};

export const INTRO = {
  label: 'OUR STORY',
  heading: 'Built on Experience. Driven by Technology.',
  paragraphs: [
    'MTAT Technologies Private Limited is an industrial technology and machine-tool solutions provider with a legacy dating back to 1995.',
    'Our journey began with the Factory Automation Group of Kirloskar Electric Company. Over the years, we expanded our presence in the machine-tool industry, building relationships with technology partners and supporting the evolving needs of Indian manufacturing.',
    'Today, our portfolio spans metal cutting, metal forming, precision metrology, and specialised tool-room equipment. We connect manufacturers with technologies suited to a diverse range of industrial applications.',
    'For us, progress means more than keeping pace with technology. It means helping industries move forward with precision, productivity, and confidence.',
  ],
  caption: 'PRECISION IN EVERY PROCESS',
};

export const TIMELINE_SECTION = {
  label: 'OUR JOURNEY',
  heading: 'A Journey of Growth and Innovation',
};

export const TIMELINE = [
  {
    year: 1995,
    title: 'The Beginning',
    text: 'MTA continued its journey in industrial automation, focusing on precision, productivity, reliability, and progress.',
  },
  {
    year: 1997,
    title: 'Global Technology Connections',
    text: 'The company took on the distributorship of Tongtai, a CNC machine-tool manufacturer from Taiwan.',
  },
  {
    year: 2001,
    title: 'A Strategic Partnership',
    text: 'A partnership with Jyoti CNC Automation strengthened its presence in the CNC machine-tool industry.',
  },
  {
    year: 2006,
    title: 'A New Phase of Growth',
    text: 'Vivek Malhotra, Davinder Singh, and Rohit Rai joined the company.',
  },
  {
    year: 2024,
    title: 'A New Chapter',
    text: 'MTA Technologies became MTAT Technologies Private Limited. Mr. Swaraj Bullar joined as Director of Operations.',
  },
];

export const EXPERTISE_SECTION = {
  label: 'OUR EXPERTISE',
  heading: 'Technology for Modern Manufacturing',
  intro:
    "Manufacturing depends on precision at every stage, from shaping materials to measuring finished components. MTAT's portfolio brings together machine tools and technologies for a broad range of industrial requirements.",
};

export const EXPERTISE = [
  {
    id: 'metal-cutting',
    image: 'cutting',
    title: 'Metal Cutting',
    description:
      'Machine tools for turning, milling, turn-milling and gear cutting across a wide range of requirements.',
    items: [
      'CNC turning centres',
      'Vertical turning lathes',
      'Machining centres',
      'Turn-mill centres',
      'Gear-hobbing machines',
      'Advanced multi-axis machining technologies',
    ],
  },
  {
    id: 'metal-forming',
    image: 'forming',
    title: 'Metal Forming',
    description:
      'Equipment for bending, shearing and pressing, including specialised sheet-metal processing.',
    items: [
      'CNC press brakes',
      'Shearing machines',
      'Hydraulic presses',
      'Power presses',
      'Specialised sheet-metal processing equipment',
    ],
  },
  {
    id: 'precision-metrology',
    image: 'metrology',
    title: 'Precision Metrology',
    description:
      'Measurement and inspection systems for checking dimensions with confidence.',
    items: [
      'Coordinate measuring machines',
      'Optical measuring systems',
      'Portable measuring arms',
      'Probing solutions',
    ],
  },
  {
    id: 'tool-room',
    image: 'toolroom',
    title: 'Tool Room Solutions',
    description:
      'Machines for specialised machining and finishing applications.',
    items: [
      'EDM and wire EDM machines',
      'Surface grinding machines',
      'Cylindrical grinding solutions',
    ],
  },
];

export const PARTNERS_SECTION = {
  label: 'OUR TECHNOLOGY NETWORK',
  heading: 'Strong Partnerships. Greater Possibilities.',
  intro:
    "Technology partnerships are an important part of MTAT's journey. Through its machine-tool portfolio, the company connects manufacturing businesses with established equipment brands and specialised technologies.",
};

// `confirmed: false` hides a brand. `logo` (e.g. '/Images/partners/hexagon.svg')
// shows the real logo file instead of the brand name once you have it.
export const PARTNERS = [
  { name: 'Jyoti CNC', logo: null, confirmed: true },
  { name: 'EIFCO', logo: null, confirmed: true },
  { name: 'Energy Mission', logo: null, confirmed: true },
  { name: 'Singhal Press (SEW)', logo: null, confirmed: true },
  { name: 'Sukrit Machine Tools', logo: null, confirmed: true },
  { name: 'Hexagon', logo: null, confirmed: true },
  { name: 'Sodick', logo: null, confirmed: true },
  { name: 'Pinnacle', logo: null, confirmed: true },
  { name: 'Kiya', logo: null, confirmed: true },
];

export const INDUSTRIES_SECTION = {
  label: 'INDUSTRY APPLICATIONS',
  heading: 'Precision Across Industries',
  intro:
    "MTAT's machine-tool portfolio supports manufacturing applications in these sectors. MTAT supplies the technology; the manufacturers it serves make the components.",
};

export const INDUSTRIES = [
  {
    id: 'automotive',
    image: 'automotive',
    title: 'Automotive',
    description:
      'Repeatable machining and tight dimensional control across high-volume production.',
  },
  {
    id: 'agriculture',
    image: 'agriculture',
    title: 'Agriculture',
    description:
      'Robust machining and forming for equipment built to work in demanding conditions.',
  },
  {
    id: 'aerospace',
    image: 'aerospace',
    title: 'Aerospace',
    description:
      'Multi-axis capability and verified accuracy for complex, exacting geometries.',
  },
  {
    id: 'sheet-metal',
    image: 'sheetMetal',
    title: 'Sheet Metal Fabrication',
    description:
      'Cutting, bending and pressing equipment for efficient sheet-metal processing.',
  },
  {
    id: 'medical',
    image: 'medical',
    title: 'Medical Equipment',
    description:
      'Fine, accurate machining and inspection for intricate equipment components.',
  },
];

export const PEOPLE = {
  label: 'OUR PEOPLE',
  heading: 'Progress Begins with People',
  paragraphs: [
    "At MTAT Technologies, we believe that a company's growth is shaped by the people behind its work.",
    'Our team contributes to building industry relationships, supporting customers, and moving the business forward as manufacturing technologies continue to evolve.',
    'We value an employee-centric culture that encourages connection, collaboration, and shared experiences. Annual employee trips across India reflect our commitment to strengthening relationships beyond the workplace.',
    'Because lasting progress is built not only through technology, but also through the people who make it possible.',
  ],
};

export const COMMITMENT = {
  label: 'THE MTAT COMMITMENT',
  heading: 'Beyond Machines. Towards Progress.',
  paragraphs: [
    'We believe manufacturing progress comes from bringing the right technologies, industry knowledge, and customer support together.',
    'As manufacturing continues to evolve, MTAT Technologies remains focused on building strong relationships, expanding technological possibilities, and supporting the industries that shape our world.',
  ],
  slogan: 'Engineering precision, powering progress.',
  cta: 'Talk to Our Team',
};
