// Factual source: MTAT Technologies Private Limited corporate profile.
// Do not add certifications, awards, customer names/numbers, facilities
// or statistics without confirmation.

export const ROUTES = {
  contact: '/contact',
  // Set to '/products' once that route exists. While null, no product links render.
  products: null,
};

export const HERO = {
  company: 'MTAT Technologies Private Limited',
  title: 'The Solution Providers',
  tagline:
    'Your Partner in Precision. Your Partner in Progress.',
};

export const INTRO = {
  label: 'OUR STORY',
  heading: 'Building Progress Through Precision Since 1995',
  paragraphs: [
    'MTAT Technologies Private Limited is a trusted provider of advanced machine tools, precision machining technologies and industrial manufacturing solutions, headquartered in Ludhiana, Punjab, India.',
    'Established in 1995, MTAT has built its presence in the manufacturing sector by connecting industries with reliable machinery, innovative technologies and established Indian and international manufacturers.',
    'With a growing team of approximately 60 professionals, our portfolio spans multiple industrial solution categories, supporting manufacturers in enhancing productivity, improving precision and strengthening their manufacturing capabilities.',
    'At MTAT, we believe that every manufacturing challenge deserves the right technology, the right expertise and the right support. Guided by integrity, excellence and reliability, we continue to help industries move towards greater efficiency, precision and sustainable growth.',
  ],
  caption: 'PRECISION IN EVERY PROCESS',
};

export const TIMELINE_SECTION = {
  label: 'OUR JOURNEY',
  heading: 'Growing with the Changing World of Manufacturing',
};

export const TIMELINE = [
  {
    year: 1995,
    title: 'Foundation of MTAT Technologies',
    text: 'Established in Ludhiana, Punjab, with a vision to support industrial growth through dependable machine tool solutions.',
  },
  {
    year: 'Growth',
    title: 'Expanding Manufacturing Capabilities',
    text: 'Progressively broadened our offerings to serve a wider range of machining, fabrication, tooling and precision measurement requirements.',
  },
  {
    year: 'Partnerships',
    title: 'Building a Strong Technology Network',
    text: 'Developed channel partnerships with reputed Indian and international manufacturers, strengthening access to advanced industrial machinery and technologies.',
  },
  {
    year: 'Support',
    title: 'Beyond Machinery Supply',
    text: 'Expanded our customer offering to include sales coordination, service support, installation assistance, maintenance and spare parts.',
  },
  {
    year: 'Today',
    title: 'A Growing Team, A Broader Vision',
    text: 'With approximately 60 professionals and capabilities across four core solution verticals, MTAT continues to pursue its vision of becoming a preferred partner for advanced machining and manufacturing solutions.',
  },
];

export const EXPERTISE_SECTION = {
  label: 'OUR EXPERTISE',
  heading: 'Comprehensive Solutions for Modern Manufacturing',
  intro:
    'MTAT offers advanced machine tools and industrial technologies across metal cutting, metal forming, precision metrology and tool room solutions. Our diverse portfolio connects manufacturers with the right machinery to meet their production requirements, improve operational efficiency and achieve greater precision.',
};

export const EXPERTISE = [
  {
    id: 'metal-cutting',
    image: 'cutting',
    title: 'Metal Cutting',
    description:
      'Advanced machining technologies for precision cutting, turning, milling and complex component manufacturing.',
    items: [
      'CNC turning centres',
      'Vertical turning lathes',
      'Vertical and horizontal machining centres',
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
      'Reliable machinery for sheet metal processing, bending, shearing and industrial pressing applications.',
    items: [
      'CNC press brakes',
      'Shearing machines',
      'Hydraulic presses',
      'Mechanical and power presses',
      'Laser processing equipment',
    ],
  },
  {
    id: 'precision-metrology',
    image: 'metrology',
    title: 'Precision Metrology',
    description:
      'Advanced measurement and inspection technologies designed to support dimensional accuracy and quality control.',
    items: [
      'Coordinate measuring systems',
      'Optical measuring systems',
      'Portable measuring arms',
      'Precision inspection and probing solutions',
    ],
  },
  {
    id: 'tool-room',
    image: 'toolroom',
    title: 'Tool Room Solutions',
    description:
      'Specialised machinery and technologies for tooling, component finishing and precision manufacturing applications.',
    items: [
      'Wire-cut EDM systems',
      'EDM machines',
      'Precision grinding machines',
      'Surface grinding solutions',
      'Cylindrical grinding solutions',
    ],
  },
];

export const PARTNERS_SECTION = {
  label: 'OUR TECHNOLOGY NETWORK',
  heading: 'Trusted Partnerships. Advanced Technologies.',
  intro:
    'As an authorized channel partner for a diverse portfolio of reputed machine tool and technology brands, MTAT connects manufacturing businesses with established Indian and international manufacturers. Our technology network enables us to offer specialised machinery and solutions across multiple industrial applications.',
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
  heading: 'Supporting the Industries That Drive Progress',
  intro:
    'Every manufacturing sector has its own production challenges and precision requirements. MTAT brings together advanced machine tools and industrial technologies to support diverse manufacturing applications, helping businesses strengthen their capabilities and move towards greater efficiency.',
};

export const INDUSTRIES = [
  {
    id: 'automotive',
    image: 'automotive',
    title: 'Automotive',
    description:
      'Machining and manufacturing technologies for automotive components and precision production requirements.',
  },
  {
    id: 'agriculture',
    image: 'agriculture',
    title: 'Agriculture',
    description:
      'Industrial machining and forming solutions for agricultural machinery and equipment manufacturing.',
  },
  {
    id: 'aerospace',
    image: 'aerospace',
    title: 'Aerospace',
    description:
      'Advanced machining and precision measurement technologies for complex component manufacturing.',
  },
  {
    id: 'sheet-metal',
    image: 'sheetMetal',
    title: 'Sheet Metal Fabrication',
    description:
      'Advanced cutting, bending, pressing and sheet metal processing solutions for fabrication requirements.',
  },
  {
    id: 'medical',
    image: 'medical',
    title: 'Medical Equipment',
    description:
      'Precision machining and measurement technologies supporting the manufacturing of intricate equipment components.',
  },
];

export const PEOPLE = {
  label: 'OUR PEOPLE',
  heading: '60 Professionals. One Shared Vision.',
  paragraphs: [
    'At MTAT Technologies, we believe that our growth is shaped by the people behind our work. From technology consultation to customer support, every member of our team contributes to building lasting industry relationships.',
    'Starting with a team of just two dedicated professionals in 1995, MTAT has steadily developed its capabilities and grown into a team of approximately 60 professionals.',
    'Our people work together to understand customer requirements, coordinate technology solutions and support manufacturers throughout their machinery journey.',
    'We believe that lasting progress comes from the right combination of people, expertise and technology. Together, we continue to strengthen our commitment to customers and the manufacturing industry.',
  ],
};

export const COMMITMENT = {
  label: 'THE MTAT COMMITMENT',
  heading: 'Beyond Machines. Building Lasting Partnerships.',
  paragraphs: [
    'Our commitment extends beyond machinery supply. Through sales consultation, application support, installation coordination, training, after-sales service, maintenance and spare parts support, we aim to build lasting partnerships with our customers.',
    'Guided by integrity, excellence and reliability, we work to connect manufacturers with the right machinery, trusted technology partners and technical expertise to support their long-term business objectives.',
  ],
  slogan: 'Your Partner in Precision. Your Partner in Progress.',
  cta: 'Talk to Our Team',
};